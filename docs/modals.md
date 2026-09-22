# Modals

Built on 22 September 2026 from the handoff `docs/handoff-2026-09-22-modals.md` (decisions taken with
Nicolas). A modal is content written once in the admin and opened over any page, without leaving it.

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
  after or around the form, or the form alone.
- **Boutons du pied**: two at most, right-aligned; each has a label, a style (primary, secondary,
  ghost, **destructive**) and an action: « Fermer la modale » or « Aller à une adresse » (a page, or
  another modal at `/modale/<slug>`). Simple buttons only (no split, no icon).
- **Slug** (sidebar): the modal's address, `/modale/<slug>`. The admin's eye opens it; the Live
  Preview shows it over an empty page.
- No silo: a modal takes the silo of the page it opens over.

**Opening a modal**: in any rich text (text box, tabs, key points, posts, case studies, another
modal), select words, add a link, « Lien interne », collection « Modales », then the modal. Any
button or link field whose address is `/modale/<slug>` opens it too (hero, text box, button group,
CTA band…). Header and footer: not needed (Nicolas's decision), but typing the address works there.

## Site

- **Addresses**: `src/lib/modal-paths.ts` (`modalPath`, the block slug, the types; client-safe).
  The segment `modale` is reserved: a listing address cannot take it (`RESERVED` in
  `src/fields/listingSlug.ts`), nor a top-level page (`pageSlugValidate`).
- **Loading**: `src/lib/modals.ts` (`loadModal(slug, locale)`): the modal, its body with the internal
  links' addresses written on them, the inserted forms converted with `formData` (loaded once with
  `loadFormsByIds`), the buttons; `purpose` is `required` for a required answer, `form` when the
  body holds a form (clicking outside stops closing once the visitor typed), otherwise `info`.
- **Rendering**: `SiteModal` (client: the house `Dialog`, the footer buttons, closing) and
  `SiteModalBody` (server: `RichText`, inserted forms through `SiteFormBlock`, the form block also
  used by `PageSections`).
- **Routes** (Next's parallel + intercepting routes, read
  `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/parallel-routes.md`
  § Modals before changing them):
  - `src/app/(frontend)/layout.tsx` renders `{children}{modal}`, the `@modal` slot;
  - `@modal/(.)modale/[slug]/page.tsx`: a client-side link to `/modale/<slug>` renders the modal in
    the slot, over the page, which stays mounted. Closing (cross, Escape, a « close » button, the
    browser's Back) goes back in history;
  - `@modal/default.tsx`, `@modal/page.tsx`, `@modal/[...catchAll]/page.tsx`: the slot is empty on
    full loads, on the home page and on any other address. The catch-all is what closes the modal
    when a footer button or a form's redirect navigates to a page;
  - `modale/[slug]/page.tsx`: the address loaded directly (a shared link, a refresh, the Live
    Preview): the site frame in the site's default silo with the modal open over an empty page,
    closing going to the home page; `noindex`.
- **The page's silo**: the slot renders outside the page's theme. `SitePage` mounts `SiloMark`, which
  writes the page's silo on `<html>` (`data-page-silo`); `SiteModal` reads it at its first render
  and wraps the dialog in `OrbitaThemeProvider fixedSilo`.
- **Internal links everywhere**: `src/lib/links.ts` resolves an internal link (page, post, case
  study, modal) to its address. Rich texts rendered by client components (text box, tabs, key
  points) cannot receive a resolver function, so `toSections` writes the address on each link node
  (`stampInternalLinks`, `fields.resolvedHref`) and `RichText` reads it first. This also fixed
  internal links to posts and case studies in page text boxes, which pointed to `/<slug>` before.
  `resolveEntryLink` in `src/lib/site.ts` is the same function.
- Links need client-side navigation to open over the page: `RichText` uses Next's `Link`, and every
  Astryx button and link goes through `LinkProvider` (`OrbitaThemeProvider`). A link set to open
  in a new tab opens the modal's own page.

## Catalogue

`/design/composants/dialog`, « Modales du site »: a sentence, terms to accept (answer required, no
cross), the site form inside a modal. The house `Dialog` hides its close cross when
`purpose="required"`.

## Tests and demo

- `pnpm smoke:modals` (dev server running): a throwaway form, three throwaway modals and a throwaway
  page in the green silo. Checks the admin rules (required answer without button, link button
  without address), the addresses in the page (modals, and a post in a text box), each
  `/modale/<slug>` page and a 404, then in a headless browser: opening over the page with the page
  behind, the page's silo, the destructive style, Escape, a button to `/modale/<slug>`, a « close »
  button, a button to a page, the required answer (no cross, Escape ignored, button closes), a form
  sent from the modal (confirmation inside, submission stored), the direct address and its closing
  to the home page. Deletes everything.
- `pnpm seed:demo`: « Offre de lancement », « Conditions générales de vente » (answer required,
  « Refuser » destructive) and « Demander une démo » (the demo form), slugs `demo-*`, updated in
  place, linked from `/demo-contenus#modales`.
