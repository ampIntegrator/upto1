import type {Block} from 'payload';

import {maxSpan, minSpan} from '@/components/content-specs';
import type {ContentBlock} from '@/fields/sections/contentBlock';
import {priceSingleBlockText as t} from '../../i18n/admin/blocks';
import {ctaField, featuresField, guaranteeGroup, mentionField, priceGroup} from './pricing';

/** « Single price » block of a column: the PriceCard component (offer details on the left, price on the right). */
export const PRICE_SINGLE_SLUG = 'priceSingle';

const block: Block = {
  slug: PRICE_SINGLE_SLUG,
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${PRICE_SINGLE_SLUG}.png`,
  fields: [
    {name: 'featuresLabel', type: 'text', label: t.featuresLabel, localized: true},
    featuresField,
    {
      type: 'row',
      fields: [
        {name: 'totalLabel', type: 'text', label: t.totalLabel, localized: true, admin: {width: '50%'}},
        {name: 'totalValue', type: 'text', label: t.totalValue, localized: true, admin: {width: '50%'}},
      ],
    },
    {name: 'priceLabel', type: 'text', label: t.priceLabel, localized: true},
    priceGroup,
    ctaField(),
    mentionField,
    guaranteeGroup,
  ],
};

/** Between half and three quarters of the width: two columns inside, stacked when its column is narrow. */
export const priceSingleBlock: ContentBlock = {block, minSpan: minSpan({type: 'priceList', variant: 'single'}), maxSpan: maxSpan({type: 'priceList', variant: 'single'})};
