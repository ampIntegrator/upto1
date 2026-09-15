/**
 * Back-office (admin interface) languages. Independent from content locales (payload.config.ts).
 *
 * To add a language:
 *   1. add its code and native name to ADMIN_LANGUAGES below;
 *   2. register Payload's own translation in ./payload.ts;
 *   3. run `pnpm exec tsc --noEmit`: every dictionary entry missing the new language is listed.
 *
 * Safe to import from server and client code (no Payload language packs here).
 */
export const ADMIN_LANGUAGES = {fr: 'Français', en: 'English'} as const;

export type AdminLanguage = keyof typeof ADMIN_LANGUAGES;
export const ADMIN_LANGUAGE_CODES = Object.keys(ADMIN_LANGUAGES) as AdminLanguage[];
export const DEFAULT_ADMIN_LANGUAGE: AdminLanguage = 'fr';

/** A static text in every admin language. Payload accepts it as is for labels, descriptions and option labels. */
export type Text = Record<AdminLanguage, string>;

/** A text built from values (counts, names, positions): one function per language, so grammar can differ. */
export type Message<P> = Record<AdminLanguage, (params: P) => string>;

type Entry = Text | Message<never>;
export type Dictionary = {[key: string]: Entry | Dictionary};

/** Declares a dictionary; the type check guarantees every entry has every admin language. */
export const texts = <T extends Dictionary>(dictionary: T): T => dictionary;

/** Any language code (from Payload's i18n) → a supported admin language, French by default. */
export function toAdminLanguage(code: unknown): AdminLanguage {
  return typeof code === 'string' && Object.hasOwn(ADMIN_LANGUAGES, code) ? (code as AdminLanguage) : DEFAULT_ADMIN_LANGUAGE;
}

/** Resolves a text or a message in a language. */
export function tr(text: Text, language: unknown): string;
export function tr<P>(text: Message<P>, language: unknown, params: P): string;
export function tr(text: Text | Message<unknown>, language: unknown, params?: unknown): string {
  const entry = text[toAdminLanguage(language)];
  return typeof entry === 'function' ? entry(params) : entry;
}
