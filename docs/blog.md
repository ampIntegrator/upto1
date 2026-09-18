# Blog

Built on 17 September 2026 from the handoff `docs/handoff-2026-09-17-blog.md` (decisions and
mockup references). Mockups: `Orbita/orbita/18-blogPost.html` (post), `19-blogCards.html` (cards).

## The blog page

Not a page: in **Blog › Réglages du blog** (the `blog` global, in the Blog group next to posts,
categories and authors), type the blog's **address** (« actualites » → site.com/actualites; default
« blog »). The global holds everything about the list: address, page top (eyebrow, h1 title with an
optional `<span>` serif accent, optional lead, light or night tone), posts per page (12), labels
(« Tous », « Lire l’article », « Publié le », « Sommaire », « Catégorie », « Voir le blog », related
posts eyebrow and title, empty list) and an SEO tab. Nothing to create in Pages (decided with
Nicolas on 17 September 2026: a page to create only to be replaced, with its required page top,
was confusing).

Under the field, `ListingAddress` shows, as it is typed, the list's full URL with an « Ouvrir »
button (new tab; disabled until the change is saved) and the entries' and archives' addresses.
The address is checked when saving (`src/fields/listingSlug.ts`): format, not a site route
(admin, api, design…), not a page's slug, not the case studies' address; and a page cannot take
the blog's or the case studies' address. A listing address wins over a page at routing time.

The blog is one of the site's two **listings**, the case studies being the other (`docs/cases.md`):
the config, the routes, the list and the cards are shared (see « Shared listing code » below).

Everything derives from that address:

| URL | Content | Route |
|---|---|---|
| `/<blog>` | category chips, cards in four columns, pagination (`?page=n`) | `src/app/(frontend)/[slug]/page.tsx` → `ListingList` |
| `/<blog>/<post>` | the post | `src/app/(frontend)/[slug]/[entry]/page.tsx` → `PostPage` |
| `/<blog>/categorie/<category>` | archive, automatic h1, no lead | `src/app/(frontend)/[slug]/[entry]/[term]/page.tsx` |

A post under any other first segment is a 404. The footer's latest posts, its « Tous les
articles » link, the mega menu's featured post, post cards and collections of posts all link under
the blog's address (`src/lib/listings.ts`).

## A post

`posts`: title (a `<span>` accent is kept for the h1 only), cover and caption, lead (« chapô »,
also the cards’ excerpt and the default SEO description), content, author (`authors`: name, role,
photo), category, date, and an optional « Sections après l’article » tab (the section builder).

The page: breadcrumb, `PostHeader` (category chip, title, lead, author with a square avatar, date,
16:7 cover), `PostLayout` with `PostToc` (the h2–h4 of the content through the Astryx Outline,
sticky 30 px under the collapsed header, collapsible below 1024 px) and the prose, the optional
builder sections, then `RelatedPosts` (three posts of the same category, completed with the
newest ones).

## The content: prose in Lexical, figures as blocks

The post editor (`src/fields/blocks/prose/index.ts`, `postEditor`) keeps prose as native Lexical
nodes, rendered by `RichText` with `size="prose"`: headings h2–h4 (with anchors), paragraphs, bold,
italic, links, bulleted and numbered lists, quote (a last line starting with « — » becomes the
attribution), image with caption (upload node), table, horizontal rule.

Figures are Payload blocks inserted in the flow (Lexical `BlocksFeature`), rendered by
`src/components/ProseBlock.tsx`:

| Block | Component | Also a column block |
|---|---|---|
| À retenir | `KeyPoints` | from 4 columns |
| Bandeau d’appel | `CtaBand` (icon or arrow variant) | from 6 |
| Bandeau de chiffres | `StatsBand` (2 to 4) | 2 on 6–7, 3 on 8–9, 4 on 12 |
| Carte citation | `QuoteCard` | 4 to 9 |
| Galerie | `Gallery` (wide first image when the count is odd) | from 6 |

The block configs are factories (`keyPointsBlock()`…): Payload mutates block configs while
sanitising them (inside a localized rich text it strips `localized` from nested fields), so the
post editor and the section builder each get fresh copies. The same rule applies to
`buttonRowFields()`. Sharing a config object between a Lexical editor and a collection changes the
database schema of the collection (tables dropped): always use a factory.

The other editors (`src/fields/editors.ts`): `textBoxEditor` (text box: paragraphs, bold, italic,
links, lists, tables) and `tabsEditor` (the same without tables: tabs, key points). The lists
(diamond bullets, two-digit numbers in a silo square) are site-wide, in `RichText`.

## Column blocks added with the blog

- **En-tête de section** (`SectionHeading`): eyebrow, title with a serif accent at display-3, tag
  h2–h4, optional lead, centred or left; 6 to 12 columns.
- **Carte article**: a chosen post as an article card; 3 or 4 columns; also an item of the
  Collection block. The Collection block's « derniers articles » source stays for automatic lists.
- The five figures above.

## Tests and demo

- `pnpm smoke:blog` (dev server running): throwaway category, author, post (every prose element and
  figure) and a throwaway blog address for the test, then everything is deleted and the Blog
  settings restored. Checks the blog page, the post, the category archive and a 404.
  `SMOKE_SHOTS=<dir>` also saves captures.
- `pnpm smoke:sections` covers the section heading and the figures in columns.
- `pnpm seed:content` fills the blog and the case studies to eight entries each (lorem ipsum,
  Unsplash covers, three authors, a dozen content elements per entry) to check the lists, cards
  and carousels. Re-runnable: entries found by slug; existing posts only get an empty cover,
  author or content filled.
- `pnpm seed:demo` creates the author « Marie Lefebvre » and the post
  `demo-industrialiser-le-cycle-commercial`; it never changes the settings.
- Static demos in the catalogue: « Page · article de blog (18) » and « Page · blog, liste des
  articles (19) » (`src/app/(frontend)/mise-en-page/PostDemo.tsx`).

## Shared listing code (blog and case studies)

Generalised on 17 September 2026 when the case studies were built:

- `src/lib/listings.ts`: `ListingConfig` (kind, address, SEO, page top, labels),
  `blogConfig` / `casesConfig`, and the addresses `listingPath`, `entryPath`, `categoryPath`,
  `pagePath`, plus `plainTitle` (the title without its serif accent).
- `src/lib/cards.ts`: `postCard` and `caseCard`, the one conversion of an entry to a site card
  (listing pages, related entries, section builder).
- `src/lib/entries.ts`: the Payload loaders for both collections (a page of entries, categories,
  one entry, related entries, latest entries, entries by id); `src/lib/posts.ts` and
  `src/lib/cases.ts` wrap them and add the page-specific props.
- `src/lib/listing-pages.ts`: for each listing, how routes load a page of cards and its
  categories, and which listing owns an address (`listingAtBase`).
- Routes are dispatchers: `[slug]/page.tsx` renders `ListingList` at a listing's address (before looking for a page),
  `[slug]/[entry]` renders `PostPage` or `CasePage` depending on the listing at that address,
  `[slug]/[entry]/[term]` renders a category archive when `entry` is « categorie » (Next.js forbids
  two differently named dynamic folders at the same level, hence the nesting).
- Settings globals: `listingSettingsFields()` (`src/fields/listingSettings.ts`) builds both
  globals' tabs (address, page top, labels; the SEO plugin adds the SEO tab); admin texts share
  `listingCommonText`.
