import type {Block, Field} from 'payload';

import {type ColumnSpan, minSpan} from '@/components/content-specs';
import {tr} from '@/i18n/admin/languages';
import {sectionsText as T} from '@/i18n/admin/sections';
import {BLOCK_NAME_MAX} from './blockName';
import {CARD_BLOCKS} from './cardBlocks';
import {emptyBlock} from './emptyBlock';
import {mediaBlock} from './mediaBlock';
import {mediaQuoteBlock} from './mediaQuoteBlock';
import {type ContentBlockData, contentLabel, rowWidthError, toContentRef} from './contentRef';
import {SECTION_GAP_OPTIONS, SITE_GAP} from './gaps';
import {SPAN_OPTIONS, toSpan} from './presets';

/**
 * A page Section (« Grille & emprises » model, 11 Sept. 2026):
 *   Section (background, padding) > rows > columns (widths out of 12) > contents (blocks).
 * These fields are used twice: in the pages' « Section » block, and at the top level
 * of the « Sections partagées » collection. No visual value here: backgrounds, textures and
 * spacing are those of the Section component.
 */

type Sibling = Record<string, unknown>;
const when = (name: string, ...values: string[]) => (_d: unknown, s: Sibling) => values.includes(String(s?.[name] ?? ''));
const whenChecked = (name: string) => (_d: unknown, s: Sibling) => Boolean(s?.[name]);

/** Available column contents: the empty cell and the image (first), a plain text (temporary) and the eight cards. */
export const CONTENT_BLOCKS: Block[] = [
  emptyBlock,
  mediaBlock,
  mediaQuoteBlock,
  {
    slug: 'text',
    labels: {singular: T.blocks.text.name, plural: T.blocks.text.plural},
    admin: {group: T.blocks.text.group},
    fields: [{name: 'text', type: 'textarea', label: T.blocks.text.field, localized: true, required: true, admin: {rows: 4, description: T.blocks.text.description}}],
  },
  ...CARD_BLOCKS,
];

/** Blocks offered in a column: those whose minimum span (registry) fits in its width. */
const blocksForSpan = (span: ColumnSpan): string[] =>
  CONTENT_BLOCKS.filter((b) => {
    const ref = toContentRef({blockType: b.slug});
    return !ref || minSpan(ref) <= span;
  }).map((b) => b.slug);

const getByPath = (data: unknown, path: (number | string)[]): unknown => path.reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[String(k)] : undefined), data);

/** Column width: the row must add up to 12, and each content must fit in the column. */
const spanField: Field = {
  name: 'span',
  type: 'select',
  label: T.rows.width,
  required: true,
  defaultValue: '12',
  options: SPAN_OPTIONS,
  // no longer editable in the drawer: the width is chosen through the row's layouts;
  // hidden field to keep its value and its validation
  admin: {hidden: true},
  validate: (value: unknown, {data, path, siblingData, req}: {data: unknown; path: (number | string)[]; siblingData: Sibling; req: {i18n?: {language?: string}}}) => {
    const language = req?.i18n?.language;
    const errors: string[] = [];
    const columns = getByPath(data, path.slice(0, -2));
    if (Array.isArray(columns)) {
      const e = rowWidthError(columns.map((c: {span?: unknown}) => toSpan(c?.span)), language);
      if (e) errors.push(e);
    }
    // each content too wide for the column (minimum spans from the content-specs registry)
    const span = toSpan(value);
    for (const block of Array.isArray(siblingData?.contents) ? (siblingData.contents as ContentBlockData[]) : []) {
      const ref = toContentRef(block);
      const min = ref ? minSpan(ref) : 0;
      if (min > span) errors.push(tr(T.validation.tooNarrow, language, {block: tr(contentLabel(block), language), min, span}));
    }
    return errors.length ? errors.join(' ') : true;
  },
};

