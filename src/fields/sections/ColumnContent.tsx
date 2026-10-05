'use client';

/**
 * ColumnContent — the « Contenu » panel of the « Gérer » dialog: the fields of the block held by
 * the selected column, one field per cell (a small group, a link for instance, is one cell: its
 * fields side by side under its name), on a grid of columns that fills the panel's width (one
 * line of cells when they all fit, two otherwise, scrolling sideways beyond), so that a block with
 * a few fields shows whole, without scrolling down. Only a field taller than the panel (an array of rows, a long rich text) scrolls down. The fields are Payload's own (RenderFields), at the paths its blocks field would give
 * them: what is typed is in the document's form.
 */
import {getTranslation} from '@payloadcms/translations';
import {Button, RenderFields, useFormFields, useTranslation} from '@payloadcms/ui';
import type {ClientBlock, ClientField, SanitizedFieldsPermissions} from 'payload';
import React, {useEffect, useRef, useState} from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import type {LibraryBlock} from './BlockLibrary';
import {EMPTY_SLUG} from './emptyBlock';
import {only} from './fieldGroups';
import type {PreviewColumn} from './preview';

/** what RenderFields needs to render some fields at their exact paths */
type Part = {fields: ClientField[]; path: string; schemaPath: string; permissions: SanitizedFieldsPermissions};
/** one cell of the flow: a field (after its group heading, if it opens a group), `title`: the name of the group it opens */
/**
 * `size`: how much of the grid a cell takes. `half`: a short field, two of them fit one above the
 * other; `full`: a whole column (an upload, a list of choices); `wide`: a column and a half (a
 * textarea: room to read what is typed, without taking two columns); `double`: two columns (a rich
 * text, an array of rows, a group). `group`: the cell holds a group's fields, two per line.
 */
type Cell = {key: string; parts: Part[]; size: 'half' | 'full' | 'wide' | 'double'; title?: string; group?: boolean};

/** fields that need two columns, a column and a half, or a whole column */
const DOUBLE = new Set(['richText', 'array', 'blocks', 'collapsible', 'tabs', 'group', 'row', 'join']);
const WIDE = new Set(['textarea']);
const FULL = new Set(['upload', 'relationship', 'radio', 'code', 'json']);
const sizeOf = (f: ClientField): Cell['size'] => (DOUBLE.has(f.type) ? 'double' : WIDE.has(f.type) ? 'wide' : FULL.has(f.type) ? 'full' : 'half');

/**
 * The grid's tracks are half columns (a column is two tracks and the gap between them), so that a
 * cell can take a column and a half. Tracks taken by each size; narrowest track and gap between
 * tracks, in px (the SCSS uses the same values).
 */
const TRACKS: Record<Cell['size'], number> = {half: 2, full: 2, wide: 3, double: 4};
const TRACK_MIN = 96;
const TRACK_GAP = 20;
/** a group of at most this many short fields stays together, in one cell */
const GROUP_MAX = 6;

type Deep = {fields?: Record<string, Deep>} | true | undefined;
const inside = (permissions: SanitizedFieldsPermissions, name: string): SanitizedFieldsPermissions => {
  if (permissions === true) return true;
  const group = (permissions as Record<string, Deep>)?.[name];
  return ((group === true ? true : group?.fields) ?? true) as SanitizedFieldsPermissions;
};

/**
 * A block's fields as a list of cells, one field per cell, placed on a grid of columns (Flow)
 * instead of one tall column. Rows and groups are opened up when all their fields
 * are named: such a field has the same path (and schema path) rendered on its own as inside its
 * row; a group's fields are rendered at the group's path, the first one under the group's label.
 * Anything else (an array, a rich text, a row holding unnamed fields) stays whole. A group heading
 * (`ui` field) goes in the cell of the field that follows it.
 */
function cells(fields: ClientField[], path: string, schemaPath: string, permissions: SanitizedFieldsPermissions, i18n: Parameters<typeof getTranslation>[1], prefix = '', title?: string): Cell[] {
  const out: Cell[] = [];
  let heading: Part | null = null;
  let pendingTitle = title;
  const push = (key: string, part: Part, size: Cell['size']) => {
    out.push({key, parts: heading ? [heading, part] : [part], size, title: pendingTitle});
    heading = null;
    pendingTitle = undefined;
  };
  fields.forEach((f, i) => {
    const key = `${prefix}${i}`;
    if (f.admin?.hidden || ('name' in f && (f.name === 'id' || f.name === 'blockName'))) return;
    const whole: Part = {fields: only(fields, (x) => x === f), path, schemaPath, permissions};
    if (f.type === 'ui') {
      heading = whole;
      return;
    }
    const named = 'fields' in f && Array.isArray(f.fields) && f.fields.every((x) => 'name' in x || x.type === 'row');
    if (f.type === 'row' && named) {
      const nested = cells(f.fields, path, schemaPath, permissions, i18n, `${key}-`, pendingTitle);
      if (nested.length && heading) nested[0] = {...nested[0], parts: [heading, ...nested[0].parts]};
      heading = null;
      pendingTitle = undefined;
      out.push(...nested);
      return;
    }
    if (f.type === 'group' && 'name' in f && named) {
      const label = f.label ? String(getTranslation(f.label as Parameters<typeof getTranslation>[0], i18n)) : undefined;
      const shown = f.fields.filter((x) => !x.admin?.hidden && !('name' in x && x.name === 'id'));
      // a small group of short fields (a link: label, kind, address, new tab): one cell, its fields two per line
      if (shown.length <= GROUP_MAX && shown.every((x) => !DOUBLE.has(x.type) && !WIDE.has(x.type))) {
        const groupPermissions = inside(permissions, f.name);
        const parts = shown.map((x): Part => ({fields: only(f.fields, (y) => y === x), path: `${path}.${f.name}`, schemaPath: `${schemaPath}.${f.name}`, permissions: groupPermissions}));
        out.push({key, parts: heading ? [heading, ...parts] : parts, size: 'double', title: label, group: true});
        heading = null;
        pendingTitle = undefined;
        return;
      }
      const nested = cells(f.fields, `${path}.${f.name}`, `${schemaPath}.${f.name}`, inside(permissions, f.name), i18n, `${key}-`, label);
      if (nested.length && heading) nested[0] = {...nested[0], parts: [heading, ...nested[0].parts]};
      heading = null;
      out.push(...nested);
      return;
    }
    push(key, whole, sizeOf(f));
  });
  return out;
}

