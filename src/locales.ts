/**
 * Content languages: French is the reference, the others fall back to it until translated.
 * Kept out of payload.config.ts so collections and globals can import it without a cycle.
 */
export const LOCALES = ['fr', 'en', 'de', 'es', 'it'] as const;
export type Locale = (typeof LOCALES)[number];
