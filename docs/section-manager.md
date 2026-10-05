# Section manager (« Gérer » dialog) and its live preview

Trial started on 1 October 2026 on the `previewer` branch (Nicolas's design, feasibility and plan in
`etude-apercu-rangee/faisabilite.md`). It replaces the in-page editing of a section; if the trial
fails, go back to `payload` / `main`.

## What it is

In a page, a section shows its name, a « Gérer » button and, below it, its anchor and (on a page)
the « save as shared » checkbox: these two stay in the document's form, not in the dialog. The
button opens a full-screen dialog:

- top (280 px by default): the settings, in three horizontal accordions (one open, the others folded to a
  vertical strip): « Fond et espaces », « Découpage », « Blocs ». In the first one the groups of
  settings sit **side by side, one column per group** (background, edge line, inner spacing, grid
  gaps), so the top part does not scroll down; it scrolls sideways if the columns do not all fit;
- the top part's height: **280 px** when the dialog opens (`TOP_HEIGHT`; Nicolas, 5 Oct. 2026), the
  preview takes the rest of the screen. **One height in every panel and whatever is chosen**
  (Nicolas, 2 Oct. 2026). The layout panel is built to fit in it: two lines of layout tiles (48 px
  each), then the line of squares (126 px, which keeps that height without rows; while the rows
  wait for a background the panel shows a disabled copy of itself, `RowsBuilderGhost`). In the
  first panel each group of settings is centred in that height;
- **no line of help anywhere in the top part** (Nicolas, 5 Oct. 2026): instructions wait in an
  « i » bubble (`InfoBubble.tsx`: hover, keyboard focus or click; Escape closes the bubble only).
  One « i » beside each group title of « Fond et espaces » (`help` of `sectionGroup` /
  `groupHeading`: what the group's settings do; write one for every new group, and no
  `description` on the fields under it), one at the right of the layout tiles (how to drag a
  layout; an error on a row shows as a red text beside it), and for a block's field that has a
  description (« Contenu » panel) an « i » after its label (CSS at the end of
  `SectionManager.scss`). The frame's own texts (empty zones, the pencil) follow the admin's
  language: it travels with each section (`language` of the data message). The components list explains itself in its first tile (below);
- between the two, a handle: drag it (or focus it and use the arrow keys) to change the share, from
  20 % to 80 % for the settings; a double click goes back to the opening height; nothing is
  remembered: the dialog always opens at that height;
- header: the title, in the middle the document's fields the host listed (`headerFields`: the
  page's silo; nothing on a shared section, which has none), then, on the right, « Enregistrer »
  (the document's own save, the dialog stays open), « Enregistrer et fermer » (it stays open if a
  field is refused) and « Fermer » (nothing saved), each with an icon;
- the accordions slide open sideways (300 ms; a panel's content keeps its full width, the panel
  uncovers it; folded panels are `inert`; no animation with « reduced motion »);
- bottom (the rest): the live preview of this section alone, rendered by the site, refreshed about
  400 ms after each change, **without saving**; a width switch, as icons without the figures (full width of the panel, as in the browser, then
  desktop 1440, tablet 990, mobile 420; remembered per user, preference `section-preview-width`), the frame being scaled down when
  it is wider than the panel, and centred in the panel both ways. The frame is exactly as tall as the section (it
  reports its height, `PREVIEW_SIZE`): only the section shows, nothing below it (Nicolas, 1 Oct.).
  A section without content (no row, or only empty columns) shows its background, its top and
  bottom paddings and a dashed zone « Colonnes » where the columns will be (`slot` of
  `PageSections`, given by the preview only).

The edge line (« Liseré ») shows in the preview as on the page: the dialog also sends the section
just above (`above`, from the form, unsaved changes included), which goes through `toSections` but
is not displayed. So « always » shows the line, « automatic » shows it when the section above is
light, of the same shade, with another texture (rule of `edgeTop()` in `src/lib/sections.ts`).
One difference with the page, on purpose (Nicolas, 1 Oct.): on the **first** section, « always »
shows the line in the preview, although the page draws none there (the page top has its own edge at
that junction).

