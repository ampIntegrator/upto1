import {getTranslation} from '@payloadcms/translations';
import type {Block, Condition, Field, PayloadRequest} from 'payload';

import {tr} from '@/i18n/admin/languages';
import {sectionsText as T} from '@/i18n/admin/sections';

import {BLOCK_NAME_MAX} from './blockName';
import {type ContentBlock, labelMap, maxSpanMap, minSpanMap} from './contentBlock';
import {EMPTY_SLUG, emptyBlock} from './emptyBlock';
import {SECTION_GAP_OPTIONS, SITE_GAP} from './gaps';
import {DEFAULT_SPACING, type PresetRow, SPACING_OPTIONS, SPAN_OPTIONS, toSpan} from './grid';
import {rowWidthError, tooNarrowError, tooWideError} from './validation';

/**
 * A page Section (« Grille & emprises » model, 11 Sept. 2026):
 *   Section (host settings, spacing, gaps) > rows > columns (widths out of 12) > one content block.
 * The fields are built by `sectionFields()`, used twice: in the pages' « Section » block and
 * at the top level of the shared sections collection. Nothing here is specific to a site:
 * the content blocks, and the settings shown before the rows, come from the host (options).
 */

type Sibling = Record<string, unknown>;
const whenChecked = (name: string) => (_d: unknown, s: Sibling) => Boolean(s?.[name]);

export type SectionFieldsOptions = {
  /** Content blocks offered in a column (the empty cell is always there, first). */
  blocks: ContentBlock[];
  /** Host fields shown at the top of « Section settings » (background, etc.). */
  settings?: Field[];
  /** Adds the « save to shared sections » checkbox (page block only). */
  shareable?: boolean;
  /**
   * Shows spacing, gaps, sharing and the rows only when it holds (for instance once a host
   * setting is chosen). Note for the database: Payload makes the required fields of the rows
   * nullable when a condition exists above them, so adding or removing it changes the schema.
   */
  condition?: Condition;
  /** Thumbnails that create a row with blocks already placed (builder option). */
  presetRows?: PresetRow[];
};

const getByPath = (data: unknown, path: (number | string)[]): unknown => path.reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[String(k)] : undefined), data);

/**
 * The rows of a section: columns whose widths add up to 12, one content block per column.
 * `condition` sits on the array field itself (not only on its collapsible): Payload's database
 * adapter only reads it there when it decides whether the rows' required columns are NOT NULL.
 */
export function rowsField(blocks: ContentBlock[], condition?: Condition, presetRows: PresetRow[] = []): Field {
  const minSpans = minSpanMap(blocks);
  const maxSpans = maxSpanMap(blocks);
  const labels = labelMap(blocks);
  const contentBlocks: Block[] = [emptyBlock, ...blocks.map((b) => b.block)];
  const label = (blockType: string, req: PayloadRequest): string => getTranslation(labels[blockType] ?? blockType, req.i18n);

  /** Blocks offered in a column: the empty cell and those whose width range contains the column's. */
  const blocksForSpan = (span: number): string[] => [EMPTY_SLUG, ...blocks.filter((b) => b.minSpan <= span && span <= (b.maxSpan ?? 12)).map((b) => b.block.slug)];

  /** Column width: the row must add up to 12, and the content must fit in the column, neither too narrow nor too wide. */
  const spanField: Field = {
    name: 'span',
    type: 'select',
    label: T.rows.width,
    required: true,
    defaultValue: '12',
    options: SPAN_OPTIONS,
    // not editable in the drawer: the width is chosen through the row's layouts;
    // hidden field to keep its value and its validation
    admin: {hidden: true},
    validate: (value: unknown, {data, path, siblingData, req}: {data: unknown; path: (number | string)[]; siblingData: Sibling; req: PayloadRequest}) => {
      const language = req.i18n?.language;
      const errors: string[] = [];
      const columns = getByPath(data, path.slice(0, -2));
      if (Array.isArray(columns)) {
        const e = rowWidthError(columns.map((c: {span?: unknown}) => toSpan(c?.span)), language);
        if (e) errors.push(e);
      }
      const span = toSpan(value);
      for (const block of Array.isArray(siblingData?.contents) ? (siblingData.contents as {blockType?: string}[]) : []) {
        const slug = block?.blockType ?? '';
        const min = minSpans[slug] ?? 0;
        const max = maxSpans[slug] ?? 12;
        if (min > span) errors.push(tooNarrowError(label(slug, req), min, span, language));
        else if (span > max) errors.push(tooWideError(label(slug, req), max, span, language));
      }
      return errors.length ? errors.join(' ') : true;
    },
  };

  return {
    name: 'rows',
    type: 'array',
    label: T.rows.label,
    labels: {singular: T.rows.singular, plural: T.rows.plural},
    admin: {
      condition,
      description: T.rows.description,
      // builder view: strips, proportional cells, one drawer per column
      components: {Field: {path: '@/fields/sections/RowsBuilder#RowsBuilder', clientProps: {minSpans, maxSpans, presetRows}}},
    },
    fields: [
      {
        name: 'columns',
        type: 'array',
        label: T.rows.columns,
        labels: {singular: T.rows.column, plural: T.rows.columns},
        minRows: 1,
        maxRows: 6,
        fields: [
          spanField,
          // column position on mobile, set by the builder's "mobile order" dialog
          {name: 'mobileOrder', type: 'number', admin: {hidden: true}},
          // content display name (native blockName), above the content in the drawer
          {name: 'blockNameUi', type: 'ui', admin: {components: {Field: {path: '@/fields/sections/BlockNameField#BlockNameField', clientProps: {labels}}}}},
          // a single content per column: a block that stacks title, text and buttons is still one content
          {
            name: 'contents',
            type: 'blocks',
            label: T.rows.contents,
            labels: {singular: T.rows.component, plural: T.rows.components},
            maxRows: 1,
            // the picker only offers blocks that fit in the column width
            filterOptions: ({siblingData}) => blocksForSpan(toSpan((siblingData as Sibling | undefined)?.span)),
            // explicit message rather than maxRows' generic one
            validate: (value: unknown, {req}: {req: PayloadRequest}) => {
              if (Array.isArray(value) && value.length > 1) return tr(T.validation.oneComponent, req.i18n?.language);
              const name = Array.isArray(value) ? (value[0] as {blockName?: unknown} | undefined)?.blockName : undefined;
              if (typeof name === 'string' && name.length > BLOCK_NAME_MAX) return tr(T.validation.nameTooLong, req.i18n?.language, {max: BLOCK_NAME_MAX});
              return true;
            },
            blocks: contentBlocks,
            admin: {description: T.rows.contentsDescription},
          },
        ],
      },
    ],
  };
}

