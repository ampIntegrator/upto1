import type { Field, GroupField, TextareaField } from 'payload'

import { iconField } from './iconField'

/** Titre saisi en textarea au format TitleText : retour à la ligne = saut de ligne, <span> = accent serif. */
export function titleField(overrides: Partial<TextareaField> & { name: string }): TextareaField {
  return {
    type: 'textarea',
    label: 'Titre',
    localized: true,
    admin: {
      rows: 3,
      description:
        'Un retour à la ligne = une nouvelle ligne du titre. Entourez la partie à mettre en serif de la balise <span>…</span>.',
      ...overrides.admin,
    },
    ...overrides,
  } as TextareaField
}

/** Lien : libellé (traduisible) + adresse, avec icône Nucleo optionnelle. */
export function linkGroup(
  name: string,
  label: string,
  opts: { icon?: boolean; required?: boolean } = {},
): GroupField {
  const fields: Field[] = [
    { name: 'label', type: 'text', label: 'Libellé', localized: true, required: opts.required },
    { name: 'href', type: 'text', label: 'Adresse (URL ou ancre)', required: opts.required },
  ]
  if (opts.icon) fields.push(iconField({ name: 'iconKey', label: 'Icône (optionnelle)' }))
  return { name, type: 'group', label, fields }
}

/** Slug : identifiant d'URL, minuscules, tirets. */
export const slugField: Field = {
  name: 'slug',
  type: 'text',
  label: 'Slug (adresse)',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: "Minuscules, chiffres et tirets. « accueil » = page d'accueil.",
  },
  validate: (value: unknown) =>
    (typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) ||
    'Minuscules, chiffres et tirets uniquement.',
}
