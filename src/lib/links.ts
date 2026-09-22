/**
 * Internal links of rich texts (the link editor's « Lien interne »): a page, a post, a case study or
 * a modal → its address on the site (a modal: the anchor that opens it). Pure (no React, no Payload runtime): used by the routes, the
 * section conversion and the modals.
 *
 * Rich texts rendered inside client components (text box, tabs, key points) cannot receive a
 * resolver function from the server: `stampInternalLinks` writes the address on each link node
 * (`fields.resolvedHref`) during the server conversion, and RichText reads it first.
 */
import type {RichTextNode} from '@/components/rich-text';
import {type BlogConfig, type CasesConfig, entryPath} from '@/lib/listings';
import {modalHash, modalSlugFromHash} from '@/lib/modal-paths';
import {pagePath} from '@/lib/page-paths';

export type LinkSite = {blog: BlogConfig; cases: CasesConfig};

/** a button or link field with a target (src/fields/linkTarget.ts), as loaded */
type LinkTargetData = {kind?: string | null; href?: string | null; doc?: {relationTo?: string; value?: unknown} | number | null};

/** An internal link → its address; undefined when the document is not populated or unknown. */
export function resolveInternalLink(site: LinkSite, link: {relationTo?: string; value: unknown}): string | undefined {
  const slug = link.value && typeof link.value === 'object' && 'slug' in link.value ? String((link.value as {slug: unknown}).slug) : null;
  if (!slug) return undefined;
  if (link.relationTo === 'posts') return entryPath(site.blog, slug);
  if (link.relationTo === 'case-studies') return entryPath(site.cases, slug);
  // a modal: the anchor that opens it over the current page
  if (link.relationTo === 'modals') return modalHash(slug);
  // a page: its full address (nested pages)
  if (link.relationTo === 'pages') return pagePath(link.value as {slug?: string; path?: string});
  return undefined;
}

/**
 * Writes the address of every internal link found anywhere in `value` (page blocks, a hero, a
 * modal's body and buttons…): `fields.resolvedHref` on a rich text link node, `href` on a button
 * or link field whose target is a content of the site (an unpopulated or missing content leaves
 * an empty address, and the button is not shown). Mutates the freshly loaded data in place;
 * unresolved rich text links keep RichText's fallback (the page's stored path, else its slug).
 */
export function stampInternalLinks(value: unknown, site: LinkSite, seen = new WeakSet<object>()): void {
  if (!value || typeof value !== 'object' || seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) {
    for (const item of value) stampInternalLinks(item, site, seen);
    return;
  }
  const node = value as RichTextNode;
  if ((node.type === 'link' || node.type === 'autolink') && node.fields?.linkType === 'internal' && node.fields.doc) {
    const href = resolveInternalLink(site, {relationTo: node.fields.doc.relationTo, value: node.fields.doc.value});
    if (href) node.fields.resolvedHref = href;
  }
  // a button or a link field targeting a content of the site (linkTarget.ts): its address goes on `href`
  const target = value as LinkTargetData;
  if (target.kind === 'internal') {
    const href = target.doc && typeof target.doc === 'object' ? resolveInternalLink(site, {relationTo: target.doc.relationTo, value: target.doc.value}) : undefined;
    target.href = href ?? '';
  }
  for (const child of Object.values(value)) stampInternalLinks(child, site, seen);
}

/**
 * The modals a piece of content can open: internal links to the « Modales » collection (rich text
 * links, button targets) and any address equal to a modal anchor (a typed `href`), anywhere in `value` (page blocks, a post's
 * prose, a modal's body and buttons…). Their slugs, in order of appearance.
 */
export function collectModalSlugs(value: unknown, out: string[] = [], seen = new WeakSet<object>()): string[] {
  if (typeof value === 'string') {
    const slug = value.startsWith('#') ? modalSlugFromHash(value) : null;
    if (slug && !out.includes(slug)) out.push(slug);
    return out;
  }
  if (!value || typeof value !== 'object' || seen.has(value)) return out;
  seen.add(value);
  const node = value as RichTextNode;
  const add = (doc: unknown) => {
    const slug = doc && typeof doc === 'object' && 'slug' in doc ? String((doc as {slug: unknown}).slug) : null;
    if (slug && !out.includes(slug)) out.push(slug);
  };
  if ((node.type === 'link' || node.type === 'autolink') && node.fields?.linkType === 'internal' && node.fields.doc?.relationTo === 'modals') add(node.fields.doc.value);
  const target = value as LinkTargetData;
  if (target.kind === 'internal' && target.doc && typeof target.doc === 'object' && target.doc.relationTo === 'modals') add(target.doc.value);
  for (const child of Object.values(value)) collectModalSlugs(child, out, seen);
  return out;
}
