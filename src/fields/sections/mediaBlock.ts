import type {Block} from 'payload';

/**
 * « Image » block of a column: the Media component (image that fills the column).
 * Video will come later in the same block.
 *
 * Height rule (applied by the conversion, lib/sections.ts):
 *   - desktop, row with other contents: the image takes the row's height,
 *     its desktop minimum height is ignored;
 *   - desktop, row with no other content: the minimum height applies (the larger
 *     wins between two images);
 *   - mobile (stacked columns): always the mobile minimum height.
 */
export const MEDIA_SLUG = 'media';

/** Offered minimum heights, in px (even values). */
export const MEDIA_HEIGHTS = ['160', '240', '320', '400', '480', '560', '640'] as const;
export const HEIGHT_OPTIONS = MEDIA_HEIGHTS.map((v) => ({label: `${v} px`, value: v}));

export const mediaBlock: Block = {
  slug: MEDIA_SLUG,
  labels: {singular: 'Image', plural: 'Images'},
  imageURL: `/apercus/${MEDIA_SLUG}.png`,
  imageAltText: 'Image',
  admin: {group: 'Média'},
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: true,
      admin: {description: 'Le texte alternatif se règle dans la médiathèque. Vide : image décorative.'},
    },
    {
      type: 'row',
      fields: [
        {
          name: 'minHeight',
          type: 'select',
          label: 'Hauteur minimale desktop',
          defaultValue: '320',
          options: HEIGHT_OPTIONS,
          admin: {width: '33%', description: "Seulement si la rangée n'a pas d'autre contenu ; sinon l'image prend la hauteur de la rangée."},
        },
        {name: 'minHeightMobile', type: 'select', label: 'Hauteur minimale mobile', defaultValue: '240', options: HEIGHT_OPTIONS, admin: {width: '33%', description: 'Sous 768 px, colonnes empilées.'}},
        {name: 'overlay', type: 'number', label: 'Calque noir (0 à 1)', min: 0, max: 1, defaultValue: 0, admin: {step: 0.05, width: '33%'}},
      ],
    },
  ],
};
