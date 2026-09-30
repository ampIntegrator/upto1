import {BlockquoteFeature, BlocksFeature, EXPERIMENTAL_TableFeature, HeadingFeature, HorizontalRuleFeature, lexicalEditor, UploadFeature} from '@payloadcms/richtext-lexical';
import type {Block} from 'payload';

import {proseBlockText as t} from '../../../i18n/admin/blocks';
import {baseFeatures, tabsEditor} from '../../editors';
import {iconField} from '../../iconField';
import {buttonRowFields} from '../buttonFields';
import {CTA_BAND_SLUG, GALLERY_SLUG, KEY_POINTS_SLUG, QUOTE_CARD_SLUG, STATS_BAND_SLUG} from './slugs';

/**
 * Figure blocks of a post (mockups 18 and 23): inserted in the prose with Lexical's
 * BlocksFeature, rendered by the site's components (KeyPoints, CtaBand, StatsBand, QuoteCard,
 * Gallery). The same Block configs can be offered as column blocks of the section builder.
 * Server only (they use editors): client code imports the slugs from ./slugs.
 *
 * Functions, not shared objects: Payload mutates block configs while sanitising them (inside a
 * localized rich text it strips `localized` from nested fields), so the post editor and the
 * section builder each need their own copies.
 */
type Sibling = Record<string, unknown>;

export const keyPointsBlock = (): Block => ({
  slug: KEY_POINTS_SLUG,
  labels: {singular: t.keyPoints.name, plural: t.keyPoints.plural},
  fields: [
    {name: 'eyebrow', type: 'text', label: t.keyPoints.eyebrow, localized: true, defaultValue: 'À retenir'},
    {name: 'content', type: 'richText', label: t.keyPoints.content, localized: true, required: true, editor: tabsEditor, admin: {description: t.keyPoints.contentDescription}},
  ],
});

export const ctaBandBlock = (): Block => ({
  slug: CTA_BAND_SLUG,
  labels: {singular: t.ctaBand.name, plural: t.ctaBand.plural},
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'variant',
          type: 'select',
          label: t.ctaBand.variant,
          defaultValue: 'icon',
          options: [
            {label: t.ctaBand.variantIcon, value: 'icon'},
            {label: t.ctaBand.variantArrow, value: 'arrow'},
          ],
          admin: {width: '50%'},
        },
        iconField({name: 'iconKey', label: t.ctaBand.icon, admin: {width: '50%', condition: (_d: unknown, s: Sibling) => (s?.variant ?? 'icon') === 'icon'}}),
      ],
    },
    {name: 'title', type: 'text', label: t.ctaBand.title, localized: true, required: true},
    {name: 'text', type: 'textarea', label: t.ctaBand.text, localized: true, admin: {rows: 2, condition: (_d: unknown, s: Sibling) => (s?.variant ?? 'icon') === 'icon'}},
    // a simple button: the band already carries an arrow (no split shape)
    {name: 'button', type: 'group', label: t.ctaBand.button, fields: buttonRowFields({split: false})},
  ],
});

export const statsBandBlock = (): Block => ({
  slug: STATS_BAND_SLUG,
  labels: {singular: t.statsBand.name, plural: t.statsBand.plural},
  fields: [
    {
      name: 'items',
      type: 'array',
      label: t.statsBand.items,
      labels: {singular: t.statsBand.item, plural: t.statsBand.items},
      minRows: 2,
      maxRows: 4,
      fields: [
        {
          type: 'row',
          fields: [
            {name: 'value', type: 'text', label: t.statsBand.value, required: true, admin: {width: '40%'}},
            {name: 'label', type: 'text', label: t.statsBand.label, localized: true, required: true, admin: {width: '60%'}},
          ],
        },
      ],
    },
  ],
});

export const quoteCardBlock = (): Block => ({
  slug: QUOTE_CARD_SLUG,
  labels: {singular: t.quoteCard.name, plural: t.quoteCard.plural},
  fields: [
    {name: 'quote', type: 'textarea', label: t.quoteCard.quote, localized: true, required: true, admin: {rows: 3}},
    {
      type: 'row',
      fields: [
        {name: 'name', type: 'text', label: t.quoteCard.personName, required: true, admin: {width: '50%'}},
        {name: 'role', type: 'text', label: t.quoteCard.role, localized: true, admin: {width: '50%'}},
      ],
    },
    {name: 'photo', type: 'upload', relationTo: 'media', label: t.quoteCard.photo},
  ],
});

export const galleryBlock = (): Block => ({
  slug: GALLERY_SLUG,
  labels: {singular: t.gallery.name, plural: t.gallery.plural},
  fields: [
    {
      name: 'images',
      type: 'array',
      label: t.gallery.images,
      labels: {singular: t.gallery.image, plural: t.gallery.images},
      minRows: 2,
      maxRows: 5,
      fields: [{name: 'image', type: 'upload', relationTo: 'media', label: t.gallery.image, required: true}],
    },
    {
      type: 'row',
      fields: [
        {name: 'wideFirst', type: 'checkbox', label: t.gallery.wideFirst, defaultValue: true, admin: {width: '34%'}},
        {name: 'caption', type: 'text', label: t.gallery.caption, localized: true, admin: {width: '66%'}},
      ],
    },
  ],
});

export const proseBlocks = (): Block[] => [keyPointsBlock(), ctaBandBlock(), statsBandBlock(), quoteCardBlock(), galleryBlock()];

/** The editor of a post: headings h2–h4, quotes, captioned images, tables, rules and the figure blocks. */
export const postEditor = lexicalEditor({
  features: () => [
    ...baseFeatures(),
    HeadingFeature({enabledHeadingSizes: ['h2', 'h3', 'h4']}),
    BlockquoteFeature(),
    UploadFeature({collections: {media: {fields: [{name: 'caption', type: 'text', label: t.upload.caption}]}}}),
    EXPERIMENTAL_TableFeature(),
    HorizontalRuleFeature(),
    BlocksFeature({blocks: proseBlocks()}),
  ],
});
