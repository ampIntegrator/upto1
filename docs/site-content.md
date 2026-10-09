# Site content: pages, forms, modals

Three pieces of site content beyond the section builder. **Pages** form a tree (3 levels) whose full address is stored on each page and kept reachable by automatic redirects. **Forms** come from the official form-builder plugin and are placed with the « Formulaire » column block, sent through a server action. **Modals** are written once and open over any page through an anchor; a modal can hold a form. Buttons and links everywhere pick their target (a typed address or site content: page, post, case study, modal) with `src/fields/linkTarget.ts`, and every page URL is built with `pagePath()`.

Consolidated on 6 October 2026 from `docs/pages.md`, `docs/forms.md` and `docs/modals.md`.

## How they connect

- A form is placed in a page with the « Formulaire » column block, or inside a modal's rich text (« Formulaire » block of `modalEditor`); in a modal, its buttons move to the modal's footer.
- A modal is opened by any link or button whose target is the modal (`#modale-<slug>`); the target picker is `linkTarget.ts` (« Lien vers : Contenu du site »), the same as for pages, posts and case studies. A form's redirect is a typed address; its privacy link is a target and can open a modal.
- Internal links (rich texts and targets) get their address on the server (`src/lib/links.ts`): page → `pagePath`, post and case study → under their listing, modal → its anchor.

## Pages: tree, addresses, redirects

Official plugins, pinned to Payload's version: `@payloadcms/plugin-nested-docs` and `@payloadcms/plugin-redirects` 3.88.0. Nested addresses, 3 levels, redirects (Nicolas's request, 21 Sept. 2026).

### Admin

