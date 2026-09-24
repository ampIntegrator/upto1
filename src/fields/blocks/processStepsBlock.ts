import type {Block, PayloadRequest} from 'payload';

import {minSpan, stepsCapacity} from '@/components/content-specs';
import {columnSpanAt, type ContentBlock} from '@/fields/sections/contentBlock';
import {tr} from '@/i18n/admin/languages';
import {processStepsBlockText as t} from '../../i18n/admin/blocks';
import {tagField} from '../tagField';

/**
 * « Steps » block of a column: the ProcessSteps panel, 1 to 4 steps side by side.
 * How many steps a column holds depends on its width (content-specs, stepsCapacity):
 * 1 on 4 or 5 columns, 2 on 6 or 7, 3 on 8 or 9, 4 on 12. Checked on the steps field
 * against the column's width, with an explicit message.
 */
export const PROCESS_STEPS_SLUG = 'processSteps';

const block: Block = {
  slug: PROCESS_STEPS_SLUG,
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${PROCESS_STEPS_SLUG}.png`,
  fields: [
    tagField({defaultValue: 'h3'}),
    {
      name: 'steps',
      type: 'array',
      label: t.steps,
      labels: {singular: t.step, plural: t.steps},
      minRows: 1,
      maxRows: 4,
      admin: {description: t.stepsDescription},
      validate: (value: unknown, {data, path, req}: {data: unknown; path: (number | string)[]; req: PayloadRequest}) => {
        const count = Array.isArray(value) ? value.length : 0;
        const span = columnSpanAt(data, path);
        const capacity = stepsCapacity(span);
        return count <= capacity || tr(t.tooMany, req.i18n?.language, {count, capacity, span});
      },
      fields: [
        {
          type: 'row',
          fields: [
            {name: 'title', type: 'text', label: t.title, localized: true, required: true, admin: {width: '60%'}},
            {name: 'duration', type: 'text', label: t.duration, localized: true, admin: {width: '40%'}},
          ],
        },
        {name: 'text', type: 'textarea', label: t.text, localized: true, required: true, admin: {rows: 3}},
        {
          name: 'checks',
          type: 'array',
          label: t.checks,
          labels: {singular: t.check, plural: t.checks},
          fields: [{name: 'label', type: 'text', label: t.checkLabel, localized: true, required: true}],
        },
        {name: 'asterisk', type: 'checkbox', label: t.asterisk, defaultValue: false},
      ],
    },
  ],
};

/** From 4 columns (one step); the panel follows the width of its column and fills the row height. */
export const processStepsBlock: ContentBlock = {block, minSpan: minSpan({type: 'processSteps', steps: 1}), fill: true};
