import type {GlobalConfig} from 'payload';

import {LOCALES} from '@/locales';
import {languagesText, settingsText} from '@/i18n/admin/globals';

/** Native name of each content language, as shown in the site switcher options. */
const NATIVE_NAMES: Record<(typeof LOCALES)[number], string> = {fr: 'Français', en: 'English', de: 'Deutsch', es: 'Español', it: 'Italiano'};

/**
 * Site languages: which content languages the public language switcher offers.
 * The list of content languages itself is code (LOCALES in payload.config.ts).
 */
export const Languages: GlobalConfig = {
  slug: 'languages',
  label: languagesText.label,
  admin: {group: settingsText.group},
  access: {read: () => true},
  fields: [
    {
      name: 'languages', type: 'select', hasMany: true, label: languagesText.languages.label, defaultValue: ['fr'],
      options: LOCALES.map((code) => ({label: NATIVE_NAMES[code], value: code})),
      admin: {description: languagesText.languages.description},
    },
  ],
};
