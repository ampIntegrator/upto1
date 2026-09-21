# Handoff: forms (admin, column block, multi-step) — 21 September 2026

> **Status: done** (Claude Opus, 21 September 2026). What was built and how it works: `docs/forms.md`.
> Differences worth knowing: the component prop is `submitAction` (a function crossing from a server
> to a client component must be named `action` or `…Action` in this Next.js) and the form id travels
> in the submitted input rather than through `bind`; the Astryx TextInput has no `tel` type, so the
> telephone is a text input with the phone icon; the plugin's field blocks are renamed in French and
> English (its translations leave « Checkbox », « Select », « Textarea »); the width rule lives in
> `smoke:forms` (a form on 3 columns is refused) rather than in `smoke:sections`.

Written by Claude Fable for the next session (Claude Opus), after an analysis and arbitrations
with Nicolas on 21 September 2026. Read `CLAUDE.md`, `docs/handoff-2026-09-17.md` (project rules,
known traps) and `docs/section-builder.md` first. The rules there apply here: French with Nicolas
(tutoiement, no jargon, he does not use git: you branch, commit, open the PRs and give him the
links in merge order), English in code and docs, FR/EN admin dictionaries, backup and reviewed
migrations, throwaway content for tests, `consignes.md` never written, even dimensions only,
no font under 14 px, theme before CSS.

Before starting: PRs #36 (`astryx`) and #37 (`payload`) must be merged, then fast-forward both
branches on `main`.

## Decisions (taken with Nicolas on 21 September 2026)

1. **Back office**: the official `@payloadcms/plugin-form-builder`, pinned to **3.88.0** (same
   version as Payload; exact version, no caret). It brings two collections, put in a new admin
   group **« Formulaires »**: `forms` (« Formulaires ») and `form-submissions` (« Réponses »).
2. **No form in the hero** for now (Nicolas withdrew it). Do not touch `Hero` or `src/fields/hero.ts`.
3. **Email sending and anti-spam services: the tech lead's job.** Configure no email adapter and
   no external service. Leave clean connection points and document them (see « Connection points »).
   The only anti-spam built now is a free one: a honeypot field and a minimum fill time.
4. **Placement**: a column block **« Formulaire »** in the section builder, **4 to 12 columns**.
5. **One or two columns of fields**, decided by the real width of the column (container query, like
   `Collection`): one column up to 7/12, **two columns from 8/12**. Threshold **840 px** of
   container width (a column of 7 is about 800 px, a column of 8 about 880 px in the 1440 px
   container). Below it every « half » field becomes full width, so tablets and phones need no rule.
6. **Multi-step forms** through a separator block **« Nouvelle étape »** (with a step title) in
   the form's field list. No separator = a plain form. The same component renders both.
7. **Phase 2, not now**: file upload field, the footer newsletter wired to the same system, the
   mockup's « split image » section background, a form in the hero.

## Mockup and existing parts

- Mockup `Orbita/orbita/17-forms.html`: floating-label fields and their states (focus, error,
  success, disabled), custom select, disc radio, square checkbox, toggle, and the assembled
  « Demander une démo » form in a paper card (eyebrow, h3 title, intro, fields, consent checkbox,
  split submit button), light and night.
- The catalogue already dresses the Astryx inputs (`TextInput`, `TextArea`, `Select`, `RadioList`,
  `CheckboxInput`, `Switch`, `NumberInput`, `DateInput`, `FormLayout`, `Field`, `FieldStatus`,
  `Stepper`). Run `pnpm exec astryx component <Name>` for each one used; do not hand-roll inputs.
- The footer newsletter (`SiteFooter`, `onSubscribe`) is not wired to anything: leave it.

## Work item 1 — branch `astryx`: the `SiteForm` component

`src/components/SiteForm.tsx` + `.module.css`, client component, no Payload import. Props (plain
data, serialisable): `{id, title?, tag?, eyebrow?, intro?, framed?, steps: FormStep[], submitLabel,
labels, onSubmit | action, confirmation}` where `FormStep = {title?: string; fields: FormField[]}`
and `FormField` is a discriminated union on `type`: `text | email | tel | textarea | number | date |
select | radio | checkbox | consent | message`, each with `name`, `label`, `required?`,
`width: 'half' | 'full'`, `defaultValue?`, `options?` (select, radio), `content?` (message:
already-rendered rich text node).

- **Layout**: a CSS grid of two columns inside the form, container query on the form root
  (`container-type: inline-size`): under 840 px everything spans both columns; from 840 px a
  « half » field takes one column, a « full » one spans two. A lone half field keeps its half
  (empty cell on the right). DOM order = admin order = reading and tab order.
- **Card**: `framed` = paper card with border as in the mockup; inner padding 48 px, 24 px under
  520 px of container. Eyebrow, title (through `Title`, tag chosen, look fixed) and intro optional
  and centred as in the mockup.
- **Submit**: site `Button` with `arrow`, variant primary (`high` on night); full width under
  520 px of container. Disabled and loading state while sending.
