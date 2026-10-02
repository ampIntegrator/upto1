'use client';

/**
 * ColumnContent — the « Contenu » panel of the « Gérer » dialog: the fields of the block held by
 * the selected column, one field per cell, the cells flowing into as many columns as the panel's
 * height needs (scrolling sideways), so that a block with a few fields shows without scrolling
 * down. Only a field taller than the panel (an array of rows, a long rich text) scrolls down. An empty column offers the blocks that fit its
 * width. The fields are Payload's own (RenderFields), at the paths its blocks field would give
 * them: what is typed is in the document's form.
 */
import {getTranslation} from '@payloadcms/translations';
import {Button, RenderFields, useFormFields, useTranslation} from '@payloadcms/ui';
import type {ClientBlock, ClientField, SanitizedFieldsPermissions} from 'payload';
import React from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import {BlockLibrary, type LibraryBlock} from './BlockLibrary';
import {EMPTY_SLUG} from './emptyBlock';
import {only} from './fieldGroups';
import type {PreviewColumn} from './preview';

/** what RenderFields needs to render some fields at their exact paths */
type Part = {fields: ClientField[]; path: string; schemaPath: string; permissions: SanitizedFieldsPermissions};
/** one cell of the flow: a field (after its group heading, if it opens a group), `title`: the name of the group it opens */
type Cell = {key: string; parts: Part[]; wide: boolean; title?: string};

/** fields that need room: they get a wider cell */
const WIDE = new Set(['richText', 'array', 'blocks', 'upload', 'textarea', 'collapsible', 'tabs', 'group', 'row', 'join']);

type Deep = {fields?: Record<string, Deep>} | true | undefined;
const inside = (permissions: SanitizedFieldsPermissions, name: string): SanitizedFieldsPermissions => {
  if (permissions === true) return true;
  const group = (permissions as Record<string, Deep>)?.[name];
  return ((group === true ? true : group?.fields) ?? true) as SanitizedFieldsPermissions;
};

/**
 * A block's fields as a list of cells, one field per cell, so that they flow into as many short
 * columns as needed instead of one tall one. Rows and groups are opened up when all their fields
 * are named: such a field has the same path (and schema path) rendered on its own as inside its
 * row; a group's fields are rendered at the group's path, the first one under the group's label.
 * Anything else (an array, a rich text, a row holding unnamed fields) stays whole. A group heading
 * (`ui` field) goes in the cell of the field that follows it.
 */
function cells(fields: ClientField[], path: string, schemaPath: string, permissions: SanitizedFieldsPermissions, i18n: Parameters<typeof getTranslation>[1], prefix = '', title?: string): Cell[] {
  const out: Cell[] = [];
  let heading: Part | null = null;
  let pendingTitle = title;
  const push = (key: string, part: Part, wide: boolean) => {
    out.push({key, parts: heading ? [heading, part] : [part], wide, title: pendingTitle});
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
      const nested = cells(f.fields, `${path}.${f.name}`, `${schemaPath}.${f.name}`, inside(permissions, f.name), i18n, `${key}-`, label);
      if (nested.length && heading) nested[0] = {...nested[0], parts: [heading, ...nested[0].parts]};
      heading = null;
      out.push(...nested);
      return;
    }
    push(key, whole, WIDE.has(f.type));
  });
  return out;
}

type Props = {
  /** the rows array: `sections.0.rows`, and its schema path */
  rowsPath: string;
  rowsSchemaPath: string;
  column: PreviewColumn | null;
  /** the blocks of the columns' contents field, as Payload gives them to the client */
  blocks: ClientBlock[];
  library: LibraryBlock[];
  permissions?: SanitizedFieldsPermissions;
  readOnly?: boolean;
  onPlace: (at: PreviewColumn, slug: string) => void;
  onClear: (at: PreviewColumn) => void;
};

export function ColumnContent({rowsPath, rowsSchemaPath, column, blocks, library, permissions, readOnly, onPlace, onClear}: Props) {
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
        <div className="column-content__flow">
          {cells(block.fields as ClientField[], `${colPath}.contents.0`, `${rowsSchemaPath}.columns.contents.${block.slug}`, permissions ?? true, i18n).map((cell) => (
            <div key={cell.key} className="column-content__cell" data-wide={cell.wide ? 'true' : undefined}>
              {cell.title ? <p className="column-content__title">{cell.title}</p> : null}
              {cell.parts.map((part, i) => (
                <RenderFields key={i} fields={part.fields} forceRender parentIndexPath="" parentPath={part.path} parentSchemaPath={part.schemaPath} permissions={part.permissions} readOnly={readOnly} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="section-manager__soon">{t(T.manager.contentEmpty)}</p>
          {!readOnly ? <BlockLibrary blocks={library} fits={(b) => b.min <= span && span <= b.max} onPick={(slug) => onPlace(column, slug)} /> : null}
        </>
      )}
    </div>
  );
}
