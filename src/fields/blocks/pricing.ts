import type {Field} from 'payload';

import {linkGroup} from '../shared';
import {priceSingleBlockText as t} from '../../i18n/admin/blocks';

/** Fields shared by the single price and the tier: the price, the feature list, the guarantee. */

export const priceGroup: Field = {
  name: 'price',
  type: 'group',
  label: t.price,
  fields: [
    {
      type: 'row',
      fields: [
        {name: 'value', type: 'text', label: t.priceValue, required: true, admin: {width: '40%'}},
        {name: 'currency', type: 'text', label: t.priceCurrency, defaultValue: '€', admin: {width: '20%'}},
        {name: 'period', type: 'text', label: t.pricePeriod, localized: true, admin: {width: '40%'}},
      ],
    },
  ],
};

export const featuresField: Field = {
  name: 'features',
  type: 'array',
  label: t.features,
  labels: {singular: t.feature, plural: t.features},
  minRows: 1,
  fields: [
    {
      type: 'row',
      fields: [
        {name: 'label', type: 'text', label: t.featureLabel, localized: true, required: true, admin: {width: '70%'}},
        {name: 'end', type: 'text', label: t.featureEnd, localized: true, admin: {width: '30%'}},
      ],
    },
  ],
};

export const ctaField: Field = linkGroup('cta', t.cta, {required: true});

export const mentionField: Field = {name: 'mention', type: 'text', label: t.mention, localized: true};

export const guaranteeGroup: Field = {
  name: 'guarantee',
  type: 'group',
  label: t.guarantee,
  fields: [
    {name: 'title', type: 'text', label: t.guaranteeTitle, localized: true},
    {name: 'text', type: 'textarea', label: t.guaranteeText, localized: true, admin: {rows: 2}},
  ],
};
