import type {Block, PayloadRequest} from 'payload';

import {buttonsCapacity} from '@/components/content-specs';
import {columnSpanAt, type ContentBlock} from '@/fields/sections/contentBlock';
import {tr} from '@/i18n/admin/languages';
import {buttonGroupBlockText as t} from '../../i18n/admin/blocks';
import {buttonRowFields} from './buttonFields';

/**
 * « Button group » block of a column (the ButtonGroup component), 6 to 12 columns: one to
 * four site buttons, attached (one control) or spaced (one inner column per button, the
 * section's column gap), natural width aligned left / centre / right, or full width.
 * The number of buttons is checked against the column width (content-specs,
 * buttonsCapacity): 2 on 6 or 7 columns, 3 on 8 or 9, 4 on 12.
 */
export const BUTTON_GROUP_SLUG = 'buttonGroup';

type Sibling = Record<string, unknown>;

const block: Block = {
  slug: BUTTON_GROUP_SLUG,
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${BUTTON_GROUP_SLUG}.png`,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'mode',
          type: 'select',
          label: t.mode,
          defaultValue: 'spaced',
          options: [
            {label: t.modeSpaced, value: 'spaced'},
            {label: t.modeAttached, value: 'attached'},
          ],
          admin: {width: '40%'},
        },
        {
          name: 'width',
          type: 'select',
          label: t.width,
          defaultValue: 'natural',
          options: [
            {label: t.widthNatural, value: 'natural'},
            {label: t.widthFull, value: 'full'},
          ],
          admin: {width: '30%'},
        },
        {
          name: 'align',
          type: 'select',
          label: t.align,
          defaultValue: 'start',
          options: [
            {label: t.alignStart, value: 'start'},
            {label: t.alignCenter, value: 'center'},
            {label: t.alignEnd, value: 'end'},
          ],
          admin: {width: '30%', description: t.alignDescription, condition: (_d: unknown, s: Sibling) => (s?.width ?? 'natural') === 'natural'},
        },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      label: t.buttons,
      labels: {singular: t.button, plural: t.buttons},
      minRows: 1,
      maxRows: 4,
      admin: {description: t.buttonsDescription},
      validate: (value: unknown, {data, path, req}: {data: unknown; path: (number | string)[]; req: PayloadRequest}) => {
        const count = Array.isArray(value) ? value.length : 0;
        const span = columnSpanAt(data, path);
        const capacity = buttonsCapacity(span);
        return count <= capacity || tr(t.tooMany, req.i18n?.language, {count, capacity, span});
      },
      fields: buttonRowFields(),
    },
  ],
};

/** 6 to 12 columns. */
export const buttonGroupBlock: ContentBlock = {block, minSpan: 6, maxSpan: 12};
