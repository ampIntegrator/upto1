/**
 * Slugs of the form field blocks added to plugin-form-builder, and the plugin blocks whose width is
 * « half » by default. No Payload import: read by the conversion (src/lib/forms.ts) and the plugin.
 */
export const TEL_SLUG = 'tel';
export const CONSENT_SLUG = 'consent';
export const STEP_SLUG = 'stepBreak';

/** short fields: side by side from 8/12 unless the editor says otherwise */
export const HALF_BY_DEFAULT = ['text', 'email', TEL_SLUG, 'number', 'date', 'select'];
