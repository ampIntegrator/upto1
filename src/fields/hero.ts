import type { Field, GroupField } from 'payload'

import { linkGroup, titleField } from './shared'

/**
 * Le haut de page d'une page : un choix parmi cinq (composant Hero), et les champs qui
 * apparaissent selon ce choix. Aucun champ visuel : fonds, hauteurs et couleurs sont ceux
 * du composant.
 *   media-image · media-video  → Hero variant="media" (maquette 16)
 *   split                      → Hero variant="split" (maquette 02)
 *   page-image · page-glow · page-night → Hero variant="page" (maquette 25 A/B/C)
 */
export type HeroVariant =
  'media-image' | 'media-video' | 'split' | 'page-image' | 'page-glow' | 'page-night'

const is =
  (...variants: HeroVariant[]) =>
  (_data: unknown, siblingData: { variant?: HeroVariant }) =>
    Boolean(siblingData?.variant && variants.includes(siblingData.variant))

export const heroField: GroupField = {
  name: 'hero',
  type: 'group',
  label: 'Haut de page',
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Modèle',
      required: true,
      defaultValue: 'page-image',
      options: [
        { label: 'Plein écran · image', value: 'media-image' },
        { label: 'Plein écran · vidéo', value: 'media-video' },
        { label: 'Plein écran · texte et image', value: 'split' },
        { label: 'Haut de page · image', value: 'page-image' },
        { label: 'Haut de page · clair', value: 'page-glow' },
        { label: 'Haut de page · nuit', value: 'page-night' },
      ],
    },
    { name: 'eyebrow', type: 'text', label: 'Surtitre (chip ou tirets)', localized: true },
    titleField({ name: 'title', required: true }),
    { name: 'lead', type: 'textarea', label: 'Chapô', localized: true, admin: { rows: 3 } },
    {
      type: 'row',
      fields: [
        linkGroup('primary', 'Bouton principal', { icon: true }),
        linkGroup('secondary', 'Bouton secondaire', { icon: true }),
      ],
    },
    // média plein écran et haut de page image : image de fond + calque
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de fond',
      admin: { condition: is('media-image', 'page-image') },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      label: 'Vidéo de fond (mp4)',
      admin: { condition: is('media-video') },
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      label: "Image d'attente de la vidéo",
      admin: { condition: is('media-video') },
    },
    {
      name: 'overlay',
      type: 'number',
      label: 'Calque noir sur le média (0 à 1)',
      min: 0,
      max: 1,
      defaultValue: 0.3,
      admin: { step: 0.05, condition: is('media-image', 'media-video', 'page-image') },
    },
    {
      name: 'scrollHint',
      type: 'text',
      label: 'Invitation à défiler (vide = aucune)',
      localized: true,
      admin: { condition: is('media-image', 'media-video') },
    },
    // texte et image : réassurance, image de droite et ses étiquettes
    {
      name: 'reassurance',
      type: 'array',
      label: 'Ligne de réassurance',
      maxRows: 4,
      admin: { condition: is('split') },
      fields: [{ name: 'text', type: 'text', label: 'Texte', localized: true, required: true }],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de droite',
      admin: { condition: is('split') },
    },
    {
      name: 'badges',
      type: 'array',
      label: "Étiquettes sur l'image",
      maxRows: 2,
      admin: { condition: is('split') },
      fields: [
        { name: 'label', type: 'text', label: 'Texte', localized: true, required: true },
        {
          name: 'tone',
          type: 'select',
          label: 'Ton',
          defaultValue: 'accent',
          options: [
            { label: 'Silo', value: 'accent' },
            { label: 'Nuit', value: 'night' },
          ],
        },
      ],
    },
    // ancien réglage (case à cocher), conservé caché pour ne pas toucher la colonne ; remplacé par breadcrumbMode
    {name: 'breadcrumb', type: 'checkbox', admin: {hidden: true}},
    // fil d'Ariane sous le haut de page : réglage du site, ou surcharge pour cette page
    {
      name: 'breadcrumbMode',
      type: 'select',
      label: "Fil d'Ariane",
      defaultValue: 'inherit',
      options: [
        { label: 'Selon le réglage du site', value: 'inherit' },
        { label: 'Afficher', value: 'show' },
        { label: 'Masquer', value: 'hide' },
      ],
    },
  ] satisfies Field[],
}
