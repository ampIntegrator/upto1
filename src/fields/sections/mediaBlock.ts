import type {Block} from 'payload';

import {mediaBlockText as t} from '../../i18n/admin/blocks';

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
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${MEDIA_SLUG}.png`,
  imageAltText: t.name.fr, // Payload only accepts a plain string here
  admin: {group: t.group},
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: t.image,
      required: true,
      admin: {description: t.imageDescription},
    },
    {
      type: 'row',
      fields: [
        {
          name: 'minHeight',
          type: 'select',
          label: t.minHeight,
          defaultValue: '320',
          options: HEIGHT_OPTIONS,
          admin: {width: '33%', description: t.minHeightDescription},
        },
        {name: 'minHeightMobile', type: 'select', label: t.minHeightMobile, defaultValue: '240', options: HEIGHT_OPTIONS, admin: {width: '33%', description: t.minHeightMobileDescription}},
        {name: 'overlay', type: 'number', label: t.overlay, min: 0, max: 1, defaultValue: 0, admin: {step: 0.05, width: '33%'}},
      ],
    },
  ],
};
