# Sections: builder, « Gérer » dialog and live previews

The **Contenu** tab of a page builds the page body as a stack of sections (Section > Row > Column > one content block); the same fields power the **Sections partagées** collection. A neutral core in `src/fields/sections/` (the future Payload plugin) owns the grid, rows, columns, mobile order, drag and drop, validation, the full-screen « Gérer » dialog and the preview protocol; the site gives it its settings and blocks through `src/sections.config.ts` and `src/fields/blocks/`, and renders with `src/lib/sections.ts` + `src/components/PageSections.tsx`. Each section is edited in the « Gérer » dialog, with a live preview of that section alone, refreshed without saving. Separately, Payload's built-in Live Preview shows the whole page after each save.

Consolidated on 6 October 2026 from section-builder.md, section-manager.md, live-preview.md and section-builder-plugin.md.

## 1. What it is: three layers

```
Page
└── Section            background, spacing, anchor, grid gaps
    └── Row            column widths add up to 12
        └── Column     one content block (or none)
```

- **Neutral core**, `src/fields/sections/`: knows no component, no media collection, no theme, and never imports `src/components/`. Entry point: `createSectionBuilder()` in `builder.ts`, which returns the documents' field, the shared collection's fields and the share hook (field name and shared collection slug are options). It talks to the preview only through messages (`preview.ts`) and gets everything site-specific as options.
- **Host config**, `src/sections.config.ts` (Orbita section settings `orbitaSectionSettings`: background, tint, texture, media; block list `blocks`; `presetRows`; the « once a background is chosen » `condition`; `headerFields`; `preview`; site setting `edgeTop`) and `src/fields/blocks/` (one `ContentBlock` per block, minimum width from the catalogue's registry). Pages and the shared collection consume the config.
- **Rendering**: `src/lib/sections.ts` (Payload data → neutral `SectionData`/props, asynchronous: `toSections` receives the locale, the listings and their loaders from the page, `sectionsContext`) and `src/components/PageSections.tsx` (the only file that imports Astryx).

Astryx side / Payload side: the Astryx package is never touched. Site components (`src/components/`) know nothing of Payload: for the builder they only name their parts (`data-part`, their own vocabulary) and take plain props (`vAlign` of Card, `gap` of Collection, `preview` of PageSections). The link with the data is on the Payload side: `parts`, `sample`, `minSpan` / `maxSpan` of each `ContentBlock`, conversion in `src/lib/sections.ts`. The `previewer` trial branch mixes both sides: when merged, split it as usual (Card `vAlign` and `data-part`, Collection gap, Media / MediaQuote / TextBox `data-part`, the card's 5 columns in `content-specs.ts` and their catalogue showcases through `astryx`; the rest through `payload`). If the trial fails, go back to `payload` / `main`.

## 2. Data model and width rules

Pure Payload fields, no visual value stored, nothing from Astryx persisted. `sectionFields({blocks, settings, shareable, condition})` builds them (used by the page block and the shared collection).

### Section settings

The background is asked first. Groups, each under a heading with a rule (`sectionGroup()` in `src/fields/sections/group.ts`, a `ui` field rendering the neutral `GroupHeading` or the host's own via `createSectionBuilder({groupHeading})`, here `src/fields/SectionGroupHeading.tsx` with a Nucleo icon: `obj-size-increase` for inner spacing, `view-columns` for gaps): **Ancre et sauvegarde**, **Fond de la section** (and its options), **Liseré**, **Espaces intérieurs**, **Écarts de la grille**. Headings store nothing.

| Background | Options |
|---|---|
| Light (`light`) | Shade and texture in the **background composer** (`src/fields/BackgroundComposer.tsx`, bound to `tint`, driving the hidden `texture` field; no preview box any more, the section shows below). Shades: page background (`background-body`), light silo (`background-light`, silo primary at 5 %), light highlight (`highlight-light`). Textures: none, grid, dots, diamonds |
| Dark (`dark`) | Night or night with halo (no texture), offered by name (`SwatchRadio` is gone) |
| Media (`media`) | Image or video, video poster, black overlay (0–1) |

Then, for every background:
- **Anchor**: optional id for `#anchor` links.
- **Edge line** (light only, `edgeTop`): automatic (default: the section above is light, same shade, different texture), always or never; never on the first section, nor on night or media. `Section` prop `edgeTop`, decided in `toSections` (`edgeTop()` in `src/lib/sections.ts`).
- **Top and bottom spacing**: 0 to 160 px in steps of 20 (halved below 640 px).
- **Grid gaps**: column, row and mobile vertical gap (0 to 60 px in steps of 10). « Réglage du site » inherits Settings › Mise en page (`sectionGrid` group, `siteGaps`).
- **Share**: « Enregistrer dans les sections partagées » copies the section into the shared collection and replaces it on the page with a reference (see §5).

The light tint field keeps its own `admin.condition` (without it Payload marks the column `NOT NULL` and dark or media sections cannot be saved). The builder's `condition` option sits on the `rows` array field for the same reason.

### Grid

`src/fields/sections/grid.ts` owns `GRID_COLUMNS`, `COLUMN_SPANS` (2, 3, 4, 5, 6, 7, 8, 9, 12), `snapUp`, `toSpan`, `ROW_PRESETS`, `spansKey`, `ROW_NAME_MAX` and the spacing scale. `validation.ts` is the single row/column validation (tested in `tests/int/grid.int.spec.ts`). 15 layouts, widest column first, no mirrored duplicates (columns reorder, so `8 2 2` also gives `2 8 2`):

`12` · `6 6` · `8 4` · `8 2 2` · `7 5` · `9 3` · `4 4 4` · `6 3 3` · `6 4 2` · `3 3 3 3` · `6 2 2 2` · `4 4 2 2` · `4 2 2 2 2` · `3 3 2 2 2` · `2 2 2 2 2 2`

A 16th, **Carousel**, is a preset row (`presetRows` in `src/sections.config.ts`: « a row with these widths and these block slugs », checked at start-up; the builder refuses to start when a row does not add up to 12): full width with a Collection block (swipe by default). The plain `12` stays for image, image with quote, steps and tabs. The active layout lights up whatever the column order (`spansKey`).

A row has an optional hidden `name` (22 characters max, `ROW_NAME_MAX`, builder only). A column holds **one** block; its width comes from the row layout. Its display name is the native `blockName`; **components get no display name** (Nicolas, 5 Oct. 2026: rows are named, components are not).

### Width rules

- One component per column, a row always adds up to 12. **A component fills its container**: the column is the only width authority.
- Each block declares `ContentBlock = {block, minSpan, maxSpan?, fill?, sample?, parts?}` (`src/fields/sections/contentBlock.ts`); `fill` stretches the column to the row height so cards side by side share it. Widths come from `src/components/content-specs.ts` (`minSpan`, `maxSpan`, capacity tables), tested in `tests/int/content-specs.int.spec.ts`.
- The picker offers only blocks whose range contains the column (`filterOptions`); the server rejects too narrow / too wide (« Trop étroit » / « Trop large »).
- A block whose capacity depends on its data validates its own field against `columnSpanAt(data, path)` with an explicit FR/EN message (`processStepsBlock.ts`, `collectionBlock.ts`, `buttonGroupBlock.ts`); a generic `minSpan(data)` is not needed so far.
- Cards (eight variants) take 3 to 5 columns; a clickable card 4 at most (Nicolas, 5 Oct. 2026; `CLICKABLE_MAX_SPAN` in `cardBlocks.ts`).

| Block | Component | Min. | Max. | Fill |
|---|---|---|---|---|
| Case vide | none (reserves the slot) | 2 | 12 | |
| Image | `Media` | 2 | 12 | yes |
| Image avec citation | `MediaQuote` | 6 | 12 | yes |
| Cartes (8 variants) | `Card` | 3 | 5 (clickable 4) | yes |
| Encart texte | `TextBox` (badges, title with separator, rich text, buttons; frame, centred, vertical alignment) | 3 | 9 | yes |
| Prix unique | `PriceCard` | 6 | 9 | |
| Palier de prix | `PlanCard` | 3 | 4 | yes |
| FAQ (dépliants) | `CollapsibleGroup` (question tag h2–h4, p or span) | 6 | 9 | |
| Témoignage | `TestimonialCard` | 3 | 4 | yes |
| Carte comparative | `CompareCard` | 3 | 6 | yes |
| Étapes | `ProcessSteps` | 4 | 12 | |
| Collection | `Collection` | 8 | 12 | yes |
| Onglets | `Tabs` (labels of 50 characters, rich text per tab) | 6 | 12 | yes |
| Groupe de boutons | `ButtonGroup` (attached or spaced, natural or full width) | 6 | 12 | |
| En-tête de section | `SectionHeading` (display-3, tag h2–h4, centred or left) | 6 | 12 | |
| Carte article / Carte réalisation | `Card` preset article / realisation (also Collection items) | 3 | 4 | yes |
| À retenir | `KeyPoints` | 4 | 12 | yes |
| Bandeau d’appel | `CtaBand` | 6 | 12 | |
| Bandeau de chiffres | `StatsBand` (2 on 6–7, 3 on 8–9, 4 on 12) | 6 | 12 | |
| Carte citation | `QuoteCard` | 4 | 9 | yes |
| Galerie | `Gallery` | 6 | 12 | |
| Formulaire | `SiteForm` (`docs/site-content.md`) | 4 | 12 | |

The last five before Formulaire are post figures shared with the post editor (`docs/blog-and-cases.md`): since 24 Sept. 2026 they are `hidden` (`ContentBlock.hidden`): not offered, refused on save, tables kept (no migration). Figures belong to posts and case studies; pages use number cards, framed text boxes, images and button groups.

Capacities:
- **Tabs**: 4 on 6–7 columns, 6 on 8–9, 8 on 12 (`tabsCapacity`, checked on `items`); each tab keeps 144 px, long labels wrap and the strip scrolls.
- **Button group**: 2 / 3 / 4 buttons on 6–7 / 8–9 / 12 (`buttonsCapacity`), both modes; spaced, each button gets an inner column and the section's column gap. Button settings shared with the text box (`src/fields/blocks/buttonFields.ts`); icon on simple buttons only.
- **Steps**: 1 step on 4–5, 2 on 6–7, 3 on 8–9, 4 on 12 (`stepsCapacity`), checked on `steps`.
- **Collection**: identical items (testimonials, cards, compare cards, tiers, post or case cards, or the latest posts / case studies) side by side, 3 per view at most on 8–9, 4 on 12 (`collectionCapacity`, checked on `perView`). Layout « swipe » (no more items than visible, 4 at 25 % at most; peek and dots below 640 px) or « carousel » (arrows, segments / dots / numbers, page or item step; segments and dots become « 3 / 12 » beyond ten pages). 2 to 24 latest entries (`limitValidate`: a custom validate replaces Payload's min / max). Optional « see all » button (`moreLink`: blog, case studies or custom; label from the listing settings unless typed), left of the arrows, in their place below 640 px, also in swipe. Gap between items follows the section's column gap (`--section-gap-x`) unless `itemGap` (« Écart entre les éléments », X only) is set. Listing-fed collections (« Derniers articles du blog », « Dernières réalisations ») are loaded by `toSections`.
- **Text box**: Lexical restricted to paragraphs, bold, italic, links, lists (`textBoxEditor`), rendered by `RichText`; its two display title sizes need 6 columns (checked on the size field).
- Icon, number and title-only cards have « Alignement vertical dans la rangée » (`vAlign`: top, centre, bottom).
- **Image / image with quote**: `next/image` with `fill`, centred crop, lazy, `sizes` from the column width (the 1440 px of that rule is a host detail). Desktop minimum height only when the row has no other content (next to a card, the image takes the row height); mobile minimum height always below 768 px; optional black overlay (0–1). Image with quote adds a centred sentence, a tag (`h2`–`h6`, `p`, `span`) and a size (`display-1`, `display-2`, `display-3`, `heading-1`, `heading-2`), rendered with `MediaTheme mode="dark"`; it grows if the sentence is taller than the minimum height.

### Title tags

Every title field comes with the shared `tag` select (`tagField()`, `src/fields/tagField.ts`: h2 to h6, p or span, structure and SEO only). The component renders it through `Title` (`src/components/TitleTag.tsx`): the tag never changes the look. Today: card titles (h3), step titles (h3, one tag per panel), tier names (p), guarantee titles (p), FAQ questions (h3), image-with-quote sentences. Rule for new blocks: a title field, a tag field, a component taking `tag`.

### Mobile order

Below 768 px every column of the section, all rows together, is stacked in the section's mobile order: a hidden `mobileOrder` field per column (position within the section). The site renders one CSS grid per section, so CSS `order` mixes columns of different rows (`--mobile-order`, `src/app/(frontend)/styles.css`). Empty columns are hidden on mobile. On `main` the phone button of a row opens the mobile order dialog (drag lines; **Reprendre l’ordre desktop** clears it). On `previewer` that dialog is gone: stored values still apply, the mobile order is still to be placed.

### Drag and drop

One module, `src/fields/sections/sortable.tsx`, on dnd-kit: `SortableList` (axis `x` or `y`) and `SortableItem` (render prop with `attributes`, `listeners`, `setNodeRef`, `transform`, `transition`). Mouse after 5 px, touch after a 200 ms press, keyboard Space / arrows / Space. Axis-specific strategy (items of different sizes), movement restricted to axis and container. dnd-kit is pinned to Payload's versions (`@dnd-kit/core` 6.3.1, `@dnd-kit/sortable` 10.0.0, `@dnd-kit/modifiers` 9.0.0, `@dnd-kit/utilities` 3.2.2) so one copy is installed. Payload's `DraggableSortable` is not used (equal-size assumption makes columns jump). Layout tiles in the dialog use native drag and drop (`LAYOUT_DRAG_TYPE`).

### On `main` (before the dialog)

Two collapsibles, **Réglages de la section** and **Rangées** (shown once a background is chosen). Double-click a layout adds a row below the selection (or at the end); click a row selects it (white outline); a layout clicked with a row selected replaces its layout after confirmation (same column count: widths only; different: columns recreated empty; nothing if unchanged). Clicking a column of the selected row opens the column drawer (« Vider la colonne », final once saved; « Nom affiché dans le constructeur », 60 characters, the `blockName`; the block's fields); a column of another row only selects the row. Row handle, duplicate, delete (with confirmation). Columns reorder with their handle (⋮⋮); a tile turns red « Trop étroit ».

## 3. Adding a column block

1. **Branch `astryx`**: the component in `src/components/`, its showcase in the `/design` catalogue, its minimum width in `src/components/content-specs.ts`.
2. **Branch `payload`**: a `ContentBlock` in `src/fields/blocks/` (Payload block + `minSpan` from the registry) added to `blocks` in `src/sections.config.ts`; conversion in `src/lib/sections.ts`, rendering in `PageSections.tsx`. Mark its parts (§4) and give it a `sample`.
3. **Picker preview**: add the slug to `PREVIEW_SLUGS` (`src/fields/blocks/previews.ts`) and a demo in `src/app/(frontend)/apercu/[slug]/Apercu.tsx`, then `pnpm previews:build` (see §4, Picker images).
4. **Database**: back up, `pnpm migrate:create <name>`, review, `pnpm migrate`, regenerate types. A change without new fields must generate nothing with `pnpm payload migrate:create x --skip-empty`.
5. **Tests**, never on a real page: extend `pnpm smoke:sections` (dev server running; creates a throwaway page with every block, checks width rules and site rendering, deletes it); add the block to `pnpm seed:demo` (recreates `/demo-tarifs`, `/demo-contenus`, `/demo-etapes`); `pnpm test:int`, `pnpm run lint` (0 errors), `pnpm exec tsc --noEmit`.

## 4. The « Gérer » dialog

A section in the page form shows its identity line (§5) and a « Gérer » button opening a full-screen dialog. `SectionManager.tsx` is the custom `Field` of an unnamed collapsible wrapping the two framed blocks of `sectionFields()`; it renders their children with `RenderFields` at the paths Payload's own collapsible would use (`parentIndexPath` `<indexPath>-<n>`). Presentation only: **no migration** (checked with `migrate:create --skip-empty`). Saving is unchanged: fields live in the page's form, saving publishes (no drafts). Shared sections use the same dialog; their preview takes the site's silo.

### Layout

- **Header**: title; in the middle the document fields the host lists (`headerFields`: the page's silo; nothing on a shared section); on the right « Enregistrer » (document save, dialog stays open), « Enregistrer et fermer » (stays open if a field is refused), « Fermer » (nothing saved), each with an icon.
- **Top part**: four horizontal accordions (one open, the others folded to a vertical strip): « Fond et espaces », « Découpage », « Composants », « Contenu ». They slide open sideways (300 ms; the content keeps its full width; folded panels are `inert` and stay mounted, keeping their field state; closing the dialog unmounts them, values stay in the form state; no animation with « reduced motion »).
- **Height**: 280 px when the dialog opens (`--sm-top-height`; Nicolas, 5 Oct. 2026), the preview takes the rest. **One height in every panel and whatever is chosen** (Nicolas, 2 Oct. 2026). A handle between the two (drag, or arrow keys) sets the share from 20 % to 80 %; double click returns to the opening height; nothing is remembered.
- **No line of help anywhere in the top part** (Nicolas, 5 Oct. 2026): instructions go in « i » bubbles.

### Panels

- **Fond et espaces**: groups side by side, one column per group (background, edge line, inner spacing, grid gaps), each centred in the height; it scrolls sideways if needed, never down. Every setting shows from the start; only the rows wait for a background. In `orbitaSectionSettings` a group's fields must follow its heading (the dialog cuts columns at headings; the edge line group comes after every background field for that reason). Mechanism: `sectionFields()` gives the heading names (`groups`); the dialog renders the settings once per group with the other groups' fields as holes (`byGroup` in `fieldGroups.ts`) so each field keeps its Payload path. `forceRender` is needed (Payload renders fields when they come on screen); a group whose fields are all hidden by a condition is hidden in CSS (`:has`).
- **Découpage**: two lines of layout tiles (48 px each), then the rows as a **line of squares** (260 × 126 px, columns 72 px high; scrolls sideways), left to right = top to bottom. Without rows it keeps its height; while rows wait for a background it shows a disabled copy (`RowsBuilderGhost`). Layouts are **dragged** onto the line: between squares or at the end adds a row (a bar marks the place); on a square's middle replaces its layout after confirmation; a preset row always adds. Enter on a tile adds its row at the end. No click on tiles, no row selection. A square shows the row's number or name (click to type), and move / duplicate / delete always visible; dragged sideways to reorder. Inside a square a column drags sideways (Alt + arrows); click selects, double click (or Enter) opens its content; double click on an **empty** column opens a box over the whole dialog (Nicolas, 5 Oct. 2026; same `BlockLibrary` and images) with only the components that fit its width: one click places it and closes the box. A row error shows as red text beside the tiles. No full-size cells, no mobile order dialog.
- **Composants** (`BlockLibrary.tsx`): thumbnails (`public/apercus`) in wrapping rows; **this panel scrolls down** (Nicolas, 5 Oct. 2026: the no-vertical-scroll rule does not apply to it). Each is the picture alone, edge to edge, **220 px high**, width from its proportions (an `<img>`). Hover and focus: a 90 % white veil with the name and accepted widths in black (its `aria-label`), gone while pressed. **The first tile holds the instructions** (drag onto a column, the « not allowed » cursor, a click). Order: the host's `blocks` (cards first), rearranged to fill rows rightwards (`packRows.ts`: each row starts with the next block, then takes among the ten that follow the set leaving least room; recomputed on resize). Dragged onto a preview column (native drag and drop): the admin draws one zone per column over the frame from the boxes it reported; a column too narrow or too wide is no drop target (« not allowed » cursor, only during the drag); dropping on a filled column asks before replacing. A click places it in the selected column. A placed block starts with `sample` texts (field path → value; scalars and rich text, no array rows; declared on cards, Image with quote, text box, section heading, testimonial), and each top-level `upload` gets a random image of its collection (REST, images only).
- **Contenu** (`ColumnContent.tsx`, replaces the column drawer): the selected column's block fields, one per cell on a grid filling the width (`Flow`). Tracks are half columns (96 px at least): a short field or upload one column, a textarea a column and a half, a rich text or array two. One line if all fit, else two (short fields two per column), beyond that sideways scroll; a full-height cell scrolls on its own; a column is 400 px wide at most; labels stay on one line (ellipsis), the content language is not shown. `cells()` opens up rows; a row of three short fields or more stays one cell two columns wide; a small group of short fields (a link) stays one two-column cell, a larger group is opened up; a group may hold a textarea; a list of rows with one or two short fields takes a column and a half; a group heading goes with the next field; a clickable card is four columns. **A title and its tag go one under the other** in one cell (`admin.custom.below`, set by `tagField()`, `below: false` without a title just before; set by hand on section heading and image with quote). **A block with group headings gets one column per group** (`blockCells`; text box, collection: « Mise en page », « Éléments », « Bouton voir tout »). To reorganise a packed block, add `groupHeading()` fields (no database change, restart `pnpm dev`). A taken-apart group shows only while its condition passes (`when` of a cell). Keep labels short, examples in `description`. The two price blocks still scroll sideways at 1920 px; some scroll is fine (Nicolas, 5 Oct.). « Vider la colonne » is here; on an empty column it says to place a component first (no list, Nicolas, 2 Oct. 2026). Opened by a double click on a square's column, by the preview pencil, or a double click on the preview column. `pnpm shots:content` captures every block's panel on a throwaway page (`SHOTS_OUT=<folder>`, `SHOTS_ONLY=slug1,slug2`, `SHOTS_WIDTH`, default 1920).

**Still to come** (Nicolas): the width warnings, placing the mobile order, marking the other components for in-place editing, rich text in place if it is worth it.

### Live preview of the section

`SectionPreview.tsx` (iframe, debounce, width switch, scale), `LivePreview.tsx` (form values → preview). The section alone, rendered by the site, about 400 ms after each change, **without saving**. Width switch as icons: full panel width, desktop 1440, tablet 990, mobile 420 (per user, preference `section-preview-width`); the frame is scaled down when wider than the panel and centred both ways. It is exactly as tall as the section (`PREVIEW_SIZE`): nothing shows below it (Nicolas, 1 Oct.).
- An empty section shows its background, paddings and a dashed « Colonnes » zone (`slot` of `PageSections`, preview only). In a section with content, empty columns show « Colonne vide » at desktop and tablet, hidden on mobile; an empty column shows its width (« 6 / 12 ») and no pencil. Dashed zones use a 6 % veil of the text colour (`--color-background-muted` is opaque on light sections and hid the texture).
- Edge line: the dialog also sends the section above (`above`, unsaved changes included), through `toSections` but not displayed. On purpose (Nicolas, 1 Oct.): on the **first** section « always » shows the line in the preview, although the page draws none there.
- In the preview a click selects the column (no outline, a light one on hover, and the pencil). Marked parts: a text is typed in place (Enter or blur keeps, Escape gives up; only when the shown text is the stored value, otherwise the content panel opens); an image, icon or link shows its Payload field in a small panel beside it (`FieldPopover.tsx`; a link: its group or the array of buttons). Links do not navigate. Rich texts are edited in the content panel. A block rendering nothing yet shows a zone named after it, one click from its image field.
- **Marking a component**, two steps: the component names its parts (`data-part="title"` on the element whose only child is the text; `data-part-kind="image"`, `"icon"` or `"link"`), and the block declares the field each part shows (`parts`: `{title: 'title', action: 'cta.label'}`; image or icon fields must be top-level). Marked: cards (title, text, image, icon, action link), Image and Image with quote (image, sentence), text box (title, buttons), button group (buttons).

**Protocol** (`preview.ts`): `PREVIEW_READY` (frame → admin, each load), `PREVIEW_DATA` (admin → frame: section values as stored, the requested document fields, document id, collection, locale, `language` of the admin for the frame's own texts), plus `PREVIEW_LAYOUT`, `PREVIEW_SIZE`, `PREVIEW_SELECT`, `PREVIEW_OPEN`, `PREVIEW_EDIT`, `PREVIEW_PICK`. Option `preview: {url, documentFields, breakpoints}` of `createSectionBuilder`; site: `preview: {url: '/apercu-section', documentFields: ['silo']}`.

**Preview route** `src/app/(frontend)/apercu-section/`, admin users only: `actions.ts` (`sendSectionPreview` checks the admin session) stores the data in `store.ts` (in memory, per frame, 10 minutes); `SectionPreviewFrame.tsx` listens, calls the action and `router.refresh()` (not while a text is typed: the caret would be lost); `render.tsx` runs `payload.findByID({data, depth: 2})` to populate unsaved IDs, then `toSections` and `PageSections` in the page's silo.

**Preview facts to keep in mind** (tech lead's answers, 6 Oct. 2026): the store is the server's memory, one process, retention `PREVIEW_TTL_MINUTES` (10 by default); the frame shows « Aperçu non mis à jour » when a section could not be kept (too heavy, session lost). The read of the unsaved section uses `flattenLocales: false` (a localized rich text would come out empty otherwise). `toSections` keeps each conversion's context in an `AsyncLocalStorage` (`src/lib/sections.ts`), never in module variables: concurrent renders do not mix. A block placed from the library starts without an image; the preview draws `public/placeholders/image.jpg` (`video.mp4` is there for the same use, unused yet).

### Info bubbles

**One component for every bubble**, `InfoBubble.tsx` + `InfoBubble.scss` (Nicolas, 6 Oct. 2026: never two implementations of the same thing). Hover, keyboard focus or click; Escape closes the bubble only. Look (Nicolas, 6 Oct. 2026): an 18 px disc, no border, no hover change but the bubble, which opens over the « i » with the « i » in a corner; disc and bubble are the theme's inverse. One « i » beside each group title (`help` of `sectionGroup` / `groupHeading`: write one for every new group), one right of the layout tiles, and one glued to the label of **every field with a `description`**: `withHelpBubbles` (`helpBubbles.ts`, applied by `createSectionBuilder` to every builder field, blocks included) gives it the `HelpLabel` label and a silent description. A function description stays Payload's line.

### Tokens and Payload internals

- **`tokens.scss`**: the tool's own variables (`--sm-*` on `:root`): every measure (top height, squares, thumbnails, content tracks, bubbles) and the few colours Payload's theme lacks. Change a size there and nowhere else; TypeScript reads it through `token()` (`tokens.ts`). Even values only, no font under 14 px.
- **`_payload.scss` and `payloadDom.ts`**: the only place Payload's internal class names are written (`.field-type`, `.render-fields`, `.rs__control`…). No public contract: check them first after a Payload upgrade; `pnpm smoke:manager` fails when a main class is gone.
- Payload's select menus are not portalled: `useSelectMenus.ts` keeps each inside the top part (`MutationObserver` on `.rs__menu`: shorter scrolling list, or upwards; Payload 3.88 react-select classes).
- Payload's drawers opened from the dialog stack above it (dialog `z-index` 100): keep it below them.

### Picker images

Screenshots of `/apercu/<slug>` (blue silo, light mode, lorem ipsum) made by `pnpm previews:build` while `pnpm dev` runs (`PREVIEW_ONLY=slug1,slug2` to redo some), saved under `public/apercus`, used as `imageURL`. The component alone, edge to edge, at 2x (`PREVIEW_SCALE`). `FRAME` in `Apercu.tsx` sets per slug the render width (480 by default) and `inset` for components without a surface (section heading, FAQ, button group, gallery, collection). The script prints size and ratio. Aim for a height of about 240 to 480 CSS px and a ratio under about 3; give a flat component more content rather than a margin. Payload's blocks drawer shows them whole in 4:3 cells (`custom.scss`).

## 5. The page form line (Gérer / anchor / sharing)

Outside the dialog, **on one line** (Nicolas, 6 Oct. 2026; row `section-identity`), aligned at the top, no help line: « Section » with its « i » over the « Gérer » button, the anchor with its « i », the sharing box with its « i » (`ShareField.tsx`, pages only). **The shared section takes the section's name** (its header, Payload's blockName; `sharedTitle` is gone, migration `20261006_082539_shared_section_named_by_block`): without a name the box cannot be checked and its « i » says why; on save `shareSectionsHook` (`shareSections.ts`) refuses a section without a name or whose name a shared section already has, with a `ValidationError` on the box (not a field `validate`: Payload validates after this hook).

Opening state: a page opens with every section folded. Payload's per-user memory of folded accordions would win over `initCollapsed`, so the preferences endpoint drops the `collapsed` entries of pages and shared sections (`src/fields/noCollapseMemory.ts`, applied on the sanitised config in `payload.config.ts`).

Admin forms: `groupHeading()` (`src/fields/groupHeading.ts`) structures the dense forms (text box: Titre, Texte, Disposition; hero: Texte, Boutons, Fond, Fil d'Ariane; modals: Titre, Affichage, Contenu). Admin rhythm in `src/app/(payload)/custom.scss` (constant gap between fields, group-heading style for list and group titles, checkboxes on the input line, rich text framed, air under a block bar), written against Payload 3.88 class names.

## 6. Payload's page live preview

Payload's built-in Live Preview (no paid plugin), server-side mode, kept since 17 Sept. 2026 (PR #30).
- `src/livePreview.ts`: collections pages, posts, case-studies; globals blog, portfolio; breakpoints mobile 390, tablet 768, desktop 1440.
- `src/components/LivePreviewRefresh.tsx`, in the site layout, reloads the route on admin save (`RefreshRouteOnSave`, `@payloadcms/live-preview-react` 3.88.0); renders nothing outside the iframe.
- No drafts: the preview follows each save, saving publishes. Drafts with autosave would need versions tables and a draft-aware site: to decide.
- « Vue » menu before the eye (`src/fields/PreviewLayoutMenu.tsx`, `beforeDocumentControls` on pages, posts, case studies and the two listing globals): « Côte à côte » (Payload's, preview 60 %), « Dessus / dessous » (preview in the bottom half), « Fenêtre » (preview in a dialog, closed by its button or Escape). Picking one opens the preview. Remembered per user (preference `live-preview-layout`, no migration), set as `data-preview-layout` on `<html>`; the two extra layouts are CSS in `src/app/(payload)/custom.scss` against Payload 3.88 classes (`collection-edit__main-wrapper`, `live-preview-window--is-live-previewing`): check after updates. Payload's « pop out » button stays.

## 7. Rules and traps

- **Three layers.** `src/fields/sections/` is the neutral section builder (future Payload
  plugin: grid, rows, columns, mobile order, drag and drop, validation). It knows no
  component, no theme, no media collection and never imports `src/components/`. The site's
  choices live in `src/sections.config.ts` (section settings, block list, row condition)
  and `src/fields/blocks/` (one `ContentBlock = {block, minSpan, maxSpan?, fill?}` per
  block). Rendering: `src/lib/sections.ts` (Payload data → props, async) and
  `src/components/PageSections.tsx` (Astryx components).
- **Tests.** Never on a real page. `pnpm smoke:sections` (dev server running) creates a
  throwaway page with every block, checks the width rules and the site rendering, then
  deletes it: extend it with every new block. `pnpm test:int`, `pnpm run lint` (0 errors),
  `pnpm exec tsc --noEmit`. `pnpm seed:demo` recreates the three demo pages
  (`/demo-tarifs`, `/demo-contenus`, `/demo-etapes`): add the new blocks there too.
  `pnpm smoke:manager` (dev server running): throwaway page and admin user, deleted with their
  locks and preferences; checks an unsaved image's population, the closed preview page, the
  dialog, live shade and title, the width switch, the drawer above the dialog, and that nothing
  was saved.
- **Picker previews.** `PREVIEW_SLUGS` in `src/fields/blocks/previews.ts`, one demo per
  slug in `src/app/(frontend)/apercu/[slug]/Apercu.tsx`, then `pnpm previews:build`.
- **Known traps.** A block file that imports `@payloadcms/richtext-lexical` (server) must
  never be imported by client code: keep its slug in a separate module (see
  `textBoxSlug.ts`), otherwise Next fails with « Can't resolve 'fs' ». Payload's database
  adapter reads `admin.condition` on array / block / group fields to make required columns
  nullable: do not remove the `condition` of the `rows` field. The dev server (started by
  Nicolas) sometimes keeps a stale server render for a catalogue route after a component
  change: a hydration error on one `/design/composants/*` route only means restart
  `pnpm dev`, not a bug.
- **Titles.** Every title field comes with the shared `tagField` (h2 to h6, p or span) and
  the component renders it through `Title` (`src/components/TitleTag.tsx`): the tag never
  changes the look.
- **Widths.** Minimum and maximum spans come from the catalogue's registry,
  `src/components/content-specs.ts` (`minSpan`, `maxSpan`, capacity tables such as
  `stepsCapacity`), tested in `tests/int/content-specs.int.spec.ts`. A block whose
  capacity depends on its data validates its own field against `columnSpanAt(data, path)`
  with an explicit FR/EN message (see `processStepsBlock.ts`, `collectionBlock.ts`).
- **New `ui` field outside a block** (e.g. a group heading): restart `pnpm dev` (Payload caches
  its client config), or the form fails with « Cannot use 'in' operator to search for 'hidden'
  in undefined ».
- **Centrally managed labels are not editable in the preview** (Nicolas, 2 Oct. 2026): the link
  label of post and case study cards (Blog / Case studies settings), a carousel's « see all »
  button. Card marks only its `bloc` preset, CarouselControls nothing. Never mark a part whose text
  does not come from a field of the block itself.
- **A server action cannot return the rendered section**: its client components are not in the
  page's manifest (« Could not find the module … in the React Client Manifest »): hence the store
  and the route refresh.
- **The preview store is in server memory**: fine with one Node process; on several instances or
  serverless, replace it (a table, a cache) first (`docs/tech-lead-open-questions.md`).
- Escape pressed inside the preview frame does not reach the admin: the field panel takes focus when
  it opens and catches Escape before the dialog would close.
- A drag started in the admin cannot be followed inside the frame: hence the zones drawn over it.
- A clickable card stretches its link over the card (pseudo-element): in the preview these overlays
  take no pointer events (frame CSS) and the frame finds the marked part whose box holds the click
  (`partAt`): only the link's bar opens the link's fields.
- Typing in place relies on the marked element having the text as its only child.
- The frame's messages for the editor (empty section, not logged in) are French only; its other
  texts (empty zones, pencil) follow the admin language.
- Payload internal class names (`_payload.scss`, `payloadDom.ts`, `custom.scss`, select menus):
  written against Payload 3.88, check after every update.

## 8. Files

`src/fields/sections/`:
- `builder.ts`: `createSectionBuilder()` (field, shared collection fields, share hook, preset check, `withHelpBubbles`).
- `sectionFields.ts`: `sectionFields()` factory (settings, rows, columns, `groups`, row `name`).
- `grid.ts`: grid constants, layouts, `spansKey`, spacing scale, `ROW_NAME_MAX`.
- `validation.ts`: row and column validation.
- `contentBlock.ts`: the `ContentBlock` type.
- `emptyBlock.ts`: the structural empty cell (« Case vide »).
- `blockName.ts`: a column component's name is Payload's `blockName` (`BLOCK_NAME_MAX` 60, checked on save, no field in the dialog).
- `gaps.ts`: grid gaps (`gapX` between columns, `gapY` between rows, mobile gap).
- `group.ts` + `GroupHeading.tsx`: `sectionGroup()` headings.
- `helpBubbles.ts`, `HelpLabel.tsx` + `.scss`, `InfoBubble.tsx` + `.scss`: the « i » bubbles.
- `mobileOrder.ts`: mobile order, shared by the admin builder and the front-end rendering.
- `sortable.tsx`: dnd-kit wrappers.
- `shareSections.ts`, `ShareField.tsx`: sharing hook and box.
- `SectionManager.tsx` + `.scss`: the button and the dialog shell.
- `RowsBuilder.tsx` + `.scss`: layout tiles and line of squares (`RowsBuilderGhost`).
- `BlockLibrary.tsx` + `.scss`: component thumbnails; `packRows.ts`: row packing.
- `ColumnContent.tsx` + `.scss`: the content panel.
- `FieldPopover.tsx` + `.scss`: one field beside the clicked part.
- `SectionPreview.tsx` + `.scss`, `LivePreview.tsx`: the preview iframe and its data.
- `preview.ts`: the message protocol.
- `managerContext.ts`: selected column, opening its content.
- `fieldGroups.ts`: `byGroup`, `only` (field subsets at exact paths).
- `useSelectMenus.ts`: select menus kept inside the top part.
- `tokens.scss` + `tokens.ts`: `--sm-*` variables and `token()`.
- `_payload.scss` + `payloadDom.ts`: Payload internal class names.

`src/app/(frontend)/apercu-section/`: `page.tsx` (admin only), `SectionPreviewFrame.tsx`, `actions.ts`, `store.ts`, `render.tsx`. Picker demos: `src/app/(frontend)/apercu/[slug]/`.

## 9. As a plugin (reflections, nothing started)

Goal (Nicolas, 5 Oct. 2026): reuse the builder and its live preview on the next Payload sites, all on Astryx, with theme rules (at least one silo; the same colour groups for every silo).

**Already plugin-grade**: pure Payload data; the `sectionFields()` / `createSectionBuilder()` factories; dependency-free modules (`grid.ts`, `mobileOrder.ts`, `sortable.tsx`); `RowsBuilder.tsx` uses only Payload form state and `--theme-elevation-*`; blocks declare themselves (`ContentBlock`, labels from Payload's client config, spans via `clientProps`); the builder's SCSS sits next to its components; `imageAltText` no longer hard-codes French; the front end split (data → `SectionData` → `PageSections.tsx`). The front-end side waits: the Astryx renderer stays the default.

**Three pieces rather than one plugin**:
1. The plugin, knowing nothing of Astryx (`src/fields/sections` today).
2. A written contract: the site's (column components with min/max widths, a preview page that draws a section, a converter from Payload data) and the theme's (silos: at least one, same colour groups under the same names). It must be a TypeScript type plus a start-up check, like the preset row check; a single-silo theme hides the silo switch.
3. A small Astryx adapter (silos, silo switch, background shades, theme wrapping of the preview), today spread over `src/sections.config.ts`, the `apercu-section` page and `src/theme`; it should give the section settings by default.

**What remains**:
- Front-end resolver and renderer: split `lib/sections.ts` into a neutral resolver (`resolveSections( data, {siteGaps})` → `{rows: [{columns: [{span, mobileRank, empty, block}]}]}`) and Astryx mappers; `PageSections` / `<Sections>` with `renderSection` / `renderBlock`; ship the `.section-grid` / `--mobile-order` CSS (today scoped under `[data-astryx-theme^='orbita']` in `styles.css`, assuming `.astryx-grid`) with the renderer.
- Host details still in the core: preview images under `/apercus/`, gap inheritance from the Settings global (`siteGaps`), the 1440 px of `sizes`; hard-coded slugs (`relationTo: 'media'`, `'sections'`, `data.sections`, `data.title`, `blockType === 'section'`) to become options.
- i18n: the core reads `@/i18n/admin` (`tr()`, `Message`, `useAdminText`); ship them or use Payload's `translations`. Site-specific texts (« Choisis d'abord un fond », the pencil, 1440 / 990 / 420) to be neutral or host-given.
- The preview page: suggested, the plugin gives the frame and protocol, the site one function « draw this section ». The in-memory store and Payload internal class names matter more when every project has its own hosting and Payload version.
- Package: move `src/fields/sections/` out, export `createSectionBuilder` and a `sectionBuilderPlugin()` wrapper adding the field and hook to named collections. Sketch:

```ts
sectionBuilderPlugin({
  collections: {pages: {field: 'sections'}},
  sharedSections: {slug: 'sections'} | false,
  media: 'media',
  blocks: [{block: mediaBlock, minSpan: 2}, {block: cardBlock, minSpan: 3}],
  settings: Field[],
  grid: {columns: 12, spans: [...], presets: [...]},
  gaps: {values, defaults, siteGlobal?: {slug, path}},
  spacing: {values, default},
});
```

**Order**: do not extract now (an abstraction from one project is nearly always wrong). 1. Finish and merge the trial. 2. Write both contracts as types with the start-up check, gather the Astryx adapter in one folder. 3. Graft by hand onto the second project. 4. Only then make a package.

**Open questions**: will every next site use Astryx (a stricter adapter) or another design system? Do the column components travel with the tool (a second, heavier package)? Who keeps the contract up to date when Astryx changes: Nicolas or the tech lead?
