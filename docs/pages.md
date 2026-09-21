# Pages: tree, addresses, redirects

Built on 21 September 2026 at Nicolas's request (nested pages with nested addresses, 3 levels,
redirects now). Official plugins, pinned to Payload's version: `@payloadcms/plugin-nested-docs` and
`@payloadcms/plugin-redirects` 3.88.0.

## Admin

- **Pages › a page**, sidebar: **Page parente** (empty = at the root) and **Adresse complète**
  (read only, computed on save: `/services/renovation`). The list shows the address and the parent.
- Rules on the parent (`src/fields/pageTree.ts`): the home page (« accueil », at /) stays at the root
  and is nobody's parent; a page cannot go under itself or one of its sub-pages; **3 levels at most,
  sub-pages included** (moving a page with children checks the deepest one).
- **Site › Redirections** (`redirects`): an old address → a page, a post, a case study (a reference:
  it follows the target's later moves) or a custom address. Created automatically when a page's
  address changes (moved or slug renamed, sub-pages included); add your own for old links. Read by
  logged-in users only; the site reads them through the local API.

## Addresses

`src/lib/page-paths.ts`, no dependency:

- `MAX_PAGE_DEPTH = 3`: **the only thing to change** to allow deeper pages (the admin check and the
  routes read it; the catch-all route below already accepts any depth).
- `pagePath(page)`: a page's address everywhere (routes, « Voir la page », Live Preview, SEO URL,
  internal links of the rich texts, form redirects, breadcrumbs). Never rebuild it from the slug.
- The address is stored on the page, `path`, one value for every language (the plugin's breadcrumb
  is localized and only the current language is re-saved when a parent moves: not reliable for
  URLs), unique (slugs stay unique site-wide, as before). Recomputed in `computePagePath`
  (beforeChange) from the parent's stored path; the plugin re-saves the children of a page that
  changes, so their paths follow.
- Migration `nested_pages`: parent, path (existing pages filled with `/slug`, the home page `/`),
  breadcrumb table, redirects tables. Adds only.

## Routes

The routes stay dispatchers (`src/app/(frontend)/[slug]/…`): a listing's address first (blog, case
studies), otherwise a page at that address, rendered by `PageRoute` (`[slug]/PageRoute.tsx`):

| Segments | Route | Listing | Otherwise |
|---|---|---|---|
| 1 | `[slug]` | the list | page at level 1 |
| 2 | `[slug]/[entry]` | an entry | page at level 2 |
| 3 | `[slug]/[entry]/[term]` | a category archive | page at level 3 |
| 4+ | `[slug]/[entry]/[term]/[...rest]` | — | a deeper page if `MAX_PAGE_DEPTH` allows |

An address that is not a page (`missingTarget`, `src/lib/pages.ts`): a redirect of the table first,
then, outside a listing's address, the page whose slug is the last segment (an old flat address, a
page moved before redirects existed); **permanent redirect (308)**, else 404. `/accueil` → `/`.
Under a listing's address only the table counts (a missing post never lands on a page).

Breadcrumb of a page: home, then its ancestors (labels from the plugin's breadcrumb, addresses from
the page's path), then the page (`breadcrumbProps`, `src/lib/site.ts`).

## Tests

`pnpm smoke:pages` (dev server running): throwaway pages on three levels, addresses and breadcrumb,
refusals (fourth level, a sub-tree pushed to level 4, the home page as a parent, a loop), moves and a
renaming with their 308 redirects, an old flat address, a page moved back (no redirect from a live
address), a fourth segment → 404; deletes the pages and redirects.

## Not done

- Menus stay manual (header and footer links are typed addresses: update them when a page moves;
  the redirect keeps old links working meanwhile).
- Posts and case studies do not create redirects when their slug changes (add one by hand in
  Site › Redirections).
