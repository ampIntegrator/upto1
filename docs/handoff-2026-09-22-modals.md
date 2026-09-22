# Handoff: links that open a modal (22 September 2026)

> **Status: study, nothing built.** Written by Claude Fable for the next session (Claude Opus),
> from Nicolas's note in `consignes.md` on 22 September 2026. The decisions marked « to confirm »
> below wait for Nicolas's answer; each comes with the recommended choice first. Read `CLAUDE.md`,
> `docs/handoff-2026-09-17.md` (project rules and traps) and `docs/forms.md` before touching code.
> The rules there apply here: French with Nicolas, English in code and docs, FR/EN admin
> dictionaries, backup and reviewed migrations, throwaway pages for tests, `consignes.md` never
> written.

## Nicolas's request

« Des liens qui ouvrent des modales. Quand on insère un lien, on peut choisir ouverture modale.
Dans une modale, on peut mettre le riche editor du composant texte, un form, des CTA. »

So: (1) a **modal is content** written once in the admin (a title, a text, optionally a form, some
buttons); (2) **any link** in a rich text can open one instead of leaving the page; (3) the same
should be reachable from buttons later.

## What already exists

- **The site modal**: `src/components/Dialog.tsx` (client, mockup `Orbita/orbita/20-modal.html`),
  on Astryx `Dialog`: title (required, names the modal), optional eyebrow, three widths (sm 420,
  md 620, lg 840), light or night tone, `purpose` (info / form / required), footer `actions`,
  scrolling body, Escape and focus handled by Astryx. Catalogue `/design/composants/dialog`. Its
  header comment already says the eyebrow is « controllable from Payload ». Nothing to build on the
  component side except a thin content composition.
- **Rich text links**: `LinkFeature({enabledCollections: ['pages', 'posts', 'case-studies']})` in
  `src/fields/editors.ts` (`baseFeatures()`, shared by the tabs, text box and post editors). A link
  node stores `fields: {linkType: 'custom' | 'internal', url?, doc?: {relationTo, value}, newTab}`.
  The site renders links in `src/components/RichText.tsx` (`linkHref`, server component): internal
  links go through the host's `resolveLink` prop, implemented by `resolveEntryLink` in
  `src/lib/site.ts` (pages → `pagePath()`, posts and case studies → their listing address).
- **Every other link is a plain `href` text field**: `linkGroup` (`src/fields/shared.ts`: hero
  buttons, header login and CTA, clickable cards, price CTAs), `buttonRowFields()` (text box, button
  group, CTA band), header menu items, footer links. No internal / external switch anywhere.
- **Forms**: `SiteForm` (client) takes a `FormData` (`src/lib/forms.ts`) and the server action
  `submitForm`; `PageSections.tsx` builds it in its local `Form` function (rich texts of message
  fields and confirmation rendered through `RichText`). Forms are loaded once per page by
  `loadFormsByIds` (`src/lib/forms-load.ts`).
- **Live Preview**: `src/livePreview.ts` lists the collections that get the « Aperçu en direct »
  tab and computes their URL.

## Two findings that shape the design

1. **A third link type is not viable in the link editor.** Payload's floating link editor
   (`@payloadcms/richtext-lexical/dist/features/link/client/plugins/floatingLinkEditor/LinkEditor/index.js`,
   line 112) treats every `linkType` other than `custom` as an internal link and **throws** when
   `fields.doc` is missing (« Focus link parent is missing doc.value or doc.relationTo »). A custom
   « Modale » radio with its own `modal` relationship would crash the editor, or need a patched
   client feature. **Internal links are the supported path**: a modal is a document of a `modals`
   collection, and the editor's existing « Lien interne » lets the writer pick it (collection
   « Modales », then the modal). One line changes in `editors.ts`: add `'modals'` to
   `enabledCollections`.
2. **Internal links on pages are not resolved today.** `PageSections` / `TextBox` / `Tabs` /
   `KeyPoints` render `RichText` without `resolveLink`, so a text box link to a post renders as
   `/<post-slug>` (wrong; pages are fine thanks to their stored `path`). Modals need a resolver on
   pages anyway: fix both at once by threading `resolveLink` through `PageSections` (one prop,
   built with `resolveEntryLink(site, …)` in the routes).

