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
- Layout: Payload's default is side by side (preview 60 % wide), with a « pop out » button opening
  the preview in its own window and a zoom. Ideas to test next: a top / bottom split (admin CSS
  override) and a preview in a dialog, keeping the form full width.
