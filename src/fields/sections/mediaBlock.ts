import type {Block} from 'payload';

/**
 * Bloc « Image » d'une colonne : le composant Media (image qui remplit la colonne).
 * La vidéo viendra ensuite dans le même bloc.
 *
 * Règle de hauteur (appliquée par la conversion, lib/sections.ts) :
 *   - desktop, rangée avec d'autres contenus : l'image prend la hauteur de la rangée,
 *     sa hauteur minimale desktop est ignorée ;
 *   - desktop, rangée sans autre contenu : la hauteur minimale s'applique (la plus grande
 *     l'emporte entre deux images) ;
 *   - mobile (colonnes empilées) : toujours la hauteur minimale mobile.
 */
export const MEDIA_SLUG = 'media';

/** Hauteurs minimales proposées, en px (valeurs paires). */
export const MEDIA_HEIGHTS = ['160', '240', '320', '400', '480', '560', '640'] as const;
const HEIGHT_OPTIONS = MEDIA_HEIGHTS.map((v) => ({label: `${v} px`, value: v}));

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
