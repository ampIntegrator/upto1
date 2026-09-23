# Section builder

The **Contenu** tab of a page lets editors build the page body as a stack of sections. The same fields power the **Sections partagées** collection (shared sections reused on several pages).

```
Page
└── Section            background, spacing, anchor, grid gaps
    └── Row            column widths add up to 12
        └── Column     one content block (or none)
```

Code, in three layers:

- `src/fields/sections/`: the builder itself, neutral (grid, rows, columns, mobile order, drag and drop, validation). It knows no component, no media collection, no theme. Entry point: `createSectionBuilder()` in `builder.ts`. This is the folder that will become a Payload plugin (see « Towards a Payload plugin » below).
- `src/sections.config.ts` and `src/fields/blocks/`: the site's choices. The config declares the Orbita section settings (background, tint, texture, media) and the list of content blocks; each block file declares its Payload block and its minimum column width.
- `src/lib/sections.ts` (Payload data → props) and `src/components/PageSections.tsx` (rendering with Astryx).

## Section settings

A section has two collapsible panels: **Réglages de la section** and **Rangées**. The **Rangées** panel appears once a background is chosen.

Settings are grouped, each group under a small heading with a rule (23 September 2026, at Nicolas's
request), in this order: **Ancre et sauvegarde**, **Fond de la section** (and the options of the
chosen background), **Liseré**, **Espaces intérieurs**, **Écarts de la grille**. The headings store
nothing: `sectionGroup()` (`src/fields/sections/group.ts`) builds a `ui` field whose component is
the neutral `GroupHeading` or, when the host passes one, its own (here
`src/fields/SectionGroupHeading.tsx`, which adds a Nucleo icon: `obj-size-increase` for the inner
spacing, `view-columns` for the gaps). The host gives it through `createSectionBuilder({groupHeading})`.

The same headings structure the densest forms (`groupHeading()` in `src/fields/groupHeading.ts`):
the text box (Titre, Texte, Disposition), the hero (Texte, Boutons, Fond, Fil d'Ariane), the
modals (Titre, Affichage, Contenu). Payload caches its client config at start-up: after adding
such a `ui` field outside a block, restart `pnpm dev`, or the form fails with « Cannot use 'in'
operator to search for 'hidden' in undefined ».

**Admin rhythm** (`src/app/(payload)/custom.scss`, 23 September 2026): one constant gap between
fields, room under the help notes and above inputs, list and group titles brought to the group
heading style (small caps, a rule above) instead of Payload's 20 px titles, checkboxes aligned on
the input line of their row, the rich text editor framed like a field, air under a block's bar.
Written against Payload 3.88's class names: check after an update.

The background is asked first: the rest of the section appears once it is chosen.

| Background | Options |
|---|---|
| Light (`light`) | Shade and texture chosen in one **background composer** (`src/fields/BackgroundComposer.tsx`, bound to `tint`, driving the hidden `texture` field): a 500 × 160 preview of the composed background in the page's silo, then the shades and the textures as named tiles. Shades: page background (`background-body`), light silo (`background-light`, the silo's primary at 5 %), light highlight (`highlight-light`). Textures: none, grid, dots, diamonds |
| Dark (`dark`) | Night or night with halo (no texture) |
| Media (`media`) | Image or video, video poster, black overlay (0–1) |

Then, for every background:

- **Anchor**: optional id for `#anchor` links, next to the sharing checkbox.
- **Edge line** (light backgrounds only): automatic, always or never.
- **Top and bottom spacing**: 0 to 160 px in steps of 20 (halved below 640 px).
- **Grid gaps**: column gap, row gap and mobile vertical gap (0 to 60 px in steps of 10). "Réglage du site" inherits the defaults from Settings › Mise en page.
- **Share**: saving with "Enregistrer dans les sections partagées" copies the section into the shared collection and replaces it on the page with a reference.

The light tint field keeps its own `admin.condition`. Without it, Payload marks the column `NOT NULL` and dark or media sections can no longer be saved. For the same reason the builder's `condition` option (« once a background is chosen ») is set on the `rows` array field itself: Payload's database adapter reads conditions on array, block and group fields to make their required columns nullable, so adding or removing it changes the schema.

