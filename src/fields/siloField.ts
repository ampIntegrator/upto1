import type {SelectField} from 'payload';

import {SILO_LABELS, SILO_NAMES} from '@/theme/index';

/**
 * Champ « silo d'accent » : l'un des six silos, présenté en pastilles colorées (SiloPicker).
 * `fromSettings` (pages) : la valeur par défaut est le silo des Réglages du site au moment de
 * la création ; une page enregistrée sans valeur (ancienne valeur « inherit ») suit le réglage
 * du site et le SiloPicker montre cette pastille. Sans, défaut « bleu » (Réglages du site).
 */
export function siloField(overrides: Partial<SelectField> & {name: string; fromSettings?: boolean}): SelectField {
  const {fromSettings, admin, ...rest} = overrides;
  return {
    type: 'select',
    label: "Silo d'accent",
    options: SILO_NAMES.map((s) => ({label: SILO_LABELS[s], value: s})),
    defaultValue: fromSettings
      ? async ({req}) => {
          const settings = await req.payload.findGlobal({slug: 'settings', depth: 0});
          return (settings?.silo as string | undefined) ?? 'blue';
        }
      : 'blue',
    required: !fromSettings,
    ...rest,
    admin: {
      ...admin,
      components: {Field: '@/fields/SiloPicker#SiloPicker'},
    },
  } as SelectField;
}
