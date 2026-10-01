# Section manager (« Gérer » dialog) and its live preview

Trial started on 1 October 2026 on the `previewer` branch (Nicolas's design, feasibility and plan in
`etude-apercu-rangee/faisabilite.md`). It replaces the in-page editing of a section; if the trial
fails, go back to `payload` / `main`.

## What it is

In a page, a section shows its name, a « Gérer » button and, below it, its anchor and (on a page)
the « save as shared » checkbox: these two stay in the document's form, not in the dialog. The
button opens a full-screen dialog:

- top, 35 %: the settings, in three horizontal accordions (one open, the others folded to a
  vertical strip): « Fond et espaces », « Découpage », « Blocs ». In the first one the groups of
  settings sit **side by side, one column per group** (background, edge line, inner spacing, grid
  gaps), so the top part does not scroll down; it scrolls sideways if the columns do not all fit;
- header: the title, in the middle the document's fields the host listed (`headerFields`: the
  page's silo; nothing on a shared section, which has none), the close button;
- the accordions slide open sideways (300 ms; a panel's content keeps its full width, the panel
  uncovers it; folded panels are `inert`; no animation with « reduced motion »);
- bottom, 65 %: the live preview of this section alone, rendered by the site, refreshed about
  400 ms after each change, **without saving**; a width switch (full width of the panel, as in the browser, then 1440, 768,
  390; remembered per user, preference `section-preview-width`), the frame being scaled down when
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
The dashed zones of an empty section have a light translucent background (`--color-background-muted`).

The background composer (`src/fields/BackgroundComposer.tsx`) lost its preview box on the same day:
the section itself is visible below.

Saving is unchanged: the fields live in the page's form, the page is saved as usual (and saving
still publishes: no drafts).

## Stages

1. **Done (1 Oct. 2026).** Dialog, accordions, live preview, width switch. Panel 1 = the section
   settings; panel 2 = the existing rows builder (`RowsBuilder`, a click on a cell still opens its
   drawer, above the dialog); panel 3 = a placeholder.
2. Panel 2: « add here » zones drawn over the preview.
3. Panel 3: block list, drag onto the preview; **only while dragging**, a « not allowed » cursor
   over a column narrower than the block's `minSpan`, and the drop refused. Block fields in the
   top panel.
4. Remove what is left of the old builder.
5. Editing plain texts in place in the preview (rich text stays in the top panel at first).

## Files

Neutral core (`src/fields/sections/`, no site component):
- `SectionManager.tsx` + `.scss`: the button and the dialog. It is the custom `Field` of an unnamed
  collapsible that wraps the two framed blocks of `sectionFields()`; it renders their children with
  Payload's `RenderFields`, at the paths Payload's own collapsible would use (`parentIndexPath`
  `<indexPath>-<n>`). Presentation only: **no migration** (checked with `migrate:create --skip-empty`).
- `SectionPreview.tsx`: the iframe, the debounce, the width switch and the scale.
- `preview.ts`: the protocol. `PREVIEW_READY` (frame → admin, on each load), `PREVIEW_DATA`
  (admin → frame: the section's values as stored, the document fields the host asked for, the
  document id, collection and locale). Option `preview: {url, documentFields, breakpoints}` of
  `createSectionBuilder`.

Site side:
- `src/sections.config.ts`: `preview: {url: '/apercu-section', documentFields: ['silo']}`.
- `src/app/(frontend)/apercu-section/`: `page.tsx` (admin users only), `SectionPreviewFrame.tsx`
  (listens, calls the action, `router.refresh()`), `actions.ts` (`sendSectionPreview`, checks the
  admin session), `store.ts` (what each frame was sent, in memory, 10 minutes), `render.tsx`
  (`payload.findByID({data, depth: 2})` populates the unsaved IDs, then `toSections` and
  `PageSections` in the page's silo).

## Traps and limits

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