## Rows and layouts

The **Rangées** panel shows 15 layouts as thumbnails, widest column first, with no mirrored duplicates (columns can be reordered inside a row, so `8 2 2` also gives `2 8 2`, a centred 66 % column). Each cell of a thumbnail shows its width:

`12` · `6 6` · `8 4` · `8 2 2` · `7 5` · `9 3` · `4 4 4` · `6 3 3` · `6 4 2` · `3 3 3 3` · `6 2 2 2` · `4 4 2 2` · `4 2 2 2 2` · `3 3 2 2 2` · `2 2 2 2 2 2`

A 16th thumbnail, **Carousel**, adds a full-width row with a Collection block already placed (swipe by default; switch to carousel inside the block). It comes from the builder's `presetRows` option, declared in `src/sections.config.ts`: the core only knows « a row with these widths and these block slugs », checked at start-up. A click or a double click adds the row below the selection; the thumbnail lights up when the selected row matches it. The plain `12` thumbnail stays for image, image with quote, steps and tabs.

Allowed column widths are 2, 3, 4, 5, 6, 7, 8, 9 and 12 (`COLUMN_SPANS` in `src/fields/sections/grid.ts`, which also owns the layouts and the spacing scale).

| Action | Result |
|---|---|
| Double-click a layout | Adds a row with that layout below the selected row (or at the end) |
| Click a row | Selects it (white outline); click again to deselect |
| Click a layout with a row selected | Asks for confirmation, then replaces its layout. Same number of columns: only widths change. Different number: columns are recreated empty. Nothing happens if the row already has that layout |
| Click a column of the selected row | Opens the column drawer |
| Click a column of another row | Only selects that row |
| Row handle, duplicate, delete | Reorder (drag), duplicate, delete (with confirmation) |

The active layout thumbnail lights up whatever the column order (`spansKey`).

## Columns

A column holds **one** content block. The column drawer shows:

- **Vider la colonne**: removes the block (final once the page is saved).
- **Nom affiché dans le constructeur**: optional name shown in the column tile, up to 60 characters. It is the block's native `blockName`, so no extra database column is needed.
- The block and its fields.

The width is not editable in the drawer; it comes from the row layout.

Columns are reordered left or right with their handle (⋮⋮). A tile turns red with "Trop étroit" when its block needs more columns than the column has.

## Content blocks

| Block | Component | Min. | Max. | Fills the row height |
|---|---|---|---|---|
| Case vide | none (reserves the slot) | 2 | 12 | |
| Image | `Media` | 2 | 12 | yes |
| Image avec citation | `MediaQuote` | 6 | 12 | yes |
| Cartes (8 variants) | `Card` | 3 | 12 | |
| Encart texte | `TextBox` (badges, title with separator, rich text, buttons; frame, centred, vertical alignment) | 3 | 9 | yes |
| Prix unique | `PriceCard` | 6 | 9 | |
| Palier de prix | `PlanCard` | 3 | 4 | yes |
| FAQ (dépliants) | `CollapsibleGroup` (question tag h2–h4, p or span; answers as white paragraphs) | 6 | 9 | |
| Témoignage | `TestimonialCard` | 3 | 4 | yes |
| Carte comparative | `CompareCard` | 3 | 6 | yes |
| Étapes | `ProcessSteps` | 4 | 12 | |
| Collection (contenus identiques) | `Collection` | 8 | 12 | yes |
| Onglets | `Tabs` (labels of 50 characters, rich text per tab) | 6 | 12 | yes |
| Groupe de boutons | `ButtonGroup` (attached or spaced, natural or full width) | 6 | 12 | |
| En-tête de section | `SectionHeading` (display-3, tag h2–h4, centred or left) | 6 | 12 | |
| Carte article | `Card` preset article (a chosen post; also a Collection item) | 3 | 4 | yes |
| Carte réalisation | `Card` preset realisation (a chosen case study; also a Collection item) | 3 | 4 | yes |
| À retenir | `KeyPoints` | 4 | 12 | yes |
| Bandeau d’appel | `CtaBand` | 6 | 12 | |
| Bandeau de chiffres | `StatsBand` (2 on 6–7, 3 on 8–9, 4 on 12) | 6 | 12 | |
| Carte citation | `QuoteCard` | 4 | 9 | yes |
| Galerie | `Gallery` | 6 | 12 | |
| Formulaire | `SiteForm` (a form of the Formulaires collection, `docs/forms.md`) | 4 | 12 | |

