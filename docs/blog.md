# Blog

Built on 17 September 2026 from the handoff `docs/handoff-2026-09-17-blog.md` (decisions and
mockup references). Mockups: `Orbita/orbita/18-blogPost.html` (post), `19-blogCards.html` (cards).

## The blog page

Like WordPress's « posts page »: in **Site settings › Blog**, choose one page of the site. That page
then renders the list of posts instead of its own page top and sections (a note says so in its
admin). The tab also holds the page top of the list (eyebrow, h1 title with an optional
`<span>` serif accent, optional lead, light or night tone), the posts per page (12) and the labels
(« Tous », « Lire l’article », « Publié le », « Sommaire », « Catégorie », « Voir le blog », related
posts eyebrow and title).

Everything derives from that page's slug:

| URL | Content | Route |
|---|---|---|
| `/<blog>` | category chips, cards in four columns, pagination (`?page=n`) | `src/app/(frontend)/[slug]/page.tsx` → `BlogList` |
| `/<blog>/<post>` | the post | `src/app/(frontend)/[slug]/[post]/page.tsx` |
| `/<blog>/categorie/<category>` | archive, automatic h1, no lead | `src/app/(frontend)/[slug]/categorie/[category]/page.tsx` |

A post under any other first segment is a 404. The footer's latest posts, its « Tous les
articles » link, the mega menu's featured post, post cards and collections of posts all link under
the blog page (`src/lib/blog.ts`). While no blog page is chosen, links fall back to `/blog/…`.

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
  figure) and page, set as the blog page for the test, then everything is deleted and the Blog
  settings restored. Checks the blog page, the post, the category archive and a 404.
  `SMOKE_SHOTS=<dir>` also saves captures.
- `pnpm smoke:sections` covers the section heading and the figures in columns.
- `pnpm seed:demo` creates the author « Marie Lefebvre » and the post
  `demo-industrialiser-le-cycle-commercial`; it never changes the settings.
- Static demos in the catalogue: « Page · article de blog (18) » and « Page · blog, liste des
  articles (19) » (`src/app/(frontend)/mise-en-page/PostDemo.tsx`).

## Phase 2: case studies

Not built. Ready to share: the post editor and figure blocks, `PostLayout`'s sidebar slot (a fact
sheet instead of the table of contents), `QuoteCard`, `StatsBand`, `Gallery`. To build: a
`realisations` collection, `CaseHero` (full-bleed image, night veil) and `CaseSheet` (mockup 23).