Every setting of the first panel shows from the start, before a background is chosen; only the rows
wait for it (`condition`). Night shades are offered by name (the `SwatchRadio` component is gone).
In `orbitaSectionSettings`, a group's fields must follow its heading: the dialog cuts the columns at
the headings (the edge line group comes after every background field for that reason).
The dashed zones of an empty section have a light translucent background: a 6 % veil of the text
colour (the theme's `--color-background-muted` is opaque on light sections and hid the texture).

The background composer (`src/fields/BackgroundComposer.tsx`) lost its preview box on the same day:
the section itself is visible below.

Saving is unchanged: the fields live in the page's form, the page is saved as usual (and saving
still publishes: no drafts).

## Stages

1. **Done (1 Oct. 2026).** Dialog, accordions, live preview, width switch. Panel 1 = the section
   settings; panel 3 = a placeholder.
2. **Rows, done (1 Oct. 2026; drag and drop of the layouts, 2 Oct.).** Panel 2 = the layout
   thumbnails, then the rows as a **line of squares** (260 × 126 px, their columns 72 px high; the line scrolls
   sideways when they do not all fit), left to right = top to bottom in the preview.
   - **Layouts are dragged onto the line of squares** (native drag and drop, `LAYOUT_DRAG_TYPE`):
     dropped between two squares or at the end, a layout adds a row there (a bar marks the place);
     dropped on the middle of a square, it replaces that row's layout, after confirmation; a preset
     row (Carousel) always adds a row. At the keyboard, Enter on a thumbnail adds its row at the
     end. No click or double click on the thumbnails, no row selection: clicks are for the columns.
   - A square carries the row's number, or its name (a click on it to type one, 22 characters at
     most: `ROW_NAME_MAX`; field `name` of a row, hidden, builder only, migration
     `20261001_131455_row_name`), and three buttons, always visible: move, duplicate, delete. It is
     dragged sideways to reorder the rows.
   - Inside a square, a column is dragged sideways to change place in its row (Alt + arrows at the
     keyboard); a click selects it, a double click (or Enter) opens its content.
   - No full-size column cells and no « mobile order » dialog any more (stored `mobileOrder`
     values stay and still apply): the mobile order is still to be placed.
