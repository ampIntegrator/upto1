/**
 * Loads the modals of the « Modales » collection for the site (server only, Payload local API):
 * texts, width, tone, how it closes, the body with the internal links' addresses written on it,
 * the forms inserted in the body (converted with `formData`) and the footer buttons. A page
 * loads every modal it links to (`collectModalSlugs`) and renders them closed (SiteModals).
 */
import config from '@payload-config';
import {getPayload} from 'payload';

import type {RichTextDocument, RichTextNode} from '@/components/rich-text';
import {type FormData, formData} from '@/lib/forms';
import {loadFormsByIds} from '@/lib/forms-load';
import {collectModalSlugs, type LinkSite, stampInternalLinks} from '@/lib/links';
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
  /** the block id of the body's first form: its buttons go to the modal's footer (null: no form) */
  footerForm: string | null;
  /** DOM id of the footer element that receives those buttons */
  actionsTarget: string;
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

/** One modal by slug (its own page, the admin's preview). */
export async function loadModal(slug: string, locale: Locale): Promise<ModalData | null> {
  return (await loadModals([slug], locale))[0] ?? null;
}

/**
 * The modals some content can open (`collectModalSlugs`), loaded with their forms, in the order
 * given; a modal that links to another modal brings it along (one level, then another: three
 * rounds at most). Unknown slugs are skipped.
 */
export async function loadModals(slugs: string[], locale: Locale): Promise<ModalData[]> {
  if (!slugs.length) return [];
  const payload = await getPayload({config});
  const [blog, portfolio] = await Promise.all([payload.findGlobal({slug: 'blog', locale, depth: 0}), payload.findGlobal({slug: 'portfolio', locale, depth: 0})]);
  const site = {blog: blogConfig(blog), cases: casesConfig(portfolio)};
  const out: ModalData[] = [];
  let wanted = [...new Set(slugs)];
  for (let round = 0; round < 3 && wanted.length; round++) {
    const res = await payload.find({collection: 'modals', locale, depth: 1, limit: wanted.length, where: {slug: {in: wanted}}});
    const docs = wanted.map((s) => res.docs.find((d) => d.slug === s)).filter((d): d is Modal => Boolean(d));
    const next: string[] = [];
    for (const doc of docs) {
      const data = await toModalData(doc, locale, site);
      out.push(data);
      for (const s of collectModalSlugs([doc.body, doc.buttons])) if (!out.some((m) => m.slug === s) && !next.includes(s)) next.push(s);
    }
    wanted = next;
  }
  return out;
}

async function toModalData(modal: Modal, locale: Locale, site: LinkSite): Promise<ModalData> {
  const body = (modal.body ?? null) as RichTextDocument | null;
  if (body) stampInternalLinks(body, site);

  // forms of the body: loaded once, with their redirect page (like the « Formulaire » column block)
  const blocks = formBlocks(body?.root.children);
  const ids = [...new Set(blocks.map((b) => formId(b.form)).filter((id): id is number => id !== null))];
  const docs = new Map((await loadFormsByIds(locale, ids)).map((f) => [f.id, f]));
  const forms: Record<string, FormData> = {};
  for (const b of blocks) {
    const id = formId(b.form);
    const doc = id !== null ? docs.get(id) : undefined;
    const data = doc && b.id ? formData(doc, {id: `modal-form-${modal.slug}-${b.id}`, framed: false, showHeading: b.showHeading === true}) : null;
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
    footerForm: blocks.find((b) => b.id && forms[b.id])?.id ?? null,
    actionsTarget: `modal-actions-${modal.slug}`,
    buttons: toButtons(modal.buttons),
  };
}
