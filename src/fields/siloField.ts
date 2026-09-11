import type {SelectField} from 'payload';

import {SILO_LABELS, SILO_NAMES} from '@/theme/index';

/**
 * Champ « silo d'accent » : l'un des six silos, présenté en pastilles colorées (SiloPicker).
 * `allowInherit` ajoute « Hériter du réglage du site » (pages) ; sans, la valeur est requise
 * (Réglages du site).
 */
export function siloField(overrides: Partial<SelectField> & {name: string; allowInherit?: boolean}): SelectField {
  const {allowInherit, admin, ...rest} = overrides;
  return {
    type: 'select',
    label: "Silo d'accent",
    options: [
      ...(allowInherit ? [{label: 'Hériter du réglage du site', value: 'inherit'}] : []),
      ...SILO_NAMES.map((s) => ({label: SILO_LABELS[s], value: s})),
    ],
    defaultValue: allowInherit ? 'inherit' : 'blue',
    required: !allowInherit,
    ...rest,
    admin: {
      ...admin,
      components: {Field: '@/fields/SiloPicker#SiloPicker'},
    },
  } as SelectField;
}
