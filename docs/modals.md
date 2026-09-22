# Modals

Built on 22 September 2026 from the handoff `docs/handoff-2026-09-22-modals.md` (decisions taken with
Nicolas). A modal is content written once in the admin and opened over any page, without leaving it
nor changing its address (an anchor, `#modale-<slug>`).

## Admin

Collection **Modales** (`modals`, group « Site »), `src/collections/Modals.ts`:

- **Surtitre** and **Titre** (translatable; the title names the dialog for assistive tech).
- **Largeur**: the site Dialog's three widths, « Étroite » 420 px, « Moyenne » 620 px (default),
  « Large » 840 px. **Fond**: light or night.
- **Fermeture**: « Libre » (close cross, Escape, click outside) or « Réponse obligatoire » (no cross,
  no Escape, no click outside: only the footer buttons close it; at least one button is required,
  checked on save). For terms to accept. Nothing is recorded: the site has no visitor accounts.
- **Contenu**: a rich text (`modalEditor` in `src/fields/editors.ts`: the text box's features, plus a
  **« Formulaire »** block inserted anywhere with « + » or « / »: a form of the Formulaires
  collection, shown without its card, its heading hidden unless ticked). The text can come before,
  after or around the form, or the form alone. The first form's buttons (« Retour », « Continuer »,
  the send button) sit in the modal's footer, after the modal's own buttons, not at the end of the
  scrolling body; once the form is sent they go, and an empty footer is hidden.
- **Boutons du pied**: two at most, right-aligned; each has a label, a style (primary, secondary,
  ghost, **destructive**) and an action: « Fermer la modale » or « Aller à une adresse » (a page, or
  another modal at `/modale/<slug>`). Simple buttons only (no split, no icon).
- **Slug** (sidebar): the modal's identifier, `#modale-<slug>` in a button's address. The admin's
  eye and the Live Preview show it over an empty page (`/modale/<slug>`).
- No silo: a modal takes the silo of the page it opens over.

**Opening a modal**: in any rich text (text box, tabs, key points, posts, case studies, another
modal), select words, add a link, « Lien interne », collection « Modales », then the modal. Any
button or link field whose address is the modal's anchor, `#modale-<slug>`, opens it too (hero,
text box, button group, CTA band…). Header and footer: not needed (Nicolas's decision), but the
anchor works there when the page renders the modal (see below).

## Site

Reworked on 22 September 2026 (Nicolas: the address must stay the page's): a modal opens through
an **anchor**, `/tarifs#modale-demo-demande`, not through a route of its own.

- **Addresses**: `src/lib/modal-paths.ts` (`modalHash`, `modalSlugFromHash`, the reserved anchor
  prefix `modale-`, `modalPath` for the preview page, the block slug, the types; client-safe). The
  segment `modale` stays reserved: a listing address cannot take it (`RESERVED` in
  `src/fields/listingSlug.ts`), nor a top-level page (`pageSlugValidate`).
- **The page renders its modals, closed.** When the server builds a page, `collectModalSlugs`
  (`src/lib/links.ts`) walks its content (hero, sections, shared sections, a post's prose and FAQ)
  for internal links to modals and for any address equal to a modal anchor (buttons). `loadModals`
  (`src/lib/modals.ts`) loads them with their forms, and follows the modals they link to (a
  footer button to another modal), three rounds at most. `PageModals` (server) renders them
  through `SiteModals` (client), placed inside `SitePage`: the modals take the page's silo by
  construction. Routes: `PageRoute`, `PostPage`, `CasePage`.
- **Opening and closing** (`SiteModals`): the anchor of the address decides which modal is open;
  a click on `#modale-<slug>` (a plain link, a button) changes the anchor, the matching modal
  opens, the page keeps its address and its scroll (no element carries that id, so the browser
  does not jump). Closing (cross, Escape, a « close » footer button) removes the anchor: back in
  history when the anchor came from a click on this page (so the browser's Back closes it too), a
  replacement when the page was loaded with the anchor. One modal at a time: a link to another
  modal replaces the open one. A footer button to a page leaves the page, which closes it.
- **Limits**: a modal opens only on a page that links to it (its content is in the page). An
  anchor typed by hand on a page without that link does nothing. A page linking to many modals
  renders them all in its HTML.
- **The modal's own page**, `/modale/<slug>` (`src/app/(frontend)/modale/[slug]/page.tsx`): the
  admin's preview only (the eye, the Live Preview): the site frame in the site's default silo with
  the modal open, closing going to the home page; `noindex`, never linked from the site.
- **The form's buttons in the footer**: `SiteForm` takes `actionsTarget`, the DOM id of an element
  outside the form; its buttons render there through a React portal (still driven by the form:
  steps, sending state), the send button calls `requestSubmit()`, and a hidden submit button stays
  in the form so Enter still sends it. In a modal's footer the form's buttons are simple ones,
  never split (Nicolas, 22 September 2026: no split button in a modal, ever). `SiteModals` puts that element (`display: contents`) in the
  Dialog footer; the loader names it (`actionsTarget`) and picks the body's first form
  (`footerForm`). The house Dialog hides a footer left without any button or link.
- **Rendering**: `SiteModals` (client: the house `Dialog` per modal, the footer buttons, the
  anchor) and `SiteModalBody` (server: `RichText`, inserted forms through `SiteFormBlock`, the
  form block also used by `PageSections`).
- **Internal links everywhere**: `src/lib/links.ts` resolves an internal link (page, post, case
  study, modal → its anchor) to its address. Rich texts rendered by client components (text box,
  tabs, key points) cannot receive a resolver function, so `toSections` writes the address on each
  link node (`stampInternalLinks`, `fields.resolvedHref`) and `RichText` reads it first. This also
  fixed internal links to posts and case studies in page text boxes, which pointed to `/<slug>`
  before. `resolveEntryLink` in `src/lib/site.ts` is the same function.

## Catalogue

`/design/composants/dialog`, « Modales du site »: a sentence, terms to accept (answer required, no
cross), the site form inside a modal. The house `Dialog` hides its close cross when
`purpose="required"`.

## Tests and demo

- `pnpm smoke:modals` (dev server running): a throwaway form, three throwaway modals and a throwaway
  page in the green silo. Checks the admin rules (required answer without button, link button
  without address), the anchors in the page and the modals rendered closed in it (and a post link
  in a text box), each `/modale/<slug>` preview page and a 404, then in a headless browser:
  opening over the page (address = page + anchor, page behind, page's silo, destructive style),
  Escape, the browser's Back, a button to `#modale-<slug>`, a « close » button, a button to a
  page, the required answer (no cross, Escape ignored, button closes), a form sent from the modal
  (send button in the footer and not in the body, confirmation inside, submission stored, empty
  footer hidden), a load of the page with the anchor (open at once, closing keeps the page), the
  preview page and its closing to the home page. Deletes everything.
- `pnpm seed:demo`: « Offre de lancement », « Conditions générales de vente » (answer required,
  « Refuser » destructive) and « Demander une démo » (the demo form), slugs `demo-*`, updated in
  place, linked from `/demo-contenus#modales`.
