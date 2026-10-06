# Blog and case studies

The site has two **listings**: the blog (`posts`) and the case studies (« réalisations », `case-studies`). Both share one listing code base (config, routes, list, cards, loaders, « under the entry » tab), described once below; each then has its own entry model, page and tests. Neither listing is a page: its address is typed in its settings global.

Consolidated on 6 October 2026 from `docs/blog.md` and `docs/cases.md`.

Mockups: `Orbita/orbita/18-blogPost.html` (post), `19-blogCards.html` (cards), `23-portfolioPost.html` (case study), `24-portfolioCards.html` (realisation card).

## Shared listing code

- `src/lib/listings.ts`: `ListingConfig` (kind, address, SEO, page top, labels), `blogConfig` / `casesConfig`, addresses `listingPath`, `entryPath`, `categoryPath`, `pagePath` (here: the pagination URL `?page=n`, not the page-tree `pagePath` of `src/lib/page-paths.ts`), and `plainTitle` (the title without its serif accent).
- `src/lib/cards.ts`: `postCard` and `caseCard`, the one conversion of an entry to a site card (listing pages, related entries, section builder).
- `src/lib/entries.ts`: the Payload loaders for both collections (a page of entries, categories, one entry, related entries `loadRelatedEntries`, latest entries, entries by id); `src/lib/posts.ts` and `src/lib/cases.ts` wrap them and add page-specific props.
- `src/lib/listing-pages.ts`: per listing, how routes load a page of cards and its categories, and which listing owns an address (`listingAtBase`).
- Routes are dispatchers: `[slug]/page.tsx` renders `ListingList` at a listing's address (before looking for a page), `[slug]/[entry]` renders `PostPage` or `CasePage` depending on the listing, `[slug]/[entry]/[term]` renders a category archive when `entry` is « categorie » (Next.js forbids two differently named dynamic folders at the same level, hence the nesting). Folder: `src/app/(frontend)/[slug]/…`.
- Settings globals: `listingSettingsFields()` (`src/fields/listingSettings.ts`) builds both globals' tabs (address, page top, labels; the SEO plugin adds the SEO tab); admin texts share `listingCommonText`.

### Address of a listing

No page to create in Pages (Nicolas, 17 Sept. 2026: a page created only to be replaced, with its required page top, was confusing). The address is typed in the settings global (blog default « blog », case studies default « realisations »). Under the field, `ListingAddress` shows, as it is typed, the list's full URL with an « Ouvrir » button (new tab; disabled until saved) and the entries' and archives' addresses. Checked on save (`src/fields/listingSlug.ts`): format, not a site route (admin, api, design…, `RESERVED`), not a page's slug, not the other listing's address; a page cannot take a listing's address either. A listing address wins over a page at routing time.

| URL | Content |
|---|---|
| `/<listing>` | category chips, cards in four columns, pagination (`?page=n`) (`ListingList`) |
| `/<listing>/<entry>` | the entry (`PostPage` or `CasePage`) |
| `/<listing>/categorie/<category>` | archive, automatic h1, no lead |

