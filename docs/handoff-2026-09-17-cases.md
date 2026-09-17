# Handoff: case studies (« réalisations ») — 17 September 2026

Analysis by Claude Fable, implementation by Claude Opus. Nicolas's request (consignes.md,
17 Sept. 14:33): « regarder ce qui a été fait sur le blog et préparer le portfolio réalisations,
avec la même logique admin : un item Réalisations pour gérer, avec les onglets comme pour le
blog. Vérifie blog et prépare réalisations (post, page des réalisations, archives et cards à
injecter dans les composants, 3 ou 4 sur 12 de large). »

Mockups: `Orbita/orbita/23-portfolioPost.html` (the case study page), `24-portfolioCards.html`
(the card and its carousel, light and night), shared editorial styles in `orbita.css`
(« EDITORIAL POST (components 18 blog, 23 portfolio) — shared »). Blog reference: `docs/blog.md`.

Read `docs/handoff-2026-09-17.md` first for the project rules and traps (git flow, migrations,
even dimensions, 14 px minimum, theme before CSS, tests on throwaway data only, factories for
any config shared with a Lexical editor).

## 1. Decisions taken with Nicolas (17 Sept., 15:00)

1. **Categories of their own**: a `case-categories` collection, labelled « Catégories » in the
   Réalisations group (title + slug), distinct from the blog categories. Filter chips, archives
   under the same segment as the blog: /<réalisations>/categorie/<slug>.
2. **The fact sheet is text, no chips.** Its rows (client, category, location, deployment,
   modules Orbita…) have **labels managed in the settings global**, and each case can **override
   a label locally** (deployment, location, modules: the label changes with the project). Every
   value is free text typed on the case; the modules row is a text too (no relation, no chips).
   Below the rows: the two mini results, then the CTA. Iso mockup 23.
3. **Sheet CTA**: label and link in the settings global, optional per-case override.
4. **Iso mockup, all of it** (to be revisited later if needed): the story is the blog's Lexical
   editor with the same figures placed freely (nothing specific); outside the story, the sheet
   carries two mini results (value + label) and the card a short result text (« −68 % délai »),
   as structured fields of the case since the card renders on other pages.
5. **Related case studies**: automatic, three of the same category then the newest others; the
   same optional « Sections après la réalisation » tab.
6. **Page top**: breadcrumb band on paper under the header, then the full-bleed hero with the
   night veil (mockup 23), no caption on the hero.
7. **12 px stays**: the card date, the card result and the chips keep 12 px (Nicolas's explicit
   choice, an exception to the 14 px rule), and the sheet labels too for consistency.
8. **Naming**: collection `case-studies` (tables `case_studies`), global `portfolio`
   (« Réglages des réalisations »), taxonomy `case-categories`. UI texts in French, code in
   English.

## 2. Blog review (17 Sept.): what holds, what to generalise before the case studies

Checks run today: tsc clean, lint 0 errors, 23 unit tests, smoke:blog and smoke:sections pass,
schema in sync, admin checked headless (Blog group: Articles, Catégories, Auteurs, Réglages du
blog). The blog is sound; nothing to fix in isolation. But it was written for one listing, and
the case studies are the same shape (a collection, a taxonomy, a chosen page, a settings global,
cards, archives, a story with figures). **Generalise instead of duplicating**: these are the
large-scale adjustments, to do first, in this order, with the blog smoke test green after each.

1. **One listing config type.** `src/lib/blog.ts` becomes `src/lib/listings.ts`: a
   `ListingConfig` ({kind: 'blog' | 'cases', pageId, base, eyebrow, title, lead, tone, perPage,
   labels, termSegment: 'categorie'}) built by `listingConfig(global, kind)`.
   `blogPath/postPath/categoryPath/pagePath` become `listingPath(cfg)`, `entryPath(cfg, slug)`,
   `termPath(cfg, slug?)`, `pagePath` unchanged. `getSite` returns `{blog, cases}` (both
   configs); `toHeader`, `toFooter` and `sectionsContext` take `site` (or both configs) instead
   of `blog` only, since footer/mega menu keep pointing at the blog and the section builder needs
   both.
