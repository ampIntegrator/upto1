import {BoldFeature, ItalicFeature, lexicalEditor, LinkFeature, OrderedListFeature, ParagraphFeature, UnorderedListFeature} from '@payloadcms/richtext-lexical';
import type {Block, PayloadRequest} from 'payload';

import {minSpan} from '@/components/content-specs';
import {columnSpanAt, type ContentBlock} from '@/fields/sections/contentBlock';
import {tr} from '@/i18n/admin/languages';
import {textBoxBlockText as t} from '../../i18n/admin/blocks';
import {iconField} from '../iconField';
import {tagField} from '../tagField';

/**
 * « Text box » block of a column (the TextBox component), 3 to 9 columns: badges, title
 * with its separator, rich text (Lexical restricted to paragraphs, bold, italic, links and
 * lists), one or two buttons; frame, centred content, vertical alignment. The two display
 * title sizes need 6 columns (checked against the column width).
 */
import {TEXT_BOX_SLUG} from './textBoxSlug';

export {TEXT_BOX_SLUG};

type Sibling = Record<string, unknown>;
const twoAtMost = (value: unknown, {req}: {req: PayloadRequest}) => (!Array.isArray(value) || value.length <= 2 ? true : tr(t.tooMany, req.i18n?.language));

/** The editor of the text: only what the site renders (RichText). */
export const textBoxEditor = lexicalEditor({
  features: () => [ParagraphFeature(), BoldFeature(), ItalicFeature(), LinkFeature({enabledCollections: ['pages', 'posts']}), UnorderedListFeature(), OrderedListFeature()],
});

const block: Block = {
  slug: TEXT_BOX_SLUG,
  labels: {singular: t.name, plural: t.plural},
  imageURL: `/apercus/${TEXT_BOX_SLUG}.png`,
  fields: [
    {
      name: 'badges',
      type: 'array',
      label: t.badges,
      labels: {singular: t.badge, plural: t.badges},
      maxRows: 2,
      validate: twoAtMost,
      fields: [
        {
          type: 'row',
          fields: [
            {name: 'label', type: 'text', label: t.badgeLabel, localized: true, required: true, admin: {width: '60%'}},
            {
              name: 'tone',
              type: 'select',
              label: t.badgeTone,
              defaultValue: 'high',
              options: [
                {label: {fr: 'Highlight', en: 'Highlight'}, value: 'high'},
                {label: {fr: 'Silo', en: 'Silo'}, value: 'accent'},
                {label: {fr: 'Or', en: 'Gold'}, value: 'cat'},
                {label: {fr: 'Rouge', en: 'Red'}, value: 'danger'},
                {label: {fr: 'Filet', en: 'Outline'}, value: 'line'},
              ],
              admin: {width: '40%'},
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {name: 'title', type: 'text', label: t.title, localized: true, admin: {width: '50%'}},
        tagField({name: 'titleTag', defaultValue: 'h2', width: '20%'}),
        {
          name: 'titleSize',
          type: 'select',
          label: t.titleSize,
          defaultValue: 'heading-1',
          options: [
            {label: t.sizes.display1, value: 'display-1'},
            {label: t.sizes.display2, value: 'display-2'},
            {label: t.sizes.display3, value: 'display-3'},
            {label: t.sizes.heading1, value: 'heading-1'},
            {label: t.sizes.heading2, value: 'heading-2'},
          ],
          admin: {width: '30%', description: t.titleSizeDescription},
          validate: (value: unknown, {data, path, req}: {data: unknown; path: (number | string)[]; req: PayloadRequest}) => {
            const size = String(value ?? 'heading-1');
            const span = columnSpanAt(data, path);
            const need = minSpan({type: 'textBox', titleSize: size as 'display-1'});
            return span >= need || tr(t.sizeTooWide, req.i18n?.language, {size, span});
          },
        },
      ],
    },
    {name: 'content', type: 'richText', label: t.content, localized: true, editor: textBoxEditor, admin: {description: t.contentDescription}},
    {
      name: 'buttons',
      type: 'array',
      label: t.buttons,
      labels: {singular: t.button, plural: t.buttons},
      maxRows: 2,
      validate: twoAtMost,
      fields: [
        {
          type: 'row',
          fields: [
            {name: 'label', type: 'text', label: {fr: 'Libellé', en: 'Label'}, localized: true, required: true, admin: {width: '50%'}},
            {name: 'href', type: 'text', label: {fr: 'Adresse', en: 'Address'}, required: true, admin: {width: '50%'}},
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'shape',
              type: 'select',
              label: t.buttonShape,
              defaultValue: 'simple',
              options: [
                {label: t.shapeSimple, value: 'simple'},
                {label: t.shapeSplit, value: 'split'},
              ],
              admin: {width: '25%'},
            },
            {
              name: 'variant',
              type: 'select',
              label: t.buttonVariant,
              defaultValue: 'primary',
              options: [
                {label: t.variants.primary, value: 'primary'},
                {label: t.variants.high, value: 'high'},
                {label: t.variants.secondary, value: 'secondary'},
                {label: t.variants.ghost, value: 'ghost'},
              ],
              admin: {width: '25%'},
            },
            {
              name: 'size',
              type: 'select',
              label: t.buttonSize,
              defaultValue: 'md',
              options: [
                {label: t.sizeMd, value: 'md'},
                {label: t.sizeLg, value: 'lg'},
              ],
              admin: {width: '25%'},
            },
            iconField({name: 'iconKey', label: t.buttonIcon, admin: {width: '25%'}}),
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {name: 'framed', type: 'checkbox', label: t.framed, defaultValue: false, admin: {width: '34%'}},
        {name: 'center', type: 'checkbox', label: t.center, defaultValue: false, admin: {width: '33%'}},
        {
          name: 'vAlign',
          type: 'select',
          label: t.vAlign,
          defaultValue: 'start',
          options: [
            {label: t.vAlignStart, value: 'start'},
            {label: t.vAlignCenter, value: 'center'},
            {label: t.vAlignEnd, value: 'end'},
          ],
          admin: {width: '33%'},
        },
      ],
    },
  ],
};

/** 3 to 9 columns; fills the row height so boxes side by side align. */
export const textBoxBlock: ContentBlock = {block, minSpan: 3, maxSpan: 9, fill: true};
