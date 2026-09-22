# Handoff: links that open a modal (22 September 2026)

> **Status: done** (Claude Opus, 22 September 2026). Built, migrated (`modals`), tested
> (`pnpm smoke:modals`, every other smoke test, `test:int`, lint, types) and documented in
> `docs/modals.md`. What differs from the plan below:
> - `destructive` was already in the house Button and its showcase: nothing to add. The house
>   Dialog now hides its close cross when `purpose="required"`.
> - The slot also needs `@modal/page.tsx` and `@modal/[...catchAll]/page.tsx` (empty): without the
>   catch-all, a footer button to a page would leave the modal on screen.
> - Rich texts in text boxes, tabs and key points are rendered by client components, which cannot
>   take a `resolveLink` function: internal links get their address written on them during the
>   server conversion instead (`src/lib/links.ts`, `fields.resolvedHref`).
> - The inserted form lives in the JSON of the rich text: no `modals_rels` table.
>
> **Original status: ready for Opus, nothing built.** Written by Claude Fable for the next session (Claude
> Opus), from Nicolas's note in `consignes.md` and his answers on 22 September 2026. Every
> decision is taken (§ Decisions). Read `CLAUDE.md`, `docs/handoff-2026-09-17.md` (project
> rules and traps) and `docs/forms.md` before touching code. The rules there apply here: French with
> Nicolas, English in code and docs, FR/EN admin dictionaries, backup and reviewed migrations,
> throwaway pages for tests, `consignes.md` never written.

## Nicolas's request

« Des liens qui ouvrent des modales. Quand on insère un lien, on peut choisir ouverture modale.
Dans une modale, on peut mettre le riche editor du composant texte, un form, des CTA. »

Answers of 22 September 2026:

- **Three cases matter most**: a simple modal with one or two sentences; a modal with a lot of text
  (terms to accept, scrolling); a modal with a form. The rest is secondary.
- **Width chosen per modal**: the three existing widths of the site's Dialog (420 / 620 / 840),
  which Nicolas prefers to his first idea of 300 / 500 / 800.
- **Footer buttons**: simple buttons only (no split), with a **destructive** style available.
- **Silo**: the page's, no choice on the modal.
- **The modal is chosen as an internal link** (« Lien interne »), not through an « open in a
  modal » switch.
- Address `/modale/<slug>`: yes. No need for modals in the header or the footer.
- A fixed body order (text, then form) was the point he found problematic: he chose the free
  body (option A below).

## What already exists

- **The site modal**: `src/components/Dialog.tsx` (client, mockup `Orbita/orbita/20-modal.html`),
  on Astryx `Dialog`: title (required, names the modal), optional eyebrow, three widths (`WIDTH`,
  today 420 / 620 / 840), light or night tone, `purpose` (info / form / required), footer
  `actions`, scrolling body under a fixed header and footer (`maxHeight` min(86dvh, 760px)),
  Escape and focus handled by Astryx. Catalogue `/design/composants/dialog`. Its header comment
  already says the eyebrow is « controllable from Payload ».
- **Rich text links**: `LinkFeature({enabledCollections: ['pages', 'posts', 'case-studies']})` in
  `src/fields/editors.ts` (`baseFeatures()`, shared by the tabs, text box and post editors). A link
  node stores `fields: {linkType: 'custom' | 'internal', url?, doc?: {relationTo, value}, newTab}`.
  The site renders links in `src/components/RichText.tsx` (`linkHref`, server component): internal
  links go through the host's `resolveLink` prop, implemented by `resolveEntryLink` in
  `src/lib/site.ts` (pages → `pagePath()`, posts and case studies → their listing address).
