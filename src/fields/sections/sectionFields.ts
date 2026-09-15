import type {Block, Field} from 'payload';

import {type ColumnSpan, validateColumn, validateRow} from '@/components/content-specs';
import {CARD_BLOCKS} from './cardBlocks';
import {toContentRefs} from './contentRef';
import {SPAN_OPTIONS, toSpan} from './presets';

/**
 * Une Section de page (modèle « Grille & emprises », 11 sept. 2026) :
 *   Section (fond, padding) > rangées > colonnes (largeurs sur 12) > contenus (blocs).
 * Ces champs servent deux fois : dans le bloc « Section » des pages, et au premier niveau
 * de la collection « Sections partagées ». Aucune valeur visuelle ici : fonds, textures et
 * espacements sont ceux du composant Section.
 */

type Sibling = Record<string, unknown>;
const when = (name: string, ...values: string[]) => (_d: unknown, s: Sibling) => values.includes(String(s?.[name] ?? ''));
const whenChecked = (name: string) => (_d: unknown, s: Sibling) => Boolean(s?.[name]);

/** Contenus de colonne disponibles : un texte simple (provisoire) et les huit cartes. */
export const CONTENT_BLOCKS: Block[] = [
  {
    slug: 'text',
    labels: {singular: 'Texte', plural: 'Textes'},
    admin: {group: 'Texte'},
    fields: [{name: 'text', type: 'textarea', label: 'Texte', localized: true, required: true, admin: {rows: 4, description: 'Une ligne vide sépare deux paragraphes.'}}],
  },
  ...CARD_BLOCKS,
];

const getByPath = (data: unknown, path: (number | string)[]): unknown => path.reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[String(k)] : undefined), data);

/** Largeur d'une colonne : la rangée doit faire 12, et chaque contenu doit tenir dans la colonne. */
const spanField: Field = {
  name: 'span',
  type: 'select',
  label: 'Largeur',
  required: true,
  defaultValue: '12',
  options: SPAN_OPTIONS,
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
    description: 'Chaque rangée découpe la largeur en colonnes dont les largeurs font 12. Une colonne peut rester vide. Sous 768 px, les colonnes passent en pleine largeur, dans l’ordre mobile de la rangée (bouton téléphone) ; les colonnes vides y sont masquées.',
    // vue constructeur : bandes, cases proportionnelles, tiroir par colonne
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
        // position de la colonne sur mobile, réglée par la fenêtre « ordre mobile » du constructeur
        {name: 'mobileOrder', type: 'number', admin: {hidden: true}},
        // un seul composant par colonne : un composant qui empile titre, texte et boutons reste un composant
        {
          name: 'contents',
          type: 'blocks',
          label: 'Contenu',
          labels: {singular: 'Composant', plural: 'Composants'},
          maxRows: 1,
          // message explicite plutôt que celui, générique, de maxRows
          validate: (value: unknown) => (Array.isArray(value) && value.length > 1 ? 'Un seul composant par colonne.' : true),
          blocks: CONTENT_BLOCKS,
          admin: {description: 'Un seul composant par colonne. Pour en changer, supprimez-le puis choisissez-en un autre. Laissez vide pour une case vide.'},
        },
      ],
    },
  ],
};

/** Espace en haut et en bas d'une section, en pixels (divisés par deux sous 640 px). */
const SPACING_OPTIONS = ['0', '20', '40', '60', '80', '100', '120', '140', '160'].map((v) => ({label: `${v} px`, value: v}));

const modeChosen = (_d: unknown, s: Sibling) => ['light', 'dark', 'media'].includes(String(s?.mode ?? ''));

/**
 * Les champs d'une section, posés comme des questions successives : le fond d'abord, puis
 * les réglages propres au fond choisi, puis espacements, ancre et rangées.
 * `shareable` ajoute la case « enregistrer dans les sections partagées » (bloc de page).
 */
export function sectionFields({shareable}: {shareable: boolean}): Field[] {
  const fields: Field[] = [
    // 1. le fond : clair, nuit ou média (pas de valeur par défaut : la question doit être posée)
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
    // 2a. clair : nuance et texture, côte à côte
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
          admin: {width: '50%'},
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
    // 2b. nuit : la couleur, sans texture
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
    // 2c. média : le type, puis les fichiers et le calque
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
    // 3. espacements et ancre, une fois le fond choisi
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
    // 4. les rangées
    rowsField,
  ];
  if (shareable) {
    fields.push({
      type: 'row',
      admin: {condition: modeChosen},
      fields: [
        {name: 'saveAsShared', type: 'checkbox', label: 'Enregistrer dans les sections partagées', defaultValue: false, admin: {width: '50%', description: 'À l’enregistrement, la section est copiée dans « Sections partagées » et la page y fait référence.'}},
        {name: 'sharedTitle', type: 'text', label: 'Nom de la section partagée', admin: {width: '50%', condition: whenChecked('saveAsShared')}},
      ],
    });
  }
  return fields;
}

/** Bloc de page : une section construite sur place. */
export const sectionBlock: Block = {
  slug: 'section',
  labels: {singular: 'Section', plural: 'Sections'},
  fields: sectionFields({shareable: true}),
};

/** Bloc de page : une section partagée, modifiée à un seul endroit pour toutes les pages. */
export const sharedSectionBlock: Block = {
  slug: 'sharedSection',
  labels: {singular: 'Section partagée', plural: 'Sections partagées'},
  fields: [{name: 'section', type: 'relationship', relationTo: 'sections', label: 'Section', required: true}],
};

/** Le champ « sections » d'une page. */
export const sectionsField: Field = {
  name: 'sections',
  type: 'blocks',
  label: 'Sections',
  labels: {singular: 'Section', plural: 'Sections'},
  blocks: [sectionBlock, sharedSectionBlock],
  admin: {description: 'Les sections s’empilent de haut en bas sous le haut de page.'},
};
