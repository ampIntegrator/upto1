import type {Block} from 'payload';

/**
 * Empty cell: a block with no field that reserves a column's slot without displaying anything.
 * It is not a component: on the site, the column behaves like a column with no
 * content (space kept on desktop, hidden below 768 px, greyed out in the mobile order).
 * First in the picker, in the « Structure » group.
 */
export const EMPTY_SLUG = 'empty';

export const emptyBlock: Block = {
  slug: EMPTY_SLUG,
  labels: {singular: 'Case vide', plural: 'Cases vides'},
  imageURL: `/apercus/${EMPTY_SLUG}.png`,
  imageAltText: 'Case vide',
  admin: {group: 'Structure'},
  fields: [],
};
