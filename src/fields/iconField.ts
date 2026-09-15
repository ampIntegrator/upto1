import type {TextField} from 'payload';

import {fieldsText} from '@/i18n/admin/fields';
import {tr} from '@/i18n/admin/languages';
import {NUCLEO_KEYS} from '@/theme/icons/keys';

/**
 * « icône » field: a key from the Nucleo set (icons/astryx + icons/vidomia), chosen in a
 * drawer with a grid six icons wide and search (IconPicker). Stores the key (text),
 * never the SVG: the front end renders the icon compiled by `pnpm icons:build`.
 */
export function iconField(overrides: Partial<TextField> & {name: string}): TextField {
  const {admin, ...rest} = overrides;
  return {
    type: 'text',
    label: fieldsText.icon.label,
    validate: (value: unknown, {req}: {req?: {i18n?: {language?: string}}}) => {
      if (!value) return true;
      return (NUCLEO_KEYS as string[]).includes(String(value)) || tr(fieldsText.icon.unknown, req?.i18n?.language, {key: String(value)});
    },
    ...rest,
    admin: {
      ...admin,
      components: {Field: '@/fields/IconPicker#IconPicker'},
    },
  } as TextField;
}
