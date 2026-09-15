import type {Block} from 'payload';

import {mediaQuoteBlockText as t} from '../../i18n/admin/blocks';
import {HEIGHT_OPTIONS} from './mediaBlock';

/**
 * « Image avec citation » block of a column: the MediaQuote component (image that fills the
 * column, centred sentence). At least 6 columns out of 12: the picker does not offer it in
 * a narrower column (span registry, content-specs.ts).
 * Heights: same rules as the Image block; the block grows if the sentence is taller.
 */
export const MEDIA_QUOTE_SLUG = 'mediaQuote';

const TAG_OPTIONS = (['h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const).map((t) => ({label: t, value: t}));

/** Theme sizes, all even (display-1 to 3, headings 1 and 2). */
const SIZE_OPTIONS = [
  {label: t.sizes.display1, value: 'display-1'},
  {label: t.sizes.display2, value: 'display-2'},
  {label: t.sizes.display3, value: 'display-3'},
  {label: t.sizes.heading1, value: 'heading-1'},
  {label: t.sizes.heading2, value: 'heading-2'},
];

export const mediaQuoteBlock: Block = {
  slug: MEDIA_QUOTE_SLUG,
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${MEDIA_QUOTE_SLUG}.png`,
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
    {name: 'text', type: 'text', label: t.text, required: true, localized: true},
    {
      type: 'row',
      fields: [
        {name: 'tag', type: 'select', label: t.tag, defaultValue: 'h2', options: TAG_OPTIONS, admin: {width: '50%', description: t.tagDescription}},
        {name: 'size', type: 'select', label: t.size, defaultValue: 'display-3', options: SIZE_OPTIONS, admin: {width: '50%'}},
      ],
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
        {name: 'overlay', type: 'number', label: t.overlay, min: 0, max: 1, defaultValue: 0.4, admin: {step: 0.05, width: '33%', description: t.overlayDescription}},
      ],
    },
  ],
};