const rowsField: Field = {
  name: 'rows',
  type: 'array',
  label: T.rows.label,
  labels: {singular: T.rows.singular, plural: T.rows.plural},
  admin: {
    condition: (_d, s: Record<string, unknown>) => ['light', 'dark', 'media'].includes(String(s?.mode ?? '')),
    description: T.rows.description,
    // builder view: strips, proportional cells, one drawer per column
    components: {Field: '@/fields/sections/RowsBuilder#RowsBuilder'},
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
        // component display name (native blockName), above the component in the drawer
        {name: 'blockNameUi', type: 'ui', admin: {components: {Field: '@/fields/sections/BlockNameField#BlockNameField'}}},
        // a single component per column: a component that stacks title, text and buttons is still one component
        {
          name: 'contents',
          type: 'blocks',
          label: T.rows.contents,
          labels: {singular: T.rows.component, plural: T.rows.components},
          maxRows: 1,
          // the picker only offers components that fit in the column width
          filterOptions: ({siblingData}) => blocksForSpan(toSpan((siblingData as Sibling | undefined)?.span)),
          // explicit message rather than maxRows' generic one
          validate: (value: unknown, {req}: {req: {i18n?: {language?: string}}}) => {
            if (Array.isArray(value) && value.length > 1) return tr(T.validation.oneComponent, req?.i18n?.language);
            const name = Array.isArray(value) ? (value[0] as {blockName?: unknown} | undefined)?.blockName : undefined;
            if (typeof name === 'string' && name.length > BLOCK_NAME_MAX) return tr(T.validation.nameTooLong, req?.i18n?.language, {max: BLOCK_NAME_MAX});
            return true;
          },
          blocks: CONTENT_BLOCKS,
          admin: {description: T.rows.contentsDescription},
        },
      ],
    },
  ],
};

/** Space at the top and bottom of a section, in pixels (halved below 640 px). */
const SPACING_OPTIONS = ['0', '20', '40', '60', '80', '100', '120', '140', '160'].map((v) => ({label: `${v} px`, value: v}));

const modeChosen = (_d: unknown, s: Sibling) => ['light', 'dark', 'media'].includes(String(s?.mode ?? ''));

/**
 * A section's fields, in two framed blocks: « Réglages de la section » (successive
 * questions: the background first, then the settings specific to the chosen background, spacing, anchor,
 * gaps and sharing), then the rows.
 * `shareable` adds the « enregistrer dans les sections partagées » checkbox (page block).
 */