- **Every other link is a plain `href` text field** (`linkGroup`, `buttonRowFields()`, header,
  footer). Astryx links and buttons all navigate through Next's `Link` (`LinkProvider
  component={NextLink}` in `src/theme/OrbitaThemeProvider.tsx`): a button whose address is
  `/modale/<slug>` opens the modal over the page with no extra work.
- **Forms**: `SiteForm` (client) takes a `FormData` (`src/lib/forms.ts`) and the server action
  `submitForm`; `PageSections.tsx` builds it in its local `Form` function (rich texts of message
  fields and confirmation rendered through `RichText`). Forms are loaded once per page by
  `loadFormsByIds` (`src/lib/forms-load.ts`).
- **Live Preview**: `src/livePreview.ts` lists the collections that get the « Aperçu en direct »
  tab and computes their URL.
- **Prose editor precedent**: `src/fields/blocks/prose/index.ts` inserts blocks in a rich text
  (`BlocksFeature`, block factories) rendered by the host through `renderBlock`.

## Two findings that shape the design

1. **A third link type is not viable in the link editor.** Payload's floating link editor
   (`@payloadcms/richtext-lexical/dist/features/link/client/plugins/floatingLinkEditor/LinkEditor/index.js`,
   line 112) treats every `linkType` other than `custom` as an internal link and **throws** when
   `fields.doc` is missing (« Focus link parent is missing doc.value or doc.relationTo »). A custom
   « Modale » radio would crash the editor or need a patched client feature. Internal links are the
   supported path (confirmed by Nicolas): a modal is a document of a `modals` collection, and the
   editor's « Lien interne » lets the writer pick it (collection « Modales », then the modal). One
   line changes in `editors.ts`: add `'modals'` to `enabledCollections`.
2. **Internal links on pages are not resolved today.** `PageSections` / `TextBox` / `Tabs` /
   `KeyPoints` render `RichText` without `resolveLink`, so a text box link to a post renders as
   `/<post-slug>` (wrong; pages are fine thanks to their stored `path`). Modals need a resolver on
   pages anyway: fix both at once by threading `resolveLink` through `PageSections` (one prop,
   built with `resolveEntryLink(site, …)` in the routes).

## Design: modals are addresses (`/modale/<slug>`), opened over the page

Every modal has a URL, `/modale/<slug>`, opened with Next's **parallel + intercepting routes**
(the App Router's own modal pattern; read
`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/parallel-routes.md`
§ Modals, `intercepting-routes.md` and `default.md` first: this Next differs from training data).

- A link inside a rich text is an internal link to a modal → rendered by `RichText` as a normal
  `NextLink` to `/modale/<slug>` (through `resolveLink`). Client-side navigation is intercepted:
  the page stays, the modal renders in the layout's `@modal` slot, on top. Escape, the close
  button, a « close » footer button and the browser's Back close it (`router.back()`).
- Opened directly (shared link, refresh, the admin's Live Preview): the full route
  `/modale/[slug]` renders the site frame (header, footer, site default silo) with the modal open
  over an empty page, close going to the home page. It is the Live Preview target of the
  collection.
- A footer button that links to another modal replaces it: the slot renders one route at a time,
  so modals never nest (Astryx's rule).
- The modal content is server-rendered (rich text, form data, buttons) like any page, with the
  real `SiteForm` and `submitForm`: no JSON shipped to the client, no client fetch, no scan of the
  page's rich texts to find which modals it references.

### The three cases

| Case | Fields used | Behaviour |
|---|---|---|
| One or two sentences (a notice, a confirmation) | title, body text, width sm or md, one or two footer buttons (« Fermer », or « Annuler » + an action) | `purpose: 'info'`: Escape and backdrop close |
| Long text (terms to accept) | title, eyebrow, long body, width md or lg, a footer button « J'accepte » | the body scrolls under the fixed header and footer (already in `Dialog`); `purpose: 'required'` when the writer ticks « Réponse obligatoire » (no Escape, no backdrop click: the button is the only way out). Nothing is recorded: the site has no visitor accounts, « accepting » closes the modal or follows the button's address. |
| A form (request a demo, contact) | title, a short intro, the form, width md or lg | `purpose: 'form'` (the backdrop stops closing once the visitor typed); the confirmation replaces the form inside the modal; a redirect leaves the page, which closes the modal |

### Why not the alternatives

- **Pre-rendered modals in the page** (walk every rich text for modal links, mount hidden dialogs,
  open by id): no routing, but a walker over pages, shared sections, posts, case studies, forms'
  messages, hero, and per-route plumbing. Fallback only if the intercepting route misbehaves with
  the dynamic `[slug]` routes (it should not: `modale` is a static segment, matched before
  `[slug]/[entry]`).
- **A server function returning the modal's JSX on click**: under-documented in this Next, no URL,
  no Back-to-close, no Live Preview target.
- **Custom fields in the link drawer**: the editor crash above. Rejected, and Nicolas agreed.

## The `modals` collection (« Modales »)

`src/collections/Modals.ts`, slug `modals`, admin group « Site », `useAsTitle: 'title'`,
`access.read: () => true`, labels in `src/i18n/admin/collections.ts` (FR/EN), Live Preview on.

| Field | Type | Notes |
|---|---|---|
| `title` | text, localized, required | the heading inside the dialog; names it for assistive tech |
| `slug` | `slugField` (sidebar) | the address `/modale/<slug>`; add `modale` to `RESERVED` in `src/fields/listingSlug.ts` and to the pages' slug check if one exists |
| `eyebrow` | text, localized | the small gold caps above the title |
| `size` | select sm / md / lg (420 / 620 / 840), default md | the house `Dialog`'s `size`; labels show the pixel widths |
| `tone` | select light / night, default light | `Dialog` `tone` |
| `dismiss` | select « Libre » (info) / « Réponse obligatoire » (required), default free | `purpose`; a form in the body forces `form` when free |
| `body` | richText, localized, **its own editor** `modalEditor` | text box features plus an inserted « Formulaire » block (option A below) |
| `buttons` | array, max 2, **`modalButtonFields()`** | the footer's actions, right-aligned; a new small factory, not `buttonRowFields()` (no shape, no size, no icon) |

`modalButtonFields()` (in `src/fields/blocks/buttonFields.ts`, next to the existing factory):
`label` (localized, required); `action` select « Fermer la modale » / « Aller à une adresse »
(default close); `href` (required when action is address; may be `/modale/<autre>`); `variant`
select primary / secondary / ghost / **destructive**. Simple buttons only.

**Widths**: the house `Dialog`'s `WIDTH` (420 / 620 / 840) stays as it is. Check the sm case
with a two-button footer (buttons wrap; `HStack wrap`). A form at sm is single column by
construction (`SiteForm` goes single column under 840 px of column).

**Destructive variant**: Astryx `Button` has `variant="destructive"`; the house `Button`
(`src/components/Button.tsx`) passes variants through and the theme dresses secondary /
destructive with sharp corners (`orbita.ts` line 330). Add it to the house `ButtonProps` union,
show it in the Button showcase, and check the night tone.

Migration: new tables `modals`, `modals_locales`, `modals_buttons`, `modals_buttons_locales`,
`modals_rels` (the form of an inserted block). Rich text link nodes live in
JSON: enabling `modals` in `LinkFeature` changes no schema. Check with
`pnpm payload migrate:create check --skip-empty` after the collection: only the new tables,
nothing dropped.

## The body: free text with an inserted « Formulaire » block (option A, chosen)

Nicolas found a fixed order (text, then the form) problematic and chose the free body:

**A. Free body: a rich text with an inserted « Formulaire » block.** `modalEditor`
= the text box features (paragraphs, bold, italic, links, lists, tables) + `BlocksFeature` with
a `modalFormBlock()` factory (one relationship to `forms`, « Afficher le titre du formulaire »
off by default). The writer puts the form where they want: after an intro, before a legal note,
alone. Same mechanism as the post editor's figure blocks, rendered through `renderBlock`. Forms
referenced in the body are found by a small walker over the Lexical nodes (`type: 'block'`,
`blockType: 'modalForm'`), the ids loaded with `loadFormsByIds`. The footer buttons stay a
separate array: they are the modal's actions, not content. Cost: one block factory, one walker,
one `renderBlock` case. (The rejected alternative was fixed intro / form / outro slots.)

## Site side

```
src/app/(frontend)/layout.tsx                        children + modal slot, both inside OrbitaThemeProvider
src/app/(frontend)/@modal/default.tsx                returns null (slot empty on hard loads)
src/app/(frontend)/@modal/(.)modale/[slug]/page.tsx  intercepted route: <SiteModal modal=… />
src/app/(frontend)/modale/[slug]/page.tsx            full route: SitePage frame + <SiteModal … closeHref="/" />
src/lib/modals.ts                                    loadModalBySlug(locale) → ModalData (body, forms, buttons, width, tone, dismiss)
src/lib/modal-paths.ts                               modalPath(slug) = `/modale/${slug}` (client-safe)
src/components/SiteModal.tsx                         client: house Dialog open, close → router.back() or push(closeHref); page silo (below)
src/components/SiteModalBody.tsx                     server: RichText (resolveLink, renderBlock → SiteFormBlock), footer buttons
src/components/SiteFormBlock.tsx                     extracted from PageSections' local Form (server; steps, confirmation, submitForm)
```

- `RootLayout` becomes `({children, modal})` and renders `{children}{modal}` inside the theme
  provider; `LivePreviewRefresh` stays.
- **The page's silo.** The slot renders outside `SitePage`, whose provider fixes the silo. Make
  `SitePage` write the silo on the DOM (`data-silo` on a wrapper, or on `<html>` through a tiny
  effect) and let `SiteModal` read it on mount, then wrap its dialog in
  `OrbitaThemeProvider fixedSilo={silo}`. The standalone route uses the site default. Check the
  nested provider renders cleanly inside the root one (the night tone already re-wraps in
  `Theme`).
- Footer buttons: action « close » → `onOpenChange(false)`; action « address » → house `Button`
  with `href` (Next link through the provider). Variant passed through, destructive included.
- `resolveEntryLink` (`src/lib/site.ts`) gains `if (link.relationTo === 'modals') return
  modalPath(slug)`; `PageSections` and `TextBox` / `Tabs` / `KeyPoints` get a `resolveLink`
  prop (finding 2). `RichText`'s default fallback stays: it knows no site route.
- `livePreview.ts`: add `'modals'` to `collections`, URL `${base}/modale/${slug}`.
- Accessibility: Astryx `Dialog` moves focus to the title, traps it, returns it on close; Escape
  calls `onOpenChange(false)` → `router.back()`, except `dismiss: required`. The page behind keeps
  its scroll (pass `scroll={false}` on the link if it does not).

## Admin side

- `editors.ts`: `LinkFeature({enabledCollections: ['pages', 'posts', 'case-studies', 'modals']})`.
  The drawer then offers « Modales » in the internal link's collection dropdown. Payload's own
  labels (« Lien interne », « Choisir un document ») come from its translations: nothing to add.
- `collectionsText.modals` (singular « Modale », plural « Modales », field labels and descriptions
  FR/EN): « Une modale s'ouvre par-dessus la page depuis un lien interne (Modales) ou un bouton
  dont l'adresse est /modale/<identifiant>. »
- No « Nouvelle modale » shortcut unless Nicolas asks.

## Decisions

Taken on 22 September 2026: internal link (yes); address `/modale/<slug>` (yes); silo from the
page (yes); widths: the Dialog's existing sm / md / lg; footer buttons simple only, destructive
available; no modals needed in header or footer; body: free text with an inserted « Formulaire »
block (option A).

## Work items, in order (Opus)

Branch `astryx` (small): 1. `destructive` in the house `Button` and its showcase; 2. `SiteModal`
composition example in `DialogShowcase` (sentence, long text, form). Then `git checkout payload && git merge --ff-only
astryx`.

Branch `payload`:
1. `collectionsText.modals` dictionaries; `modalButtonFields()`; `modalFormBlock()`;
   `modalEditor` in `editors.ts`; `src/collections/Modals.ts`; register in `payload.config.ts`;
   `'modals'` in `LinkFeature` and `livePreview`; `modale` in `RESERVED`.
2. `pnpm run db:backup`, `pnpm run migrate:create modals`, review (only new tables),
   `pnpm run migrate`, `pnpm run generate:types`, then the `--skip-empty` check.
3. `src/lib/modal-paths.ts`, `src/lib/modals.ts`, the three route files and the layout slot,
   `SiteFormBlock` extraction, `SiteModal` / `SiteModalBody`, the page silo on the DOM,
   `resolveEntryLink` + `resolveLink` threaded through `PageSections`.
4. `scripts/smoke-modals.ts` (`pnpm smoke:modals`, dev server running): a throwaway form, three
   throwaway modals (sentence with two buttons, long required text, form), a throwaway page with
   a text box holding internal links to them and a button to `/modale/<slug>`; checks: the page's
   HTML links to `/modale/<slug>`, each `/modale/<slug>` renders the dialog markup (title,
   eyebrow, size, form fields, buttons with their variants), a headless browser opens the page,
   clicks a link, sees the dialog with the page still behind and the page's silo, Escape returns
   to the page URL, Escape does nothing on the required one; then deletes everything.
5. `pnpm seed:demo`: three demo modals linked from `/demo-contenus`.
6. `docs/modals.md`, a line in `CLAUDE.md`, the status line at the top of this file.
7. Pull requests with `gh`, links given to Nicolas (`main...astryx` first, then `main...payload`).

## Traps

- **Parallel slot and hard loads**: `@modal/default.tsx` is mandatory, otherwise every direct
  load of a page errors. Read `default.md`.
- **Interception needs client-side navigation**: `RichText` uses `NextLink`, Astryx buttons go
  through the `LinkProvider`. A raw `<a>` anywhere else shows the full route, not the overlay.
  Links with `newTab` open the full route in a new tab: acceptable.
- **The slot is outside `SitePage`**: no silo, no header context. Hence the silo read from the
  DOM; the first client render may flash the default silo, so read it before opening
  (`useLayoutEffect`) rather than after.
- **`router.back()` in the standalone route** would leave the site: the standalone page passes
  `closeHref="/"` and the component pushes instead.
- **Shared configs**: `modalEditor` is its own `lexicalEditor(...)`, `modalFormBlock()` and
  `modalButtonFields()` are called, never shared arrays. After registering the collection, the
  `--skip-empty` check must create nothing more than the new tables.
- **Server-only imports**: `src/collections/Modals.ts` imports `editors.ts` (server). Anything the
  client needs (the `/modale` prefix) lives in `src/lib/modal-paths.ts`.
- **Payload internals**: none touched (no admin CSS, no patched feature), which is the point of
  the internal-link choice.
- **Locks**: the headless smoke test edits nothing in the admin; if it ever does, clean the
  `payload-locked-documents` rows it leaves.
