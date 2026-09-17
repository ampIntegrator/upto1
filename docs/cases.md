# Case studies (« réalisations »)

Built on 17 September 2026 from the handoff `docs/handoff-2026-09-17-cases.md` (decisions taken
with Nicolas). Mockups: `Orbita/orbita/23-portfolioPost.html` (a case study),
`24-portfolioCards.html` (the realisation card). Same logic as the blog (`docs/blog.md`), with the
shared listing code described there.

## Admin

Group **Réalisations**: Réalisations (`case-studies`), Catégories (`case-categories`, distinct from
the blog's), Réglages des réalisations (`portfolio` global).

- **Réglages des réalisations**, tab « Page des réalisations »: the address (« realisations » by
  default; checked like the blog's, see `docs/blog.md`: no page to create), eyebrow, h1 title with
  an optional `<span>` accent, lead, light or night tone, case studies per page. An SEO tab.
- Tab « Fiche et libellés »: list labels (« Toutes », « Voir l’étude », « Étude de cas » chip,
  archive eyebrow, « Voir toutes les réalisations », related eyebrow and title, empty list), the
  fact sheet's row labels (client, category, location, deployment, « Modules Orbita », client link
  for screen readers), and the sheet's default button (label and link: **without a link, no
  button**).
- **A case study**, tab « Réalisation »: title (`<span>` accent), lead (also the default SEO
  description), full-width cover, story (the post editor: headings, lists, quote, captioned
  images, tables, and the figures stats band, gallery, key points, quote card, CTA band).
  Tab « Fiche projet »: client (required) and its site, location, deployment, modules (free text,
  each with an optional label replacing the global one), two figures (value and label), the card's
  short result (empty: the first figure's value), an optional button replacing the global one.
  Tab « Sections après la réalisation »: the section builder, optional. Then SEO. Sidebar: slug,
  category (required), date.

## Site

| URL | Content |
|---|---|
| `/<réalisations>` | category chips, realisation cards in four columns, pagination |
| `/<réalisations>/<slug>` | the case study (`CasePage`) |
| `/<réalisations>/categorie/<category>` | archive, automatic h1, no lead |

A case study under the blog's address (or any other address) is a 404.

The case study page: breadcrumb (listing › category › client), `CaseHero` (full-bleed cover on
night with a veil, « Étude de cas » and category chips, h1 with accent, lead), `PostLayout` with
`CaseSheet` in the sidebar (rows, two `Stat` of size « sheet », split button; sticky under the
header, above the story below 1024 px) and the story, the optional builder sections, then
`RelatedPosts` with three realisation cards of the same category (completed with the newest).
Conversions: `caseHero`, `caseSheet` in `src/lib/cases.ts`, `caseCard` in `src/lib/cards.ts`.

## Section builder

- **Carte réalisation** (`caseCard`): a chosen case study as a realisation card, 3 or 4 columns,
  also an item of the Collection block.
- The Collection block's source « Dernières réalisations » (number, category, link label), same
  rules as the latest posts (side by side: no more than visible ones).

## Tests and demo

- `pnpm smoke:cases` (dev server running): throwaway category, two case studies and a throwaway
  address for the test; checks the list, the case study (hero, sheet with a local
  label, figures, global and local buttons, story, related), the archive, the 404s and the address refusals, then deletes
  everything and restores the settings. `SMOKE_SHOTS=<dir>` also saves captures.
- `pnpm smoke:sections` covers the case card in a column, in a manual collection and the
  « Dernières réalisations » source.
- `pnpm seed:demo` creates the « Rénovation » category and the case study
  `demo-vasseur-construction` (mockup 23); it never changes the settings.
- Static demos in the catalogue: « Page · réalisation (23) » and « Page · réalisations, liste (24) »
  (`src/app/(frontend)/mise-en-page/CaseDemo.tsx`); showcases CaseHero and CaseSheet.
