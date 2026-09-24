import type {Block, PayloadRequest} from 'payload';

import {linkTarget} from '../linkTarget';
import {collectionCapacity, minSpan} from '@/components/content-specs';
import {columnSpanAt, type ContentBlock} from '@/fields/sections/contentBlock';
import {tr} from '@/i18n/admin/languages';
import {collectionBlockText as t} from '../../i18n/admin/blocks';
import {CARD_BLOCKS} from './cardBlocks';
import {compareCardBlock} from './compareCardBlock';
import {planBlock} from './planBlock';
import {caseCardBlock} from './caseCardBlock';
import {postCardBlock} from './postCardBlock';
import {testimonialBlock} from './testimonialBlock';

/**
 * « Collection » block of a column: identical items side by side (the Collection
 * component), in a column of 8 to 12. Side by side (« swipe ») holds no more items than
 * visible ones (4 at 25 % at most); the carousel takes as many items as wanted. The items are the existing column blocks
 * (testimonial, cards, compare card, tier, post or case card), all of the same type, or
 * the latest blog posts or case studies rendered as article or realisation cards (24 at most). Items per view are checked against the column
 * width (content-specs, collectionCapacity): 3 at most on 8 or 9 columns, 4 on 12. An optional « see all » button leads
 * to the blog, the case studies or any link.
 */
export const COLLECTION_SLUG = 'collection';

type Sibling = Record<string, unknown>;
/** a custom « see all » target is given: a typed address, or a chosen content (linkTarget.ts) */
const hasTarget = (x: unknown): boolean => {
  const t = (x ?? {}) as {kind?: unknown; href?: unknown; doc?: unknown};
  return t.kind === 'internal' ? Boolean(t.doc) : typeof t.href === 'string' && t.href.trim() !== '';
};
const whenSource = (value: string) => (_d: unknown, s: Sibling) => (s?.source ?? 'manual') === value;

/** the most latest entries a collection shows: beyond, the « see all » button leads to the listing */
const MAX_ENTRIES = 24;

/** the number of latest entries: 2 to 24; side by side, no more than visible ones. A custom validate replaces
 *  Payload's own, so min and max are checked here too */
const limitValidate = (source: string) => (value: unknown, {siblingData, req}: {siblingData: Sibling; req: PayloadRequest}) => {
  const count = Number(value ?? 6);
  if ((siblingData?.source ?? 'manual') === source && (count < 2 || count > MAX_ENTRIES)) return tr(t.entriesRange, req.i18n?.language, {max: MAX_ENTRIES});
  const perView = Number(siblingData?.perView ?? 3);
  if ((siblingData?.source ?? 'manual') === source && (siblingData?.layout ?? 'swipe') === 'swipe' && count > perView) return tr(t.swipeOverflow, req.i18n?.language, {count, perView});
  return true;
};

const whenMore = (_d: unknown, s: Sibling) => Boolean(s?.moreLink) && s?.moreLink !== 'none';

/** The blocks an item can be: those that make sense repeated side by side. */
const ITEM_BLOCKS: ContentBlock[] = [testimonialBlock, ...CARD_BLOCKS, compareCardBlock, planBlock, postCardBlock, caseCardBlock];

