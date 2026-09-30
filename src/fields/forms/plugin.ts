import {formBuilderPlugin} from '@payloadcms/plugin-form-builder';
import type {Block, Field, PayloadRequest} from 'payload';

import {linkTarget} from '@/fields/linkTarget';
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
 *   - one title, shown on the site and in the list (a plain copy, `listTitle`, for the admin), its
 *     tag, an eyebrow as text or badge, a lead; three tabs (form, after sending, emails);
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
      ],
    },
    // the privacy policy: an address or a content of the site (a page, a modal…), and the new tab box
    {name: 'privacyTarget', type: 'group', label: t.privacyHref, fields: linkTarget()},
  ],
});

const stepBlock = (): Block => ({
  slug: STEP_SLUG,
  labels: t.step,
  admin: {disableBlockName: true},
  fields: [{name: 'title', type: 'text', label: t.stepTitle, localized: true, admin: {description: t.stepDescription}}],
});

const BLOCK_LABELS: Record<string, Block['labels']> = t.blocks;

/** the dropdown's own settings: several choices (badges in the field), search in the list */
const selectOptions = (): Field[] => [
  {
    type: 'row',
    fields: [
      {name: 'multiple', type: 'checkbox', label: t.multiple, defaultValue: false, admin: {width: '50%'}},
      {
        name: 'search', type: 'radio', label: t.search, defaultValue: 'auto',
        options: [{label: t.searchAuto, value: 'auto'}, {label: t.searchAlways, value: 'always'}, {label: t.searchNever, value: 'never'}],
        admin: {width: '50%', layout: 'horizontal'},
      },
    ],
  },
];
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

/** the plugin's field of that name */
const pick = (fields: Field[], name: string): Field | undefined => fields.find((f) => 'name' in f && f.name === name);

/**
 * The form's admin, in three tabs (unnamed: the data stays flat, as the plugin expects):
 *   Formulaire     title (shown on the site and in the list) and its tag, eyebrow and its style,
 *                  lead, the fields, the submit button label;
 *   Après l'envoi  confirmation message or redirect;
 *   E-mails        the plugin's emails (sent once the tech lead sets up an email adapter).
 */
function formFields(defaultFields: Field[]): Field[] {
  const blocksField = pick(defaultFields, 'fields');
  const used = new Set(['title', 'fields', 'submitButtonLabel', 'confirmationType', 'confirmationMessage', 'redirect', 'emails']);
  const rest = defaultFields.filter((f) => !('name' in f && used.has(f.name)));
  const fields: Field[] = [];
  if (blocksField && blocksField.type === 'blocks') {
    const plugin = Object.fromEntries(blocksField.blocks.map((b) => [b.slug, {...b, labels: BLOCK_LABELS[b.slug] ?? b.labels, fields: [...withWidthSelect(b.fields, b.slug), ...(b.slug === 'select' ? selectOptions() : [])]}]));
    const mine: Record<string, Block> = {[TEL_SLUG]: telBlock(), [CONSENT_SLUG]: consentBlock(), [STEP_SLUG]: stepBlock()};
    const all: Record<string, Block> = {...plugin, ...mine};
    // the picker's order: the usual fields first, the step separator last
    const blocks = [...BLOCK_ORDER.filter((s) => all[s]).map((s) => all[s]), ...Object.values(all).filter((b) => !BLOCK_ORDER.includes(b.slug))];
    fields.push({...blocksField, blocks, validate: uniqueNames, admin: {...blocksField.admin, description: t.fieldsDescription}});
  }
  const submit = pick(defaultFields, 'submitButtonLabel');
  const after = ['confirmationType', 'confirmationMessage', 'redirect'].map((n) => pick(defaultFields, n)).filter((f): f is Field => Boolean(f));
  const emails = pick(defaultFields, 'emails');
  return [
    {
      type: 'tabs',
      tabs: [
        {
          label: t.tabs.form,
          fields: [
            {type: 'row', fields: [
              // the plugin's title, now the displayed one: translatable, with an optional serif accent
              {name: 'title', type: 'text', label: t.title, required: true, localized: true, admin: {width: '66%', description: t.titleDescription}},
              tagField({name: 'headingTag', defaultValue: 'h2', width: '34%'}),
            ]},
            {type: 'row', fields: [
              {name: 'eyebrow', type: 'text', label: t.eyebrow, localized: true, admin: {width: '66%'}},
              {
                name: 'eyebrowStyle', type: 'radio', label: t.eyebrowStyle, defaultValue: 'eyebrow',
                options: [{label: t.eyebrowText, value: 'eyebrow'}, {label: t.eyebrowBadge, value: 'badge'}],
                admin: {width: '34%', layout: 'horizontal'},
              },
            ]},
            {name: 'intro', type: 'textarea', label: t.intro, localized: true, admin: {rows: 2}},
            ...fields,
            ...(submit ? [{...submit, label: t.submitLabel} as Field] : []),
          ],
        },
        {label: t.tabs.after, description: t.afterDescription, fields: after},
        ...(emails ? [{label: t.tabs.emails, description: t.emailsDescription, fields: [emails]}] : []),
      ],
    },
    // the list and the relationship pickers: the title without its <span> tags
    {name: 'listTitle', type: 'text', label: t.title, localized: true, admin: {hidden: true}},
    ...rest,
  ];
}

/** the title without its serif accent tags, for the admin list */
const plainListTitle = ({data}: {data: Record<string, unknown>}) => {
  if (typeof data.title === 'string') data.listTitle = data.title.replace(/<\/?span>/g, '').trim();
  return data;
};

export const formsPlugin = () =>
  formBuilderPlugin({
    fields: {text: true, email: true, textarea: true, number: true, date: true, select: true, radio: true, checkbox: true, message: true, state: false, country: false, payment: false, upload: false},
    redirectRelationships: ['pages'],
    formOverrides: {
      labels: t.forms,
      admin: {group: ct.groups.forms, useAsTitle: 'listTitle', defaultColumns: ['listTitle', 'updatedAt']},
      hooks: {beforeChange: [plainListTitle]},
      fields: ({defaultFields}) => formFields(defaultFields),
    },
    formSubmissionOverrides: {
      labels: t.submissions,
      admin: {group: ct.groups.forms, defaultColumns: ['form', 'createdAt']},
      // created by the site's server action through the local API only; read in the admin
      access: {create: () => false, read: ({req}) => Boolean(req.user), update: () => false},
    },
  });
