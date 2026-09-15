import {en} from '@payloadcms/translations/languages/en';
import {fr} from '@payloadcms/translations/languages/fr';

import {type AdminLanguage, DEFAULT_ADMIN_LANGUAGE} from './languages';

/**
 * Admin i18n settings for payload.config.ts (server only: imports Payload's language packs).
 * Every language of ADMIN_LANGUAGES must have its Payload pack here.
 */
const supportedLanguages = {fr, en} satisfies Record<AdminLanguage, typeof fr>;

export const adminI18n = {
  supportedLanguages,
  fallbackLanguage: DEFAULT_ADMIN_LANGUAGE,
  translations: {
    // The header shows two selectors: this one is the content locale, ours is the interface language.
    fr: {general: {locale: 'Langue du contenu'}},
    en: {general: {locale: 'Content language'}},
  } satisfies Record<AdminLanguage, unknown>,
};
