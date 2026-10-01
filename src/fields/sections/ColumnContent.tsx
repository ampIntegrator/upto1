'use client';

/**
 * ColumnContent — the « Contenu » panel of the « Gérer » dialog: the fields of the block held by
 * the selected column, laid out like the first panel (one column per group of fields, cut at the
 * block's group headings, scrolling sideways). An empty column offers the blocks that fit its
 * width. The fields are Payload's own (RenderFields), at the paths its blocks field would give
 * them: what is typed is in the document's form.
 */
import {Button, RenderFields, useFormFields} from '@payloadcms/ui';
import type {ClientBlock, ClientField, SanitizedFieldsPermissions} from 'payload';
import React from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import {BlockLibrary, type LibraryBlock} from './BlockLibrary';
import {EMPTY_SLUG} from './emptyBlock';
import {byGroup} from './fieldGroups';
import type {PreviewColumn} from './preview';

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
        <div className="section-manager__groups">
          {byGroup(block.fields as ClientField[], (f) => f.type === 'ui').map((fields, i) => (
            <div key={i} className="section-manager__group">
              <RenderFields
                fields={fields}
                forceRender
                parentIndexPath=""
                parentPath={`${colPath}.contents.0`}
                parentSchemaPath={`${rowsSchemaPath}.columns.contents.${block.slug}`}
                permissions={permissions ?? true}
                readOnly={readOnly}
              />
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
