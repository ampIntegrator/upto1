import type {Block} from 'payload';

import {HEIGHT_OPTIONS} from './mediaBlock';

/**
 * Bloc « Image avec citation » d'une colonne : le composant MediaQuote (image qui remplit la
 * colonne, phrase centrée). Au moins 6 colonnes sur 12 : le sélecteur ne le propose pas dans
 * une colonne plus étroite (registre des emprises, content-specs.ts).
 * Hauteurs : mêmes règles que le bloc Image ; le bloc grandit si la phrase est plus haute.
 */
export const MEDIA_QUOTE_SLUG = 'mediaQuote';

const TAG_OPTIONS = (['h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const).map((t) => ({label: t, value: t}));

/** Tailles du thème, toutes paires (display-1 à 3, titres 1 et 2). */
const SIZE_OPTIONS = [
  {label: 'Très grande (display-1)', value: 'display-1'},
  {label: 'Grande (display-2)', value: 'display-2'},
  {label: 'Moyenne (display-3)', value: 'display-3'},
  {label: 'Normale (titre 1, 26 px)', value: 'heading-1'},
  {label: 'Petite (titre 2, 22 px)', value: 'heading-2'},
];

export const mediaQuoteBlock: Block = {
  slug: MEDIA_QUOTE_SLUG,
  labels: {singular: 'Image avec citation', plural: 'Images avec citation'},
  imageURL: `/apercus/${MEDIA_QUOTE_SLUG}.png`,
  imageAltText: 'Image avec citation',
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
    {name: 'text', type: 'text', label: 'Phrase', required: true, localized: true},
    {
      type: 'row',
      fields: [
        {name: 'tag', type: 'select', label: 'Balise', defaultValue: 'h2', options: TAG_OPTIONS, admin: {width: '50%', description: 'Pour la structure et le référencement ; ne change pas la taille.'}},
        {name: 'size', type: 'select', label: 'Taille', defaultValue: 'display-3', options: SIZE_OPTIONS, admin: {width: '50%'}},
      ],
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
        {name: 'overlay', type: 'number', label: 'Calque noir (0 à 1)', min: 0, max: 1, defaultValue: 0.4, admin: {step: 0.05, width: '33%', description: 'À ajuster selon l’image, pour que la phrase reste lisible.'}},
      ],
    },
  ],
};