Opening state (21 September 2026): a page always opens with every section folded; inside a section, the settings folded and the rows open. Payload's per-user memory of folded accordions would win over `initCollapsed`, so the preferences endpoint drops the `collapsed` entries of pages and shared sections (`src/fields/noCollapseMemory.ts`, applied on the sanitised config in `payload.config.ts`): folding works while editing, nothing is remembered.

Edge line at the top of a light section (21 September 2026, site setting `edgeTop` in `src/sections.config.ts`): automatic (default: the section above is light too, of the same shade, and the texture changes), always or never; never on the first section, nor on night and media backgrounds. `Section` prop `edgeTop`; decided in `toSections` (`src/lib/sections.ts`).

Widths decided on 16 and 17 September 2026. The last five rows are the figures of a post, shared with the post editor (see `docs/blog.md`). Tabs: 4 on 6 or 7 columns, 6 on 8 or 9, 8 on 12 (`tabsCapacity`), checked on the `items` field; each tab keeps 144 px, so long labels wrap and the strip then scrolls. Button group: 2 buttons on 6 or 7 columns, 3 on 8 or 9, 4 on 12 (`buttonsCapacity`), in both modes; spaced, each button gets an inner column and the section's column gap. The button settings are shared with the text box (`src/fields/blocks/buttonFields.ts`); the icon is offered on simple buttons only. The collection holds identical items (testimonials, cards, compare cards, tiers, post or case cards, or the latest blog posts or case studies as cards) side by side: 3 per view at most on 8 or 9 columns, 4 on 12 (`collectionCapacity`), checked on its `perView` field; layout « swipe » (no more items than visible ones, 4 at 25 % at most; peek of the next item and dots below 640 px) or « carousel » (arrows, segments / dots / numbers, page or item step; segments and dots become « 3 / 12 » beyond ten pages), which takes as many items as wanted, and 2 to 24 latest entries (`limitValidate`: a custom validate replaces Payload's min / max). An optional « see all » button (`moreLink`: blog, case studies or custom link; label from the listing settings unless typed) sits left of the arrows as a simple silo button, in their place below 640 px, and shows in the swipe layout too. The text box's text is a Lexical field restricted to paragraphs, bold, italic, links and lists (`textBoxEditor`), rendered by `RichText`; its two display title sizes need 6 columns, checked on the size field. Collections fed by a listing (« Derniers articles du blog », « Dernières réalisations ») are loaded by `toSections`, which is asynchronous and receives the locale, the listings and their loaders from the page (`sectionsContext`). The steps panel holds 1 step on 4 or 5 columns, 2 on 6 or 7, 3 on 8 or 9, 4 on 12 (`stepsCapacity` in the registry); the block checks its `steps` field against its column width (`columnSpanAt`) with an explicit message.

The block picker only offers blocks whose width range contains the column's (`filterOptions`), and the server rejects a block that is too narrow or too wide (the builder's cell shows « Trop étroit » or « Trop large »). Each block declares `ContentBlock = {block, minSpan, maxSpan?, fill?}` (`src/fields/sections/contentBlock.ts`); `fill` stretches the column to the row's height so cards side by side share it. The site's blocks take their widths from the catalogue's span registry, `src/components/content-specs.ts`.

### Image and image with quote

