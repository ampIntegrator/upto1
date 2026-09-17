import type {Block} from 'payload';

import type {ContentBlock} from '@/fields/sections/contentBlock';
import {caseCardBlockText as t} from '../../i18n/admin/blocks';

/**
 * « Case card » block of a column: a chosen case study rendered as a realisation card (Card preset
 * « realisation », mockup 24): cover, category, short result, title, client · location, link.
 * 3 or 4 columns; also an item type of the Collection block (carousel and side by side).
 */
export const CASE_CARD_SLUG = 'caseCard';

const block: Block = {
  slug: CASE_CARD_SLUG,
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${CASE_CARD_SLUG}.png`,
  fields: [{name: 'caseStudy', type: 'relationship', relationTo: 'case-studies', label: t.caseStudy, required: true}],
};

/** 3 or 4 columns; the cards of a row take the same height. */
export const caseCardBlock: ContentBlock = {block, minSpan: 3, maxSpan: 4, fill: true};