An entry under any other first segment (including the other listing's address) is a 404.

### Under the entry: FAQ and related entries, nothing else

Decision (Nicolas, 18 Sept. 2026, mockup 18): no section builder under a post or case study (removed with its 152 tables, migration `remove_entry_sections`), only two fixed elements, in this order. The « Sous l’article » / « Sous la réalisation » tab (`src/fields/entryBelow.ts`, shared):

- **FAQ**: « Afficher une FAQ » (unticked by default), then questions and answers (a blank line in an answer = a new paragraph). Rendered by `EntryFaq`: night section, accordion in two columns, first question open. Questions take the next heading level (h3 under an h2).
- **Related entries**: automatic (same category, then the newest; default), chosen (in their order, completed by automatic ones if short) or hidden. `loadRelatedEntries`. Rendered by `RelatedPosts`.

**Shared, never per entry**, in the settings global's « Sous les articles » / « Sous les réalisations » tab: the two section headings (eyebrow, title with optional `<span>` accent, tag h2 by default; **an empty title = no heading**, eyebrow included: `faqEyebrow` / `faqTitle` / `faqTag`, `relatedEyebrow` / `relatedTitle` / `relatedTag`), and the number of related entries, 3 or 4 (`relatedCount`). The related eyebrow and title lived in the Labels tab until 18 Sept. 2026 (migration `related_heading` copied them over).

### Common to both entries

Title with a `<span>` accent (kept for the h1 only), lead (also the cards' excerpt and the default SEO description), content in the post editor (below), SEO tab. A « Voir la page » button (`ViewOnSiteButton`, replacing Payload's preview icon on pages, posts and case studies) opens the entry in a new tab (`src/fields/entryUrl.ts`: under the listing's address). Page layout: `PostLayout` (sidebar + content), then `EntryFaq` and `RelatedPosts`. Footer latest posts, « Tous les articles », the mega menu's featured post, cards and collections all link under the listing's address (`src/lib/listings.ts`).

### Content: prose in Lexical, figures as blocks

The post editor (`postEditor`, `src/fields/blocks/prose/index.ts`) keeps prose as native Lexical nodes, rendered by `RichText size="prose"`: headings h2–h4 (with anchors), paragraphs, bold, italic, links, bulleted and numbered lists, quote (a last line starting with « — » becomes the attribution), image with caption (upload node), table, horizontal rule. Figures are Payload blocks in the flow (Lexical `BlocksFeature`), rendered by `src/components/ProseBlock.tsx`:

| Block | Component | Also a column block |
|---|---|---|
| À retenir | `KeyPoints` | from 4 columns |
| Bandeau d’appel | `CtaBand` (icon or arrow variant) | from 6 |
| Bandeau de chiffres | `StatsBand` (2 to 4) | 2 on 6–7, 3 on 8–9, 4 on 12 |
| Carte citation | `QuoteCard` | 4 to 9 |
| Galerie | `Gallery` (wide first image when the count is odd) | from 6 |

**Trap**: block configs are factories (`keyPointsBlock()`…, also `buttonRowFields()`). Payload mutates configs while sanitising them (inside a localized rich text it strips `localized` from nested fields); sharing a config object between a Lexical editor and a collection changes the collection's database schema (tables dropped). Always use a factory.

Every site editor (sharing `baseFeatures()`) has an admin shortcut: « lorem40 » then a space inserts forty words of lorem ipsum (1 to 999; `src/fields/lorem/`, a Lexical markdown shortcut, nothing stored differently). « Lorem » alone or inside a word is left alone. Other editors (`src/fields/editors.ts`): `textBoxEditor` (paragraphs, bold, italic, links, lists, tables) and `tabsEditor` (the same without tables: tabs, key points). Lists (diamond bullets, two-digit numbers in a silo square) are site-wide, in `RichText`.

### Tests and seeds (both)

- `pnpm seed:content` fills the blog to twenty posts (twelve lorem ipsum down to the title) and the case studies to eight (seven added, four categories; lorem ipsum, Unsplash covers, three authors, a dozen content elements per entry). Re-runnable: entries found by slug; existing posts only get an empty cover, author or content filled.
- `pnpm seed:demo` never changes the settings (entries per listing below).
- `pnpm smoke:sections` covers the section heading, the figures, the case card (in a column and in a manual collection) and the « Dernières réalisations » source.
- Smoke tests need the dev server running; `SMOKE_SHOTS=<dir>` also saves captures.

## Blog

Admin group **Blog**: posts, categories, authors, and **Réglages du blog** (`blog` global). The global holds the address, page top (eyebrow, h1 title with optional `<span>` accent, optional lead, light or night tone), posts per page (12), labels (« Tous », « Lire l’article », « Publié le », « Sommaire », « Catégorie », « Voir le blog », related eyebrow and title, empty list), « Sous les articles » and SEO.

**A post** (`posts`): title, cover and caption, lead (« chapô »), content, author (`authors`: name, role, photo), category, date. Tabs « Contenu », « Sous l’article », SEO.

**Post page**: breadcrumb, `PostHeader` (category chip, title, lead, author with square avatar, date, 16:7 cover), `PostLayout` with `PostToc` (the content's h2–h4 through the Astryx Outline, sticky 30 px under the collapsed header, collapsible below 1024 px) and the prose, then `EntryFaq` and `RelatedPosts`.

**Column blocks added with the blog**: **En-tête de section** (`SectionHeading`: eyebrow, title with serif accent at display-3, tag h2–h4, optional lead, centred or left; 6 to 12 columns); **Carte article** (a chosen post as an article card, 3 or 4 columns, also an item of the Collection block, whose « derniers articles » source stays for automatic lists); the five figures above.

**Tests and demo**: `pnpm smoke:blog`: throwaway category, author, post (every prose element and figure) and blog address; checks the blog page, the post (FAQ under the shared title, h3 questions, 4 related; then FAQ unticked and related hidden), the category archive and a 404; deletes everything and restores the Blog settings. `pnpm seed:demo` creates the author « Marie Lefebvre » and the post `demo-industrialiser-le-cycle-commercial`. Catalogue demos « Page · article de blog (18) » and « Page · blog, liste des articles (19) » (`src/app/(frontend)/mise-en-page/PostDemo.tsx`).

## Case studies

Admin group **Réalisations**: Réalisations (`case-studies`), Catégories (`case-categories`, distinct from the blog's), **Réglages des réalisations** (`portfolio` global):

- Tab « Page des réalisations »: address, eyebrow, h1 title with optional `<span>` accent, lead, light or night tone, case studies per page. Plus an SEO tab.
- Tab « Colonne latérale et libellés »: list labels (« Toutes », « Voir l’étude », « Étude de cas » chip, archive eyebrow, « Voir toutes les réalisations », related eyebrow and title, empty list), the fact sheet's row labels (client, category, location, deployment, « Modules Orbita », client link for screen readers), and the sheet's default button (label and link: **without a link, no button**).
- Tab « Sous les réalisations »: FAQ title and tag, number of related case studies (3 or 4).

**A case study**: tab « Contenu »: title, lead, full-width cover (caption, optional overlay between image and title: opacity 0 to 1, black or the silo colour, `coverOverlay` / `coverOverlayColor`), story (post editor). Tab « Colonne latérale » (renamed from « Fiche projet », 18 Sept. 2026): client (required) and its site, location, deployment, modules (free text), two figures (value and label). Row labels and the button always come from the settings (the card's short result and the per-case « Modifier les valeurs par défaut » box were removed on 25 Sept. 2026; realisation cards show no result). Tab « Sous la réalisation », then SEO. Sidebar: slug, category (required), date.

**Case study page**: breadcrumb (listing › category › client), `CaseHero` (full-bleed cover on night with a veil, « Étude de cas » and category chips, h1 with accent, lead), `PostLayout` with `CaseSheet` in the sidebar (rows, two `Stat` of size « sheet », split button; sticky under the header, above the story below 1024 px) and the story, then `EntryFaq` and `RelatedPosts` with realisation cards (3 or 4). Conversions: `caseHero`, `caseSheet` in `src/lib/cases.ts`, `caseCard` in `src/lib/cards.ts`.

**Section builder**: **Carte réalisation** (`caseCard`: a chosen case study, 3 or 4 columns, also an item of the Collection block); the Collection block's source « Dernières réalisations » (number, category, link label), same rules as latest posts (side by side: no more than visible ones).

**Tests and demo**: `pnpm smoke:cases`: throwaway category, two case studies and address; checks the list, the case study (hero, sheet, figures, buttons, story, FAQ, related shown and hidden), the archive, the 404s and the address refusals; deletes everything and restores the settings. `pnpm seed:demo` creates the « Rénovation » category and `demo-vasseur-construction` (mockup 23). Catalogue demos « Page · réalisation (23) » and « Page · réalisations, liste (24) » (`src/app/(frontend)/mise-en-page/CaseDemo.tsx`); showcases CaseHero and CaseSheet.