const block: Block = {
  slug: COLLECTION_SLUG,
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${COLLECTION_SLUG}.png`,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'layout',
          type: 'select',
          label: t.layout,
          defaultValue: 'swipe',
          options: [
            {label: t.layoutSwipe, value: 'swipe'},
            {label: t.layoutCarousel, value: 'carousel'},
          ],
          admin: {width: '50%'},
        },
        {
          name: 'perView',
          type: 'select',
          label: t.perView,
          defaultValue: '3',
          options: ['2', '3', '4'].map((v) => ({label: v, value: v})),
          admin: {width: '50%', description: t.perViewDescription},
          validate: (value: unknown, {data, path, req}: {data: unknown; path: (number | string)[]; req: PayloadRequest}) => {
            const perView = Number(value ?? 3);
            const span = columnSpanAt(data, path);
            const capacity = collectionCapacity(span);
            return perView <= capacity || tr(t.tooMany, req.i18n?.language, {perView, capacity, span});
          },
        },
      ],
    },
    {
      type: 'row',
      admin: {condition: (_d, s: Sibling) => s?.layout === 'carousel'},
      fields: [
        {
          name: 'step',
          type: 'select',
          label: t.step,
          defaultValue: 'page',
          options: [
            {label: t.stepPage, value: 'page'},
            {label: t.stepItem, value: 'item'},
          ],
          admin: {width: '34%'},
        },
        {
          name: 'indicator',
          type: 'select',
          label: t.indicator,
          defaultValue: 'segments',
          options: [
            {label: t.indicatorSegments, value: 'segments'},
            {label: t.indicatorDots, value: 'dots'},
            {label: t.indicatorNumbers, value: 'numbers'},
            {label: t.indicatorNone, value: 'none'},
          ],
          admin: {width: '33%'},
        },
        {name: 'arrows', type: 'checkbox', label: t.arrows, defaultValue: true, admin: {width: '33%'}},
      ],
    },
    {
      name: 'source',
      type: 'radio',
      label: t.source,
      defaultValue: 'manual',
      options: [
        {label: t.sourceManual, value: 'manual'},
        {label: t.sourcePosts, value: 'posts'},
        {label: t.sourceCases, value: 'cases'},
      ],
    },
    {
      name: 'items',
      type: 'blocks',
      label: t.items,
      labels: {singular: t.item, plural: t.items},
      blocks: ITEM_BLOCKS.map((b) => b.block),
      admin: {condition: whenSource('manual'), description: t.itemsDescription},
      validate: (value: unknown, {siblingData, req}: {siblingData: Sibling; req: PayloadRequest}) => {
        if ((siblingData?.source ?? 'manual') !== 'manual') return true;
        const items = Array.isArray(value) ? (value as {blockType?: string}[]) : [];
        if (items.length < 2) return tr(t.tooFew, req.i18n?.language);
        if (new Set(items.map((i) => i.blockType)).size > 1) return tr(t.mixed, req.i18n?.language);
        const perView = Number(siblingData?.perView ?? 3);
        if ((siblingData?.layout ?? 'swipe') === 'swipe' && items.length > perView) return tr(t.swipeOverflow, req.i18n?.language, {count: items.length, perView});
        return true;
      },
    },
    {
      type: 'row',
      admin: {condition: whenSource('posts')},
      fields: [
        {
          name: 'postsLimit',
          type: 'number',
          label: t.postsLimit,
          defaultValue: 6,
          // side by side, no more than visible ones; a carousel, 24 at most (the « see all » button leads to the rest)
          min: 2,
          max: MAX_ENTRIES,
          admin: {width: '34%', description: t.postsLimitDescription},
          validate: limitValidate('posts'),
        },
        {name: 'postsCategory', type: 'relationship', relationTo: 'categories', label: t.postsCategory, admin: {width: '33%'}},
        {name: 'postsCta', type: 'text', label: t.postsCta, localized: true, admin: {width: '33%'}},
      ],
    },
    {
      type: 'row',
      admin: {condition: whenSource('cases')},
      fields: [
        {name: 'casesLimit', type: 'number', label: t.casesLimit, defaultValue: 6, min: 2, max: MAX_ENTRIES, admin: {width: '34%', description: t.postsLimitDescription}, validate: limitValidate('cases')},
        {name: 'casesCategory', type: 'relationship', relationTo: 'case-categories', label: t.postsCategory, admin: {width: '33%'}},
        {name: 'casesCta', type: 'text', label: t.postsCta, localized: true, admin: {width: '33%'}},
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'moreLink',
          type: 'select',
          label: t.more,
          defaultValue: 'none',
          options: [
            {label: t.moreNone, value: 'none'},
            {label: t.moreBlog, value: 'blog'},
            {label: t.moreCases, value: 'cases'},
            {label: t.moreCustom, value: 'custom'},
          ],
          admin: {width: '34%', description: t.moreDescription},
        },
        {
          name: 'moreLabel',
          type: 'text',
          label: t.moreLabel,
          localized: true,
          admin: {width: '33%', condition: whenMore, description: t.moreLabelDescription},
          validate: (value: unknown, {siblingData, req}: {siblingData: Sibling; req: PayloadRequest}) =>
            siblingData?.moreLink !== 'custom' || (Boolean(value) && hasTarget(siblingData?.moreTarget)) || tr(t.moreCustomRequired, req.i18n?.language),
        },
      ],
    },
    // custom « see all » button: an address or a content of the site, and the new tab box
    {name: 'moreTarget', type: 'group', label: t.moreHref, admin: {condition: (_d, s: Sibling) => s?.moreLink === 'custom'}, fields: linkTarget()},
  ],
};

/** From 8 columns; the items of a row take the same height. */
export const collectionBlock: ContentBlock = {block, minSpan: minSpan({type: 'collection', perView: 2}), fill: true};
