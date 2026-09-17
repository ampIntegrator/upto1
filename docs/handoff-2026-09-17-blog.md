# Handoff: blog (post template, blog card, archive) — 17 September 2026

Written by Claude Fable for the next session (Claude Opus), after a brainstorm with Nicolas
on 17 September 2026. Read `CLAUDE.md`, `docs/handoff-2026-09-17.md` (project rules, known
traps, how previous handoffs were run) and `docs/section-builder.md` first. The rules there
apply here: French with Nicolas, English in code and docs, FR/EN admin dictionaries, backup
and reviewed migrations, throwaway pages for tests, `consignes.md` never written.

## Decisions to confirm with Nicolas before coding

Each one has a recommendation; ask him in one message, then apply his answers.

1. **Authors**: a small `authors` collection (name, role, photo, optional bio) related from
   posts. Recommended over reusing admin users, which are accounts, not bylines.
2. **Tags**: a `tags` collection like `categories` (mockup 18 shows a category chip and a
   plain tag chip). Recommended; skip if he does not want a second taxonomy.
3. **Prose tables**: Lexical's `EXPERIMENTAL_TableFeature` (a real cell editor, rendered
   with the editorial table style) rather than a rows-and-columns block. Recommended;
   the feature is marked experimental by Payload.
4. **Sections after the post**: the section builder's field on posts, optional, so a post
   can end with a FAQ, a CTA or anything the builder offers (mockup 18 ends with a night
   FAQ and « Pour continuer sur le sujet »). Recommended.
5. **Case studies** (« réalisations », mockup 23): a separate collection with its own fact
   sheet sidebar, sharing the prose editor and the figure blocks. Recommended as phase 2,
   after the blog; design the prose and blocks so they are shared.
6. **Archive filters**: category chips above the grid (query parameter), 12 posts per page.
   Reading time in the post header: optional, computed from the content (words / 200).

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
`KeyPoints`; `CtaBand`; `StatsBand`; `QuoteCard`; `Gallery`; `ProseTable` (if the Lexical
table needs its own renderer); `PostHeader` (chips, title, lead, author, date, featured
image); `PostToc` (Outline + IntersectionObserver on the prose headings, sticky at
header height + 30 px, collapsible « Sommaire » above the prose on mobile); `PostLayout`
(sidebar left 300 px, prose right 760 px max, stacked below 1024 px); `RelatedPosts`
(three article cards by category). Phase 2: `CaseHero`, `CaseSheet` (fact sheet sidebar).

Showcases in the catalogue for each (categories: contenu / conteneurs / mise-en-page), the
list design shown on the RichText showcase; `pnpm catalog:build`.

## Payload (branch `payload`)

- `posts`: `content` gets `postEditor`; new fields `author` (relationship, decision 1),
  `tags` (decision 2), `coverCaption` (text, localized), `readingTime` (computed in a
  beforeChange hook, decision 6), optional `sections` (decision 4: `sections.field` from
  `src/sections.config.ts`, in a « Sections après l'article » tab, with the share hook).
- `authors` collection (decision 1): name, role, photo (media), bio; admin group blog.
- `tags` collection (decision 2): title, slug.
- Global `blog`: archive hero (eyebrow, title, lead, tone light / night), posts per page,
  labels (« Lire l'article », « Pour continuer sur le sujet »).
- Routes: `src/app/(frontend)/blog/page.tsx` (archive: hero, category chips, 4-column
  grid of article cards on the page grid with the site gaps, Pagination, `?page=` and
  `?categorie=`), `src/app/(frontend)/blog/[slug]/page.tsx` (post: header, layout with TOC
  and prose, related posts, optional builder sections, SEO meta from the plugin). Both
  `force-dynamic` like the other pages, locale from `getLocale()`.
- Conversion: `src/lib/posts.ts` (post document → `PostHeader` props, prose document,
  TOC entries, related posts), the figure blocks converted in `lib/sections.ts`-style
  functions and rendered through the `renderBlock` map.
- Migrations: one per step (authors, tags, post fields, blog global), each reviewed; the
  `content` editor change itself creates no column.
- Seed: extend `scripts/seed.ts` or `seed-demo.ts` with an author, tags and a demo post
  using every prose element and every figure block, plus a smoke test (`smoke:sections`
  pattern: create, render `/blog/<slug>`, check markers, delete) — `scripts/smoke-blog.ts`.

## Order

1. `astryx`: RichText extensions and the generalised lists (visible at once in the text
   box, tabs and FAQ), then the figure components and their showcases, then PostHeader,
   PostToc, PostLayout, RelatedPosts, dressed Avatar / Outline / Pagination.
2. `payload`: authors and tags (migrations), post fields and editor, blog global, routes,
   conversion, seed and smoke test, docs (`docs/blog.md`), then the section builder gets
   the shareable figure blocks in a second pass.
3. Phase 2: case studies (collection, hero, fact sheet, gallery), route `/realisations`.

Before saying a step is done: `pnpm exec tsc --noEmit`, `pnpm run lint`, `pnpm test:int`,
the blog smoke test, the schema check (`pnpm payload migrate:create check --skip-empty`
creates nothing), headless captures of the post and the archive at 1440 and 390 px, and
the admin checked with a throwaway user and post (see `docs/handoff-2026-09-17.md` for the
headless admin login pattern). Give Nicolas the two compare links in order.