- The image fills the whole column (`next/image` with `fill`, centred crop, lazy loading, responsive `sizes` computed from the column width).
- **Desktop minimum height** only applies when the row has no other content. Next to a card, the image takes the row height.
- **Mobile minimum height** always applies below 768 px.
- Optional black overlay (0–1).
- Image with quote adds a centred sentence, a tag (`h2`–`h6`, `p`, `span`) and an independent size (`display-1`, `display-2`, `display-3`, `heading-1`, `heading-2`), rendered light with `MediaTheme mode="dark"`. The block grows if the sentence is taller than the minimum height.

### Block picker previews

Each block has a thumbnail in the picker (`imageURL`). They are screenshots of `/apercu/<slug>` (blue silo, demo data) made by `pnpm previews:build` while `pnpm dev` is running.

## Title tags

Every title field of a block comes with the shared `tag` select (`src/fields/tagField.ts`): h2 to h6, p or span, for structure and SEO only. The look never changes: the component renders the title through `Title` (`src/components/TitleTag.tsx`), a heading of an Astryx type or a p / span with the theme's heading classes. Today: card titles (h3), step titles (h3, one tag per panel), tier names (p), guarantee titles (p), FAQ questions (h3), image-with-quote sentences. Rule for the next blocks: a title field, a tag field, a component that takes `tag`.

## Mobile order

The phone button of any row opens the section's mobile order. Below 768 px, every column of the section, all rows together, is stacked in that order. Lines are reordered by dragging their handle. Empty columns are listed but hidden on mobile.

- Stored as a hidden `mobileOrder` field on each column (a position within the section).
- The site renders one CSS grid per section, so the CSS `order` can mix columns from different rows (`--mobile-order`, `src/app/(frontend)/styles.css`).
- **Reprendre l’ordre desktop** clears the mobile order.

## Drag and drop

Rows, columns and the mobile order all use one module, `src/fields/sections/sortable.tsx`, built on dnd-kit:

- `SortableList` (axis `x` or `y`) and `SortableItem` (render prop with `attributes`, `listeners`, `setNodeRef`, `transform`, `transition`).
- Mouse starts after 5 px, touch after a 200 ms press, keyboard: Space to pick up, arrow keys to move, Space to drop.
- Axis-specific sorting strategy, which handles items of different sizes, and movement restricted to the axis and to the container.

dnd-kit is a direct dependency pinned to the versions Payload already uses (`@dnd-kit/core` 6.3.1, `@dnd-kit/sortable` 10.0.0, `@dnd-kit/modifiers` 9.0.0, `@dnd-kit/utilities` 3.2.2), so only one copy is installed. Payload's own `DraggableSortable` is not used: it assumes items of equal size and makes columns of different widths jump.

## Adding a new column block

1. **Branch `astryx`**: build the component in `src/components/`, add its showcase to the catalog, and add its minimum width to `src/components/content-specs.ts`.
2. **Branch `payload`**:
   - Define the block in `src/fields/blocks/` as a `ContentBlock` (Payload block + `minSpan` from the registry) and add it to the `blocks` list of `src/sections.config.ts`.
   - Convert its data in `src/lib/sections.ts` and render it in `PageSections.tsx`.
   - Add its preview to `/apercu` and run `pnpm previews:build`.
   - Back up the database, create and review the migration, apply it, regenerate types.

Test on a throwaway page created and deleted by the test script, never on a real page: `pnpm smoke:sections` (dev server running) creates a page with every column block, checks the width rules and the site rendering, then deletes it.

## Towards a Payload plugin: audit and plan

Audit of 16 September 2026 (formerly `section-builder-audit.md` at the project root), against the goal of a Payload plugin that manages the column layout of the page body, pluggable on other Payload admins, with the content components injected by the host.

### Verdict

The mechanics are already plugin-grade; the decoupling is not. The core of the column layout
(rows, columns out of 12, 14 layouts, mobile order, drag and drop, server validation) talks to
Payload only. Three areas are welded to the Vidomia site and to Astryx: the block catalogue, the
section settings, and the conversion to the front end.

### What is already plugin-grade

- **Data model**: pure Payload fields, no visual value stored. Section > rows > columns (`span`
  out of 12) > contents (one block). Nothing from Astryx is persisted.
