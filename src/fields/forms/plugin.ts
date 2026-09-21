import {formBuilderPlugin} from '@payloadcms/plugin-form-builder';
import type {Block, Field, PayloadRequest} from 'payload';

import {tagField} from '@/fields/tagField';
import {collectionsText as ct} from '@/i18n/admin/collections';
import {formsText as t} from '@/i18n/admin/forms';
import {tr} from '@/i18n/admin/languages';
import {CONSENT_SLUG, HALF_BY_DEFAULT, STEP_SLUG, TEL_SLUG} from './slugs';

/**
 * The forms (official plugin-form-builder, « Formulaires » admin group: Formulaires, Réponses),
 * shaped for the site's SiteForm:
 *   - the field blocks of the plugin, minus state, country, payment and upload (phase 2); their
 *     free percentage `width` becomes « demi » / « pleine » (SiteForm: two columns from 8/12);
 *   - three blocks of ours: Téléphone, Consentement (always required, optional privacy link) and
 *     Nouvelle étape (splits the form into steps);
 *   - the displayed heading of the form: eyebrow, title with its tag, intro;
 *   - submissions: created by the site's server action only (local API), read by logged-in users.
 * Email sending and anti-spam services are the tech lead's (docs/forms.md). A factory: every call
 * builds fresh configs (Payload mutates them while sanitising).
 */
type Sibling = Record<string, unknown>;

const widthField = (slug: string): Field => ({
  name: 'width',
  type: 'select',
  label: t.width,
  defaultValue: HALF_BY_DEFAULT.includes(slug) ? 'half' : 'full',
  options: [
    {label: t.widthHalf, value: 'half'},
    {label: t.widthFull, value: 'full'},
  ],
  admin: {width: '50%'},
});

/** the plugin's percentage width, anywhere in a block's fields, becomes half / full */
function withWidthSelect(fields: Field[], slug: string): Field[] {
  return fields.map((f) => {
    if ('name' in f && f.name === 'width') return widthField(slug);
    if (f.type === 'row' || f.type === 'collapsible') return {...f, fields: withWidthSelect(f.fields, slug)};
    return f;
  });
}

const nameRow = (): Field => ({
  type: 'row',
  fields: [
    {name: 'name', type: 'text', label: t.name, required: true, admin: {width: '50%'}},
    {name: 'label', type: 'text', label: t.label, localized: true, admin: {width: '50%'}},
  ],
});

const telBlock = (): Block => ({
  slug: TEL_SLUG,
  labels: t.tel,
  fields: [nameRow(), {type: 'row', fields: [widthField(TEL_SLUG)]}, {name: 'required', type: 'checkbox', label: t.required}],
});

const consentBlock = (): Block => ({
  slug: CONSENT_SLUG,
  labels: t.consent,
  admin: {disableBlockName: true},
  fields: [
    {
      type: 'row',
      fields: [
        {name: 'name', type: 'text', label: t.name, required: true, defaultValue: 'consentement', admin: {width: '50%'}},
        {name: 'label', type: 'text', label: t.label, localized: true, required: true, defaultValue: t.consentDefault.fr, admin: {width: '50%', description: t.consentDescription}},
      ],
    },
    {
      type: 'row',
      fields: [
        {name: 'privacyLabel', type: 'text', label: t.privacyLabel, localized: true, admin: {width: '50%'}},
        {name: 'privacyHref', type: 'text', label: t.privacyHref, admin: {width: '50%', placeholder: '/confidentialite'}},
      ],
    },
  ],
});

const stepBlock = (): Block => ({
  slug: STEP_SLUG,
  labels: t.step,
  admin: {disableBlockName: true},
  fields: [{name: 'title', type: 'text', label: t.stepTitle, localized: true, admin: {description: t.stepDescription}}],
});

const BLOCK_LABELS: Record<string, Block['labels']> = t.blocks;
const BLOCK_ORDER = ['text', 'email', TEL_SLUG, 'textarea', 'select', 'radio', 'checkbox', 'number', 'date', 'message', CONSENT_SLUG, STEP_SLUG];

/** every named field of the form has its own name (the submission is keyed by name) */
const uniqueNames = (value: unknown, {req}: {req: PayloadRequest}) => {
  const seen = new Set<string>();
  for (const b of Array.isArray(value) ? (value as Sibling[]) : []) {
    const name = typeof b.name === 'string' ? b.name.trim() : '';
    if (!name) continue;
    if (seen.has(name)) return tr(t.duplicateName, req.i18n?.language, {name});
    seen.add(name);
  }
  return true;
};

function formFields(defaultFields: Field[]): Field[] {
  const out: Field[] = [];
  for (const f of defaultFields) {
    if ('name' in f && f.name === 'fields' && f.type === 'blocks') {
      const plugin = Object.fromEntries(f.blocks.map((b) => [b.slug, {...b, labels: BLOCK_LABELS[b.slug] ?? b.labels, fields: withWidthSelect(b.fields, b.slug)}]));
      const mine: Record<string, Block> = {[TEL_SLUG]: telBlock(), [CONSENT_SLUG]: consentBlock(), [STEP_SLUG]: stepBlock()};
      const all: Record<string, Block> = {...plugin, ...mine};
      // the picker's order: the usual fields first, the step separator last
      const blocks = [...BLOCK_ORDER.filter((s) => all[s]).map((s) => all[s]), ...Object.values(all).filter((b) => !BLOCK_ORDER.includes(b.slug))];
      out.push({...f, blocks, validate: uniqueNames, admin: {...f.admin, description: t.fieldsDescription}});
      continue;
    }
    if ('name' in f && f.name === 'submitButtonLabel') {
      out.push({...f, label: t.submitLabel} as Field);
      continue;
    }
    out.push(f);
    if ('name' in f && f.name === 'title') {
      // the heading shown above the fields (the plugin's title names the form in the admin)
      out.push(
        {type: 'row', fields: [
          {name: 'eyebrow', type: 'text', label: t.eyebrow, localized: true, admin: {width: '34%'}},
          {name: 'heading', type: 'text', label: t.heading, localized: true, admin: {width: '66%', description: t.headingDescription}},
        ]},
        {type: 'row', fields: [
          {name: 'intro', type: 'textarea', label: t.intro, localized: true, admin: {width: '66%', rows: 2}},
          tagField({name: 'headingTag', defaultValue: 'h2', width: '34%'}),
        ]},
      );
    }
  }
  return out;
}

export const formsPlugin = () =>
  formBuilderPlugin({
    fields: {text: true, email: true, textarea: true, number: true, date: true, select: true, radio: true, checkbox: true, message: true, state: false, country: false, payment: false, upload: false},
    redirectRelationships: ['pages'],
    formOverrides: {
      labels: t.forms,
      admin: {group: ct.groups.forms, useAsTitle: 'title', defaultColumns: ['title', 'updatedAt']},
      fields: ({defaultFields}) => formFields(defaultFields),
    },
    formSubmissionOverrides: {
      labels: t.submissions,
      admin: {group: ct.groups.forms, defaultColumns: ['form', 'createdAt']},
      // created by the site's server action through the local API only; read in the admin
      access: {create: () => false, read: ({req}) => Boolean(req.user), update: () => false},
    },
  });
