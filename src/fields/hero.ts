import type { Field, GroupField } from 'payload'

import { heroText as t } from '../i18n/admin/blocks'

import { groupHeading } from './groupHeading'
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
  label: t.label,
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: t.fields.variant,
      required: true,
      defaultValue: 'page-image',
      options: [
        { label: t.variants.mediaImage, value: 'media-image' },
        { label: t.variants.mediaVideo, value: 'media-video' },
        { label: t.variants.split, value: 'split' },
        { label: t.variants.pageImage, value: 'page-image' },
        { label: t.variants.pageGlow, value: 'page-glow' },
        { label: t.variants.pageNight, value: 'page-night' },
      ],
    },
    groupHeading({ name: 'groupText', label: t.groups.text, icon: 'text-highlight-3' }),
    { name: 'eyebrow', type: 'text', label: t.fields.eyebrow, localized: true },
    titleField({ name: 'title', required: true }),
    { name: 'lead', type: 'textarea', label: t.fields.lead, localized: true, admin: { rows: 3 } },
    groupHeading({ name: 'groupButtons', label: t.groups.buttons, icon: 'link' }),
    {
      type: 'row',
      fields: [
        linkGroup('primary', t.fields.primary, { icon: true }),
        linkGroup('secondary', t.fields.secondary, { icon: true }),
      ],
    },
    // full-screen media and image page top: background image + overlay
    groupHeading({ name: 'groupBackground', label: t.groups.background, icon: 'photo', condition: is('media-image', 'page-image', 'media-video') }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: t.fields.image,
      admin: { condition: is('media-image', 'page-image') },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      label: t.fields.video,
      admin: { condition: is('media-video') },
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      label: t.fields.poster,
      admin: { condition: is('media-video') },
    },
    {
      name: 'overlay',
      type: 'number',
      label: t.fields.overlay,
      min: 0,
      max: 1,
      defaultValue: 0.3,
      admin: { step: 0.05, condition: is('media-image', 'media-video', 'page-image') },
    },
    {
      name: 'scrollHint',
      type: 'text',
      label: t.fields.scrollHint,
      localized: true,
      admin: { condition: is('media-image', 'media-video') },
    },
    // text and image: reassurance, right-hand image and its labels
    {
      name: 'reassurance',
      type: 'array',
      label: t.fields.reassurance,
      maxRows: 4,
      admin: { condition: is('split') },
      fields: [{ name: 'text', type: 'text', label: t.fields.text, localized: true, required: true }],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: t.fields.media,
      admin: { condition: is('split') },
    },
    {
      name: 'badges',
      type: 'array',
      label: t.fields.badges,
      maxRows: 2,
      admin: { condition: is('split') },
      fields: [
        { name: 'label', type: 'text', label: t.fields.text, localized: true, required: true },
        {
          name: 'tone',
          type: 'select',
          label: t.fields.tone,
          defaultValue: 'accent',
          options: [
            { label: t.tones.accent, value: 'accent' },
            { label: t.tones.night, value: 'night' },
          ],
        },
      ],
    },
    // old setting (checkbox), kept hidden so the column is left untouched; replaced by breadcrumbMode
    {name: 'breadcrumb', type: 'checkbox', admin: {hidden: true}},
    // breadcrumb below the page top: site setting, or override for this page
    groupHeading({ name: 'groupBreadcrumb', label: t.groups.breadcrumb, icon: 'itinerary' }),
    {
      name: 'breadcrumbMode',
      type: 'select',
      label: t.fields.breadcrumbMode,
      defaultValue: 'inherit',
      options: [
        { label: t.breadcrumbModes.inherit, value: 'inherit' },
        { label: t.breadcrumbModes.show, value: 'show' },
        { label: t.breadcrumbModes.hide, value: 'hide' },
      ],
    },
  ] satisfies Field[],
}