- **`sectionFields()` factory**: already used twice (page block and shared sections collection).
  This is the embryo of the plugin API.
- **Pure modules with no dependency**: `presets.ts` (layouts, `spansKey`), `mobileOrder.ts`,
  `sortable.tsx` (dnd-kit, pinned to Payload's versions). They would move as they are.
- **`RowsBuilder.tsx`**: only manipulates Payload form state (`useForm`, `useFormFields`) and
  renders drawers with `RenderFields`. Its inline styles use Payload theme variables
  (`--theme-elevation-*`), not Astryx tokens.
- **"A block declares its minimum span"**: picker filtering (`filterOptions`) plus server
  validation (`span` field). This is exactly the extension point a plugin must expose.
- **Front end split**: Payload data → neutral `SectionData` (`lib/sections.ts`) → components
  (`PageSections.tsx`). `PageSections.tsx` is the only file that imports Astryx.

### Couplings to remove, by importance

1. **The block catalogue is wired into the core.** `CONTENT_BLOCKS` in `sectionFields.ts` imports
   Image, Image with quote, Text and the eight Card blocks. `contentRef.ts` switches on those slugs,
   and the switch is repeated in `RowsBuilder.tsx` and `lib/sections.ts`. A plugin must receive its
   blocks from the host and own only the structural "empty cell". Minimum span and label must be
   declared on each block, not in a central switch.

2. **The span registry lives on the Astryx side.** The core imports `minSpan`, `ColumnSpan` and
   `COLUMN_SPANS` from `src/components/content-specs.ts`. That file mixes grid rules (which belong
   to the plugin) with the list of Astryx components and their French labels (which belong to the
   host). The dependency points the wrong way.

3. **Section settings are those of the Orbita theme.** Background light/dark/media, tint, textures,
   night halo: these are values of the Astryx `Section` component's `background` prop. The rows
   panel is also conditioned on `mode`, which ties the structure to visual settings. The plugin must
   accept `settings: Field[]` from the host and show the rows unconditionally.

4. **Hard-coded slugs and field names**: `relationTo: 'media'`, `relationTo: 'sections'`,
   `collection: 'sections'`, `data.sections` and `data.title` in the `shareSections` hook,
   `blockType === 'section'`. All must become options.

5. **Front-end conversion is entangled.** `lib/sections.ts` computes structure (mobile ranks,
   image stretch, responsive `sizes`) and converts blocks to Astryx props in the same pass. It also
   imports the generated `payload-types`, which a plugin cannot know. Target: a neutral resolver
   returning `{rows: [{columns: [{span, mobileRank, empty, block}]}]}` and a renderer with
   injected `renderSection` / `renderBlock`.

6. **Front-end grid CSS lives in the theme.** `.page-grid` and `.section-grid` rules are scoped
   under `[data-astryx-theme^='orbita']` in `src/app/(frontend)/styles.css` and assume the
   `.astryx-grid` class. The mobile order via CSS `order` is a good mechanism, but its CSS must be
   shipped by the renderer, or documented as a contract.

7. **Admin CSS lives in the app.** Handles and the mobile-order dialog are styled in
   `src/app/(payload)/custom.scss`. Move them next to `RowsBuilder.tsx`.

8. **Admin i18n is a custom system.** `{fr, en}` dictionaries are accepted natively by Payload for
   labels, which is fine. `tr()`, `Message` and `useAdminText` are project-specific, and
   `imageAltText: t.name.fr` freezes French. Decision to take: the plugin ships its translations
   through Payload's i18n, or carries its own helpers.

9. **Host details that slipped into the core**: block previews at `/apercus/<slug>.png` generated
   from Astryx routes; gap inheritance from the `sectionGrid` group of the Settings global; the
   "temporary" Text block; the 1440 px in the responsive `sizes` rule.

### Target plugin shape (sketch, for orientation only)

```ts
sectionBuilderPlugin({
  collections: {pages: {field: 'sections'}},
  sharedSections: {slug: 'sections'} | false,
  media: 'media',
  blocks: [{block: mediaBlock, minSpan: 2}, {block: cardBlock, minSpan: 3}],
  settings: Field[],            // host-side section settings (background, etc.)
  grid: {columns: 12, spans: [...], presets: [...]},
  gaps: {values, defaults, siteGlobal?: {slug, path}},
  spacing: {values, default},
});
```

Front end: `resolveSections(data, {siteGaps})` plus `<Sections renderSection renderBlock />`.

### Minimum base: done on 16 September 2026

We will specialise in Astryx, so the front-end side (points 5 and 6) waits: the Astryx renderer
stays the default one. The three changes below were made; they draw the plugin boundary on the
Payload side. Commits: `09c8aae` and `73190de` on `payload`, `94ba18f` on `astryx`.

1. **One grid module** (`src/fields/sections/grid.ts`): `GRID_COLUMNS`, `COLUMN_SPANS`,
   `snapUp`, `toSpan`, `ROW_PRESETS`, `spansKey`, the spacing scale. `presets.ts` is gone. The
   catalogue's `content-specs.ts` imports the spans from it and lost its duplicated row and
   column validations (`validation.ts` in the builder is the single implementation, tested in
   `tests/int/grid.int.spec.ts`). Nothing under `src/fields/sections/` imports `src/components/`.

2. **Blocks declare themselves** (`src/fields/sections/contentBlock.ts`): a `ContentBlock` is
   `{block, minSpan}`. `contentRef.ts` and its slug switches are gone. The picker filter and the
   server validation read `minSpan` from the declarations; the builder reads block labels from
   Payload's client field config and gets minimum spans and labels through `clientProps`. The
   empty cell stays in the core.

3. **Parameterised factory and one site file**: `sectionFields({blocks, settings, shareable,
   condition})` and `createSectionBuilder()` (`builder.ts`), which returns the documents' field,
   the shared collection's fields and the share hook, with the field name and the shared
   collection slug as options. The site's choices live in `src/sections.config.ts` (Orbita
   background settings, block list, « once a background is chosen » condition) and in
   `src/fields/blocks/` (media, media quote, cards, text), where each block takes its minimum
   width from the catalogue's registry. Pages and the shared collection consume the config.

