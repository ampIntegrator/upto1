# Handoff — links everywhere: « new tab » and « site content » (24 Sept. 2026)

**Done on 24 Sept. 2026** (one PR for both parts, one pair of migrations); reference doc: `docs/modals.md` › « Link targets ».

Decided with Nicolas on 24 Sept. 2026, after an audit of every link field. Two PRs, `payload`
branch (components on `astryx` first when a component changes), never a shared config object
(factories), backup + `pnpm migrate:create` + review + `pnpm migrate` + `generate:types` for any
new field, tests on throwaway documents only.

## Existing mechanism

`src/fields/linkTarget.ts` (`linkTargetFields`: `kind` = address | internal, `href`, `doc` → pages,
posts, case-studies, modals) and `src/fields/shared.ts` `linkGroup(name, label, {plain?})`.
`src/lib/links.ts` `stampInternalLinks` writes the resolved address on `href` (called from
PageRoute, lib/sections.ts, CasePage, PostPage, lib/modals.ts). A modal is targeted by the anchor
`#modale-<slug>` (the page address never changes): `docs/modals.md`. `src/components/Button.tsx`
forwards `target` / `rel` to the Astryx Button; no caller passes them yet. RichText already
honours Lexical's `newTab`.

## PR 1 — « Ouvrir dans un nouvel onglet » everywhere

- Add a `newTab` checkbox to `linkTargetFields` (hidden when the target is a modal: a modal cannot
  open in a new tab) and to the plain `linkGroup` (`plain: true`).
- Carry it through every converter and component: hero buttons (`lib/site.ts` `action()`, Hero),
  clickable cards (`lib/sections.ts`, Card → NextLink `target`), plan / price cta (PlanCard,
  PriceCard), `toButton` (`lib/sections.ts:195`: ButtonGroup, TextBox, prose CtaBand via
  ProseBlock), modal buttons (`lib/modals.ts`, SiteModals), case sheet cta (`lib/cases.ts`,
  CaseSheet), collection « see all » (CarouselControls), header (login, cta, nav links, menu /
  mega items: `lib/site.ts`, SiteHeader), footer (columns, legal, allHref: SiteFooter, Astryx
  `Link` `target`), settings socials (plain `<a>`), forms `privacyHref`.
- `rel="noopener noreferrer"` with every `target="_blank"`.
- Migration: one boolean column per link group / row (header, footer, settings, portfolio, blocks,
  hero, modals, case studies). Nothing dropped.

## PR 2 — « Contenu du site » on the fields that only take a URL

- Portfolio global default side-column cta (`globals/Portfolio.ts:48`): `linkTarget()`.
- Header (`globals/Header.ts`): nav `link` block, `leafFields` (menu and mega items), `login`, `cta`.
- Footer (`globals/Footer.ts`): `columns[].links[]`, `legalLinks[]`, `articles.allHref`.
- Collection block `moreHref` (`collectionBlock.ts:172-193`, when `moreLink` = custom).
- Forms consent `privacyHref` (`fields/forms/plugin.ts:76`).
- Stay free: settings socials, `phoneHref`, case `clientUrl` (external by nature); the
  form-builder redirect (plugin, pages only).
- Resolution: header / footer / settings / portfolio are read in `lib/site.ts` and
  `lib/listings.ts` → call `stampInternalLinks` there (or the same resolver) so `href` is filled
  from `doc`; the header and footer must also collect the modals they link to (`collectModalSlugs`)
  so the page renders them.
- Migration: `kind` + `doc` (relationship) columns beside each `href`; existing values keep
  `kind = address` and their URL. Nothing dropped.

## Checks

`npx tsc --noEmit`, `pnpm lint` on touched files, `pnpm smoke:sections`, `smoke:modals`,
`smoke:forms`, `smoke:cases`, playwright screenshots (`scripts/zz-*.mts`, deleted after use) on
a page, a post, a case study, the header and footer; `pnpm payload migrate:create x --skip-empty`
must generate nothing once done.