## Recommendation: modals are addresses (`/modale/<slug>`), opened over the page

Give every modal a URL, `/modale/<slug>`, and open it with Next's **parallel + intercepting
routes** (the App Router's own modal pattern; read
`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/parallel-routes.md`
§ Modals, `intercepting-routes.md` and `default.md` first: this Next differs from training data).

- A link inside a rich text is an internal link to a modal → rendered by `RichText` as a normal
  `NextLink` to `/modale/<slug>` (through `resolveLink`). Client-side navigation is intercepted:
  the current page stays, the modal renders in the layout's `@modal` slot, on top. Escape, the
  close button and the browser's Back close it (`router.back()`). Forward reopens it.
- Opened directly (shared link, refresh, the admin's Live Preview): the full route
  `/modale/[slug]` renders the site frame (header, footer) with the modal open over an empty page,
  close going to the home page. That page is also the Live Preview target of the collection.
- **Any `href` field can open a modal by pointing to `/modale/<slug>`**: buttons, header, footer,
  hero, price CTAs, with no new field. That covers « les CTA » in one move (see the Button note in
  the work items: the house Button must navigate client-side for the overlay to appear).
- A link to a modal inside a modal (a button of the footer) replaces it: the slot renders one
  route at a time, so modals never nest (Astryx's rule).
- The modal content is server-rendered (rich text, form data, buttons) like any page, with the
  real `SiteForm` and `submitForm`: no JSON shipped to the client, no client fetch, no scan of the
  page's rich texts to find which modals it references.

### Why not the alternatives

- **Pre-rendered modals in the page** (walk every rich text of the page for modal links, load
  them, mount hidden dialogs, open by id from a client link): instant open and no routing, but a
  walker over pages, shared sections, posts, case studies, forms' messages, hero… and a per-route
  plumbing that the intercepting route makes unnecessary. Keep as fallback if the intercepting
  route misbehaves with the dynamic `[slug]` routes (it should not: `modale` is a static segment,
  matched before `[slug]/[entry]`).
- **A server function returning the modal's JSX on click**: works in principle, but an
  under-documented path in this Next, no URL, no Back-to-close, no Live Preview target.
- **Custom fields in the link drawer** (« Ouvrir dans une modale » checkbox + relationship): the
  client editor crash above, plus a custom URL that means nothing. Rejected.

## The `modals` collection (« Modales »)

`src/collections/Modals.ts`, slug `modals`, admin group « Site », `useAsTitle: 'title'`,
`access.read: () => true`, labels in `src/i18n/admin/collections.ts` (FR/EN), Live Preview on.

| Field | Type | Notes |
|---|---|---|
| `title` | text, localized, required | the modal's heading (h2 inside the dialog, names it for assistive tech) |
| `slug` | `slugField` (sidebar) | the address `/modale/<slug>`; unique; add `modale` to `RESERVED` in `src/fields/listingSlug.ts` (the listing addresses' reserved words) and to the pages' slug check if one exists |
| `eyebrow` | text, localized | the small gold caps above the title |
| `size` | select sm / md / lg, default md | `Dialog` widths 420 / 620 / 840 |
| `tone` | select light / night, default light | `Dialog` `tone` |
| `silo` | `siloField({name: 'silo', fromSettings: true})` | the slot cannot know the page's silo (see traps): the modal carries its own, site default by default |
| `content` | richText, localized, **its own editor** `modalEditor` | paragraphs, bold, italic, links, lists, tables (same features as the text box): `lexicalEditor({features: () => [...baseFeatures(), EXPERIMENTAL_TableFeature()]})`, a fresh instance in `editors.ts` |
| `form` | relationship → `forms`, optional | rendered under the text, unframed, heading hidden (the modal's own title serves), `purpose` becomes `form` |
| `buttons` | array of `buttonRowFields()`, max 2 | the footer's actions, right-aligned |

**To confirm (2)**: this fixed order (text, then form, then footer buttons) is the recommendation:
predictable, one screen, matches the mockup's three cases (confirmation, form, long document). The
alternative, a free layout (blocks inserted anywhere in the text with `BlocksFeature`, like the
post editor), is not worth it for a modal.

Migration: new tables `modals`, `modals_locales`, `modals_buttons`, `modals_buttons_locales`,
`modals_rels` (form). Rich text link nodes live in JSON: enabling `modals` in `LinkFeature`
changes no schema. Check with `pnpm payload migrate:create check --skip-empty` after the
collection: only the new tables, nothing dropped.

## Site side

```
src/app/(frontend)/layout.tsx                  children + modal slot, both inside OrbitaThemeProvider
src/app/(frontend)/@modal/default.tsx          returns null (slot empty on hard loads)
src/app/(frontend)/@modal/(.)modale/[slug]/page.tsx   the intercepted route: <SiteModal modal=… />
src/app/(frontend)/modale/[slug]/page.tsx      the full route: SitePage frame + <SiteModal … standalone />
src/lib/modals.ts                              loadModalBySlug(locale) → ModalData (toButton, formData, content)
src/components/SiteModal.tsx                   client: house Dialog, isOpen true, onOpenChange(false) → router.back() (standalone: router.push('/')), silo through OrbitaThemeProvider fixedSilo
src/components/SiteModalContent.tsx            server: RichText (resolveLink), the form, the buttons → passed as children / actions
```

- `RootLayout` becomes `({children, modal})` and renders `{children}{modal}` inside the theme
  provider; `LivePreviewRefresh` stays.
- The form inside the modal reuses `PageSections`' local `Form` function: **extract it** to
  `src/components/SiteFormBlock.tsx` (server, builds steps and confirmation with `RichText`, hands
  `submitForm`) and use it in both places. After sending, the confirmation replaces the form inside
  the dialog; a redirect leaves the page, which closes the modal by itself.
- `resolveEntryLink` (`src/lib/site.ts`) gains `if (link.relationTo === 'modals') return
  \`/modale/${slug}\``; `PageSections` and `TextBox` / `Tabs` / `KeyPoints` get a `resolveLink`
  prop (finding 2). `RichText`'s default fallback stays: it knows no site route.
- **Button** (`src/components/Button.tsx`, branch `astryx`): Astryx `Button` accepts `as` for a
  custom link component. Pass `as={NextLink}` when `href` starts with `/` so buttons navigate
  client-side (needed for the overlay; also gives prefetching to every internal button). Check
  the split button and `ButtonGroup` still render, then the catalogue.
- `livePreview.ts`: add `'modals'` to `collections`, URL `${base}/modale/${slug}`.
- Accessibility: Astryx `Dialog` moves focus to the title, traps it, returns it on close; Escape
  calls `onOpenChange(false)` → `router.back()`. The page behind keeps its scroll (intercepted
  navigation does not scroll; pass `scroll={false}` on the link if it does).

## Admin side

- `editors.ts`: `LinkFeature({enabledCollections: ['pages', 'posts', 'case-studies', 'modals']})`.
  The drawer then offers « Modales » in the internal link's collection dropdown. Payload's own
  labels (« Lien interne », « Choisir un document ») come from its translations: nothing to add.
- **To confirm (1)**: is « Lien interne › Modales › la modale » acceptable as the way to choose a
  modal? It is what the editor supports without patching it. If Nicolas wants a visible « Ouvrir
  dans une modale » switch, the honest answer is a custom client link feature (a copy of Payload's
  `LinkFeatureClient` with an extra branch), to keep in check after every Payload update: not
  recommended.
- A « Nouvelle modale » shortcut under the Site group is not needed (the collection's own « Créer »
  button suffices); skip unless Nicolas asks.
- `collectionsText.modals` (singular « Modale », plural « Modales », field labels), field
  descriptions FR/EN: « Une modale s'ouvre par-dessus la page depuis un lien interne (Modales) ou
  un bouton dont l'adresse est /modale/<identifiant>. »

## Decisions to confirm with Nicolas (recommended choice first)

1. **Choosing the modal in a link**: « Lien interne » then the « Modales » collection (no editor
   patch) — or a custom « Modale » switch in the drawer (custom client feature, fragile).
2. **What a modal holds**: text, then an optional form, then up to two footer buttons, in that
   order — or a free layout of blocks inside the text.
3. **Address**: `/modale/<identifiant>`, shareable, full page with the modal open when reached
   directly — or no URL (pre-rendered modals; loses Back-to-close, sharing and Live Preview).
4. **Silo of the modal**: its own silo field, site default by default — or always the site
   default (fewer fields, but a modal opened from a page of another silo will not match it).
5. **Buttons and menus**: reachable now by typing `/modale/<identifiant>` in the address field —
   a link picker (page / post / modal / URL) for every `href` field is a separate, later item.

## Work items, in order (Opus)

Branch `astryx` (small): 1. `Button` navigates with `NextLink` for internal addresses;
2. `SiteModal` / `SiteModalContent` composition and a catalogue example in `DialogShowcase`
(text + form + buttons case). Then `git checkout payload && git merge --ff-only astryx`.

Branch `payload`:
1. `collectionsText.modals` dictionaries; `src/collections/Modals.ts`; `modalEditor` in
   `editors.ts`; register in `payload.config.ts`; `'modals'` in `LinkFeature` and `livePreview`.
2. `pnpm run db:backup`, `pnpm run migrate:create modals`, review (only new tables),
   `pnpm run migrate`, `pnpm run generate:types`, then the `--skip-empty` check.
3. `src/lib/modals.ts`, the three route files and the layout slot, `SiteFormBlock` extraction,
   `resolveEntryLink` + `resolveLink` threaded through `PageSections`.
4. Reserved word `modale`: `RESERVED` in `src/fields/listingSlug.ts`; check whether top-level pages
   refuse reserved slugs too (`pageSlugValidate` in `src/collections/Pages.ts`), add it there or note
   it in `docs/pages.md`.
5. `scripts/smoke-modals.ts` (`pnpm smoke:modals`, dev server running): a throwaway form, a
   throwaway modal (text + form + two buttons), a throwaway page with a text box holding an
   internal link to the modal and a button to `/modale/<slug>`; checks: the page's HTML links to
   `/modale/<slug>`, `/modale/<slug>` renders the dialog markup (title, eyebrow, form fields,
   buttons), a headless browser opens the page, clicks the link, sees the dialog with the page
   still behind, Escape returns to the page URL; then deletes everything (locks cleaned).
6. `pnpm seed:demo`: « Démo · Demander une démo » modal linked from `/demo-contenus`.
7. `docs/modals.md`, a line in `CLAUDE.md`, the status line at the top of this file.
8. Pull requests with `gh`, links given to Nicolas (`main...astryx` first, then `main...payload`).

## Traps

- **Parallel slot and hard loads**: `@modal/default.tsx` is mandatory, otherwise every direct
  load of a page errors. Read `default.md`.
- **Interception needs client-side navigation**: a raw `<a href="/modale/x">` shows the full route,
  not the overlay. Hence the `Button` change; `RichText` already uses `NextLink`. Links with
  `newTab` open the full route in a new tab: acceptable.
- **The slot is outside `SitePage`**: no silo, no header context. `SiteModal` wraps itself in
  `OrbitaThemeProvider fixedSilo={modal.silo}` (check the provider nests cleanly inside the root
  one; the night tone already re-wraps in `Theme`).
- **`router.back()` in the standalone route** would leave the site: the standalone page passes a
  `closeHref="/"` and the component pushes instead.
- **Shared configs**: `modalEditor` is its own `lexicalEditor(...)`, `buttonRowFields()` is called,
  never a shared array. After registering the collection, the `--skip-empty` check must create
  nothing more than the new tables.
- **Server-only imports**: `src/collections/Modals.ts` imports `editors.ts` (server). Anything the
  client needs (the `/modale` prefix, sizes) lives in a small `src/lib/modal-paths.ts`.
- **Payload internals**: none touched (no admin CSS, no patched feature), which is the point of
  the internal-link choice.
- **Locks**: the headless smoke test edits nothing in the admin; if it ever does, clean the
  `payload-locked-documents` rows it leaves.
