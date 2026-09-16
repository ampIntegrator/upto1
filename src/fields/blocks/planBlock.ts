import type {Block} from 'payload';

import {maxSpan, minSpan} from '@/components/content-specs';
import type {ContentBlock} from '@/fields/sections/contentBlock';
import {planBlockText as t} from '../../i18n/admin/blocks';
import {tagField} from '../tagField';
import {ctaField, featuresField, guaranteeGroup, mentionField, priceGroup} from './pricing';

/** « Price tier » block of a column: the PlanCard component, one tier per column, three or four side by side. */
export const PLAN_SLUG = 'plan';

const block: Block = {
  slug: PLAN_SLUG,
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${PLAN_SLUG}.png`,
  fields: [
    {
      type: 'row',
      fields: [
        {name: 'name', type: 'text', label: t.planName, localized: true, required: true, admin: {width: '35%'}},
        tagField({name: 'nameTag', defaultValue: 'p', width: '20%'}),
        {name: 'tagline', type: 'text', label: t.tagline, localized: true, admin: {width: '45%'}},
      ],
    },
    priceGroup,
    {
      type: 'row',
      fields: [
        {name: 'featured', type: 'checkbox', label: t.featured, defaultValue: false, admin: {width: '50%'}},
        {name: 'badge', type: 'text', label: t.badge, localized: true, admin: {width: '50%', condition: (_d, s: Record<string, unknown>) => Boolean(s?.featured)}},
      ],
    },
    {
      type: 'row',
      fields: [
        {name: 'inherits', type: 'text', label: t.inherits, localized: true, admin: {width: '50%', description: t.inheritsDescription}},
        {name: 'featuresLabel', type: 'text', label: t.featuresLabel, localized: true, admin: {width: '50%'}},
      ],
    },
    featuresField,
    ctaField,
    mentionField,
    guaranteeGroup,
  ],
};

/** 3 or 4 columns; the tiers of a row take the same height. */
export const planBlock: ContentBlock = {block, minSpan: minSpan({type: 'plan'}), maxSpan: maxSpan({type: 'plan'}), fill: true};
