# Open questions for the tech lead

Written on 5 October 2026, after a code review of the `previewer` branch (the « Gérer » dialog of a
section, `docs/section-manager.md`). Nothing here blocks the trial on one machine; each point needs
a decision before the branch goes to production. Most severe first.

## 1. The live preview keeps its data in the server's memory

`src/app/(frontend)/apercu-section/store.ts` keeps the unsaved section in a `Map` on `globalThis`
for ten minutes; the server action writes it, the page render of the frame reads it.

- It works on **one Node process**. With several instances, or serverless hosting, the read can
  land on another instance and the preview stays empty.
- A section heavier than Next's server-action body limit (1 MB by default) is refused; the frame
  swallows the error and the preview silently stays on its last state.

**To decide:** is the site hosted on a single long-lived process? If not, the snapshot has to move
to a shared store (a short-lived row in the database, or a signed cookie for small sections). In
both cases the frame should say « preview not updated » when the action does not answer `ok`.

## 2. `toSections` keeps per-call state in module variables

`src/lib/sections.ts` (around lines 401-407, code that predates the branch) stores its context, the
loaded entries, the forms and the locale in module-level `let`s, sets them before an `await` and
reads them after it. The preview now calls it every ~400 ms while someone types, so a visitor's
page render can interleave with it and be converted with the preview's locale or loaded entries
(or the reverse). Wrong rendering only: no unsaved text can leak, the section content is a
parameter.

**To decide:** pass the context and the maps down through the converters (or a per-call closure,
or `React.cache`) rather than module globals. A refactor of `src/lib/sections.ts`, outside the
scope of the dialog.

## 3. Field configs shared between two blocks

`priceGroup`, `featuresField`, `mentionField` and `guaranteeGroup` in `src/fields/blocks/pricing.ts`
are exported objects used by two blocks (single price, tier); the content blocks themselves are
shared between `pages.sections` and the shared `sections` collection. The project rule is
factories (Payload mutates configs; shared between a Lexical editor and a collection, tables were
dropped once). Today Payload's per-block sanitising guard makes this harmless, and it was already
so on `main`.

**To decide:** turn the four pricing exports into factories now, or when the file is next touched.

## 4. The dialog's permission fallback is « editable »

`SectionManager.tsx` and `ColumnContent.tsx` (`inside()`) fall back on `true` when a field's
permissions are not found; Payload's own block row falls back on read-only. No field-level access
exists today, and the server still enforces every save.

**To decide:** if field-level access control is planned, the fallback must become read-only first.

## 5. The dialog's styles lean on Payload's internal class names

About twenty class names of `@payloadcms/ui` (`.field-type`, `.render-fields`, `.rs__control`…).
They are now written in two files only (`src/fields/sections/_payload.scss`, `payloadDom.ts`), and
`pnpm smoke:manager` checks that the main ones are still in the dialog. A renamed class costs
layout, never data. The most sensitive use is the placement of select menus
(`useSelectMenus.ts`, a `MutationObserver` on react-select's menu).

Also relied on, undocumented: `RenderFields` skipping `null` entries of a fields list (how the
dialog renders a subset of fields at their exact paths, `fieldGroups.ts`), and Payload's
`parentIndexPath` / schema path scheme.

**To decide:** who runs `pnpm smoke:manager` and reads `_payload.scss` on each Payload upgrade.

## 6. Smaller points

- `crypto.randomUUID()` (`SectionPreview.tsx`) needs a secure context: the dialog would fail on
  plain http from a LAN address (fine on localhost and https).
- The page's « silo » field is rendered a second time in the dialog's header while the page
  form's own copy stays mounted: duplicated DOM ids.
- `LivePreview.tsx` subscribes to the whole form state: the preview's wrapper re-renders and
  reads the form on every keystroke (the sending itself is debounced). Not measured.
- `randomImage` (the image a new Image block starts with) reads at most 100 media documents.
- Accessibility still to do: no keyboard way to *replace* a row's layout (only to add a row);
  layout tiles answer Enter but not Space; the bubbles cannot be hovered themselves
  (`pointer-events: none`, WCAG 1.4.13); the field popover has no `aria-modal` and does not give
  the focus back when it closes; the preview's width switch is a radio group without arrow keys.
- `SectionManager.tsx` is still 570 lines (it was 680): the block placement (`putBlock`,
  `randomImage`, the replace confirmation) and the component picker could move out next.
  `RowsBuilder.tsx` (580 lines) was not cut.
- The mobile order of a section's columns has no place in the dialog yet (its dictionary and
  `mobileOrder.ts` are kept for it; stored values still apply).
- `pnpm exec eslint src scripts` reports 0 error and about 230 warnings on the whole project
  (unused arguments mostly); not sorted between this branch and older code.

## Already fixed during the review (for the record)

- Localized rich texts came out empty in the live preview (`flattenLocales: false` on the read
  in `apercu-section/render.tsx`); now covered by the smoke test.
- The component's display name (« Nom affiché ») had lost its field with the column drawer; it is
  typed in the head of the « Contenu » panel.
- The preview frame's own texts go through the FR/EN dictionaries, in the admin's language.