export function sectionFields({shareable}: {shareable: boolean}): Field[] {
  const settings: Field[] = [
    // 1. the background: light, night or media (no default value: the question must be asked)
    {
      name: 'mode',
      type: 'radio',
      label: T.settings.background,
      required: true,
      options: [
        {label: T.settings.backgroundLight, value: 'light'},
        {label: T.settings.backgroundDark, value: 'dark'},
        {label: T.settings.backgroundMedia, value: 'media'},
      ],
    },
    // 2a. light: tint and texture, side by side
    {
      type: 'row',
      admin: {condition: when('mode', 'light')},
      fields: [
        {
          name: 'tint',
          type: 'radio',
          label: T.settings.tint,
          required: true,
          options: [
            {label: T.settings.tintBody, value: 'body'},
            {label: T.settings.tintHighlight, value: 'highlight'},
          ],
          // condition repeated on the field (not only on the row): without it, Payload makes
          // the column required in the database, and a night or media section could no longer be saved
          admin: {width: '50%', condition: when('mode', 'light')},
        },
        {
          name: 'texture',
          type: 'radio',
          label: T.settings.texture,
          defaultValue: 'none',
          options: [
            {label: T.settings.textureNone, value: 'none'},
            {label: T.settings.textureGrid, value: 'grid'},
            {label: T.settings.textureDots, value: 'dots'},
            {label: T.settings.textureLosange, value: 'losange'},
          ],
          admin: {width: '50%'},
        },
      ],
    },
    // 2b. night: the colour, no texture
    {
      name: 'darkStyle',
      type: 'radio',
      label: T.settings.tint,
      required: true,
      options: [
        {label: T.settings.darkNight, value: 'night'},
        {label: T.settings.darkNightHalo, value: 'night-halo'},
      ],
      admin: {condition: when('mode', 'dark')},
    },
    // 2c. media: the type, then the files and the overlay
    {
      name: 'mediaType',
      type: 'radio',
      label: T.settings.mediaType,
      required: true,
      options: [
        {label: T.settings.mediaImage, value: 'image'},
        {label: T.settings.mediaVideo, value: 'video'},
      ],
      admin: {condition: when('mode', 'media')},
    },
    {name: 'image', type: 'upload', relationTo: 'media', label: T.settings.image, admin: {condition: (_d, s: Sibling) => s?.mode === 'media' && s?.mediaType === 'image'}},
    {
      type: 'row',
      admin: {condition: (_d, s: Sibling) => s?.mode === 'media' && s?.mediaType === 'video'},
      fields: [
        {name: 'video', type: 'upload', relationTo: 'media', label: T.settings.video},
        {name: 'poster', type: 'upload', relationTo: 'media', label: T.settings.poster},
      ],
    },
    {name: 'overlay', type: 'number', label: T.settings.overlay, min: 0, max: 1, defaultValue: 0.3, admin: {step: 0.05, condition: (_d, s: Sibling) => s?.mode === 'media' && ['image', 'video'].includes(String(s?.mediaType ?? ''))}},
    // 3. spacing and anchor, once the background is chosen
    {
      type: 'row',
      admin: {condition: modeChosen},
      fields: [
        {name: 'spacingTop', type: 'select', label: T.settings.spacingTop, defaultValue: '80', options: SPACING_OPTIONS, admin: {width: '33%'}},
        {name: 'spacingBottom', type: 'select', label: T.settings.spacingBottom, defaultValue: '80', options: SPACING_OPTIONS, admin: {width: '33%'}},
        {
          name: 'anchor',
          type: 'text',
          label: T.settings.anchor,
          admin: {width: '33%', description: T.settings.anchorDescription},
          validate: (value: unknown, {req}: {req: {i18n?: {language?: string}}}) => !value || (typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) || tr(T.validation.anchor, req?.i18n?.language),
        },
      ],
    },
    // 3b. grid gaps: inherited from Réglages du site › Mise en page, unless overridden
    {
      type: 'row',
      admin: {condition: modeChosen},
      fields: [
        {name: 'gapX', type: 'select', label: T.settings.gapX, defaultValue: SITE_GAP, options: SECTION_GAP_OPTIONS, admin: {width: '33%'}},
        {name: 'gapY', type: 'select', label: T.settings.gapY, defaultValue: SITE_GAP, options: SECTION_GAP_OPTIONS, admin: {width: '33%'}},
        {name: 'gapYMobile', type: 'select', label: T.settings.gapYMobile, defaultValue: SITE_GAP, options: SECTION_GAP_OPTIONS, admin: {width: '33%', description: T.settings.gapYMobileDescription}},
      ],
    },
  ];
  if (shareable) {
    settings.push({
      type: 'row',
      admin: {condition: modeChosen},
      fields: [
        {name: 'saveAsShared', type: 'checkbox', label: T.settings.saveAsShared, defaultValue: false, admin: {width: '50%', description: T.settings.saveAsSharedDescription}},
        {name: 'sharedTitle', type: 'text', label: T.settings.sharedTitle, admin: {width: '50%', condition: whenChecked('saveAsShared')}},
      ],
    });
  }
  return [
    // section settings, framed and collapsible (presentation only: no extra data)
    {type: 'collapsible', label: T.settings.collapsible, admin: {initCollapsed: false}, fields: settings},
    // 4. the rows, in their own collapsible block (RowsBuilder builder)
    {type: 'collapsible', label: T.rows.collapsible, admin: {initCollapsed: false, condition: modeChosen}, fields: [rowsField]},
  ];
}

/** Page block: a section built in place. */
export const sectionBlock: Block = {
  slug: 'section',
  labels: {singular: T.blocks.section.singular, plural: T.blocks.section.plural},
  fields: sectionFields({shareable: true}),
};

/** Page block: a shared section, edited in one place for every page. */
export const sharedSectionBlock: Block = {
  slug: 'sharedSection',
  labels: {singular: T.blocks.sharedSection.singular, plural: T.blocks.sharedSection.plural},
  fields: [{name: 'section', type: 'relationship', relationTo: 'sections', label: T.blocks.sectionField, required: true}],
};

/** A page's « sections » field. */
export const sectionsField: Field = {
  name: 'sections',
  type: 'blocks',
  label: T.blocks.sectionsField,
  labels: {singular: T.blocks.section.singular, plural: T.blocks.section.plural},
  blocks: [sectionBlock, sharedSectionBlock],
  admin: {description: T.blocks.sectionsDescription},
};
