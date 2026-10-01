# Section manager (« Gérer » dialog) and its live preview

Trial started on 1 October 2026 on the `previewer` branch (Nicolas's design, feasibility and plan in
`etude-apercu-rangee/faisabilite.md`). It replaces the in-page editing of a section; if the trial
fails, go back to `payload` / `main`.

## What it is

In a page, a section shows its name and a « Gérer » button. The button opens a full-screen dialog:

- top, 40 %: the settings, in three horizontal accordions (one open, the others folded to a
  vertical strip): « Fond et espaces », « Découpage », « Blocs »;
- bottom, 60 %: the live preview of this section alone, rendered by the site, refreshed about
  400 ms after each change, **without saving**; a width switch (1440, 768, 390), the frame being
  scaled down when it is wider than the panel. The frame is exactly as tall as the section (it
  reports its height, `PREVIEW_SIZE`): only the section shows, nothing below it (Nicolas, 1 Oct.).
  A section without content (no row, or only empty columns) shows its background, its top and
  bottom paddings and a dashed zone « Colonnes » where the columns will be (`slot` of
  `PageSections`, given by the preview only).

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
- Folded panels stay mounted (`hidden`): their fields keep their state. Closing the dialog unmounts
  them; the values stay in the form state.
- The frame's messages for the editor (empty section, not logged in) are French only.
- Shared sections use the same dialog; their preview takes the site's silo.

## Tests

`pnpm smoke:manager` (dev server running): throwaway page and admin user, deleted at the end with
their locks and preferences. Checks the population of an unsaved image, the closed preview page,
the dialog, the live shade and title, the width switch, the drawer above the dialog, and that
nothing was saved.