/**
 * A section's fields, in two framed blocks: « Section settings » (the host's settings
 * first, then spacing, anchor, gaps and sharing), then the rows.
 */
export function sectionFields({blocks, settings = [], shareable = false, condition, presetRows = []}: SectionFieldsOptions): Field[] {
  const common: Field[] = [
    ...settings,
    // spacing and anchor
    {
      type: 'row',
      admin: {condition},
      fields: [
        {name: 'spacingTop', type: 'select', label: T.settings.spacingTop, defaultValue: DEFAULT_SPACING, options: SPACING_OPTIONS, admin: {width: '33%'}},
        {name: 'spacingBottom', type: 'select', label: T.settings.spacingBottom, defaultValue: DEFAULT_SPACING, options: SPACING_OPTIONS, admin: {width: '33%'}},
        {
          name: 'anchor',
          type: 'text',
          label: T.settings.anchor,
          admin: {width: '33%', description: T.settings.anchorDescription},
          validate: (value: unknown, {req}: {req: PayloadRequest}) => !value || (typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) || tr(T.validation.anchor, req.i18n?.language),
        },
      ],
    },
    // grid gaps: inherited from the site setting, unless overridden
    {
      type: 'row',
      admin: {condition},
      fields: [
        {name: 'gapX', type: 'select', label: T.settings.gapX, defaultValue: SITE_GAP, options: SECTION_GAP_OPTIONS, admin: {width: '33%'}},
        {name: 'gapY', type: 'select', label: T.settings.gapY, defaultValue: SITE_GAP, options: SECTION_GAP_OPTIONS, admin: {width: '33%'}},
        {name: 'gapYMobile', type: 'select', label: T.settings.gapYMobile, defaultValue: SITE_GAP, options: SECTION_GAP_OPTIONS, admin: {width: '33%', description: T.settings.gapYMobileDescription}},
      ],
    },
  ];
  if (shareable) {
    common.push({
      type: 'row',
      admin: {condition},
      fields: [
        {name: 'saveAsShared', type: 'checkbox', label: T.settings.saveAsShared, defaultValue: false, admin: {width: '50%', description: T.settings.saveAsSharedDescription}},
        {name: 'sharedTitle', type: 'text', label: T.settings.sharedTitle, admin: {width: '50%', condition: whenChecked('saveAsShared')}},
      ],
    });
  }
  return [
    // section settings, framed and collapsible (presentation only: no extra data)
    // closed by default (Nicolas, 17 Sept. 2026): the rows are what editors open a section for
    {type: 'collapsible', label: T.settings.collapsible, admin: {initCollapsed: true}, fields: common},
    // the rows, in their own collapsible block (RowsBuilder)
    {type: 'collapsible', label: T.rows.collapsible, admin: {initCollapsed: false, condition}, fields: [rowsField(blocks, condition, presetRows)]},
  ];
}
