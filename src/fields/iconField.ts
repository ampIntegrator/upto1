import type {TextField} from 'payload';

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
    label: 'Icône',
    validate: (value: unknown) => {
      if (!value) return true;
      return (NUCLEO_KEYS as string[]).includes(String(value)) || `Icône inconnue : ${String(value)}`;
    },
    ...rest,
    admin: {
      ...admin,
      components: {Field: '@/fields/IconPicker#IconPicker'},
    },
  } as TextField;
}
