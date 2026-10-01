# Feasibility: a live preview without saving

Written on 1 October 2026, branch `previewer` (local). Nicolas's request: a preview that follows
the form as it is typed, without saving (add a block → it appears; change a text → it changes),
scoped to a whole section. Feasibility only, no code yet.

## Verdict

Feasible without drafts, without a migration and with almost no admin-side code. The admin already
sends the unsaved form to the preview; the site only has to listen and render it server side.

## What was checked in the code (Payload 3.88, Next 16.3)

1. **The admin already streams the form.** `@payloadcms/ui` › `elements/LivePreview/Window`: while
   « Aperçu en direct » is open, every change of the form state is reduced to values
   (`reduceFieldsToValues`) and sent to the preview iframe with `window.postMessage`
   (`type: 'payload-live-preview'`, with `collectionSlug`, `data`, `locale`). Today the site ignores
   it: `LivePreviewRefresh` only listens for the « saved » event (`RefreshRouteOnSave`).
2. **Payload can populate unsaved data.** Local API `payload.findByID({collection, id, data, depth})`
   accepts a `data` argument: it runs the read hooks and populates relations (media, posts, case
   studies, forms) on the given values instead of the stored document. This is what Payload's own
   client-side mode uses (`mergeData`, REST POST with `X-Payload-HTTP-Method-Override: GET`).
   So the IDs of the form state are not a problem.
3. **The real rendering stays usable.** `toSections(page.sections, settings, sectionsContext(...))`
   then `<PageSections>` (as in `src/app/(frontend)/[slug]/PageRoute.tsx`) runs on the server, so the
   « Can't resolve 'fs' » trap (Lexical server code in the browser) is avoided.

## Proposed data flow

Admin form → (Payload's postMessage, already there) → iframe: a client listener on the site page
(beside `LivePreviewRefresh`, only in the iframe) → debounce ~400 ms → server action with the page
id and the values → admin session check → `findByID({data, depth: 2})` → `toSections` → the page
re-renders with these sections instead of the stored ones.

Two ways to bring the result back to the page, to settle in the build:
- **A. Short-lived draft + refresh** (recommended): the action keeps the populated values in memory,
  keyed by user and page, a few minutes; then `router.refresh()`; `PageRoute` uses them when the
  request comes from the preview. Plain Next, the whole page (header, silo, hero) stays exact.
- **B. Return the rendered sections from the action** (React Server Components from a server
  function): fewer moving parts, but less documented in Next 16; to try first only if A is heavy.

## Scope « whole section »

The preview shows the whole page; « the section » means following the section being edited: a small
admin component (site side, not in the neutral core) sends the index of the open section; the
iframe scrolls to it and can outline it. The builder's floating window from the 17 Sept. brief can
come later on the same pipeline (same listener, same action, a dedicated route rendering one
section).

## Costs and risks

- Files: a listener next to `src/components/LivePreviewRefresh.tsx`, one server action, a few lines
  in `PageRoute.tsx`; optional admin component for « follow the section ». No migration, no change
  in `src/fields/sections/`.
- Load: one server render per pause in typing, only while the preview is open; the debounce and
  `depth: 2` keep it reasonable. Lexical rich text: check the cost of very long pages.
- Security: the action must refuse anyone not logged into the admin (it renders unpublished text).
- Payload updates: relies on the `payload-live-preview` message (public API of
  `@payloadcms/live-preview`) and on `findByID({data})`; both used by Payload's own client mode.
- Saving still publishes (no drafts): the preview changes nothing there.

## To confirm with Nicolas

1. Pages only first (then posts, case studies, modals with the same pipeline)? Recommended: yes.
2. Follow the edited section (scroll + outline)? Recommended: yes, in a second step.
3. Keep the « Vue » layouts as they are (side by side, top / bottom, window)? Recommended: yes.

## Update, 1 October 2026: the section editor (Nicolas's design, `consignes.md`)

Each section in the admin shows its name and a « Gérer » button. It opens a full-screen dialog:
top 40 % (35 % since the first trial) = settings in three horizontal accordions (side by side, one open, the others folded to
a strip); bottom 60 % (65 %) = live preview of this section alone.

- Accordion 1, background: colour, texture, media, padding, gaps → instant in the preview.
- Accordion 2, layout: rows, column splits → « add here » zones over the preview.
- Accordion 3, blocks: drag a block onto a column. Only while a block is being dragged, the cursor
  turns to « not allowed » over a column narrower than the block's `minSpan` (already declared in
  `src/components/content-specs.ts`), and the drop is refused there. No such cursor at any other
  time (plain hovering, clicking, editing).

Decisions (Nicolas, 1 Oct. 2026):
1. The dialog **replaces** the current rows builder (`RowsBuilder.tsx`). Trial on the `previewer`
   branch; back to `payload` / `main` if it does not work out.
2. Block content is edited **both** in the top panel (the block's fields) and in the preview
   (click a text, type in place).
3. Preview width switch: mobile 390, tablet 768, desktop 1440 (same breakpoints as `livePreview.ts`).

### Technical shape

- **Preview transport**: the dialog itself (admin side) posts the section's values to an iframe on
  a dedicated site route (e.g. `/apercu-section`), not Payload's Live Preview. The route populates
  them server side (`findByID({data, depth})` on the page, admin session required), runs
  `toSections` and renders the one section with the page's silo. Debounce ~400 ms.
- **Drop zones and drag**: native drag cannot cross into the iframe. The iframe reports the
  rectangles of rows and columns (`data-` attributes on the rendered section, sent by postMessage
  after each render and on resize); the admin draws the zones in an overlay above the iframe and
  dnd-kit works on that overlay only. During a drag only, a column whose span is below the dragged
  block's `minSpan` shows the « not allowed » cursor and refuses the drop.
- **Width and scale**: the iframe has the chosen breakpoint width, scaled down to fit the 60 %
  panel when wider (CSS transform; overlay rectangles divided by the same factor).
- **Edit in place**: stage it. Plain text fields (titles, labels, short texts) become editable in
  the iframe (`contenteditable` marked with the field path); each edit is posted back to the admin
  form, which stays the single source of truth. Rich text (Lexical) is edited in the top panel at
  first; inline rich text is a later step, if worth it.
- **Neutral core**: the dialog, accordions, overlay and messaging protocol belong in
  `src/fields/sections/` (no site component); the preview route, the `data-` markers and the
  inline editing live site side.

### Stages (each one usable on its own)

1. Dialog shell from a « Gérer » button: 40 / 60 split, three horizontal accordions, accordion 1
   wired to the existing section fields, live preview of the section alone + width switch.
2. Accordion 2: rows and splits, zones drawn over the preview.
3. Accordion 3: block list, drag onto the overlay, `minSpan` check, block fields in the top panel.
4. Remove the old rows builder from the section form.
5. Inline editing of plain text fields in the preview.

No migration expected for stages 1 to 5: the section's stored data does not change shape (check
with `pnpm payload migrate:create x --skip-empty`). Tests on a throwaway page only.
