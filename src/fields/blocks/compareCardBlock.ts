import type {Block} from 'payload';

import {maxSpan, minSpan} from '@/components/content-specs';
import type {ContentBlock} from '@/fields/sections/contentBlock';
import {compareCardBlockText as t} from '../../i18n/admin/blocks';

/** « Compare card » block of a column: the CompareCard component (before / after on 6, trades on 4). */
export const COMPARE_CARD_SLUG = 'compareCard';

const block: Block = {
  slug: COMPARE_CARD_SLUG,
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${COMPARE_CARD_SLUG}.png`,
  fields: [
    {
      type: 'row',
      fields: [
        {name: 'chipLabel', type: 'text', label: t.chipLabel, localized: true, required: true, admin: {width: '40%'}},
        {
          name: 'chipTone',
          type: 'select',
          label: t.chipTone,
          defaultValue: 'accent',
          options: [
            {label: t.tones.accent, value: 'accent'},
            {label: t.tones.high, value: 'high'},
            {label: t.tones.danger, value: 'danger'},
            {label: t.tones.cat, value: 'cat'},
            {label: t.tones.line, value: 'line'},
          ],
          admin: {width: '20%'},
        },
        {name: 'meta', type: 'text', label: t.meta, localized: true, admin: {width: '40%'}},
      ],
    },
    {name: 'quote', type: 'textarea', label: t.quote, localized: true, required: true, admin: {rows: 2}},
    {
      name: 'items',
      type: 'array',
      label: t.items,
      labels: {singular: t.item, plural: t.items},
      minRows: 1,
      fields: [{name: 'label', type: 'text', label: t.itemLabel, localized: true, required: true}],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'tone',
          type: 'select',
          label: t.tone,
          defaultValue: 'check',
          options: [
            {label: t.toneCheck, value: 'check'},
            {label: t.toneCross, value: 'cross'},
          ],
          admin: {width: '50%'},
        },
        {name: 'featured', type: 'checkbox', label: t.featured, defaultValue: false, admin: {width: '50%'}},
      ],
    },
  ],
};

/** 3 to 6 columns; the cards of a row take the same height. */
export const compareCardBlock: ContentBlock = {block, minSpan: minSpan({type: 'compareCard'}), maxSpan: maxSpan({type: 'compareCard'}), fill: true};