Also done: the builder's SCSS lives next to `RowsBuilder.tsx`; `imageAltText` no longer
hard-codes French.

One thing learnt on the way: the old « rows appear once a background is chosen » condition was
also what made the required columns of the row blocks nullable in the database (Payload's
adapter reads `admin.condition` on array, block and group fields to decide NOT NULL). Removing
it would have required a migration touching every block table. It is now the builder's
`condition` option, set by the site config, and the schema is unchanged (checked with
`payload migrate:create --skip-empty`: no migration generated).

Not verified in the browser: the Chrome extension was not connected during this work. The
admin should be opened once on a page with sections to check the cells' labels, the handles'
styling (SCSS now imported by the component) and the drawer's « display name » placeholder.

### What remains for the plugin

In the order that pays off first:

1. **Front-end resolver and renderer** (points 5 and 6): split `lib/sections.ts` into a neutral
   structural resolver and the Astryx block mappers; make `PageSections.tsx` take
   `renderSection` / `renderBlock`; ship the `.section-grid` / `--mobile-order` CSS with the
   renderer instead of the theme's `styles.css`.
2. **Host details still in the core**: block previews (`imageURL` under `/apercus/`), gap
   inheritance from the Settings global (`siteGaps`), the 1440 px of the responsive `sizes`
   rule. Each becomes an option or a host callback.
3. **i18n**: decide between Payload's i18n (`translations` in the plugin config) and shipping
   the current `tr()` / `useAdminText` helpers with the package.
4. **Dynamic minimum spans**: `minSpan` and `maxSpan` are numbers. A block whose capacity
   depends on its settings validates its own field against `columnSpanAt(data, path)` (done
   for the steps panel on 16 September 2026); a generic `minSpan(data)` is not needed so far.
5. **Package extraction**: move `src/fields/sections/` to a package, export
   `createSectionBuilder` and a `sectionBuilderPlugin()` wrapper that adds the field and the
   hook to the named collections.
