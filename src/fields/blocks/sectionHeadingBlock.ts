import type {Block} from 'payload';

import type {ContentBlock} from '@/fields/sections/contentBlock';
import {sectionHeadingBlockText as t} from '../../i18n/admin/blocks';

/**
 * « Section heading » block of a column (the SectionHeading component, mockup 19): eyebrow
 * between gold dashes, title with a serif accent (<span>…</span>) at the fixed display-3 size,
 * optional lead; tag h2 to h4, centred or left; 6 to 12 columns.
 */
export const SECTION_HEADING_SLUG = 'sectionHeading';

const block: Block = {
  slug: SECTION_HEADING_SLUG,
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${SECTION_HEADING_SLUG}.png`,
  fields: [
    {name: 'eyebrow', type: 'text', label: t.eyebrow, localized: true},
    {
      type: 'row',
      fields: [
        {name: 'title', type: 'textarea', label: t.title, localized: true, required: true, admin: {rows: 2, width: '70%', description: t.titleDescription}},
        {
          name: 'tag',
          type: 'select',
          label: t.tag,
          defaultValue: 'h2',
          options: (['h2', 'h3', 'h4'] as const).map((v) => ({label: v, value: v})),
          admin: {width: '30%', description: t.tagDescription},
        },
      ],
    },
    {name: 'lead', type: 'textarea', label: t.lead, localized: true, admin: {rows: 2}},
    {
      name: 'align',
      type: 'radio',
      label: t.align,
      defaultValue: 'center',
      options: [
        {label: t.alignCenter, value: 'center'},
        {label: t.alignStart, value: 'start'},
      ],
      admin: {layout: 'horizontal'},
    },
  ],
};

export const sectionHeadingBlock: ContentBlock = {block, minSpan: 6, maxSpan: 12};
