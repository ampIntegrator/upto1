/**
 * Page addresses (nested pages, 21 September 2026). A page lives at the path of its ancestors'
 * slugs: « services » › « renovation » → /services/renovation. The path is stored on the page
 * (`path`, one value for every language, unique) and recomputed on each save by the Pages
 * collection; the nested docs plugin re-saves the children when a parent moves.
 * No React and no Payload runtime here: used by the collection, the routes and the conversions.
 */

/** the home page's slug: at /, never a parent */
export const HOME_SLUG = 'accueil';

/**
 * Deepest page level (/a/b/c = 3). Changing it is enough: the admin check and the routes read it
 * (the routes accept any depth, up to this one).
 */
export const MAX_PAGE_DEPTH = 3;

/** a page's address, from its stored path; a page saved before the path existed falls back to its slug */
export function pagePath(page: {slug?: string | null; path?: string | null} | null | undefined): string {
  if (!page?.slug || page.slug === HOME_SLUG) return '/';
  return page.path || `/${page.slug}`;
}

/** the path of a page under a parent path (null: at the root) */
export function childPath(slug: string, parentPath: string | null | undefined): string {
  if (slug === HOME_SLUG) return '/';
  return parentPath && parentPath !== '/' ? `${parentPath}/${slug}` : `/${slug}`;
}

/** the number of levels of a path (/ = 0, /a = 1, /a/b = 2) */
export const pathDepth = (path: string): number => path.split('/').filter(Boolean).length;
