'use server';

/**
 * submitForm — the site's form submission (SiteForm's `submitAction`), a Next.js server action.
 * Everything is checked again here, since a server action can be called by anyone:
 *   1. spam (looksLikeSpam): a filled honeypot or a form sent under 3 s after it was shown →
 *      answered « ok » without storing anything (bots learn nothing);
 *   2. the form exists; only the names it declares are kept;
 *   3. required fields, email format, consent;
 *   4. stored in « Réponses » (form-submissions) through the local API: the collection refuses
 *      creation over REST (src/fields/forms/plugin.ts). The plugin then sends the form's emails
 *      through Payload's email adapter, configured by the tech lead (docs/forms.md).
 * Internal errors are logged, never returned.
 */
import config from '@payload-config';
import {getPayload} from 'payload';

import type {FormSubmitInput, FormSubmitResult, FormValue} from '@/components/SiteForm';
import {CONSENT_SLUG} from '@/fields/forms/slugs';
import type {Form} from '@/payload-types';

/** below this delay between display and sending, a person has not filled the form */
const MIN_FILL_MS = 3000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGES = {required: 'Ce champ est obligatoire.', email: 'Saisissez une adresse e-mail valide.', consent: 'Votre accord est nécessaire pour envoyer le formulaire.'};

/** the anti-spam checks; a rate limit or an external service plugs in here (tech lead) */
function looksLikeSpam(input: FormSubmitInput): boolean {
  if (input.honeypot?.trim()) return true;
  if (!input.startedAt || Date.now() - input.startedAt < MIN_FILL_MS) return true;
  return false;
}

type Block = NonNullable<Form['fields']>[number];
type Named = Extract<Block, {name: string}>;
/** the blocks that hold a value (not the step separators nor the free messages) */
const isNamed = (b: Block): b is Named => 'name' in b && typeof b.name === 'string';

/** a value as stored text: « Oui » / « Non » for boxes, empty for nothing */
const asText = (v: FormValue | undefined, b: Named): string => {
  if (b.blockType === 'checkbox' || b.blockType === CONSENT_SLUG) return v === true ? 'Oui' : 'Non';
  if (v === null || v === undefined || v === false) return '';
  return String(v).trim();
};

export async function submitForm(input: FormSubmitInput): Promise<FormSubmitResult> {
  if (looksLikeSpam(input)) return {ok: true};
  const payload = await getPayload({config});
  try {
    const form = input.formId ? await payload.findByID({collection: 'forms', id: input.formId, depth: 0}).catch(() => null) : null;
    if (!form) return {ok: false};
    const fields = (form.fields ?? []).filter(isNamed);
    const values = input.values ?? {};
    const errors: Record<string, string> = {};
    for (const b of fields) {
      const text = asText(values[b.name], b);
      if (b.blockType === CONSENT_SLUG) {
        if (values[b.name] !== true) errors[b.name] = MESSAGES.consent;
      } else if ('required' in b && b.required && (!text || (b.blockType === 'checkbox' && values[b.name] !== true))) errors[b.name] = MESSAGES.required;
      else if (b.blockType === 'email' && text && !EMAIL.test(text)) errors[b.name] = MESSAGES.email;
    }
    if (Object.keys(errors).length) return {ok: false, errors};
    const submissionData = fields.map((b) => ({field: b.name, value: asText(values[b.name], b).slice(0, 5000)})).filter((d) => d.value);
    await payload.create({collection: 'form-submissions', data: {form: form.id, submissionData}});
    return {ok: true};
  } catch (e) {
    payload.logger.error({err: e, msg: 'form submission failed'});
    return {ok: false};
  }
}