/**
 * The cells on a grid of equal tracks (half columns) that fills the panel's width:
 *   - when every cell can have its own tracks, one cell after the other, on one line;
 *   - otherwise two lines: short fields go two per column (a later one fills the place left under
 *     an earlier one), the others keep the whole height, and the grid scrolls sideways if it still
 *     does not fit.
 * Only the number of lines depends on the width (CSS grid does the placing: no field is remounted).
 */
function Flow({cells: list, readOnly}: {cells: Cell[]; readOnly?: boolean}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const fits = Math.max(1, Math.floor((width + TRACK_GAP) / (TRACK_MIN + TRACK_GAP)));
  const tracks = list.reduce((n, c) => n + TRACKS[c.size], 0);
  const lines = width === 0 || tracks <= fits ? 1 : 2;
  return (
    <div ref={ref} className="column-content__flow" data-lines={lines} style={{gridTemplateRows: `repeat(${lines}, auto)`}}>
      {list.map((cell) => (
        <div key={cell.key} className="column-content__cell" data-size={cell.size} data-group={cell.group ? 'true' : undefined}>
          {cell.title ? <p className="column-content__title">{cell.title}</p> : null}
          {cell.parts.map((part, i) => (
            <RenderFields key={i} fields={part.fields} forceRender parentIndexPath="" parentPath={part.path} parentSchemaPath={part.schemaPath} permissions={part.permissions} readOnly={readOnly} />
          ))}
        </div>
      ))}
    </div>
  );
}

type Props = {
  /** the rows array: `sections.0.rows`, and its schema path */
  rowsPath: string;
  rowsSchemaPath: string;
  column: PreviewColumn | null;
  /** the blocks of the columns' contents field, as Payload gives them to the client */
  blocks: ClientBlock[];
  /** the blocks offered by the builder: their labels name the column's block */
  library: LibraryBlock[];
  permissions?: SanitizedFieldsPermissions;
  readOnly?: boolean;
  onClear: (at: PreviewColumn) => void;
};

export function ColumnContent({rowsPath, rowsSchemaPath, column, blocks, library, permissions, readOnly, onClear}: Props) {
  const {t} = useAdminText();
  const {i18n} = useTranslation();
  const colPath = column ? `${rowsPath}.${column.row}.columns.${column.col}` : '';
  // the column's width and block, as one string (a stable value for the form subscription)
  const state = useFormFields(([fields]) => (column && fields[`${colPath}.span`] ? `${fields[`${colPath}.span`]?.value ?? ''}|${fields[`${colPath}.contents.0.blockType`]?.value ?? ''}` : null));
  if (!column || state === null) return <p className="section-manager__soon">{t(T.manager.contentNone)}</p>;
  const [spanValue, blockType] = state.split('|');
  const span = Number(spanValue) || 12;
  const block = blocks.find((b) => b.slug === blockType);
  const filled = Boolean(block) && blockType !== EMPTY_SLUG;
  const label = library.find((b) => b.slug === blockType)?.label;

  return (
    <div className="column-content">
      <div className="column-content__head">
        <strong>{t(T.manager.contentTitle, {row: column.row + 1, col: column.col + 1, span})}</strong>
        {filled ? <span>{label}</span> : null}
        {filled && !readOnly ? (
          <Button buttonStyle="secondary" size="small" margin={false} onClick={() => onClear(column)}>
            {t(T.drawer.clear)}
          </Button>
        ) : null}
      </div>
      {filled && block ? (
        <Flow cells={cells(block.fields as ClientField[], `${colPath}.contents.0`, `${rowsSchemaPath}.columns.contents.${block.slug}`, permissions ?? true, i18n)} readOnly={readOnly} />
      ) : (
        <p className="section-manager__soon">{t(T.manager.contentEmpty)}</p>
      )}
    </div>
  );
}
