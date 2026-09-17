# Live Preview (branch `preview`, trial)

Started on 17 September 2026 at Nicolas's request, on its own branch to test the admin's
« Aperçu en direct ».

- Payload's built-in Live Preview (no paid plugin), server-side mode: `src/livePreview.ts`
  (collections pages, posts, case-studies; globals blog, portfolio; breakpoints mobile 390,
  tablet 768, desktop 1440) and `src/components/LivePreviewRefresh.tsx`, mounted in the site
  layout, which reloads the route when the admin saves (Payload's `RefreshRouteOnSave`, package
  `@payloadcms/live-preview-react` 3.88.0). Outside the admin's iframe it renders nothing.
- No drafts: the preview follows each save, and saving publishes. Drafts with autosave (preview
  while typing, nothing published) would need versions tables and a draft-aware site: to decide
  after the trial.
- Layouts: a « Vue » menu just before the eye (`src/fields/PreviewLayoutMenu.tsx`, declared as
  `beforeDocumentControls` on pages, posts, case studies and the two listing globals) offers
  « Côte à côte » (Payload's own layout, preview 60 % wide), « Dessus / dessous » (form in full width,
  preview stuck to the bottom half of the screen) and « Fenêtre » (form in full width, preview in a
  dialog over it, closed with its button or Escape). Picking one opens the preview. The choice is
  remembered per user (Payload preferences, key `live-preview-layout`, no migration) and set as
  `data-preview-layout` on `<html>`; the two extra layouts are CSS in `src/app/(payload)/custom.scss`,
  written against Payload 3.88's class names (`collection-edit__main-wrapper`,
  `live-preview-window--is-live-previewing`): check them after a Payload update. Payload's own
  « pop out » button (a separate browser window) stays available.