3. **Columns' contents, done (1 Oct. 2026).** Four accordions: the third is « Composants », the
   fourth « Contenu ».
   - **Composants** (redone on 5 Oct. 2026): the blocks as thumbnails (the picker images,
     `public/apercus`) in rows that wrap; **this panel scrolls down, not sideways** (Nicolas, 5 Oct.
     2026: the « no vertical scroll in the top part » rule does not apply to this list). Each
     thumbnail is the picture alone, edge to edge, **220 px high** and as wide as the picture's own
     proportions make it (an `<img>`: the core knows no format). No line of help above the list. On
     hover and keyboard focus a white veil (90 %) covers the whole thumbnail and shows the block's
     name and accepted widths in black (they are its `aria-label`); the veil goes while the thumbnail is
     pressed, so the picture that follows the pointer stays clear. **The first tile is not a block**: it holds the instructions (drag onto a column, the « not allowed » cursor, a click), always shown. The list follows the host's order (`blocks` of `src/sections.config.ts`: the cards first), rearranged just enough to **fill each row towards the right** (`packRows.ts`: each row starts with the next block, then takes among the ten that follow the set that leaves the least room; recomputed when the panel's width changes). A thumbnail is dragged onto a column of the preview (native drag and drop):
     while it is in the air the admin draws one zone per column over the frame, from the boxes the
     frame reported; a column too narrow or too wide for the block is not a drop target, so the
     browser shows the « not allowed » cursor, **only during the drag**. Dropping on a filled
     column asks before replacing. A click on a thumbnail places it in the selected column.
     A block placed this way starts with placeholder texts (lorem ipsum), so it shows at once:
     `sample` of its `ContentBlock` (field path → value; scalars and rich text documents, no
     array rows). Declared so far: cards, Image with quote, text box, section heading,
     testimonial. Each image field of the block (a top-level `upload`) also gets an image of its
     collection, picked at random by the dialog (REST, images only): the block shows at once.
   - **Contenu**: the fields of the selected column's block, **one field per cell on a grid that
     fills the panel's width** (`Flow` in `ColumnContent.tsx`; redone on 5 Oct. 2026). The grid's
     tracks are half columns (96 px at least), so a cell takes one column (a short field, an
     upload), **a column and a half (a textarea)** or two (a rich text, an array). One line when
     every cell fits, otherwise two lines: short fields two per column (a later one fills the place
     under an earlier one), the others the whole height; beyond that the grid scrolls sideways.
     `cells()` opens up rows (each field rendered at its own path); **a small group of short fields
     (a link: label, kind, address, new tab) stays together in one cell two columns wide**, its
     fields two per line under the group's name; a larger group is opened up, its name on its
     first field. A group heading goes with the field that follows it. A field's description is
     an « i » after its label, it no longer widens the cell. A clickable card is four columns
     (icon and title, tag and alignment, text, link).
     All the column blocks were reviewed on 5 Oct. 2026 at 1920 px (captures of the panel, read by
     a second model): a row of three short fields or more stays a row, in one cell two columns
     wide (a number's prefix, value and suffix; a title, its tag and its size); a group may hold
     a textarea (a whole line of its cell); a list whose rows hold one or two short fields takes
     a column and a half; a cell that takes the whole height **scrolls on its own** when it holds
     more than fits (a list with many rows, a rich text); a column is 400 px wide at most (a
     block with one field does not stretch it across the panel); labels stay on one line (cut
     with an ellipsis) and the content language (« — Français ») is not shown after them. Keep
     a field's label short and put its examples in its `description` (the « i »). What still
     scrolls at 1920 px: the two price blocks sideways (too many fields for two lines); the
     rest fits. Nicolas, 5 Oct.: some scroll is fine, do not force it.
     Two rules from Nicolas the same day. **A title and the choice of its tag go one under the
     other**, in one cell: the tag field is marked `admin.custom.below` (set by `tagField()`,
     `below: false` for a tag with no title field just before it; set by hand on the section
     heading and the image with quote), and a row that holds such a pair is not kept as a row.
     **A block whose fields sit under group headings** (the text box: « Titre », « Texte »,
     « Disposition ») **gets one column per group**: the heading, then the group's fields one
     under the other as in a plain form, the column scrolling on its own when it is taller than
     the panel (`blockCells`); packed on one line they were unreadable.
     Surveyed on 2 Oct. 2026 at 1920 × 960: of the 24 blocks only
     the text box scrolls down (its rich text editor is taller than the panel); arrays (FAQ items,
     steps, tabs, buttons, badges) will as soon as they hold rows. « Vider la colonne ». It only
     manages a block's content: for an empty column it says to place a component first (no list
     of components there, Nicolas, 2 Oct. 2026). It replaces the column drawer. Opened by a double click on a column of a
     square (Découpage; a single click only selects the column), by the pencil shown on a filled
     column of the preview on hover, or by a double click on it. **On an empty column the double
     click opens a box over the dialog** (Nicolas, 5 Oct. 2026; the whole screen, as a
     confirmation covers it; the same `BlockLibrary` and the same images as the « Composants » panel): the thumbnails of the components that fit the column's width, and only
     those; one click places the component and closes the box, the open panel does not change
     (quick filling from « Découpage », without the « Composants » panel and its drag and drop).
   - **In the preview**: a click selects the column (outlined). On a part a component marked with
     `data-part`, a text is typed in place (Enter or leaving keeps it, Escape gives up; only when
     the text shown is the stored value itself, otherwise the content panel opens), an image or an
     icon shows its own Payload field in a small panel beside it (`FieldPopover`). Links do not
     navigate. Rich texts are edited in the content panel.
   - Width rule: a clickable card takes 4 columns of 12 at most (Nicolas, 5 Oct. 2026; `CLICKABLE_MAX_SPAN`
     in `cardBlocks.ts`), a plain card 5.
   - Components marked so far: **cards** (title, text, image, icon, action link), **Image** and
     **Image with quote** (image, sentence), **text box** (title, buttons), **button group**
     (buttons). A link (`data-part-kind="link"`) shows its field in the small panel: the link's
     group (label, « Adresse » or « Contenu du site », the address or the content, new tab), or
     the array of buttons. To mark another one, two steps,
     one on each side: the component names its parts in its own words (`data-part="title"` on the
     element whose only child is the text; `data-part-kind="image"`, `"icon"` or `"link"` on an image, an icon
     or a link), and the block declares which field each part shows (`parts` of its `ContentBlock`:
     `{title: 'title', action: 'cta.label'}`; an image or icon field must be a top-level field). A block that renders nothing yet (an Image block without image) shows a
     zone named after it, one click away from its image field. An empty column shows its width
     (« 6 / 12 »; « Colonnes » is for a section without rows) and has no pencil.
   **Next (Nicolas):** the width warnings; the mobile order is still to be placed; marking the
   other components.
   Also on 1 Oct. 2026, from the trial: a collection's gap between items follows the section's gap
   between columns (`--section-gap-x`, inherited), unless its own « Écart entre les éléments » is
   set (`itemGap`, X only); icon, number and title-only cards get « Alignement vertical dans la
   rangée » (`vAlign`: top, centre, bottom), for a card taller than its content beside an image
   card or a tall block; the preview draws no outline on the selected column (only a light one on
   hover, and the pencil). Migration `20261001_143006_card_valign_collection_gap`.
   2 Oct. 2026: cards (the eight variants) take 3 to 5 columns (`content-specs.ts`; no existing
   card was wider).
