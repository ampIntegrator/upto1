import type {Block, PayloadRequest} from 'payload';

import {tabsCapacity} from '@/components/content-specs';
import {columnSpanAt, type ContentBlock} from '@/fields/sections/contentBlock';
import {tr} from '@/i18n/admin/languages';
import {tabsBlockText as t} from '../../i18n/admin/blocks';
import {tabsEditor} from '../editors';
import {TABS_SLUG} from './tabsSlug';

export {TABS_SLUG};

/**
 * « Tabs » block of a column (the Tabs component), 6 to 12 columns: two tabs at least,
 * each with a label (50 characters) and rich text (the text box's restricted editor).
 * The number of tabs is checked against the column width (content-specs, tabsCapacity):
 * 4 on 6 or 7 columns, 6 on 8 or 9, 8 on 12.
 */
export const LABEL_MAX = 50;

const block: Block = {
  slug: TABS_SLUG,
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${TABS_SLUG}.png`,
  fields: [
    {
      name: 'items',
      type: 'array',
      label: t.items,
      labels: {singular: t.item, plural: t.items},
      minRows: 2,
      maxRows: 8,
      admin: {description: t.itemsDescription},
      validate: (value: unknown, {data, path, req}: {data: unknown; path: (number | string)[]; req: PayloadRequest}) => {
        const count = Array.isArray(value) ? value.length : 0;
        if (count < 2) return tr(t.tooFew, req.i18n?.language);
        const span = columnSpanAt(data, path);
        const capacity = tabsCapacity(span);
        return count <= capacity || tr(t.tooMany, req.i18n?.language, {count, capacity, span});
      },
      fields: [
        {name: 'label', type: 'text', label: t.label, localized: true, required: true, maxLength: LABEL_MAX, admin: {description: t.labelDescription}},
        {name: 'content', type: 'richText', label: t.content, localized: true, editor: tabsEditor, admin: {description: t.contentDescription}},
      ],
    },
  ],
};

/** 6 to 12 columns; fills the row height. */
export const tabsBlock: ContentBlock = {block, minSpan: 6, maxSpan: 12, fill: true};
