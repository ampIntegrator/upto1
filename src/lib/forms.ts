/**
 * Forms: a document of the Formulaires collection (plugin-form-builder, src/fields/forms/plugin.ts)
 * as plain data for SiteForm. Rich texts (message fields, confirmation) stay documents: the page
 * renders them with RichText (PageSections). No React and no Payload runtime here.
 *
 *   - steps: the fields are split at each « Nouvelle étape » block; one at the very top names the
 *     first step; without any, the form has one step;
 *   - width: « half » or « full » (a percentage stored before the select: ≤ 50 = half);
 *   - redirect: a chosen page (its full address) or a typed URL.
 */
import type {RichTextDocument} from '@/components/rich-text';
import {type TitleTag, toTitleTag} from '@/components/title-tags';
import {CONSENT_SLUG, STEP_SLUG, TEL_SLUG} from '@/fields/forms/slugs';
import {pagePath} from '@/lib/page-paths';
import type {Form, Page} from '@/payload-types';

type Width = 'half' | 'full';
type Base = {name: string; label: string; required?: boolean; width: Width};
export type FormFieldData =
  | (Base & {type: 'text' | 'email' | 'tel' | 'textarea'; defaultValue?: string})
  | (Base & {type: 'number'; defaultValue?: number})
  | (Base & {type: 'date'; defaultValue?: string})
  | (Base & {type: 'radio'; options: {value: string; label: string}[]; defaultValue?: string})
  | (Base & {type: 'select'; options: {value: string; label: string}[]; defaultValue?: string; multiple?: boolean; searchFrom?: number})
  | (Base & {type: 'checkbox'; defaultValue?: boolean})
  | (Base & {type: 'consent'; link?: {label: string; href: string; newTab?: boolean}})
  | {type: 'message'; name: string; width: Width; content: RichTextDocument};

export type FormData = {
  /** the form document's id, sent back with the submission */
  formId: number;
  /** unique on the page */
  id: string;
  eyebrow?: string;
  eyebrowStyle: 'eyebrow' | 'badge';
  title?: string;
  tag: TitleTag;
  intro?: string;
  framed: boolean;
  steps: {title?: string; fields: FormFieldData[]}[];
  submitLabel: string;
  confirmation: {type: 'message'; content: RichTextDocument | null} | {type: 'redirect'; href: string};
};

type Block = NonNullable<Form['fields']>[number];

const width = (w: unknown, fallback: Width): Width => (w === 'half' || w === 'full' ? w : typeof w === 'number' ? (w <= 50 ? 'half' : 'full') : fallback);
const orUndefined = <T>(v: T | null | undefined): T | undefined => (v === null || v === undefined || v === '' ? undefined : v);

/** one field block → one field, or null (step separators are handled by the caller) */
function field(b: Block): FormFieldData | null {
  if (b.blockType === STEP_SLUG) return null;
  if (b.blockType === 'message') return b.message ? {type: 'message', name: b.id ?? 'message', width: 'full', content: b.message as unknown as RichTextDocument} : null;
  if (b.blockType === CONSENT_SLUG) {
    const t = b.privacyTarget;
    const link = t?.href ? {label: b.privacyLabel || t.href, href: t.href, newTab: t.newTab || undefined} : undefined;
    return {type: 'consent', name: b.name, label: b.label, required: true, width: 'full', link};
  }
  const base = {name: b.name, label: b.label || b.name, required: Boolean(b.required)};
  switch (b.blockType) {
    case 'text':
    case 'email':
    case 'textarea':
      return {...base, type: b.blockType, width: width(b.width, b.blockType === 'textarea' ? 'full' : 'half'), defaultValue: orUndefined('defaultValue' in b ? b.defaultValue : undefined)};
    case TEL_SLUG:
      return {...base, type: 'tel', width: width(b.width, 'half')};
    case 'number':
      return {...base, type: 'number', width: width(b.width, 'half'), defaultValue: orUndefined(b.defaultValue)};
    case 'date':
      return {...base, type: 'date', width: width(b.width, 'half'), defaultValue: orUndefined(b.defaultValue)};
    case 'radio':
      return {...base, type: 'radio', width: width(b.width, 'full'), options: (b.options ?? []).map((o) => ({value: o.value, label: o.label})), defaultValue: orUndefined(b.defaultValue)};
    case 'select':
      // search: beyond 5 options (the component's default), always (0) or never
      return {...base, type: 'select', width: width(b.width, 'half'), options: (b.options ?? []).map((o) => ({value: o.value, label: o.label})), defaultValue: orUndefined(b.defaultValue), multiple: Boolean(b.multiple), searchFrom: b.search === 'always' ? 0 : b.search === 'never' ? Number.MAX_SAFE_INTEGER : undefined};
    case 'checkbox':
      return {...base, type: 'checkbox', width: width(b.width, 'full'), defaultValue: Boolean(b.defaultValue)};
  }
  return null;
}

/** the address of a chosen page (nested pages: its full address) */
const pageHref = (page: number | Page | null | undefined): string | null => (typeof page === 'object' && page ? pagePath(page) : null);

export function formData(form: Form, o: {id: string; framed: boolean; showHeading: boolean}): FormData | null {
  const steps: FormData['steps'] = [{fields: []}];
  for (const b of form.fields ?? []) {
    if (b.blockType === STEP_SLUG) {
      const current = steps[steps.length - 1];
      // a separator before any field names the first step
      if (current.fields.length === 0 && steps.length === 1) current.title = orUndefined(b.title);
      else steps.push({title: orUndefined(b.title), fields: []});
      continue;
    }
    const f = field(b);
    if (f) steps[steps.length - 1].fields.push(f);
  }
  const filled = steps.filter((s) => s.fields.length > 0);
  if (!filled.length) return null;
  const redirect = form.redirect?.type === 'custom' ? orUndefined(form.redirect.url) : pageHref(form.redirect?.reference?.value);
  return {
    formId: form.id,
    id: o.id,
    eyebrow: o.showHeading ? orUndefined(form.eyebrow) : undefined,
    eyebrowStyle: form.eyebrowStyle === 'badge' ? 'badge' : 'eyebrow',
    title: o.showHeading ? orUndefined(form.title) : undefined,
    tag: toTitleTag(form.headingTag, 'h2'),
    intro: o.showHeading ? orUndefined(form.intro) : undefined,
    framed: o.framed,
    steps: filled,
    submitLabel: form.submitButtonLabel || 'Envoyer',
    confirmation: form.confirmationType === 'redirect' && redirect ? {type: 'redirect', href: redirect} : {type: 'message', content: (form.confirmationMessage as unknown as RichTextDocument) ?? null},
  };
}
