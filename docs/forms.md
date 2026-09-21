# Forms

Built on 21 September 2026 from the handoff `docs/handoff-2026-09-21-forms.md` (decisions taken with
Nicolas). Mockup: `Orbita/orbita/17-forms.html` (fields, states, « Demander une démo » card).

## Admin

Group **Formulaires**, from the official `@payloadcms/plugin-form-builder` (pinned to 3.88.0, like
Payload), set up in `src/fields/forms/plugin.ts` (`formsPlugin()`, registered in `payload.config.ts`):

- **Formulaires** (`forms`), in three tabs (reworked on 21 September 2026 at Nicolas's request):
  **Formulaire**: the **title** (translatable, shown on the site above the fields and in the list;
  an optional `<span>` accent, stripped in the list through the hidden `listTitle`) and its tag (h2
  by default), the **eyebrow** and its style (text in small caps, or a badge), the **lead**, the
  **Champs**, the submit button label; **Après l'envoi**: confirmation message or redirect to a page
  or a URL; **E-mails**: the plugin's emails (sent once an email adapter exists, see below).
- A **« Nouveau formulaire »** button ends the sidebar menu, right under the Formulaires group
  (`src/fields/forms/NewFormNavLink.tsx`, `afterNavLinks`).
- **Champs** (blocks, in the picker's order): Texte court, E-mail, Téléphone, Texte long, Liste
  déroulante, Choix unique (radios), Case à cocher, Nombre, Date, Texte libre (between fields),
  **Consentement** (always required, optional privacy link) and **Nouvelle étape**. Each value field
  has a technical **name** (unique in the form: checked on save), a label, « Obligatoire », and a
  **width**: « demi » (default for short fields) or « pleine ». The plugin's state, country, payment
  and upload fields are off (upload: phase 2).
- **Liste déroulante** has two settings of its own: « Choix multiple » (the choices show as badges
  in the field, each with its remove cross) and « Recherche dans la liste » (beyond 5 options, the
  default; always; never). Submissions store the option labels, comma-separated when several.
- **Nouvelle étape** splits the form: the fields after it form a new step, up to the next one. At
  the very top, it names the first step. No separator = a plain form.
- **Réponses** (`form-submissions`): one per sending, with the form and the values (`field` = name,
  `value` = text; boxes stored as « Oui » / « Non »; empty fields not stored). Read by logged-in
  users; nobody creates or edits them in the admin.

## Placing a form

Section builder block **« Formulaire »** (`src/fields/blocks/formBlock.ts`): a form of the
collection, « Dans une carte encadrée » and « Afficher le surtitre, le titre et l'introduction »
(both on by default). **4 to 12 columns** (`content-specs.ts`, `form`). Not in the hero (Nicolas's
decision, 21 September 2026).

## Site: `SiteForm`

`src/components/SiteForm.tsx` (client, no Payload), catalogue `/design/composants/site-form`:

- **One or two columns of fields**, decided by the real width of the column (container query on
  the form root): under 840 px everything is full width; from 840 px (a column of 8 or wider in the
  1440 px container) a « half » field takes one of two columns. A lone half field keeps its half.
  DOM order = admin order = reading and tab order.
- **Card**: surface colour (night card on night), border, 48 px padding, 24 px under 520 px of
  column; the submit button goes full width there.
- **Steps**: Astryx `Stepper` above the fields (it collapses to a bare track with the step name when
  narrow), « Retour » / « Continuer », the submit button on the last step. Each step is validated
  before moving on; values are kept when going back; focus goes to the step title.
- **Validation** in the browser (required, email, consent) with the fields' error state; the same
  checks run again on the server.
- **After sending**: the confirmation replaces the form in its card, or the browser goes to the
  redirect. A failed sending shows an error banner and keeps the values.

Migrations of the rework: `form_heading_add` (eyebrow style, list title), `form_heading_drop` (the
former « Titre affiché » copied into the title, then dropped), `form_title_localized` (the title moves
to the translated table, copied, list title filled).

Conversion: `src/lib/forms.ts` (`formData`: steps, widths, redirect), loaded once per page by
`toSections` (`formsByIds`, `src/lib/forms-load.ts`); rendering in `PageSections` (rich texts through
`RichText`).

## Sending: `submitForm`

`src/app/(frontend)/actions/submitForm.ts`, a Next.js server action handed to `SiteForm` as
`submitAction` (in this Next.js a function prop crossing to a client component must be named
`action` or `…Action`; the form id travels in the input). It:

1. drops spam silently (`looksLikeSpam`): a filled honeypot (`company_website`, hidden input) or a
   form sent less than 3 s after it was shown → answered « ok », nothing stored;
2. loads the form and keeps only the names it declares;
3. checks required fields, email format and consent again;
4. creates the submission through the local API (the REST endpoint refuses creation: 403).
   Internal errors are logged, never returned to the visitor.

## Connection points for the tech lead

- **Email**: no adapter configured. Once one is set in `payload.config.ts` (`email:
  nodemailerAdapter(…)` or a provider adapter), the plugin sends each form's **Emails** on every
  submission (`{{name}}` placeholders, `{{*:table}}` for all values). Plugin options for later, in
  `formsPlugin()`: `defaultToEmail`, `beforeEmail`. Until then Payload only logs.
- **Anti-spam**: `looksLikeSpam(input)` in `submitForm.ts` is the single place to add a rate limit,
  an IP check or an external service.
- **Access**: `form-submissions` is read by logged-in users only, created by the server action only
  (`access.create: () => false`; the local API overrides access).
- **Personal data**: submissions hold personal data. No automatic purge is built: retention period
  and purge are to be decided.

## Tests and demo

- `pnpm smoke:forms` (dev server running): two throwaway forms (every field type and three steps; a
  one-step form) and a throwaway page with the block at 12, 6 and 4 columns. Checks the duplicate
  name refusal, the 3-column refusal, the rendering (heading, steps, labels, widths, honeypot), a
  valid submission and its stored values, the refusals (required, consent, email), spam kept out,
  the REST refusal; then deletes everything.
- `pnpm seed:demo`: « Démo · Demander une démo » (mockup 17) and « Démo · Projet en trois étapes »,
  updated in place (their submissions stay), shown on `/demo-contenus#formulaires` at 12, 7 and 4
  columns.
- Picker preview: `public/apercus/form.png` (`/apercu/form`, `pnpm previews:build`).

## Phase 2 (not built)

File upload field, the footer newsletter wired to the same system, the mockup's « split image »
section background, a form in the hero.
