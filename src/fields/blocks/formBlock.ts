import type {Block} from 'payload';

import {maxSpan, minSpan} from '@/components/content-specs';
import type {ContentBlock} from '@/fields/sections/contentBlock';
import {formsText as t} from '@/i18n/admin/forms';

/**
 * « Formulaire » block of a column: a form of the Formulaires collection rendered by SiteForm,
 * 4 to 12 columns; one column of fields up to 7/12, two from 8/12 (the column's width decides).
 * Optional card and heading (eyebrow, title, intro of the form).
 */
export const FORM_SLUG = 'form';

const block: Block = {
  slug: FORM_SLUG,
  labels: t.block,
  imageURL: `/apercus/${FORM_SLUG}.png`,
  fields: [
    {name: 'form', type: 'relationship', relationTo: 'forms', label: t.form, required: true, admin: {description: t.formDescription}},
    {
      type: 'row',
      fields: [
        {name: 'framed', type: 'checkbox', label: t.framed, defaultValue: true, admin: {width: '50%'}},
        {name: 'showHeading', type: 'checkbox', label: t.showHeading, defaultValue: true, admin: {width: '50%'}},
      ],
    },
  ],
};

/** Fills the row height: framed, its box lines up with the boxes beside it. */
export const formBlock: ContentBlock = {block, minSpan: minSpan({type: 'form'}), maxSpan: maxSpan({type: 'form'}), fill: true};
