import type {Block} from 'payload';

import type {ContentBlock} from '@/fields/sections/contentBlock';
import {postCardBlockText as t} from '../../i18n/admin/blocks';

/**
 * « Post card » block of a column: a chosen blog post rendered as an article card (Card preset
 * « article », mockup 19): cover, category, date, title, link to the post. 3 or 4 columns; also an
 * item type of the Collection block (carousel and side by side).
 */
export const POST_CARD_SLUG = 'postCard';

const block: Block = {
  slug: POST_CARD_SLUG,
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${POST_CARD_SLUG}.png`,
  fields: [{name: 'post', type: 'relationship', relationTo: 'posts', label: t.post, required: true}],
};

/** 3 or 4 columns; the cards of a row take the same height. */
export const postCardBlock: ContentBlock = {block, minSpan: 3, maxSpan: 4, fill: true};