4. To come: the width warnings, the mobile order, marking the other components for editing in
   place, rich text in place if it is worth it.

## Files

Neutral core (`src/fields/sections/`, no site component):
- `SectionManager.tsx` + `.scss`: the button and the dialog. It is the custom `Field` of an unnamed
  collapsible that wraps the two framed blocks of `sectionFields()`; it renders their children with
  Payload's `RenderFields`, at the paths Payload's own collapsible would use (`parentIndexPath`
  `<indexPath>-<n>`). Presentation only: **no migration** (checked with `migrate:create --skip-empty`).
- `SectionPreview.tsx`: the iframe, the debounce, the width switch and the scale.
- `managerContext.ts` (what the dialog shares with the rows builder: the selected column, opening
  its content), `ColumnContent.tsx` (the content panel), `BlockLibrary.tsx` (the thumbnails),
  `fieldGroups.ts` (`byGroup`, `only`: rendering a subset of fields at their exact paths).
  Since 5 Oct. 2026 the dialog is cut by area: `LivePreview.tsx` (the form's values → the
  preview), `FieldPopover.tsx` (one field beside what was clicked), `useSelectMenus.ts` (select
  menus kept inside the top part), `InfoBubble.tsx`, `packRows.ts`; one stylesheet per component
  (`SectionManager.scss` the shell, `ColumnContent.scss`, `BlockLibrary.scss`,
  `SectionPreview.scss`, `FieldPopover.scss`, `InfoBubble.scss`, `RowsBuilder.scss`).
- **`tokens.scss`: the tool's own variables** (`--sm-*`, on `:root`): every measure (top height,
  squares, thumbnails, tracks of the content panel, bubbles) and the few colours Payload's theme
  has no variable for. A size is changed there and nowhere else; the TypeScript that computes
  with one reads it through `token()` (`tokens.ts`). Even values only, no font under 14 px.
- **`_payload.scss` and `payloadDom.ts`: the only place where Payload's internal class names are
  written** (`.field-type`, `.render-fields`, `.rs__control`…), as Sass variables for the
  stylesheets and constants for the scripts. They have no public contract: after a Payload
  upgrade, check these two files first; `pnpm smoke:manager` fails when one of the main classes
  is gone from the dialog.
- `preview.ts`: the protocol (also `PREVIEW_LAYOUT`, `PREVIEW_SELECT`, `PREVIEW_OPEN`, `PREVIEW_EDIT`,
  `PREVIEW_PICK`). `PREVIEW_READY` (frame → admin, on each load), `PREVIEW_DATA`
  (admin → frame: the section's values as stored, the document fields the host asked for, the
  document id, collection and locale). Option `preview: {url, documentFields, breakpoints}` of
  `createSectionBuilder`.

