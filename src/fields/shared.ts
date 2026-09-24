import type { Field, GroupField, TextareaField } from 'payload'

import { fieldsText } from '@/i18n/admin/fields'
import { type Text, tr } from '@/i18n/admin/languages'

import { iconField } from './iconField'
import { linkTarget } from './linkTarget'

/** Title entered in a textarea in TitleText format: line break = line break, <span> = serif accent. */
export function titleField(overrides: Partial<TextareaField> & { name: string }): TextareaField {
  return {
    type: 'textarea',
    label: fieldsText.title.label,
    localized: true,
    admin: {
      rows: 3,
      description: fieldsText.title.description,
      ...overrides.admin,
    },
    ...overrides,
  } as TextareaField
}

/**
 * Link: label (translatable) + target (an address, or a content of the site: linkTarget.ts), with
 * optional Nucleo icon. `plain`: a typed address only (the header and footer, kept simple for now).
 */
export function linkGroup(
  name: string,
  label: string | Text,
  opts: { icon?: boolean; required?: boolean; plain?: boolean } = {},
): GroupField {
  const fields: Field[] = [
    { name: 'label', type: 'text', label: fieldsText.link.label, localized: true, required: opts.required },
    ...(opts.plain ? [{ name: 'href', type: 'text', label: fieldsText.link.href, required: opts.required } as Field] : linkTarget({ required: opts.required })),
  ]
  if (opts.icon) fields.push(iconField({ name: 'iconKey', label: fieldsText.link.icon }))
  return { name, type: 'group', label, fields }
}

/** Slug: URL identifier, lowercase, hyphens. */
export const slugField: Field = {
  name: 'slug',
  type: 'text',
  label: fieldsText.slug.label,
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: fieldsText.slug.description,
    // written from the title as it is typed, until edited by hand (src/fields/SlugField.tsx)
    components: { Field: { path: '@/fields/SlugField#SlugField' } },
  },
  validate: (value: unknown, { req }: { req?: { i18n?: { language?: string } } }) =>
    (typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) ||
    tr(fieldsText.slug.invalid, req?.i18n?.language),
}