- **Multi-step**: more than one step = Astryx `Stepper` above the fields (horizontal; it collapses
  by itself to a bare track when narrow: use `horizontalOptions.collapsedVariant: 'withLabel'`
  because the form supplies its own buttons), « Retour » (ghost) and « Continuer » (primary)
  buttons on a full row, the submit button on the last step only. Each step is validated before
  moving on; values are kept when going back; focus moves to the step title on change; one single
  submission at the end. `aria-live` on the step change and on errors.
- **Validation**: native constraints plus messages through the Astryx field status (required,
  email format, consent required). Messages come from `labels` (defaults in French), never hard
  coded in the JSX.
- **After sending**: the confirmation (rich text node) replaces the form inside the same card,
  or a redirect when `confirmation.type === 'redirect'`. On failure, a `Callout`/`Banner` error
  above the submit button and the values stay.
- **Honeypot**: a visually hidden text input with a neutral name (`company_website`),
  `tabindex="-1"`, `autocomplete="off"`, plus a hidden timestamp set on mount. The component only
  sends them; the server decides.
- Light and night through the Section (`light-dark()` tokens as in the other components).
- **Registry**: `src/components/content-specs.ts`: `{type: 'form'}`, `minSpan` 4, `maxSpan` 12;
  extend `tests/int/content-specs.int.spec.ts`.
- **Catalogue**: `SiteFormShowcase` (category `formulaires`, add to `OWN` and `DRESSED` in
  `scripts/gen-catalog.mjs`, then `pnpm catalog:build`): the mockup's demo form at 12 columns
  (two columns of fields), the same in a column of 6 and of 4 (one column), a three-step form,
  night version, the confirmation state, the error state.
- Checks: `pnpm exec tsc --noEmit`, `pnpm run lint` (0 errors), captures at 1440 and 390 px of
  the showcase. Commit, push, PR `astryx` → `main`.

## Work item 2 — branch `payload`: the plugin, the block, the submission

1. `pnpm add @payloadcms/plugin-form-builder@3.88.0 --save-exact`. In `src/payload.config.ts`:
   ```ts
   formBuilderPlugin({
     fields: {text: true, email: true, textarea: true, number: true, date: true, select: true,
       radio: true, checkbox: true, message: true,
       state: false, country: false, payment: false, upload: false},
     formOverrides: {admin: {group: ct.groups.forms}, labels: …, fields: ({defaultFields}) => …},
     formSubmissionOverrides: {admin: {group: ct.groups.forms}, labels: …},
     redirectRelationships: ['pages'],
   })
   ```
   Plugin facts checked in the 3.88.0 package: field blocks `text, textarea, select, radio, email,
   state, country, checkbox, number, message, date, payment, upload`; each has `name`, `label`
   (localized), `width` (a number, percent), `required`, `defaultValue`; forms have
   `submitButtonLabel`, `confirmationType` (`message` | `redirect`), `confirmationMessage` (rich
   text), `redirect`, `emails[]`; `form-submissions` has `form` and `submissionData[] {field,
   value}` and is `create: () => true` for everyone (the public site posts to it).
2. **Custom field blocks**, added through `formOverrides.fields` (find the `fields` blocks field
   in `defaultFields` and append): `tel` (« Téléphone »), `consent` (« Consentement » : required
   checkbox with a localized label that may hold a link to the privacy page), `stepBreak`
   (« Nouvelle étape » : `title`, localized). Keep slugs in a `slugs.ts` module if client code
   needs them (known trap).
3. **Width**: the plugin's `width` is a free number. Replace it in `formOverrides.fields` (map over
   the blocks) with a select `half | full` stored in the same `width` field name if the type
   allows, otherwise add `fieldWidth`; defaults: half for text, email, tel, number, date, select;
   full for textarea, radio, checkbox, consent, message. Conversion: anything ≤ 50 = half.
4. **Extra form fields** (`formOverrides.fields`): `eyebrow`, `heading` (title with optional
   `<span>` accent) + shared `tagField` (h2 default), `intro` (textarea), all localized; the
   plugin's own `title` stays the admin name.
5. **Admin texts**: FR/EN dictionaries (`src/i18n/admin/forms.ts`): group « Formulaires »,
   collection labels « Formulaire / Formulaires », « Réponse / Réponses », every added field and
   block label. The plugin ships its own translations for its fields; check they show in French
   and override the labels that do not. No hard-coded admin text.
6. **Trap — shared configs**: Payload mutates block and field configs while sanitising. The
   confirmation message is a Lexical rich text: give it its own editor instance and build every
   added block through a factory. Never reuse a block object of `src/fields/blocks/` inside the
   plugin. After wiring the plugin, run `pnpm payload migrate:create check --skip-empty` on a clean
   tree **before** adding our fields: the diff must contain only the plugin's tables, and no
   existing table may be dropped or altered.
