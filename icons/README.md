# Nucleo icons — source SVG drop folder

Drop the Nucleo SVGs here. They are converted into React components
(`src/theme/icons/`) and wired into the Astryx theme and our components.

## Expected format
- One file per icon, named by its key: `chevron-down.svg`, `arrow-right.svg`…
- Square 18 × 18 viewBox (Nucleo 18 px grid). The `width` / `height` attributes are removed during conversion.
- Strokes and fills in `currentColor` (Nucleo export option). A hardcoded color is fixed during conversion, but better to avoid it.
- A single stroke width for the whole set (1 or 1.5), chosen once and for all.
- No `<title>`: accessibility is handled by the Icon component.
- No `<style>`, no duplicate IDs, no embedded font.

## `astryx/` — the base set (64 icons)
All the foundation icons: the 28 Astryx semantic names (chevrons, cross,
check, search, calendar, statuses…), the site chrome (arrows, phone,
mail, upload, pin, globe), social networks and the initial content
icons. This is the set shipped with the design system.

## `vidomia/` — icons added over the course of the project
Icons specific to the Vidomia site, added as needs arise
(editorial content, business pictograms…). They automatically appear in
the second block of the `/design/fondations/icones` page after `pnpm icons:build`.
A key already present in `astryx/` is ignored (the base set takes priority).

## Naming
Name the file by its key (`chevron-down.svg`, `arrow-right.svg`), without the
Nucleo size prefix (`18-`, `32-`). The code uses this key; Payload
will store it for icons chosen by editors.