2. **One card conversion.** `postCard` exists twice (`src/lib/posts.ts` and `src/lib/sections.ts`,
   lines 330–347, with a different date formatter). Keep one, in `src/lib/posts.ts`
   (`postCard(post, cfg, locale, ctaLabel?)`), imported by sections.ts, and add
   `caseCard(caseStudy, cfg, locale, ctaLabel?)` next to it (Card preset `realisation`: chip =
   category with tone `high`, `result`, `client: {name, location}`, cta « Voir l’étude »).
3. **Archive and related components stop forcing the preset.** `PostArchive` and
   `RelatedPosts` render `<Card {...card} preset="article" />`: remove the override, the
   `CardProps` already carry the preset. `PostArchive` gets an `aria-label` prop for the chips
   nav (both « Catégories ») and its `empty` text from the settings. Keep the component
   names (a « post » is an article or a case study) and say so in their headers.
4. **Routes become dispatchers.** `[slug]/[post]` → `[slug]/[entry]/page.tsx`: if `slug` is the
   blog base render the post page, if it is the cases base render the case page, else 404.
   `[slug]/categorie/[category]` → `[slug]/[segment]/[term]/page.tsx`: the segment must equal
   the matching listing's `termSegment` (`categorie` for both listings today), else 404. `[slug]/page.tsx` and its metadata dispatch on `blog.pageId` or `cases.pageId`
   (`BlogList` → `ListingList` with the card builder and the term loader as parameters).
   Move the post page's JSX into `src/app/(frontend)/[slug]/[entry]/PostPage.tsx` and the case
   page into `CasePage.tsx`; the route files stay thin.
5. **Section builder: a second source.** `collectionBlock`'s `source` select gains
   « Dernières réalisations » (`cases`) with `casesLimit`, `casesCategory`, `casesCta` (same
   pattern as the `posts` fields; the swipe overflow rule too). `SectionsContext` gets `cases`,
   `casesByIds`, `caseHref`, `viewCase` (label). `loadPostItems` becomes `loadCollectionItems`
   keyed by source. A `caseCard` column block (`src/fields/blocks/caseCardBlock.ts`,
   `CASE_CARD_SLUG = 'caseCard'`, relationship to `case-studies`, minSpan 3, maxSpan 4, fill,
   also in `ITEM_BLOCKS`), `loadChosenPosts` generalised to both slugs.
6. **Settings global as a factory.** The Blog global's fields (page, eyebrow, title, lead, tone,
   perPage, labels) are the cases global's fields plus the sheet labels and the CTA. Write
   `listingSettingsTabs({texts, extraLabels, extraTabs})` in `src/fields/listingSettings.ts`
   returning fresh field objects (factory: Payload mutates configs), used by `Blog` and
   `Portfolio`. Same for the admin texts: `listingText(kind)` in `src/i18n/admin/globals.ts`
   producing `blogText` and `portfolioText`.
7. **The page notice.** `BlogPageNotice` fetches `/api/globals/blog`; make it
   `ListingPageNotice`, fetching both globals, with the text of the matching one (« Cette page
   est la page des réalisations… »).
8. **Prose editor and figures**: nothing to change, `postEditor` and `proseBlocks()` are
   factories already; the case study's `content` uses `postEditor` as is. `renderProseBlock`,
   `RichText`, `PostLayout`, `StatsBand`, `QuoteCard`, `Gallery`, `KeyPoints`, `CtaBand` are
   shared as they are.
9. **Minor**: the category archive's `generateMetadata` has no description (use the listing
   lead); `loadRelated` takes the collection slug as a parameter; `seed-demo` and the smoke
   tests read the globals by slug (`blog`, `portfolio`).

Nothing above changes the database, except step 5 (collection block fields + case card block)
and the new collections and global: one migration per step, reviewed, nothing dropped.

## 3. The case study (mockup 23)

