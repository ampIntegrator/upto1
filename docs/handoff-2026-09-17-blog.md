# Handoff: blog (post template, blog card, archive) — 17 September 2026

> **Status: done** (Claude Opus, 17 September 2026), except phase 2 (case studies). What was
> built, how it works and what differs from this plan: `docs/blog.md`. Differences worth knowing:
> the figure blocks and `buttonRowFields` are factories (sharing a config with a Lexical editor
> dropped translation tables); the pagination takes precomputed links (`hrefs`); the TOC needed
> the Section's `overflow: clip`; mockup captions and labels are 14 px (16 px for the stats band
> label), dimensions rounded to even pixels.

Written by Claude Fable for the next session (Claude Opus), after a brainstorm with Nicolas
on 17 September 2026. Read `CLAUDE.md`, `docs/handoff-2026-09-17.md` (project rules, known
traps, how previous handoffs were run) and `docs/section-builder.md` first. The rules there
apply here: French with Nicolas, English in code and docs, FR/EN admin dictionaries, backup
and reviewed migrations, throwaway pages for tests, `consignes.md` never written.

## Decisions (taken with Nicolas on 17 September 2026)

1. **Authors**: a small `authors` collection (name, role, photo), shown in the post header
   with the Astryx `Avatar`, dressed by the theme (square, 1 px border, 46 px).
2. **Tags**: none in this phase, categories only. The post header shows the category chip.
3. **Prose tables**: Lexical's `EXPERIMENTAL_TableFeature`, rendered with the editorial
   table style. The same feature is added to the text box editor (pages need tables too),
   not to the tabs editor: two restricted editors, one with tables and one without. A
   table in a narrow column scrolls horizontally: say so in the field's description.
4. **Under the post**: related posts, automatic (three article cards of the same category);
   and the section builder's field, optional, on posts (« Sections après l'article »), which
   is how an optional FAQ, a CTA or anything else is added.
5. **Case studies** (« réalisations », mockup 23): phase 2, separate collection. Build the
   shared parts so they serve both: the prose editor, the figure blocks, the post layout
   with a sidebar slot (TOC or fact sheet), QuoteCard, StatsBand, Gallery.
6. **The blog page, like WordPress's « posts page »** (see below). Category archives are
   generated under it. 12 posts per page, category filter chips. Reading time: not shown.
7. **Archive pagination**: the carousel's controls (`CarouselControls`: segments on the
   left, square arrows on the right) adapted to links (`?page=n`, crawlable); beyond ten
   pages the segments give way to numbers (« 3 / 14 »). No Astryx Pagination.