7. **Column block** `src/fields/blocks/formBlock.ts` (`ContentBlock`, `minSpan`/`maxSpan` from the
   registry): `form` (relationship to `forms`, required), `framed` (checkbox, default true),
   `showHeading` (checkbox, default true). Validation on `form`, as a confort warning only if
   Payload allows a non-blocking message; otherwise a field description: « Plus de 3 étapes : préférez
   une colonne de 6 ou plus ». Add to `blocks` in `src/sections.config.ts`, picker preview
   (`PREVIEW_SLUGS`, `/apercu`, `pnpm previews:build`).
8. **Conversion** `src/lib/forms.ts`: a `Form` document → `SiteForm` props: split the field blocks
   into steps at each `stepBreak` (fields before the first separator form step 1, whose title is
   the form heading or « Étape 1 »), map widths, render `message` blocks and the confirmation
   through `RichText`. `src/lib/sections.ts`: the chosen forms are loaded once by `toSections`
   (same pattern as `postsByIds`: add `formsByIds` to `SectionsContext` in `src/lib/site.ts`),
   locale passed. `PageSections.tsx`: `case 'form'`.
9. **Submission**: a server action (`src/app/(frontend)/actions/submitForm.ts`) rather than a
   direct POST to the REST API, so the rules run on the server: load the form, reject when the
   honeypot is filled or the fill time is under 3 s (answer « ok » silently, store nothing), keep
   only the names declared in the form, check required fields, consent and email format again,
   then `payload.create({collection: 'form-submissions', data: {form, submissionData}})`. Return
   `{ok: true}` or `{ok: false, errors}`; never echo internal errors.
   Read `node_modules/next/dist/docs/` on server actions first (AGENTS.md: this Next.js differs).
10. **Migrations**: `pnpm run db:backup`, then `pnpm run migrate:create forms`, read the file
    (only CREATE for `forms*`, `form_submissions*`, the `pages/posts/case_studies/sections`
    `_blocks_form` tables and rels; if a DROP appears, stop and look for a mutated shared config),
    `pnpm run migrate`, `pnpm run generate:types`, `pnpm generate:importmap`. If drizzle asks an
    interactive question, split in two migrations. If SQLite answers `SQLITE_BUSY` (the dev server
    holds the file), ask Nicolas to stop `pnpm dev` or retry; a half-run migration is resumed by
    making its CREATE statements `IF NOT EXISTS` (done once on 18 September, see
    `20260918_093309_entry_faq_related.ts`). Never drop tables by hand: the permission guard
    refuses it, and rightly so.
11. **Tests**: `scripts/smoke-forms.ts` + `pnpm smoke:forms` (dev server running): creates a
    throwaway form (every field type, two step breaks, consent), a throwaway page with the block
    at 4, 6 and 12 columns, checks the rendered markers (labels, step titles, `data-steps="3"`,
    submit label), posts a valid submission through the action's HTTP path or, simpler, calls the
    same server function directly, checks the stored `submissionData`, checks the refusals
    (missing required field, unticked consent, filled honeypot = nothing stored), then deletes the
    submissions, the page and the form. Extend `pnpm smoke:sections` with the block's width
    refusals (3 columns refused). `pnpm seed:demo`: a « Demander une démo » form (mockup) and a
    three-step form on `/demo-contenus`, recreated by slug/title like the rest.
    Admin checks with a temporary user through Playwright are fine, but **release its document
    locks before deleting it** (`payload-locked-documents` where `user.value` = its id), otherwise
    the edited document shows a blank edit view (happened on 18 September).

## Connection points for the tech lead (document them in `docs/forms.md`)

- **Email**: none configured. The plugin sends the form's `emails[]` through Payload's email
  adapter as soon as one is set in `payload.config.ts` (`email: nodemailerAdapter(…)` or a
  provider adapter); `defaultToEmail` and `beforeEmail` are the plugin options to use. Until then
  Payload logs the emails to the console and the submissions are only stored.
- **Anti-spam**: honeypot and minimum fill time live in `submitForm.ts`, in one function
  `looksLikeSpam(input)`; a rate limit or an external check plugs in there.
- **Access**: `form-submissions` is readable by logged-in users only; creation goes through the
  server action. Say in the doc that the REST endpoint is still open for `create` (plugin default)
  and how to close it (`formSubmissionOverrides.access.create`) once the action is the only path
  — do close it if the action uses the local API with `overrideAccess`.
- **Personal data**: submissions hold personal data; note the retention question for the tech
  lead (no automatic purge is built).

## Order and delivery

1. Work item 1 on `astryx`, PR to `main`.
2. `git checkout payload && git merge astryx`, work item 2, PR to `main`.
3. Docs: `docs/forms.md` (how it works, admin, connection points, tests), a line in
   `docs/section-builder.md` (block table: Formulaire, `SiteForm`, 4, 12), pointer in `CLAUDE.md`,
   and mark this handoff « Status: done » with the differences, like the previous ones.
4. Give Nicolas the two PR links in order, what to look at (`/design/composants/site-form`,
   `/demo-contenus`, admin › Formulaires), and the open points for the tech lead.
