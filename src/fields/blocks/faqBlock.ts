import type {Block} from 'payload';

import {maxSpan, minSpan} from '@/components/content-specs';
import type {ContentBlock} from '@/fields/sections/contentBlock';
import {faqBlockText as t} from '../../i18n/admin/blocks';

/** « FAQ » block of a column: the CollapsibleGroup component (accordion of questions). */
export const FAQ_SLUG = 'faq';

const block: Block = {
  slug: FAQ_SLUG,
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${FAQ_SLUG}.png`,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'mode',
          type: 'select',
          label: t.mode,
          defaultValue: 'single',
          options: [
            {label: t.modeSingle, value: 'single'},
            {label: t.modeMultiple, value: 'multiple'},
          ],
          admin: {width: '40%'},
        },
        {
          name: 'columns',
          type: 'select',
          label: t.columns,
          defaultValue: '1',
          options: [
            {label: t.columnsOne, value: '1'},
            {label: t.columnsTwo, value: '2'},
          ],
          admin: {width: '30%'},
        },
        {name: 'firstOpen', type: 'checkbox', label: t.firstOpen, defaultValue: true, admin: {width: '30%'}},
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: t.items,
      labels: {singular: t.item, plural: t.items},
      minRows: 1,
      fields: [
        {name: 'question', type: 'text', label: t.question, localized: true, required: true},
        {name: 'answer', type: 'textarea', label: t.answer, localized: true, required: true, admin: {rows: 3, description: t.answerDescription}},
      ],
    },
  ],
};

/** Readable between 6 and 9 columns, never full width. */
export const faqBlock: ContentBlock = {block, minSpan: minSpan({type: 'collapsibleGroup'}), maxSpan: maxSpan({type: 'collapsibleGroup'})};
