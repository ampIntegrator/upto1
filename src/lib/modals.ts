/**
 * Loads a modal of the « Modales » collection for the site (server only, Payload local API): its
 * texts, width, tone, how it closes, its body with the internal links' addresses written on them,
 * the forms inserted in the body (converted with `formData`) and its footer buttons.
 */
import config from '@payload-config';
import {getPayload} from 'payload';

import type {RichTextDocument, RichTextNode} from '@/components/rich-text';
import {type FormData, formData} from '@/lib/forms';
import {loadFormsByIds} from '@/lib/forms-load';
import {stampInternalLinks} from '@/lib/links';
import {blogConfig, casesConfig} from '@/lib/listings';
import {MODAL_FORM_SLUG, type ModalButton, type ModalPurpose, type ModalSize, type ModalTone} from '@/lib/modal-paths';
import type {Locale} from '@/locales';
import type {Form, Modal} from '@/payload-types';

export type ModalData = {
  slug: string;
  title: string;
  eyebrow?: string;
  size: ModalSize;
  tone: ModalTone;
  /** info: free closing; form: a form in the body (no closing by the backdrop once typed); required: buttons only */
  purpose: ModalPurpose;
  body: RichTextDocument | null;
  /** the forms inserted in the body, by the id of their block */
  forms: Record<string, FormData>;
  buttons: ModalButton[];
};

type FormBlockFields = {id?: string; blockType?: string; form?: number | Form | null; showHeading?: boolean | null};

/** the « Formulaire » blocks of a body, wherever they are */
function formBlocks(nodes: RichTextNode[] | undefined, out: FormBlockFields[] = []): FormBlockFields[] {
  for (const n of nodes ?? []) {
    const f = n.fields as FormBlockFields | undefined;
    if (n.type === 'block' && f?.blockType === MODAL_FORM_SLUG) out.push(f);
    formBlocks(n.children, out);
  }
  return out;
}

const formId = (v: FormBlockFields['form']): number | null => (typeof v === 'number' ? v : v && typeof v === 'object' ? v.id : null);

function toButtons(rows: Modal['buttons']): ModalButton[] {
  const out: ModalButton[] = [];
  for (const b of rows ?? []) {
    if (!b.label) continue;
    const variant = b.variant ?? 'primary';
    if (b.action === 'link') {
      if (b.href) out.push({label: b.label, variant, action: 'link', href: b.href});
    } else out.push({label: b.label, variant, action: 'close'});
  }
  return out;
}

export async function loadModal(slug: string, locale: Locale): Promise<ModalData | null> {
  const payload = await getPayload({config});
  const [res, blog, portfolio] = await Promise.all([
    payload.find({collection: 'modals', locale, depth: 1, limit: 1, where: {slug: {equals: slug}}}),
    payload.findGlobal({slug: 'blog', locale, depth: 0}),
    payload.findGlobal({slug: 'portfolio', locale, depth: 0}),
  ]);
  const modal = res.docs[0];
  if (!modal) return null;
  const body = (modal.body ?? null) as RichTextDocument | null;
  if (body) stampInternalLinks(body, {blog: blogConfig(blog), cases: casesConfig(portfolio)});

  // forms of the body: loaded once, with their redirect page (like the « Formulaire » column block)
  const blocks = formBlocks(body?.root.children);
  const ids = [...new Set(blocks.map((b) => formId(b.form)).filter((id): id is number => id !== null))];
  const docs = new Map((await loadFormsByIds(locale, ids)).map((f) => [f.id, f]));
  const forms: Record<string, FormData> = {};
  for (const b of blocks) {
    const id = formId(b.form);
    const doc = id !== null ? docs.get(id) : undefined;
    const data = doc && b.id ? formData(doc, {id: `modal-form-${b.id}`, framed: false, showHeading: b.showHeading === true}) : null;
    if (data && b.id) forms[b.id] = data;
  }

  const purpose: ModalPurpose = modal.dismiss === 'required' ? 'required' : Object.keys(forms).length ? 'form' : 'info';
  return {
    slug: modal.slug,
    title: modal.title,
    eyebrow: modal.eyebrow || undefined,
    size: modal.size ?? 'md',
    tone: modal.tone ?? 'light',
    purpose,
    body,
    forms,
    buttons: toButtons(modal.buttons),
  };
}
