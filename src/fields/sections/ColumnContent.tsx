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
import {token} from './tokens';

import './ColumnContent.scss';

/** what RenderFields needs to render some fields at their exact paths */
type Part = {fields: ClientField[]; path: string; schemaPath: string; permissions: SanitizedFieldsPermissions};
/** one cell of the flow: a field (after its group heading, if it opens a group), `title`: the name of the group it opens */
/**
 * `size`: how much of the grid a cell takes. `half`: a short field, two of them fit one above the
 * other; `full`: a whole column (an upload, a list of choices); `wide`: a column and a half (a
 * textarea: room to read what is typed, without taking two columns); `double`: two columns (a rich
 * text, an array of rows, a group); `band`: two columns on one line (a row of three short fields
 * or more, kept side by side at the widths their row gives them). `group`: the cell holds a group's
 * fields, two per line. `below`: the cell's field asks to go under the field before it (a title's
 * tag, `admin.custom.below` set by the host); `stack`: the cell holds such a pair, one under the other.
 * `when`: path of the group the cell's fields were taken out of: the cell shows only while that
 * group passes its own condition (Payload hides a group, not the fields rendered outside it).
 */
type Cell = {key: string; parts: Part[]; size: 'half' | 'full' | 'wide' | 'double' | 'band'; title?: string; group?: boolean; below?: boolean; stack?: boolean; section?: boolean; when?: string};

/** the host's mark on a field that goes under the field before it, in the same cell (a title's tag) */
const below = (f: ClientField): boolean => Boolean((f.admin as {custom?: {below?: unknown}} | undefined)?.custom?.below);

/** fields that need two columns, a column and a half, or a whole column */
const DOUBLE = new Set(['richText', 'array', 'blocks', 'collapsible', 'tabs', 'group', 'row', 'join']);
const WIDE = new Set(['textarea']);
const FULL = new Set(['upload', 'relationship', 'radio', 'code', 'json']);
/** the fields of a list, with the lists they sit in: rows opened up (a row gives its fields no path of its own) */
type Leaf = {field: ClientField; siblings: ClientField[]};
const leaves = (fields: ClientField[]): Leaf[] =>
  fields.flatMap((f): Leaf[] => (f.admin?.hidden || ('name' in f && f.name === 'id') ? [] : f.type === 'row' && 'fields' in f ? leaves(f.fields) : [{field: f, siblings: fields}]));
/** an array whose rows hold one or two short fields (a list of features) needs a column and a half, not two */
const sizeOf = (f: ClientField): Cell['size'] => {
  if (f.type === 'array' && 'fields' in f) {
    const inner = leaves(f.fields);
    if (inner.length <= 2 && inner.every((x) => !DOUBLE.has(x.field.type) && !WIDE.has(x.field.type) && !FULL.has(x.field.type))) return 'wide';
  }
  return DOUBLE.has(f.type) ? 'double' : WIDE.has(f.type) ? 'wide' : FULL.has(f.type) ? 'full' : 'half';
};

/**
 * The grid's tracks are half columns (a column is two tracks and the gap between them), so that a
 * cell can take a column and a half. Tracks taken by each size (the narrowest track and the gap
 * between tracks are in tokens.scss).
 */