Collection `case-studies` (« Réalisation / Réalisations », group Réalisations, `useAsTitle`
title, columns title · category · client · publishedAt, `defaultSort -publishedAt`,
`hooks.beforeChange: sections.beforeChange`, SEO plugin tab). Tabs first, sidebar after (as
`Posts.ts`):

- Tab « Réalisation »: `title` (text, localized, `<span>` accent allowed: « divisé par trois »),
  `excerpt` (textarea, localized: the lead under the h1, the cards' text and the default SEO
  description), `cover` (upload: the full-bleed hero, ~1920 px), `content` (richText,
  `postEditor`, localized, same description as posts).
- Tab « Fiche projet »: group `sheet`: `client` (text, required), `clientUrl` (text, the globe
  icon link), then the text rows `location`, `deployment` (localized, « 6 semaines · mars
  2025 »), `modules` (localized, « Chiffrage instantané, Métré auto, Devis client »), each with
  an optional `…Label` text next to it (the local override of the global label, decision 2);
  `results` (array of exactly 2, {value, label}, the mini results); `cardResult` (text, « −68 %
  délai », the card); `cta` (group label + href, optional override, decision 3).
- Tab « Sections après la réalisation »: `sections.field` (optional, as posts).
- Sidebar: `slugField`, `category` (relationship `case-categories`, required), `publishedAt` (date,
  dayOnly). No author.

Rendering (`CasePage.tsx`): `SitePage` tone light, `currentHref` = the cases listing;
breadcrumb band (Réalisations › category › title) on paper under the header; `CaseHero`;
`PostLayout` with `sidebar={<CaseSheet …/>}` and the prose (`RichText` size prose,
`renderProseBlock`, `resolveLink` for posts and case studies); optional `PageSections`;
`RelatedPosts` with case cards (eyebrow « Nos réalisations », title « D’autres chantiers
<span>chiffrés juste.</span> », more « Voir toutes les réalisations »).

## 4. Components (branch `astryx`)

