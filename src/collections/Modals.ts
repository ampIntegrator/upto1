import type {CollectionConfig} from 'payload';

import {modalButtonFields} from '@/fields/blocks/buttonFields';
import {modalEditor} from '@/fields/editors';
import {collectionsText as ct} from '@/i18n/admin/collections';
import {fieldsText} from '@/i18n/admin/fields';
import {tr} from '@/i18n/admin/languages';
import {modalPath} from '@/lib/modal-paths';

const f = ct.modals.fields;

/**
 * Modals (« Modales »): content written once, opened over any page by an internal link of a rich
 * text (the link editor's « Lien interne », collection Modales) or a button whose address is the
 * modal's anchor, #modale-<slug>; /modale/<slug> is its own page, for the admin's preview. A title, an eyebrow, a width (the site Dialog's sm / md / lg), a tone, how it
 * closes, a free body (text with forms inserted anywhere) and up to two footer buttons. The silo
 * is the page's. Site side: docs/modals.md.
 */
export const Modals: CollectionConfig = {
  slug: 'modals',
  labels: {singular: ct.modals.singular, plural: ct.modals.plural},
  admin: {
    useAsTitle: 'title',
    group: ct.groups.site,
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: ct.modals.description,
    components: {edit: {beforeDocumentControls: ['@/fields/PreviewLayoutMenu#PreviewLayoutMenu'], PreviewButton: '@/fields/ViewOnSiteButton#ViewOnSiteButton'}},
    preview: (doc, {req}) => (typeof doc?.slug === 'string' ? `${req.protocol}//${req.host}${modalPath(doc.slug)}` : null),
  },
  access: {read: () => true},
  fields: [
    {
      type: 'row',
      fields: [
        {name: 'eyebrow', type: 'text', label: f.eyebrow, localized: true, admin: {width: '34%'}},
        {name: 'title', type: 'text', label: f.title, localized: true, required: true, admin: {width: '66%'}},
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'size',
          type: 'select',
          label: f.size,
          defaultValue: 'md',
          required: true,
          options: [
            {label: f.sizeSm, value: 'sm'},
            {label: f.sizeMd, value: 'md'},
            {label: f.sizeLg, value: 'lg'},
          ],
          admin: {width: '25%'},
        },
        {
          name: 'tone',
          type: 'select',
          label: f.tone,
          defaultValue: 'light',
          required: true,
          options: [
            {label: f.toneLight, value: 'light'},
            {label: f.toneNight, value: 'night'},
          ],
          admin: {width: '25%'},
        },
        {
          name: 'dismiss',
          type: 'select',
          label: f.dismiss,
          defaultValue: 'free',
          required: true,
          options: [
            {label: f.dismissFree, value: 'free'},
            {label: f.dismissRequired, value: 'required'},
          ],
          admin: {width: '50%', description: f.dismissDescription},
        },
      ],
    },
    {name: 'body', type: 'richText', label: f.body, localized: true, editor: modalEditor, admin: {description: f.bodyDescription}},
    {
      name: 'buttons',
      type: 'array',
      label: f.buttons,
      labels: {singular: f.button, plural: f.buttons},
      maxRows: 2,
      admin: {description: f.buttonsDescription, initCollapsed: false},
      fields: modalButtonFields(),
      // a required answer: the buttons are the only way out, at least one is needed
      validate: (value: unknown, {siblingData, req}: {siblingData?: Record<string, unknown>; req?: {i18n?: {language?: string}}}) => {
        const count = Array.isArray(value) ? value.length : Number(value) || 0;
        return siblingData?.dismiss !== 'required' || count > 0 || tr(f.dismissNeedsButton, req?.i18n?.language);
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: fieldsText.slug.label,
      required: true,
      unique: true,
      index: true,
      admin: {position: 'sidebar', description: f.slugDescription},
      validate: (value: unknown, {req}: {req?: {i18n?: {language?: string}}}) =>
        (typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) || tr(fieldsText.slug.invalid, req?.i18n?.language),
    },
  ],
};
