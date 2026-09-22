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
 * Writes `fields.resolvedHref` on every internal link node found anywhere in `value` (page blocks,
 * a modal's body…). Mutates the freshly loaded data in place; unresolved links keep RichText's
 * fallback (the page's stored path, else its slug).
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
  for (const child of Object.values(value)) stampInternalLinks(child, site, seen);
}

/**
 * The modals a piece of content can open: internal links to the « Modales » collection and any
 * address equal to a modal anchor (a button's `href`), anywhere in `value` (page blocks, a post's
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
  if ((node.type === 'link' || node.type === 'autolink') && node.fields?.linkType === 'internal' && node.fields.doc?.relationTo === 'modals') {
    const doc = node.fields.doc.value;
    const slug = doc && typeof doc === 'object' && 'slug' in doc ? String((doc as {slug: unknown}).slug) : null;
    if (slug && !out.includes(slug)) out.push(slug);
  }
  for (const child of Object.values(value)) collectModalSlugs(child, out, seen);
  return out;
}
