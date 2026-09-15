import type {Block, Field} from 'payload';

import {type ColumnSpan, minSpan, validateColumn, validateRow} from '@/components/content-specs';
import {BLOCK_NAME_MAX} from './blockName';
import {CARD_BLOCKS} from './cardBlocks';
import {emptyBlock} from './emptyBlock';
import {mediaBlock} from './mediaBlock';
import {mediaQuoteBlock} from './mediaQuoteBlock';
import {toContentRef, toContentRefs} from './contentRef';
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
    labels: {singular: 'Texte', plural: 'Textes'},
    admin: {group: 'Texte'},
    fields: [{name: 'text', type: 'textarea', label: 'Texte', localized: true, required: true, admin: {rows: 4, description: 'Une ligne vide sépare deux paragraphes.'}}],
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
  label: 'Largeur',
  required: true,
  defaultValue: '12',
  options: SPAN_OPTIONS,
  // no longer editable in the drawer: the width is chosen through the row's layouts;
  // hidden field to keep its value and its validation
  admin: {hidden: true},
  validate: (value: unknown, {data, path, siblingData}: {data: unknown; path: (number | string)[]; siblingData: Sibling}) => {
    const errors: string[] = [];
    const columns = getByPath(data, path.slice(0, -2));
    if (Array.isArray(columns)) {
      const e = validateRow(columns.map((c: {span?: unknown}) => toSpan(c?.span)) as ColumnSpan[]);
      if (e) errors.push(e);
    }
    errors.push(...validateColumn(toSpan(value), toContentRefs(siblingData?.contents)));
    return errors.length ? errors.join(' ') : true;
  },
};