const TRACKS: Record<Cell['size'], number> = {half: 2, full: 2, wide: 3, double: 4, band: 4};
/** a row of at least this many short fields stays a row, in one cell */
const BAND_MIN = 3;
const short = (f: ClientField) => !DOUBLE.has(f.type) && !WIDE.has(f.type) && !FULL.has(f.type);
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
function cells(fields: ClientField[], path: string, schemaPath: string, permissions: SanitizedFieldsPermissions, i18n: Parameters<typeof getTranslation>[1], prefix = '', title?: string, end = fields.length): Cell[] {
  const out: Cell[] = [];
  let heading: Part | null = null;
  let pendingTitle = title;
  const push = (key: string, part: Part, size: Cell['size'], flagged = false) => {
    out.push({key, parts: heading ? [heading, part] : [part], size, title: pendingTitle, below: flagged});
    heading = null;
    pendingTitle = undefined;
  };
  fields.forEach((f, i) => {
    if (i >= end) return;
    const key = `${prefix}${i}`;
    if (f.admin?.hidden || ('name' in f && (f.name === 'id' || f.name === 'blockName'))) return;
    const whole: Part = {fields: only(fields, (x) => x === f), path, schemaPath, permissions};
    if (f.type === 'ui') {
      heading = whole;
      return;
    }
    const named = 'fields' in f && Array.isArray(f.fields) && f.fields.every((x) => 'name' in x || x.type === 'row');
    // a row of three short fields or more (a number: prefix, value, suffix) stays together, on one line
    // (not a row that holds a title and its tag: those two go one under the other)
    if (f.type === 'row' && named && leaves(f.fields).length >= BAND_MIN && leaves(f.fields).every((x) => short(x.field) && !below(x.field))) {
      push(key, whole, 'band');
      return;
    }
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
      const shown = leaves(f.fields);
      // a small group (a link: label, kind, address, new tab; a price: amount, currency, period): one
      // cell, its fields two per line (a textarea takes a whole line of the cell)
      if (shown.length <= GROUP_MAX && shown.every((x) => !DOUBLE.has(x.field.type))) {
        const groupPermissions = inside(permissions, f.name);
        // (a field that goes under the one before it shares its part: rendered together, they stack)
        const sets: {siblings: ClientField[]; keep: ClientField[]}[] = [];
        for (const x of shown) {
          const last = sets[sets.length - 1];
          if (below(x.field) && last && last.siblings === x.siblings) last.keep.push(x.field);
          else sets.push({siblings: x.siblings, keep: [x.field]});
        }
        const parts = sets.map((set): Part => ({fields: only(set.siblings, (y) => set.keep.includes(y)), path: `${path}.${f.name}`, schemaPath: `${schemaPath}.${f.name}`, permissions: groupPermissions}));
        out.push({key, parts: heading ? [heading, ...parts] : parts, size: 'double', title: label, group: true, when: `${path}.${f.name}`});
        heading = null;
        pendingTitle = undefined;
        return;
      }
      const nested = cells(f.fields, `${path}.${f.name}`, `${schemaPath}.${f.name}`, inside(permissions, f.name), i18n, `${key}-`, label);
      if (nested.length && heading) nested[0] = {...nested[0], parts: [heading, ...nested[0].parts]};
      heading = null;
      out.push(...nested.map((cell) => ({...cell, when: cell.when ?? `${path}.${f.name}`})));
      return;
    }
    push(key, whole, sizeOf(f), below(f));
  });
  return out;
}

/**
 * The cells of a block. A block whose fields sit under group headings (`ui` fields: « Titre »,
 * « Texte », « Disposition ») gets **one column per group**: the heading, then the group's fields
 * one under the other, as in a plain form; the column scrolls on its own when the group is taller
 * than the panel (readable fields rather than a packed line). The fields before the first heading,
 * and every block without headings, are laid out field by field (`cells`).
 */
function blockCells(fields: ClientField[], path: string, schemaPath: string, permissions: SanitizedFieldsPermissions, i18n: Parameters<typeof getTranslation>[1]): Cell[] {
  const first = fields.findIndex((f) => f.type === 'ui');
  if (first < 0) return stacked(cells(fields, path, schemaPath, permissions, i18n));
  const out = stacked(cells(fields, path, schemaPath, permissions, i18n, '', undefined, first));
  const part = (siblings: ClientField[], f: ClientField): Part => ({fields: only(siblings, (x) => x === f), path, schemaPath, permissions});
  let cell: Cell | null = null;
  const sizes: Cell['size'][] = [];
  const close = () => {
    if (cell && cell.parts.length > 1) out.push({...cell, size: sizes.includes('double') ? 'double' : sizes.includes('wide') ? 'wide' : 'full'});
    cell = null;
    sizes.length = 0;
  };
  fields.forEach((f, i) => {
    if (i < first || f.admin?.hidden || ('name' in f && (f.name === 'id' || f.name === 'blockName'))) return;
    if (f.type === 'ui') {
      close();
      cell = {key: `section-${i}`, parts: [part(fields, f)], size: 'full', section: true};
      return;
    }
    if (!cell) return;
    // a row's fields one under the other (side by side they would be a third of a column each)
    if (f.type === 'row' && 'fields' in f && f.fields.every((x) => 'name' in x || x.type === 'row')) {
      for (const leaf of leaves(f.fields)) {
        cell.parts.push(part(leaf.siblings, leaf.field));
        sizes.push(sizeOf(leaf.field));
      }
      return;
    }
    cell.parts.push(part(fields, f));
    sizes.push(sizeOf(f));
  });
  close();
  return out;
}

