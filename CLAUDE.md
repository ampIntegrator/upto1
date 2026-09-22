@AGENTS.md

<!-- ASTRYX:START -->
Astryx v0.5.4 · 163 components
CLI: run every command as `pnpm exec astryx <cmd>` (shown below as `astryx ...`).

SETUP (once, in your app entry e.g. main.tsx) — without these, components render unstyled:
  import "@astryxdesign/core/reset.css";
  import "@astryxdesign/core/astryx.css";

WORKFLOW — discover, don't guess. Before writing UI:
1. `astryx build "<idea>"` — START HERE: returns a kit (closest [page] + [block]s + [component]s). No args = full playbook.
2. `astryx template <name> [--skeleton]` — scaffold the [page]/[block]s it named, or study their layout. Templates are reference code.
3. `astryx component <Name>` — props + examples for every component you use.

RULES:
- No <div> — components do all layout/spacing, page frame included.
- Frame first: read `astryx docs layout` before writing any page or screen — page frame, region widths, breakpoint behavior.
- Dense data = rows (Table, List/Item), never Card-wrapped list items; Card is for standalone widgets. Status = StatusDot/Token; Badge = counts only.
- Custom styling: component props first; else style/className with tokens — var(--color-*|--spacing-*|--radius-*). No raw hex/px. (No StyleX/Tailwind compiler here — don't use xstyle/utility classes.)
- Tokens for every value (`astryx docs tokens`). Brand/accent belongs in the theme (`astryx theme list` / `theme add <slug>`, or `astryx theme template` for a custom one) — never override --color-* in :root.
- SELF-CHECK before you finish: re-read the file and replace any raw <div>/<span> layout, imported .css/@apply, or hardcoded value (#hex, 16px) with the component or a token (var(--color-*|--spacing-*|…)). If unsure a component/prop exists, run `astryx component <Name>` / `astryx search "<thing>"`; don't hand-roll CSS.

MORE CLI:
  search "<query>"   find any component / hook / doc / template / block
  component --list   163 components by category
  template --list    page + block recipes
  docs <topic>       browser-support, cli-integrations, color, elevation, getting-started, icons, illustrations, internationalization, layout, migration, motion, principles, shape, spacing, styling-libraries, styling, theme, tokens, typography, working-with-ai
  swizzle <Name>     eject component source for deep customization
  upgrade --apply    run after any @astryxdesign/core bump
<!-- ASTRYX:END -->

## Section builder (rows and columns of the page body)

`src/fields/sections/` is a neutral core, meant to become a Payload plugin: it knows no
component, no theme, no media collection. Never import `src/components/` from it. Everything
site-specific goes through `src/sections.config.ts` and `src/fields/blocks/`. Audit, plan and
full doc: `docs/section-builder.md`.

Adding a column component, in this order:
1. Branch `astryx`: the component in `src/components/`, its showcase in the `/design` catalogue,
   its minimum span in `src/components/content-specs.ts`.
2. Branch `payload`: a `ContentBlock` in `src/fields/blocks/` (Payload block + `minSpan` from the
   registry) added to the `blocks` list of `src/sections.config.ts`; conversion in
   `src/lib/sections.ts`, rendering in `src/components/PageSections.tsx`; picker preview
   (`/apercu`, then `pnpm previews:build`).
3. Database: backup, `pnpm migrate:create <name>`, review, `pnpm migrate`, regenerate types. A
   change without new fields must generate nothing with `pnpm payload migrate:create x --skip-empty`.
4. Tests on a throwaway page created and deleted by the script, never on a real page.

Width rules: one component per column, minimum width declared by the block, a row always adds
up to 12. **A component fills its container, always** (Nicolas, 22 Sept. 2026): no max-width or
auto centring on a card or a block; the column is the only width authority (a narrower look comes
from a narrower column or an empty side column). Text measure caps (a lead, a note) are the only
exception. A component that subdivides (card grid, price list, steps) carries its own grid and
will need a data-dependent `minSpan(data)` on the server (not done yet).

`consignes.md` is Nicolas's own scratch file: read it, never write to it.

Last handoff (tabs, button group, row layouts, done on 17 Sept. 2026): `docs/handoff-2026-09-17.md`.
It also lists the project rules and known traps: read it before a new column block.

Blog and case studies (done on 17 Sept. 2026): `docs/blog.md` (with the listing code they share)
and `docs/cases.md`; decisions in `docs/handoff-2026-09-17-blog.md` and `-cases.md`. Trap: never share a field or block config object between a
Lexical editor and a collection (Payload mutates it; tables get dropped): use factories.

Nested pages (done on 21 Sept. 2026): `docs/pages.md` (parent page, full address `path`, 3 levels set
by `MAX_PAGE_DEPTH`, automatic redirects, routes as dispatchers). Build every page URL with `pagePath()`.

Forms (done on 21 Sept. 2026): `docs/forms.md` (plugin-form-builder, « Formulaire » column block 4 to 12,
one or two columns of fields, multi-step, server action, connection points for the tech lead);
decisions in `docs/handoff-2026-09-21-forms.md`.

Open study (for Claude Fable, analysis only, then a handoff for Opus): a live preview of the row
being built in the section builder, in a movable window. Brief: `etude-apercu-rangee/README.md`.
It builds on the admin's Live Preview (« Aperçu en direct » and its « Vue » menu, in main since
17 Sept. 2026): `docs/live-preview.md`.

Modals (done on 22 Sept. 2026): `docs/modals.md` (« Modales » collection, opened over the page by an
internal link or a button to the anchor `#modale-<slug>`; the page renders the modals it links to,
closed; free body with an inserted form, form buttons in the footer); decisions in `docs/handoff-2026-09-22-modals.md`.
Internal links of rich texts get their address on the server (`src/lib/links.ts`): use it for any
new rich text rendered by a client component.
