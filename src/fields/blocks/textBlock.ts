import type {Block} from 'payload';

import {minSpan} from '@/components/content-specs';
import type {ContentBlock} from '@/fields/sections/contentBlock';
import {sectionsText as T} from '../../i18n/admin/sections';

/** « Text » block of a column: plain paragraphs (temporary, until the rich text content). */
export const TEXT_SLUG = 'text';

const block: Block = {
  slug: TEXT_SLUG,
  labels: {singular: T.blocks.text.name, plural: T.blocks.text.plural},
  admin: {group: T.blocks.text.group},
  fields: [{name: 'text', type: 'textarea', label: T.blocks.text.field, localized: true, required: true, admin: {rows: 4, description: T.blocks.text.description}}],
};

export const textBlock: ContentBlock = {block, minSpan: minSpan({type: 'text'})};