- **`CaseHero`** (`src/components/CaseHero.tsx` + module CSS): full-bleed cover (`next/image`
  fill, priority), night background, veil gradient (mockup: 18 % → 30 % at 40 % → 88 %),
  content bottom-aligned in the site Container, min-height clamp(440px, 58vh, 640px); chips row
  (« Étude de cas » tone `cat`, category tone `high`), `Heading level 1 type display-2` with
  `renderTitle` (accent span in highlight, on dark), lead 18 px white 80 %. Props: `{cover,
  chips: {label, tone}[], title: TitleText, lead?}`. Inside a `Theme mode="dark"` (or the
  Section's night background) so the chips and the title take the on-dark colours.
- **`CaseSheet`** (`src/components/CaseSheet.tsx`): the fact sheet, a `dl` of rows (label 12 px
  mono uppercase in editorial, value 14 px semibold; rows separated by 1 px lines), the client
  row with an optional globe icon link, then the two mini results (`Stat` in silo colour, mockup
  26 px numbers: add a `sheet` size to `Stat` if `bar` is too big, labels 12 px mono), then the
  split CTA (`Button` with `arrow`, full width). No chips. Paper card with border, `--shadow`.
  Sticky like `PostToc` (`top: calc(var(--site-header-bar-scrolled, 60px) + 30px)`), not
  collapsible below 1024 px (it goes above the story). Props: `{rows: {label, value, href?}[],
  results?: {value, label}[], cta?: {label, href}}`.
- **`Card` preset `realisation`** exists (chip + result, title, client · location with the pin,
  bar « Voir l’étude »). Check it on night (`Theme mode="dark"`: result in highlight, client at
  55 % white per mockup 24). Sizes stay as they are (decision 7).
- **`PostArchive` / `RelatedPosts`**: see § 2.3. The archive of case studies is the same grid of
  four; chips = the case categories.
- **Catalogue**: showcases for CaseHero, CaseSheet, the realisation card on light and night,
  the case study demo page (`/mise-en-page/realisation`, mockup 23) and the cases list demo
  (`/mise-en-page/realisations`, mockup 24 data); `gen-catalog.mjs` sets; `content-specs.ts`:
  `caseCard` 3–4 (like `postCard`), tests.
- **Theme first** (`src/theme/orbita.ts`): any new colour or type target (sheet label, result
  text) goes there; module CSS only for layout.

## 5. Admin (branch `payload`)

Group « Réalisations » in the sidebar (`ct.groups.cases`), in this order: Réalisations,
Catégories, Réglages des réalisations. The site settings stay untouched (Nicolas wants everything
of a listing in its own group, as done for the blog on 17 Sept.).

- `case-categories` (« Catégorie / Catégories »): title (localized), slug. Same shape as `Categories.ts`.
- `case-studies`: § 3.
- Global `portfolio` (« Réglages des réalisations »), tabs like the blog: « Page des
  réalisations » (page, eyebrow « Nos réalisations », title « Des chantiers <span>chiffrés
  juste.</span> », lead optional, tone, perPage 12) and « Fiche et libellés » (labels: all
  « Toutes », readMore « Voir l’étude », termPrefix « Catégorie », more « Voir toutes les
  réalisations », relatedEyebrow, relatedTitle, badge « Étude de cas », the sheet's row labels
  client / category / location / deployment / modules (each overridable on a case), cta label +
  href, empty text).
- `ListingPageNotice` on pages (§ 2.7).
- Column block « Carte réalisation » and the collection source (§ 2.5); admin texts in
  `src/i18n/admin/blocks.ts` and `collections.ts` (FR/EN, no hard-coded admin text).
- Migrations, each reviewed and applied after a backup: `add_case_categories_case_studies`,
  `add_portfolio_global`, `add_case_card_collection_source`. Then `pnpm generate:types` and the
  schema check must create nothing.

## 6. Routes

| URL | Content |
|---|---|
| `/<réalisations>` | the chosen page: category chips, realisation cards in four columns, pagination |
| `/<réalisations>/<slug>` | the case study |
| `/<réalisations>/categorie/<category>` | archive of a category, automatic h1 (prefix « Catégorie »), no lead |

All through the dispatchers of § 2.4; a case study under the blog base (or the reverse) is a 404.
While no page is chosen, links fall back to `/realisations/…` (as `/blog/…` for the blog).

## 7. Tests, demo, docs

- `scripts/smoke-cases.ts` (`pnpm smoke:cases`): throwaway category, page and case study with every
  sheet field and figures, chosen as the cases page for the test, settings restored in `finally`;
  checks the list, the case page (hero, sheet rows, mini results, CTA, related), the category
  archive, the 404 under the blog base; `SMOKE_SHOTS` captures at 1440 and 390.
- `smoke:sections`: a case card in a column and a collection fed by « dernières réalisations ».
- `seed:demo`: the « Vasseur Construction » case study of mockup 23 (category Rénovation, the
  two mini results, the stats band's four figures, the story with the stats band, gallery, key points, quote card); never touches
  the settings.
- Docs: `docs/cases.md` (like `docs/blog.md`), `docs/blog.md` updated for the shared listing
  code, the builder doc's block table (case card, collection source), this handoff marked done
  with the deviations, `CLAUDE.md` pointer.

## 8. Order

1. `payload` then `astryx` as needed, § 2 generalisation first (steps 1–4, 6, 7, 9), blog smoke
   test green, commit « Listings: shared config, routes and cards for the blog and the case
   studies ».
2. `astryx`: CaseHero, CaseSheet, Card realisation on night, showcases, demo pages,
   registry + tests.
3. `payload`: case categories, case studies, portfolio global (migrations), case page and list, case card
   block and collection source (migration), seed, smoke test, docs.
4. Before saying it is done: tsc, lint, test:int, smoke:blog, smoke:cases, smoke:sections,
   schema check, captures of the case page and the list at 1440 and 390, the admin checked
   headless with a throwaway user (Réalisations group, the three tabs, the page notice), and the
   two compare links in order (astryx, then payload).
