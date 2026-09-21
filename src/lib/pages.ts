/**
 * Pages on the site (nested pages): a page by its address, and what to do when an address is not a
 * page any more. Server only (Payload local API).
 *
 *   loadPageByPath  the page whose stored `path` is the address (/services/renovation);
 *   missingTarget   an address that is not a page: a redirect of « Site › Redirections » first, then a
 *                   page found by the last segment (slugs are unique: an old flat address, a page
 *                   moved before redirects existed), else nothing (404).
 */
import config from '@payload-config';
import {getPayload} from 'payload';

import {type BlogConfig, type CasesConfig, entryPath} from '@/lib/listings';
import {MAX_PAGE_DEPTH, pagePath, pathDepth} from '@/lib/page-paths';
import type {Locale} from '@/locales';
import type {Page, Redirect} from '@/payload-types';

export async function loadPageByPath(path: string, locale: Locale): Promise<Page | null> {
  if (pathDepth(path) > MAX_PAGE_DEPTH) return null;
  const payload = await getPayload({config});
  const res = await payload.find({collection: 'pages', where: {path: {equals: path}}, locale, depth: 2, limit: 1});
  return res.docs[0] ?? null;
}

/** where a redirect leads: a page, a post, a case study (their current address) or a typed URL */
function redirectHref(r: Redirect, site: {blog: BlogConfig; cases: CasesConfig}): string | null {
  const to = r.to;
  if (to?.type === 'custom') return to.url || null;
  const ref = to?.reference;
  if (!ref || typeof ref.value !== 'object' || !ref.value) return null;
  if (ref.relationTo === 'pages') return pagePath(ref.value as Page);
  const slug = (ref.value as {slug?: string | null}).slug;
  if (!slug) return null;
  return ref.relationTo === 'posts' ? entryPath(site.blog, slug) : entryPath(site.cases, slug);
}

/** the address an unknown address should lead to, or null (404) */
export async function missingTarget(path: string, locale: Locale, site: {blog: BlogConfig; cases: CasesConfig}, o: {pageFallback: boolean} = {pageFallback: true}): Promise<string | null> {
  const payload = await getPayload({config});
  const redirect = (await payload.find({collection: 'redirects', where: {from: {equals: path}}, depth: 1, limit: 1, locale})).docs[0];
  if (redirect) {
    const href = redirectHref(redirect, site);
    if (href && href !== path) return href;
  }
  // under a listing's address, only the redirects: a missing post never leads to a page
  const last = o.pageFallback ? path.split('/').filter(Boolean).pop() : undefined;
  if (!last) return null;
  const page = (await payload.find({collection: 'pages', where: {slug: {equals: last}}, depth: 0, limit: 1, locale})).docs[0];
  const href = page ? pagePath(page) : null;
  return href && href !== path ? href : null;
}

/** the ancestors of a page for its breadcrumb: labels from the plugin's breadcrumb, addresses from the page's path */
export function pageAncestors(page: Page): {label: string; href: string}[] {
  const segments = pagePath(page).split('/').filter(Boolean);
  const crumbs = page.breadcrumbs ?? [];
  return segments.slice(0, -1).map((segment, i) => ({label: crumbs[i]?.label || segment, href: `/${segments.slice(0, i + 1).join('/')}`}));
}
