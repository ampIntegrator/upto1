import type { Field, GroupField } from 'payload'

import { linkGroup, titleField } from './shared'

/**
 * A page's page top: one choice out of five (Hero component), and the fields that
 * appear depending on that choice. No visual field: backgrounds, heights and colours are those
 * of the component.
 *   media-image · media-video  → Hero variant="media" (mockup 16)
 *   split                      → Hero variant="split" (mockup 02)
 *   page-image · page-glow · page-night → Hero variant="page" (mockup 25 A/B/C)
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
    // full-screen media and image page top: background image + overlay
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
    // text and image: reassurance, right-hand image and its labels
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
    // old setting (checkbox), kept hidden so the column is left untouched; replaced by breadcrumbMode
    {name: 'breadcrumb', type: 'checkbox', admin: {hidden: true}},
    // breadcrumb below the page top: site setting, or override for this page
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