- **Pages › a page**, sidebar: **Page parente** (empty = root) and **Adresse complète** (read only, computed on save: `/services/renovation`). The list shows the address and the parent.
- Parent rules (`src/fields/pageTree.ts`): the home page (« accueil », at /) stays at the root and is nobody's parent; a page cannot go under itself or one of its sub-pages; **3 levels at most, sub-pages included** (moving a page with children checks the deepest one).
- **Site › Redirections** (`redirects`): an old address → a page, a post, a case study (a reference: it follows the target's later moves) or a custom address. Created automatically when a page's address changes (moved or slug renamed, sub-pages included); add your own for old links. Read by logged-in users only; the site reads them through the local API.

### Addresses

`src/lib/page-paths.ts`, no dependency:

- `MAX_PAGE_DEPTH = 3`: **the only thing to change** to allow deeper pages (the admin check and the routes read it; the catch-all route already accepts any depth).
- `pagePath(page)`: a page's address everywhere (routes, « Voir la page », Live Preview, SEO URL, rich-text internal links, form redirects, breadcrumbs). Never rebuild it from the slug.
- Stored on the page as `path`, one value for every language (the plugin's breadcrumb is localized and only the current language is re-saved when a parent moves: not reliable for URLs), unique (slugs stay unique site-wide). Recomputed in `computePagePath` (beforeChange) from the parent's stored path; the plugin re-saves the children of a changed page, so their paths follow.
- Migration `nested_pages`: parent, path (existing pages filled with `/slug`, home `/`), breadcrumb table, redirects tables. Adds only.

### Routes

Dispatchers (`src/app/(frontend)/[slug]/…`): a listing's address first (blog, case studies), else a page at that address, rendered by `PageRoute` (`[slug]/PageRoute.tsx`):

| Segments | Route | Listing | Otherwise |
|---|---|---|---|
| 1 | `[slug]` | the list | page at level 1 |
| 2 | `[slug]/[entry]` | an entry | page at level 2 |
| 3 | `[slug]/[entry]/[term]` | a category archive | page at level 3 |
| 4+ | `[slug]/[entry]/[term]/[...rest]` | — | a deeper page if `MAX_PAGE_DEPTH` allows |

An address that is not a page (`missingTarget`, `src/lib/pages.ts`): a redirect of the table first, then, outside a listing's address, the page whose slug is the last segment (an old flat address, a page moved before redirects existed); **permanent redirect (308)**, else 404. `/accueil` → `/`. Under a listing's address only the table counts (a missing post never lands on a page).

Breadcrumb: home, the ancestors (labels from the plugin's breadcrumb, addresses from the page's path), the page (`breadcrumbProps`, `src/lib/site.ts`).

### Tests and limitations

`pnpm smoke:pages` (dev server running): throwaway pages on three levels, addresses and breadcrumb, refusals (fourth level, a sub-tree pushed to level 4, home as parent, a loop), moves and a renaming with their 308 redirects, an old flat address, a page moved back (no redirect from a live address), a fourth segment → 404; deletes the pages and redirects.

Not done: menus stay manual (header and footer links are typed addresses: update them when a page moves; the redirect keeps old links working meanwhile). Posts and case studies create no redirect when their slug changes (add one by hand in Site › Redirections).

## Forms

Official `@payloadcms/plugin-form-builder` (pinned to 3.88.0, like Payload), set up in `src/fields/forms/plugin.ts` (`formsPlugin()`, registered in `payload.config.ts`). Mockup: `Orbita/orbita/17-forms.html` (fields, states, « Demander une démo » card).

### Admin (group **Formulaires**)

- **Formulaires** (`forms`), three tabs (Nicolas's request, 21 Sept. 2026). **Formulaire**: the **title** (translatable, shown above the fields and in the list; optional `<span>` accent, stripped in the list through the hidden `listTitle`) and its tag (h2 by default), the **eyebrow** and its style (small caps text or badge), the **lead**, the **Champs**, the submit label. **Après l'envoi**: confirmation message or redirect to a page or a URL. **E-mails**: the plugin's emails (sent once an email adapter exists, below).
- A **« Nouveau formulaire »** button ends the sidebar menu under the group (`src/fields/forms/NewFormNavLink.tsx`, `afterNavLinks`).
- **Champs** (blocks, picker order): Texte court, E-mail, Téléphone, Texte long, Liste déroulante, Choix unique (radios), Case à cocher, Nombre, Date, Texte libre (between fields), **Consentement** (always required, optional privacy link) and **Nouvelle étape**. Each value field has a technical **name** (unique in the form, checked on save), a label, « Obligatoire », and a **width**: « demi » (default for short fields) or « pleine ». The plugin's state, country, payment and upload fields are off (upload: phase 2).
- **Liste déroulante**: « Choix multiple » (choices as badges with a remove cross) and « Recherche dans la liste » (beyond 5 options, the default; always; never). Submissions store option labels, comma-separated when several.
- **Nouvelle étape** splits the form: the fields after it form a new step, up to the next one. At the very top it names the first step. No separator = a plain form.
- **Réponses** (`form-submissions`): one per sending, with the form and values (`field` = name, `value` = text; boxes stored « Oui » / « Non »; empty fields not stored). Read by logged-in users; nobody creates or edits them in the admin.
- Migrations: `form_heading_add` (eyebrow style, list title), `form_heading_drop` (former « Titre affiché » copied into the title, then dropped), `form_title_localized` (title moved to the translated table, copied, list title filled).

### Placing a form

Column block **« Formulaire »** (`src/fields/blocks/formBlock.ts`): a form, « Dans une carte encadrée » and « Afficher le surtitre, le titre et l'introduction » (both on by default). **4 to 12 columns** (`src/components/content-specs.ts`, `form`). Not in the hero (Nicolas, 21 Sept. 2026). Picker preview: `public/apercus/form.png` (`/apercu/form`, `pnpm previews:build`). Conversion: `src/lib/forms.ts` (`formData`: steps, widths, redirect), loaded once per page by `toSections` (`formsByIds`, `src/lib/forms-load.ts`); rendered in `PageSections` (rich texts through `RichText`).

### Site: `SiteForm`

`src/components/SiteForm.tsx` (client, no Payload), catalogue `/design/composants/site-form`:

- **One or two columns**, from the column's real width (container query on the form root): under 840 px all full width; from 840 px (a column of 8+ in the 1440 px container) a « half » field takes one of two columns. A lone half field keeps its half. DOM order = admin order = reading/tab order.
- **Card**: surface colour (night card on night), border, 48 px padding, 24 px under 520 px of column, where the submit button goes full width.
- **Steps**: Astryx `Stepper` above the fields (collapses to a bare track with the step name when narrow), « Retour » / « Continuer », submit on the last step. Each step validated before moving on; values kept when going back; focus to the step title.
- **Validation** in the browser (required, email, consent) with error states; rerun on the server.
- **After sending**: the confirmation replaces the form in its card, or the browser goes to the redirect. A failed sending shows an error banner and keeps the values.

### Sending: `submitForm`

`src/app/(frontend)/actions/submitForm.ts`, a server action handed to `SiteForm` as `submitAction` (in this Next.js a function prop crossing to a client component must be named `action` or `…Action`; the form id travels in the input). It drops spam silently (`looksLikeSpam`: a filled honeypot `company_website`, hidden input, or a form sent less than 3 s after display → answered « ok », nothing stored); loads the form and keeps only the names it declares; rechecks required fields, email format and consent; creates the submission through the local API (the REST endpoint refuses creation: 403). Internal errors are logged, never returned to the visitor.

### Connection points for the tech lead

- **Email**: no adapter configured. Once one is set in `payload.config.ts` (`email: nodemailerAdapter(…)` or a provider adapter), the plugin sends each form's **Emails** on every submission (`{{name}}` placeholders, `{{*:table}}` for all values). Later options in `formsPlugin()`: `defaultToEmail`, `beforeEmail`. Until then Payload only logs.
- **Anti-spam**: `looksLikeSpam(input)` in `submitForm.ts` is the single place for a rate limit, an IP check or an external service.
- **Access**: `form-submissions` read by logged-in users only, created by the server action only (`access.create: () => false`; the local API overrides access).
- **Personal data**: submissions hold personal data; no automatic purge: retention and purge to be decided.

### Tests, demo, phase 2

- `pnpm smoke:forms` (dev server running): two throwaway forms (every field type and three steps; a one-step form), a throwaway page with the block at 12, 6 and 4 columns. Checks the duplicate name refusal, the 3-column refusal, rendering (heading, steps, labels, widths, honeypot), a valid submission and stored values, refusals (required, consent, email), spam kept out, the REST refusal; deletes everything.
- `pnpm seed:demo`: « Démo · Demander une démo » (mockup 17) and « Démo · Projet en trois étapes », updated in place (submissions stay), on `/demo-contenus#formulaires` at 12, 7 and 4 columns.
- Phase 2 (not built): file upload field, footer newsletter on the same system, the mockup's « split image » section background, a form in the hero.

## Modals

Content written once and opened over any page without leaving it nor changing its address (Nicolas, 22 Sept. 2026: the address must stay the page's): an anchor, `/tarifs#modale-demo-demande`.

### Admin

Collection **Modales** (`modals`, group « Site »), `src/collections/Modals.ts`:

- **Surtitre** and **Titre** (translatable; the title names the dialog for assistive tech).
- **Largeur**: « Étroite » 420 px, « Moyenne » 620 px (default), « Large » 840 px. **Fond**: light or night.
- **Fermeture**: « Libre » (cross, Escape, click outside) or « Réponse obligatoire » (none of those: only footer buttons close it; at least one button required, checked on save). For terms to accept. Nothing is recorded: the site has no visitor accounts.
- **Contenu**: rich text (`modalEditor`, `src/fields/editors.ts`: the text box's features plus a **« Formulaire »** block inserted with « + » or « / »: a form shown without its card, heading hidden unless ticked). Text before, after, around the form, or the form alone.
- **Boutons du pied**: two at most, right-aligned; label, style (primary, secondary, ghost, **destructive**), action « Fermer la modale » or « Aller à une adresse » (a page, or another modal). Simple buttons only (no split, no icon).
- **Slug** (sidebar): `#modale-<slug>` in a button's address. The admin's eye and the Live Preview show it over an empty page (`/modale/<slug>`).
- No silo: a modal takes the silo of the page it opens over.

**Opening a modal**: in any rich text (text box, tabs, key points, posts, case studies, another modal): link, « Lien interne », collection « Modales ». In a button (hero, text box, button group, CTA band, clickable cards, price CTAs, a case study's CTA, a modal's footer): « Lien vers : Contenu du site », collection « Modales ». A typed `#modale-<slug>` works too. The header, footer, case studies' default button, the collection's « see all » and the forms' privacy link can open a modal: every page renders the modals its header and footer link to (`site.modalSources`, `PageModals`).

### Link targets (`linkTarget.ts`)

Decision (Nicolas, 22 Sept. 2026: « un sélecteur quand on peut faire un lien »): every button or link field of site content is a **target** (`src/fields/linkTarget.ts`, a factory):

- **« Lien vers »**: « Adresse » (URL or anchor, in « Adresse ») or « Contenu du site » (page, post, case study or modal, picked in « Contenu » with the collection dropdown and a search).
- Stored as `kind`, `href` (typed address) and `doc` (chosen content). An `href` alone is the « Adresse » case. The site writes the chosen content's address on `href` when loading (`stampInternalLinks`): every renderer keeps reading `href`. A page loads with depth 2, enough for a target in a block of a shared section.
- Used by `linkGroup` (hero buttons, clickable cards, price CTAs, header login and CTA), `buttonRowFields` (text box, button group, CTA band), `modalButtonFields`, the case study's CTA, the header (nav links, menu and mega items), the footer (column links, legal links, « Tous les articles »: `allTarget`), the case studies' default button, the collection's « see all » (`moreTarget`), the forms' privacy link (`privacyTarget`). Typed addresses only: the settings' socials and phone, a case study's client site, the form-builder redirect.
- **« Ouvrir dans un nouvel onglet »** (`newTab`), hidden when the content is a modal. Rendered as `target="_blank" rel="noopener noreferrer"` (`newTabProps`, `src/components/link-target.ts`; the site Button's `newTab` prop). Socials have their own box, ticked by default. Astryx dropdown menu items take no target: they open their address on click. Global links (header, footer, case studies' settings) are resolved in `getSite()`.
- Migrations: `link_target` (`kind` columns, `pages_rels`, `sections_rels`, `modals_rels`, `case_studies_rels` extended); `links_add` (new columns, old typed addresses copied); **trap**: SQLite recreates the header and footer link tables, so their translated labels are kept aside and put back by hand (dropping a table inside the migration transaction deletes its children in cascade; foreign keys cannot be switched off there); `links_drop_legacy` (`more_href`, `privacy_href`, `articles_all_href`).

### Site

- **Addresses**: `src/lib/modal-paths.ts` (`modalHash`, `modalSlugFromHash`, reserved anchor prefix `modale-`, `modalPath` for the preview page, block slug, types; client-safe). The segment `modale` is reserved: no listing address (`RESERVED`, `src/fields/listingSlug.ts`), no top-level page (`pageSlugValidate`).
- **The page renders its modals, closed.** `collectModalSlugs` (`src/lib/links.ts`) walks the content (hero, sections, shared sections, a post's prose and FAQ) for internal links to modals and any address equal to a modal anchor. `loadModals` (`src/lib/modals.ts`) loads them with their forms and follows modals they link to, three rounds at most. `PageModals` (server) renders them through `SiteModals` (client) inside `SitePage`, so they take the page's silo. Routes: `PageRoute`, `PostPage`, `CasePage`.
- **Opening and closing** (`SiteModals`): the address's anchor decides which modal is open; a click on `#modale-<slug>` opens it, page keeps its address and scroll (no element carries that id). Closing (cross, Escape, a « close » button) removes the anchor: history back when it came from a click on this page (so Back closes it), a replacement when the page loaded with it. One modal at a time: a link to another replaces it. A footer button to a page leaves the page.
- **Limits**: a modal opens only on a page that links to it. An anchor typed by hand on a page without that link does nothing. A page linking to many modals renders them all in its HTML.
- **Preview page** `/modale/<slug>` (`src/app/(frontend)/modale/[slug]/page.tsx`): admin preview only (eye, Live Preview), site frame in the default silo, modal open, closing goes home; `noindex`, never linked.
- **Form buttons in the footer**: `SiteForm` takes `actionsTarget`, the DOM id of an element outside the form; its buttons render there through a React portal (still driven by the form), the send button calls `requestSubmit()`, a hidden submit button stays so Enter sends. No split button in a modal, ever (Nicolas, 22 Sept. 2026). `SiteModals` puts the element (`display: contents`) in the Dialog footer; the loader names it and picks the body's first form (`footerForm`). The house Dialog hides a footer left without any button or link.
- **A form owns the modal's action** (Nicolas, 22 Sept. 2026). Footer: the modal's own buttons left, the form's right (« Envoyer » last). With a form in the body the admin accepts one own button at most, « Fermer la modale », secondary or ghost (« Annuler »); a link or primary button is refused on save. Once sent (`siteform:sent` DOM event from `SiteForm`), the own buttons give way to a single primary « Fermer », so a required-answer modal never traps the visitor. A form set to redirect leaves the page, closing the modal (a setting of the form, not the modal).
- **Rendering**: `SiteModals` (client: house `Dialog` per modal, footer buttons, anchor) and `SiteModalBody` (server: `RichText`, forms through `SiteFormBlock`, also used by `PageSections`).
- **Internal links everywhere**: `src/lib/links.ts` resolves an internal link to its address. Rich texts rendered by client components (text box, tabs, key points) cannot receive a resolver, so `toSections` writes the address on each link node (`stampInternalLinks`, `fields.resolvedHref`) and `RichText` reads it first. `resolveEntryLink` in `src/lib/site.ts` is the same function.

### Catalogue, tests, demo

- `/design/composants/dialog`, « Modales du site »: a sentence, terms to accept (no cross), the site form in a modal. The house `Dialog` hides its cross when `purpose="required"`.
- `pnpm smoke:modals` (dev server running): a throwaway form, three modals and a page in the green silo. Checks admin rules (required answer without button, link button without address), anchors and closed modals in the page (and a post link in a text box), each `/modale/<slug>` and a 404, then in a headless browser: opening (address = page + anchor, page's silo, destructive style), Escape, Back, a button to `#modale-<slug>`, a « close » button, a button to a page, the required answer, a form sent from the modal (send in the footer, confirmation inside, submission stored, empty footer hidden), a load with the anchor, the preview page closing home. Deletes everything.
- `pnpm seed:demo`: « Offre de lancement », « Conditions générales de vente » (answer required, « Refuser » destructive), « Demander une démo » (the demo form), slugs `demo-*`, updated in place, linked from `/demo-contenus#modales`.
