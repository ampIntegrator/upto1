# Section builder: audit for a future Payload plugin

Date: 16 September 2026. Scope: the section builder (`src/fields/sections/`, `src/lib/sections.ts`,
`src/components/PageSections.tsx`) against the goal of a **Payload plugin** that manages the column
layout of the page body (between header and footer, inside `main#main`), pluggable on other Payload
admins, with the content components injected by the host (Astryx or any other framework).

This document is an audit, not a plan to build the plugin now. The last part lists the minimum
changes to make first, so that the current code becomes the base for that plugin.

## Verdict

The mechanics are already plugin-grade; the decoupling is not. The core of the column layout
(rows, columns out of 12, 14 layouts, mobile order, drag and drop, server validation) talks to
Payload only. Three areas are welded to the Vidomia site and to Astryx: the block catalogue, the
section settings, and the conversion to the front end.

## What is already plugin-grade

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

## Couplings to remove, by importance

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

## Target plugin shape (sketch, for orientation only)

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

## Minimum base: done on 16 September 2026

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

## What remains for the plugin

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