/** A field marked `below` joins the cell before it (a title, then its tag): one cell, the whole height. */
function stacked(list: Cell[]): Cell[] {
  const out: Cell[] = [];
  for (const cell of list) {
    const before = out[out.length - 1];
    if (cell.below && before && !before.group && !before.stack && (before.size === 'half' || before.size === 'wide')) {
      out[out.length - 1] = {...before, parts: [...before.parts, ...cell.parts], size: before.size === 'half' ? 'full' : before.size, stack: true};
    } else out.push(cell);
  }
  return out;
}

/** One cell of the flow; nothing while the group its fields come from fails its condition. */
function FlowCell({cell, readOnly}: {cell: Cell; readOnly?: boolean}) {
  const hidden = useFormFields(([fields]) => Boolean(cell.when) && fields[cell.when as string]?.passesCondition === false);
  if (hidden) return null;
  return (
    <div className="column-content__cell" data-size={cell.size} data-group={cell.group ? 'true' : undefined} data-stack={cell.stack ? 'true' : undefined} data-section={cell.section ? 'true' : undefined}>
      {cell.title ? <p className="column-content__title">{cell.title}</p> : null}
      {cell.parts.map((part, i) => (
        <RenderFields key={i} fields={part.fields} forceRender parentIndexPath="" parentPath={part.path} parentSchemaPath={part.schemaPath} permissions={part.permissions} readOnly={readOnly} />
      ))}
    </div>
  );
}

/**
 * The cells on a grid of equal tracks (half columns) that fills the panel's width:
 *   - when every cell can have its own tracks, one cell after the other, on one line;
 *   - otherwise two lines: short fields go two per column (a later one fills the place left under
 *     an earlier one), the others keep the whole height, and the grid scrolls sideways if it still
 *     does not fit.
 * Only the number of lines depends on the width (CSS grid does the placing: no field is remounted).
 * The grid is as high as the panel: a cell that takes the whole height and holds more than fits (a
 * list with many rows, a long rich text) scrolls on its own, the other fields stay in view.
 */
function Flow({cells: list, readOnly}: {cells: Cell[]; readOnly?: boolean}) {
  const ref = useRef<HTMLDivElement>(null);
  // the grid's width, counted in tracks (their least width and gap: tokens.scss)
  const [width, setWidth] = useState(0);
  const [track, setTrack] = useState({min: 0, gap: 0});
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      setWidth(el.clientWidth);
      setTrack((s) => {
        const next = {min: token('track-min'), gap: token('track-gap')};
        return next.min === s.min && next.gap === s.gap ? s : next;
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const fits = track.min ? Math.max(1, Math.floor((width + track.gap) / (track.min + track.gap))) : 0;
  const tracks = list.reduce((n, c) => n + TRACKS[c.size], 0);
  const lines = width === 0 || fits === 0 || tracks <= fits ? 1 : 2;
  return (
    <div ref={ref} className="column-content__flow" data-lines={lines} style={{gridTemplateRows: lines === 2 ? 'auto minmax(0, 1fr)' : 'minmax(0, 1fr)'}}>
      {list.map((cell) => (
        <FlowCell key={cell.key} cell={cell} readOnly={readOnly} />
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
        <Flow cells={blockCells(block.fields as ClientField[], `${colPath}.contents.0`, `${rowsSchemaPath}.columns.contents.${block.slug}`, permissions ?? true, i18n)} readOnly={readOnly} />
      ) : (
        <p className="section-manager__soon">{t(T.manager.contentEmpty)}</p>
      )}
    </div>
  );
}