Site side:
- `src/sections.config.ts`: `preview: {url: '/apercu-section', documentFields: ['silo']}`.
- `src/app/(frontend)/apercu-section/`: `page.tsx` (admin users only), `SectionPreviewFrame.tsx`
  (listens, calls the action, `router.refresh()`; hover, selection, pencil, typing in place: while
  a text is typed the route is not refreshed, the caret would be lost), `actions.ts` (`sendSectionPreview`, checks the
  admin session), `store.ts` (what each frame was sent, in memory, 10 minutes), `render.tsx`
  (`payload.findByID({data, depth: 2})` populates the unsaved IDs, then `toSections` and
  `PageSections` in the page's silo).

## Astryx side, Payload side

- The design system package (Astryx) is not touched. The site's components (`src/components/`) know
  nothing of Payload: for the builder they only name their parts (`data-part`, their own
  vocabulary) and take plain props (`vAlign` of Card, `gap` of Collection, `preview` of
  PageSections). The link with the data is on the Payload side: `parts`, `sample`, `minSpan` /
  `maxSpan` of each `ContentBlock` (`src/fields/blocks/`), conversion in `src/lib/sections.ts`.
- The neutral core (`src/fields/sections/`) imports no site component: it talks to the preview
  through messages (`preview.ts`) and gets everything site-specific as options.
- This trial branch mixes both sides. When it is merged, split it as usual: the component changes
  (Card `vAlign` and `data-part`, Collection gap, Media / MediaQuote / TextBox `data-part`, the
  card's 5 columns in `content-specs.ts`, plus their catalogue showcases) through `astryx`, the
  rest through `payload`.

## Traps and limits

- **Labels managed centrally are not editable in the preview** (Nicolas, 2 Oct. 2026): the link
  label of post cards and case study cards (Blog settings, Case studies settings), the « see all »
  button of a carousel. Their components carry no `data-part` (Card only marks its `bloc` preset,
  CarouselControls nothing), so a click only selects the column. Keep it so: never mark a part
  whose text does not come from a field of the block itself.

- Payload's select menus are not portalled: they open inside the top part, which is short and clips
  them. The dialog keeps each menu inside it (`MutationObserver` on `.rs__menu`: a shorter list
  that scrolls, or opened upwards). Class names of Payload 3.88's react-select: check after updates.

- Escape pressed while the keyboard is in the preview's frame does not reach the admin: the field
  panel takes the focus when it opens, and catches Escape before the dialog (which it would close).
- A drag started in the admin cannot be followed inside the frame: hence the zones drawn over it.
- A clickable card stretches its link over the whole card (a pseudo-element). In the preview these
  overlays take no pointer event (CSS of the frame), and the frame looks for the marked part whose
  own box holds the click (`partAt`): the title, the text, the icon are edited as on a plain card,
  only the link's bar opens the link's fields.
- Typing in place relies on the marked element having the text as its only child (React then sets
  its text content, whatever the browser did inside while typing).
- In a section with content, empty columns show a « Colonne vide » zone at desktop and tablet
  widths; on mobile they are hidden, as on the site.

- **A server action cannot return the rendered section**: its client components are not in the
  page's manifest (« Could not find the module … in the React Client Manifest »). Hence the store
  and the route refresh.
- **The store is in the server's memory**: fine with one Node process (dev, a single server). On
  several instances or serverless, replace it (a table, a cache) before relying on the preview.
- Payload's drawers opened from the dialog stack above it (the dialog's `z-index` is 100): keep it
  below Payload's drawers.
- The columns of the first panel: `sectionFields()` gives the dialog the names of the group
  headings (`groups`); the dialog renders the settings once per group, with the other groups'
  fields replaced by holes (`byGroup`), so each field keeps the position, hence the path, Payload
  gave it. `forceRender` is needed: Payload renders fields when they come on screen, and a group
  whose fields are all hidden by a condition is hidden in CSS (`:has`).
- Folded panels stay mounted (`hidden`): their fields keep their state. Closing the dialog unmounts
  them; the values stay in the form state.
- The frame's messages for the editor (empty section, not logged in) are French only.
- Shared sections use the same dialog; their preview takes the site's silo.

## Tests

`pnpm smoke:manager` (dev server running): throwaway page and admin user, deleted at the end with
their locks and preferences. Checks the population of an unsaved image, the closed preview page,
the dialog, the live shade and title, the width switch, the drawer above the dialog, and that
nothing was saved.