const rowsField: Field = {
  name: 'rows',
  type: 'array',
  label: 'Rangées',
  labels: {singular: 'Rangée', plural: 'Rangées'},
  admin: {
    condition: (_d, s: Record<string, unknown>) => ['light', 'dark', 'media'].includes(String(s?.mode ?? '')),
    description: 'Chaque rangée découpe la largeur en colonnes dont les largeurs font 12. Une colonne peut rester vide. Sous 768 px, les colonnes passent en pleine largeur, dans l’ordre mobile de la section (bouton téléphone) ; les colonnes vides y sont masquées.',
    // builder view: strips, proportional cells, one drawer per column
    components: {Field: '@/fields/sections/RowsBuilder#RowsBuilder'},
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Colonnes',
      labels: {singular: 'Colonne', plural: 'Colonnes'},
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
          label: 'Contenu',
          labels: {singular: 'Composant', plural: 'Composants'},
          maxRows: 1,
          // the picker only offers components that fit in the column width
          filterOptions: ({siblingData}) => blocksForSpan(toSpan((siblingData as Sibling | undefined)?.span)),
          // explicit message rather than maxRows' generic one
          validate: (value: unknown) => {
            if (Array.isArray(value) && value.length > 1) return 'Un seul composant par colonne.';
            const name = Array.isArray(value) ? (value[0] as {blockName?: unknown} | undefined)?.blockName : undefined;
            if (typeof name === 'string' && name.length > BLOCK_NAME_MAX) return `Nom affiché trop long : ${BLOCK_NAME_MAX} caractères au plus.`;
            return true;
          },
          blocks: CONTENT_BLOCKS,
          admin: {description: 'Un seul composant par colonne. Pour en changer, videz la colonne puis choisissez-en un autre.'},
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
      label: 'Fond',
      required: true,
      options: [
        {label: 'Clair', value: 'light'},
        {label: 'Nuit', value: 'dark'},
        {label: 'Média (image ou vidéo)', value: 'media'},
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
          label: 'Nuance',
          required: true,
          options: [
            {label: 'Fond de page', value: 'body'},
            {label: 'Highlight clair du silo', value: 'highlight'},
          ],
          // condition repeated on the field (not only on the row): without it, Payload makes
          // the column required in the database, and a night or media section could no longer be saved
          admin: {width: '50%', condition: when('mode', 'light')},
        },
        {
          name: 'texture',
          type: 'radio',
          label: 'Texture',
          defaultValue: 'none',
          options: [
            {label: 'Aucune', value: 'none'},
            {label: 'Trame', value: 'grid'},
            {label: 'Points', value: 'dots'},
            {label: 'Losanges', value: 'losange'},
          ],
          admin: {width: '50%'},
        },
      ],
    },
    // 2b. night: the colour, no texture
    {
      name: 'darkStyle',
      type: 'radio',
      label: 'Nuance',
      required: true,
      options: [
        {label: 'Nuit', value: 'night'},
        {label: 'Nuit avec halo', value: 'night-halo'},
      ],
      admin: {condition: when('mode', 'dark')},
    },
    // 2c. media: the type, then the files and the overlay
    {
      name: 'mediaType',
      type: 'radio',
      label: 'Type de média',
      required: true,
      options: [
        {label: 'Image', value: 'image'},
        {label: 'Vidéo', value: 'video'},
      ],
      admin: {condition: when('mode', 'media')},
    },
    {name: 'image', type: 'upload', relationTo: 'media', label: 'Image de fond', admin: {condition: (_d, s: Sibling) => s?.mode === 'media' && s?.mediaType === 'image'}},
    {
      type: 'row',
      admin: {condition: (_d, s: Sibling) => s?.mode === 'media' && s?.mediaType === 'video'},
      fields: [
        {name: 'video', type: 'upload', relationTo: 'media', label: 'Vidéo de fond (mp4)'},
        {name: 'poster', type: 'upload', relationTo: 'media', label: "Image d'attente de la vidéo"},
      ],
    },
    {name: 'overlay', type: 'number', label: 'Calque noir sur le média (0 à 1)', min: 0, max: 1, defaultValue: 0.3, admin: {step: 0.05, condition: (_d, s: Sibling) => s?.mode === 'media' && ['image', 'video'].includes(String(s?.mediaType ?? ''))}},
    // 3. spacing and anchor, once the background is chosen
    {
      type: 'row',
      admin: {condition: modeChosen},
      fields: [
        {name: 'spacingTop', type: 'select', label: 'Espace en haut', defaultValue: '80', options: SPACING_OPTIONS, admin: {width: '33%'}},
        {name: 'spacingBottom', type: 'select', label: 'Espace en bas', defaultValue: '80', options: SPACING_OPTIONS, admin: {width: '33%'}},
        {
          name: 'anchor',
          type: 'text',
          label: 'Ancre (optionnelle)',
          admin: {width: '33%', description: 'Identifiant pour un lien #ancre : minuscules, chiffres, tirets.'},
          validate: (value: unknown) => !value || (typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) || 'Minuscules, chiffres et tirets uniquement.',
        },
      ],
    },
    // 3b. grid gaps: inherited from Réglages du site › Mise en page, unless overridden
    {
      type: 'row',
      admin: {condition: modeChosen},
      fields: [
        {name: 'gapX', type: 'select', label: 'Écart entre colonnes', defaultValue: SITE_GAP, options: SECTION_GAP_OPTIONS, admin: {width: '33%'}},
        {name: 'gapY', type: 'select', label: 'Écart entre rangées', defaultValue: SITE_GAP, options: SECTION_GAP_OPTIONS, admin: {width: '33%'}},
        {name: 'gapYMobile', type: 'select', label: 'Écart vertical mobile', defaultValue: SITE_GAP, options: SECTION_GAP_OPTIONS, admin: {width: '33%', description: 'Sous 768 px, entre tous les blocs empilés.'}},
      ],
    },
  ];
  if (shareable) {
    settings.push({
      type: 'row',
      admin: {condition: modeChosen},
      fields: [
        {name: 'saveAsShared', type: 'checkbox', label: 'Enregistrer dans les sections partagées', defaultValue: false, admin: {width: '50%', description: 'À l’enregistrement, la section est copiée dans « Sections partagées » et la page y fait référence.'}},
        {name: 'sharedTitle', type: 'text', label: 'Nom de la section partagée', admin: {width: '50%', condition: whenChecked('saveAsShared')}},
      ],
    });
  }
  return [
    // section settings, framed and collapsible (presentation only: no extra data)
    {type: 'collapsible', label: 'Réglages de la section', admin: {initCollapsed: false}, fields: settings},
    // 4. the rows, in their own collapsible block (RowsBuilder builder)
    {type: 'collapsible', label: 'Rangées', admin: {initCollapsed: false, condition: modeChosen}, fields: [rowsField]},
  ];
}

/** Page block: a section built in place. */
export const sectionBlock: Block = {
  slug: 'section',
  labels: {singular: 'Section', plural: 'Sections'},
  fields: sectionFields({shareable: true}),
};

/** Page block: a shared section, edited in one place for every page. */
export const sharedSectionBlock: Block = {
  slug: 'sharedSection',
  labels: {singular: 'Section partagée', plural: 'Sections partagées'},
  fields: [{name: 'section', type: 'relationship', relationTo: 'sections', label: 'Section', required: true}],
};

/** A page's « sections » field. */
export const sectionsField: Field = {
  name: 'sections',
  type: 'blocks',
  label: 'Sections',
  labels: {singular: 'Section', plural: 'Sections'},
  blocks: [sectionBlock, sharedSectionBlock],
  admin: {description: 'Les sections s’empilent de haut en bas sous le haut de page.'},
};
