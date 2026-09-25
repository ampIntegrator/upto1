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
- Tab « Colonne latérale et libellés »: list labels (« Toutes », « Voir l’étude », « Étude de cas » chip,
  archive eyebrow, « Voir toutes les réalisations », related eyebrow and title, empty list), the
  fact sheet's row labels (client, category, location, deployment, « Modules Orbita », client link
  for screen readers), and the sheet's default button (label and link: **without a link, no
  button**).
- Tab « Sous les réalisations »: FAQ title and tag, number of related case studies (3 or 4), as
  for the blog (`docs/blog.md`, « Under the post »).
- **A case study**, tab « Contenu »: title (`<span>` accent), lead (also the default SEO
  description), full-width cover, story (the post editor: headings, lists, quote, captioned
  images, tables, and the figures stats band, gallery, key points, quote card, CTA band).
  Tab « Colonne latérale » (renamed from « Fiche projet » on 18 September 2026, the name was
  unclear): client (required) and its site, location, deployment, modules (free text), two figures
  (value and label). The row labels and the button always come from the settings (the card's
  short result and the per-case « Modifier les valeurs par défaut » box were removed on
  25 September 2026; realisation cards show no result any more).
  Tab « Sous la réalisation »: FAQ and related case studies (automatic, chosen or hidden), as for
  a post. Then SEO. Sidebar: slug, category (required), date. A « Voir la page » button opens the
  case study in a new tab.

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
header, above the story below 1024 px) and the story, then `EntryFaq` and `RelatedPosts` with
the related realisation cards (3 or 4, settings).
Conversions: `caseHero`, `caseSheet` in `src/lib/cases.ts`, `caseCard` in `src/lib/cards.ts`.

## Section builder

- **Carte réalisation** (`caseCard`): a chosen case study as a realisation card, 3 or 4 columns,
  also an item of the Collection block.
- The Collection block's source « Dernières réalisations » (number, category, link label), same
  rules as the latest posts (side by side: no more than visible ones).

## Tests and demo

- `pnpm smoke:cases` (dev server running): throwaway category, two case studies and a throwaway
  address for the test; checks the list, the case study (hero, sheet with a local
  label behind « Modifier les valeurs par défaut », figures, global and local buttons and the global
  one back once unticked, story, FAQ, related shown and hidden), the archive, the 404s and the address refusals, then deletes
  everything and restores the settings. `SMOKE_SHOTS=<dir>` also saves captures.
- `pnpm smoke:sections` covers the case card in a column, in a manual collection and the
  « Dernières réalisations » source.
- `pnpm seed:content` adds seven case studies in four categories (see `docs/blog.md`).
- `pnpm seed:demo` creates the « Rénovation » category and the case study
  `demo-vasseur-construction` (mockup 23); it never changes the settings.
- Static demos in the catalogue: « Page · réalisation (23) » and « Page · réalisations, liste (24) »
  (`src/app/(frontend)/mise-en-page/CaseDemo.tsx`); showcases CaseHero and CaseSheet.