8. **Section heading as a column block** (« En-tête de section », mockup 19): the existing
   `SectionHeading` component (eyebrow between gold dashes, title with a serif accent span,
   lead), size fixed to `display-3` (the mockup's clamp(34px, 4.4vw, 56px) within 2 px),
   tag h2 to h4 with the shared `tagField`, optional lead, centred or left, 6 to 12
   columns, no button, no row-height fill.
9. **Post card as a column block** (« Carte article »): a relationship to a post, rendered
   with the existing `Card` preset `article` (built from mockup 19). 3 or 4 columns; also
   an item type of the Collection block (carousel and side by side), next to the existing
   « latest posts » source, which stays for automatic lists.

## The blog page (« page des articles »)

Not a block, not a component to place. In the site settings, a **Blog tab** holds:

- `page`: a relationship to one page of the site: that page *is* the blog;
- `title` (h1), `lead` (optional), `tone` (light / night) for that page's header;
- `perPage` (12) and the labels (« Lire l'article », « Pour continuer sur le sujet »,
  « Tous les articles », « Catégorie »).

When the chosen page's URL is requested, the site renders the blog template instead of the
page's own content: a Hero « page » variant (glow for light, night-halo for night) with the
tab's title and lead, the category filter chips, the four-column grid of article cards on
the page grid with the site's gaps, and the pagination. The page's own hero and sections
are ignored; a note in that page's admin says it is the blog page and that its content is
not displayed (a UI field with a `condition` reading the setting, or a description on the
sections tab). Everything else derives from that page's slug: posts at
`/<slug>/<post-slug>`, category archives at `/<slug>/categorie/<category-slug>` with an
automatic h1 (the category title), no lead, the same grid and pagination. The footer's
« Tous les articles » link and the breadcrumb use the same setting. Routes:
`src/app/(frontend)/[slug]/page.tsx` checks the setting first (blog page or plain page),
`src/app/(frontend)/[slug]/[post]/page.tsx` serves a post when `[slug]` is the blog page
(404 otherwise), `src/app/(frontend)/[slug]/categorie/[category]/page.tsx` the archives.

## Design references

Mockups in `Orbita/orbita/`: `18-blogPost.html` (post), `23-portfolioPost.html` (case
study), `19-blogCards.html` (cards and grids), shared styles in `orbita.css` (sections
« EDITORIAL POST », « Article / blog cards », `.prose*`, `.post-*`, `.case-*`,
`.prose-table`, `.prose-cta`) and captures `01-_blog-newblocks.png`, `02-_blog-newblocks.png`,
`_blog-cta2.png` … `_blog-cta4.png`, `_c23-*.png`. Values worth porting exactly:

- **Lists** (`.prose ul/ol`, to generalise site-wide): no native markers; `ul > li` padded
  28 px with a 7 px square rotated 45° in the silo colour at left 3 px / top 10 px; `ol > li`
  padded 42 px with a 28 × 24 px silo square holding the counter in Geist Mono 12 px,
  two digits (`decimal-leading-zero`), white; 12 px between items, 17 px / 1.6 text in
  secondary ink.
- **Blockquote**: 3 px left border in the editorial gold, serif italic 500 at
  clamp(23px, 2.6vw, 30px) / 1.38 in primary ink, `cite` below in Geist Mono 11.5 px
  uppercase letter-spaced, secondary ink.
- **Figure**: image full width with a 1 px border on the muted background, caption in
  Geist Mono 11 px, 40 px vertical margins. Featured image 16:7 with the same caption.
- **Editorial table** (`.prose-table`): bordered, shadowed, horizontal scroll; night header
  with Geist Mono 10.5 px uppercase white labels; cells 15 px / 20 px padding, first column
  bold primary ink, even rows lightly tinted, hover in the silo soft tint; caption below.
- **Key points** (« À retenir », `01/02-_blog-newblocks.png`): bordered panel, eyebrow
  « À retenir » with a gold dash, diamond bullets, bold runs.
- **CTA band** (`.prose-cta`, `_blog-cta2/3/4.png`): night panel, 46 px framed highlight
  icon, 18 px semibold white text (title and optional supporting line), split button in
  highlight; variants: icon + title + text + button, arrow + one line + button.
- **Stats band** (`.case-stats`, `_c23-stats.png`): night panel with a highlight radial
  glow, 2 to 4 cells separated by 10 % white rules, number in Schibsted 800
  clamp(30px, 3.6vw, 42px) highlight, label in Geist Mono 10.5 px uppercase at 60 % white.
- **Quote card** (`.case-quote`, `_c23-quote.png`): paper card with shadow and a 3 px
  gold left bar, serif italic quote at clamp(21px, 2.4vw, 26px), then 48 px square avatar
  with 1 px border, name semibold, role secondary.
- **Gallery** (`.case-gallery`): two columns of 4:3 images, a `span2` image at 16:8, 12 px
  gap, Geist Mono caption.
- **Post header** (`.post-meta`, `.post-author`, `.post-av`): category chip (`c-chip-cat`,
  silo background, mono uppercase) and tag chip; h1 display with a serif accent span;
  lead 19 px / 1.6; author with a 46 px square avatar (1 px border), name 14.5 px
  semibold, role 12.5 px secondary; 1 × 34 px divider; « Publié le » in mono 10.5 px
  uppercase then the date 14.5 px.
- **TOC** (`.toc*`): sticky under the header, eyebrow « Sommaire » with a gold rule,
  list with a 1 px left rule, links 13.5 px padded 9 px / 18 px with a 2 px transparent
  left border that turns silo and semibold when active; level 3 indented to 34 px.
- **Layout**: `.post-layout` two columns, sidebar left (TOC or fact sheet) and prose
  right (`.post-main prose`, 760 px max); the same in mockup 23 (`.case-main`).
- **Case hero** (`.case-hero`): full-bleed image, night gradient veil, white h1 with a
  highlight serif accent, lead at 80 % white, chips.

## The model: prose in Lexical, figures as blocks

The one rule that settles « how to mix the post's own elements with the existing Astryx
components »:

- **Prose stays native Lexical**: headings h2–h4, paragraphs, bold, italic, links, bulleted
  and numbered lists, simple blockquote, image with caption (UploadFeature on `media`),
  table (decision 3). Rendered by `RichText` (`src/components/RichText.tsx`), extended.
- **Figures are Payload blocks inserted in the flow** with Lexical's `BlocksFeature`. Each
  block maps to a site component. The same block definitions can also be offered as column
  blocks of the section builder later: one component, one block config, two entry points.
  `RichText` must stay free of site knowledge: give it a `renderBlock(node)` prop and let
  the host (`lib/sections.ts` / `PageSections.tsx` side) map slugs to components, exactly
  as `toContent` / `Content` already do for the builder.

Prose editor (`postEditor`, next to `textBoxEditor` in `src/fields/blocks/textBoxBlock.ts`,
or better a new `src/fields/editors.ts` exporting both): `ParagraphFeature`,
`HeadingFeature({enabledHeadingSizes: ['h2', 'h3', 'h4']})`, `BoldFeature`, `ItalicFeature`,
`LinkFeature({enabledCollections: ['pages', 'posts']})`, `UnorderedListFeature`,
`OrderedListFeature`, `BlockquoteFeature`, `UploadFeature({collections: {media: {fields:
[caption]}}})`, `EXPERIMENTAL_TableFeature` (decision 3), `BlocksFeature({blocks: [...]})`,
`FixedToolbarFeature`, `InlineToolbarFeature`. Slugs of these editors must live in a file
that client code never imports (trap: « Can't resolve 'fs' »).

Figure blocks (`src/fields/blocks/prose/`), each a `ContentBlock` so the builder can reuse
them: `keyPoints` (eyebrow text, items array of rich inline text), `ctaBand` (variant,
icon, title, text, button from `buttonFields.ts`), `statsBand` (2 to 4 items: value,
label; the registry already has `statsBar`, minSpan 12), `quoteCard` (quote, author name,
role, photo upload), `gallery` (2 to 5 images with captions, optional wide first image).
Existing blocks worth offering in the prose too: `media` (image), `testimonial`, `collection`
(later).

## Components (branch `astryx`)

Reuse: `Chip` (add the « cat » tone: silo background, mono uppercase, if not there), `Button`,
`Media`, `Stat`, `Card` preset `article` (mockup 19, already built), Astryx `Blockquote`
(already dressed in the theme, `blockquote` entry), Astryx `Avatar` (dress: square, 1 px
border, 46 px), Astryx `Outline` (dress for the TOC), Astryx `Pagination` (dress for the
archive; the segments / dots controls of `CarouselControls` are the house reference).

New: `RichText` extensions (heading ids from the text, `renderBlock` prop, upload nodes as
figures, blockquote with `cite`, table with the editorial style, the new list design);
`CarouselControls` gains link rendering (`hrefFor(page)`) for the archive pagination;
`KeyPoints`; `CtaBand`; `StatsBand`; `QuoteCard`; `Gallery`; `ProseTable` (if the Lexical
table needs its own renderer); `PostHeader` (chips, title, lead, author, date, featured
image); `PostToc` (Outline + IntersectionObserver on the prose headings, sticky at
header height + 30 px, collapsible « Sommaire » above the prose on mobile); `PostLayout`
(sidebar left 300 px, prose right 760 px max, stacked below 1024 px); `RelatedPosts`
(three article cards by category). Phase 2: `CaseHero`, `CaseSheet` (fact sheet sidebar).

Showcases in the catalogue for each (categories: contenu / conteneurs / mise-en-page), the
list design shown on the RichText showcase; `pnpm catalog:build`.

## Payload (branch `payload`)

- `posts`: `content` gets `postEditor`; new fields `author` (relationship to `authors`),
  `coverCaption` (text, localized), optional `sections` (`sections.field` from
  `src/sections.config.ts`, in a « Sections après l'article » tab, with the share hook).
- `authors` collection: name, role, photo (media); admin group blog.
- Column blocks for the builder: `sectionHeading` (decision 8) and `postCard` (decision 9,
  also an item type of `collectionBlock`'s `ITEM_BLOCKS`).
- Settings global: a **Blog tab** (page relationship, title, lead, tone, perPage, labels),
  see « The blog page » above. No separate global.
- Routes as described above (blog page, post, category archive), all `force-dynamic` like
  the other pages, locale from `getLocale()`; the post page renders header, layout with
  TOC and prose, related posts, optional builder sections, SEO meta from the plugin.
- Conversion: `src/lib/posts.ts` (post document → `PostHeader` props, prose document,
  TOC entries, related posts), the figure blocks converted in `lib/sections.ts`-style
  functions and rendered through the `renderBlock` map.
- Migrations: one per step (authors, post fields, blog tab of the settings, the two column
  blocks), each reviewed; the `content` editor change itself creates no column.
- Seed: extend `scripts/seed.ts` or `seed-demo.ts` with an author and a demo post
  using every prose element and every figure block, plus a smoke test (`smoke:sections`
  pattern: create, render `/blog/<slug>`, check markers, delete) — `scripts/smoke-blog.ts`.

## Order

1. `astryx`: RichText extensions and the generalised lists (visible at once in the text
   box, tabs and FAQ), then the figure components and their showcases, then PostHeader,
   PostToc, PostLayout, RelatedPosts, dressed Avatar / Outline / Pagination.
2. `payload`: authors (migration), post fields and editors (tables in the text box editor
   too), the Blog tab of the settings, the two column blocks, routes,
   conversion, seed and smoke test, docs (`docs/blog.md`), then the section builder gets
   the shareable figure blocks in a second pass.
3. Phase 2: case studies (collection, hero, fact sheet, gallery), route `/realisations`.

Before saying a step is done: `pnpm exec tsc --noEmit`, `pnpm run lint`, `pnpm test:int`,
the blog smoke test, the schema check (`pnpm payload migrate:create check --skip-empty`
creates nothing), headless captures of the post and the archive at 1440 and 390 px, and
the admin checked with a throwaway user and post (see `docs/handoff-2026-09-17.md` for the
headless admin login pattern). Give Nicolas the two compare links in order.
