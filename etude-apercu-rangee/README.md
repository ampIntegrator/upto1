# Study brief: a live preview of the row being built

For Claude Fable, analysis only (no code), then a handoff for Claude Opus. Written on
17 September 2026 at Nicolas's request (« fais-moi un dossier à la racine sur ce point, pour
donner à Fable plus tard »).

## Nicolas's request

« Un outil de live view de la rangée que l'on assemble : une fenêtre modale positionnable,
déplaçable, qui montrerait le rendu en live. » In the section builder (page › Contenu › a
section › Rangées), while columns and blocks are assembled, see what the row looks like on the
site, in a floating window that can be moved and placed anywhere.

Nicolas manages neither git nor code: answer him in French, with tutoiement, and no jargon. Code,
comments and docs are in English. Read `CLAUDE.md`, then `docs/section-builder.md`,
`docs/live-preview.md` and `docs/handoff-2026-09-17.md` (project rules and traps) first.

## What already exists

- **Section builder** (`src/fields/sections/`, neutral core meant to become a Payload plugin; never
  import site components there): `RowsBuilder.tsx` knows the selected row and its columns;
  `sectionFields.ts`, `builder.ts`; site configuration in `src/sections.config.ts` (section
  background settings, content blocks) and `src/fields/blocks/`.
- **Rendering**: `src/lib/sections.ts` (`toSections`: asynchronous, server side; loads the posts
  and case studies chosen in cards and the latest entries of collection blocks; imports
  `@/sections.config`) and `src/components/PageSections.tsx`.
- **Isolated block route**: `src/app/(frontend)/apercu/[slug]/` renders one block alone with demo
  data, captured for the admin block picker (`pnpm previews:build`).
- **Live Preview** (in main since 17 September 2026, see `docs/live-preview.md`): Payload's built-in
  preview in server-side mode (iframe of the site page, reloaded on save), a « Vue » menu with
  side by side, top / bottom and dialog layouts, preference stored per user.
- **Silo per page**, section background (light with tint and texture, night, media), section
  gaps and spacing: all of them change the rendering of a row.

## Known constraints and traps

1. **Server-only conversion.** `src/lib/sections.ts` imports the block configs, whose editors
   import server Lexical code: in the browser it breaks (« Can't resolve 'fs' », hit before).
   Relations (media, posts, case studies) are IDs in the form state and must be loaded.
2. **Styles.** Astryx components and the Orbita theme must not mix with the admin's CSS: the
   rendering belongs in an iframe of the site.
3. **Width.** A row of 12 columns only makes sense at the site's width (container 1440 px,
   columns stack below 768 px): a small floating window needs a scaled rendering and / or
   breakpoints (mobile, tablet, desktop).
4. **Payload internals.** The Live Preview layouts rely on Payload 3.88 class names; any admin
   customisation should stay light and be listed for checking after updates.
5. **Document locks.** Tests that type into admin forms leave locks; a lock whose user is deleted
   blanks the edit view (seen on 17 September): clean locks in any headless check.

## Two directions to compare

A. **Dedicated tool.** A « live view » button on the selected row opens a floating window (drag
   by its title bar, resize from a corner, position and size remembered per user, follows the
   selection). The builder sends the row being edited (debounced, about 500 ms) to a site route
   that renders it server side with the real conversion, section settings and page silo; the
   window's iframe shows it. Open questions: POST then reload, or a short-lived draft key; row
   alone or the whole section with the row highlighted; how media and chosen entries are loaded.

B. **Drafts and the page preview.** Enable drafts with autosave on pages (versions tables, a
   migration; the site shows the draft only in the preview), use the Live Preview in its dialog or
   top / bottom layout, and scroll the preview to the section being edited (section anchor).
   Nearly live, much less custom code, but not the row alone, and a heavier data model.

A third, lighter step may exist between them (for instance the dialog preview scrolled to the
section, refreshed on save only): mention it if it is worth it.

## What the analysis should deliver

- A recommendation between A and B (or a staged path), with what each costs: files touched,
  migrations, custom admin code, risks on Payload updates, effect on the future plugin.
- For the chosen direction: the data flow (form state → rendering), the scope (row or section),
  widths and scaling, the window's behaviour (open, move, resize, remember, follow the selection,
  close), accessibility (keyboard, Escape), and what stays neutral in `src/fields/sections/`
  versus site-side.
- Decisions to confirm with Nicolas, each with a recommendation first.
- A handoff in `docs/` for Opus (branch, order of work, tests: throwaway pages only, headless
  checks, locks cleaned), and the git flow reminder (components on `astryx`, admin on `payload`,
  or a trial branch; Claude creates the pull requests with `gh` and gives Nicolas their links).
