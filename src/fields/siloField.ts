import type {SelectField} from 'payload';

import {fieldsText} from '@/i18n/admin/fields';
import {SILO_NAMES} from '@/theme/silos/palettes';

/**
 * « silo d'accent » field: one of the six silos, shown as coloured swatches (SiloPicker).
 * `fromSettings` (pages): the default value is the silo from site settings at
 * creation time; a page saved without a value (old value « inherit ») follows the site
 * setting and SiloPicker shows that swatch. Without it, default « bleu » (site settings).
 */
export function siloField(overrides: Partial<SelectField> & {name: string; fromSettings?: boolean}): SelectField {
  const {fromSettings, admin, ...rest} = overrides;
  return {
    type: 'select',
    label: fieldsText.silo.label,
    options: SILO_NAMES.map((s) => ({label: fieldsText.silo.names[s], value: s})),
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
