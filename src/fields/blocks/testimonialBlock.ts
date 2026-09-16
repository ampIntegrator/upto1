import type {Block} from 'payload';

import {maxSpan, minSpan} from '@/components/content-specs';
import type {ContentBlock} from '@/fields/sections/contentBlock';
import {testimonialBlockText as t} from '../../i18n/admin/blocks';

/** « Testimonial » block of a column: the TestimonialCard component, one per column, three or four side by side. */
export const TESTIMONIAL_SLUG = 'testimonial';

const block: Block = {
  slug: TESTIMONIAL_SLUG,
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${TESTIMONIAL_SLUG}.png`,
  admin: {group: t.group},
  fields: [
    {name: 'quote', type: 'textarea', label: t.quote, localized: true, required: true, admin: {rows: 3}},
    {
      type: 'row',
      fields: [
        {name: 'name', type: 'text', label: t.personName, required: true, admin: {width: '34%'}},
        {name: 'role', type: 'text', label: t.role, localized: true, admin: {width: '33%'}},
        {name: 'result', type: 'text', label: t.result, localized: true, admin: {width: '33%'}},
      ],
    },
  ],
};

/** 3 or 4 columns; the testimonials of a row take the same height. */
export const testimonialBlock: ContentBlock = {block, minSpan: minSpan({type: 'testimonialCard'}), maxSpan: maxSpan({type: 'testimonialCard'}), fill: true};
