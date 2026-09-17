/**
 * Listings: the blog and the case studies, each described by its settings global (Blog ›
 * Réglages du blog, Réalisations › Réglages des réalisations), like WordPress's « posts page »:
 * the chosen page is the listing, its entries live under its address, the category archives
 * under /<listing>/categorie/<category>. No React and no Payload runtime here: used by routes,
 * conversions, the footer and the section builder.
 */

export type ListingKind = 'blog' | 'cases';

/** labels shared by every listing */
export type ListingLabels = {
  /** « all » filter chip */
  all: string;
  /** cards' link */
  readMore: string;
  /** eyebrow of a category archive */
  categoryPrefix: string;
  /** button to the listing page (related entries) */
  more: string;
  relatedEyebrow: string;
  relatedTitle: string;
  /** archive without entries */
  empty: string;
};

export type ListingConfig<L extends ListingLabels = ListingLabels> = {
  kind: ListingKind;
  /** id and slug of the page chosen as the listing (null: no page chosen) */
  pageId: number | null;
  base: string | null;
  /** address used while no page is chosen */
  fallbackBase: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  tone: 'light' | 'night';
  perPage: number;
  labels: L;
};

/** the category archive segment: /<listing>/categorie/<category> */
export const CATEGORY_SEGMENT = 'categorie';

type PageRef = number | {id: number; slug?: string | null} | null | undefined;
type LabelsDoc = Partial<Record<string, string | null>> | null | undefined;
/** the fields every listing global shares (src/fields/listingSettings.ts) */
export type ListingGlobalDoc = {page?: PageRef; eyebrow?: string | null; title?: string | null; lead?: string | null; tone?: string | null; perPage?: number | null; labels?: LabelsDoc} | null | undefined;

/** Reads a listing global: its page, page top, pagination, and labels with their defaults. */
export function listingConfig<L extends ListingLabels>(kind: ListingKind, doc: ListingGlobalDoc, defaults: {fallbackBase: string; title: string; labels: L}): ListingConfig<L> {
  const page = doc?.page;
  const pageDoc = page && typeof page === 'object' ? page : null;
  const given = doc?.labels ?? {};
  const labels = Object.fromEntries(Object.entries(defaults.labels).map(([key, fallback]) => [key, given[key] || fallback])) as L;
  return {
    kind,
    pageId: pageDoc?.id ?? (typeof page === 'number' ? page : null),
    base: pageDoc?.slug ?? null,
    fallbackBase: defaults.fallbackBase,
    eyebrow: doc?.eyebrow || undefined,
    title: doc?.title || defaults.title,
    lead: doc?.lead || undefined,
    tone: doc?.tone === 'night' ? 'night' : 'light',
    perPage: Math.min(Math.max(Number(doc?.perPage ?? 12), 4), 48),
    labels,
  };
}

export type BlogLabels = ListingLabels & {dateLabel: string; toc: string};
export type BlogConfig = ListingConfig<BlogLabels>;

export const blogConfig = (doc: ListingGlobalDoc): BlogConfig =>
  listingConfig('blog', doc, {
    fallbackBase: 'blog',
    title: 'Actualités',
    labels: {all: 'Tous', readMore: 'Lire l’article', dateLabel: 'Publié le', toc: 'Sommaire', categoryPrefix: 'Catégorie', more: 'Voir le blog', relatedEyebrow: 'Le blog', relatedTitle: 'Pour continuer <span>sur le sujet.</span>', empty: 'Aucun article pour le moment.'},
  });

export type CasesLabels = ListingLabels & {
  /** chip before the category in a case study's page top */
  badge: string;
  /** fact sheet row labels (each overridable on a case study) */
  client: string;
  category: string;
  location: string;
  deployment: string;
  modules: string;
  /** accessible name of the client site link */
  clientLink: string;
};
export type CasesConfig = ListingConfig<CasesLabels> & {
  /** the fact sheet's default button (overridable on a case study) */
  cta?: {label: string; href: string};
};

type PortfolioDoc = (NonNullable<ListingGlobalDoc> & {sheet?: LabelsDoc; cta?: {label?: string | null; href?: string | null} | null}) | null | undefined;

export function casesConfig(doc: PortfolioDoc): CasesConfig {
  const sheet = doc?.sheet ?? {};
  const cfg = listingConfig('cases', {...doc, labels: {...(doc?.labels ?? {}), ...sheet}}, {
    fallbackBase: 'realisations',
    title: 'Des chantiers <span>chiffrés juste.</span>',
    labels: {
      all: 'Toutes', readMore: 'Voir l’étude', badge: 'Étude de cas', categoryPrefix: 'Catégorie', more: 'Voir toutes les réalisations', relatedEyebrow: 'Nos réalisations', relatedTitle: 'D’autres chantiers <span>chiffrés juste.</span>', empty: 'Aucune réalisation pour le moment.',
      client: 'Client', category: 'Catégorie', location: 'Localisation', deployment: 'Déploiement', modules: 'Modules Orbita', clientLink: 'Site du client',
    },
  });
  const label = doc?.cta?.label;
  const href = doc?.cta?.href;
  return {...cfg, cta: label && href ? {label, href} : undefined};
}

/** /<listing>, or /<fallback> while no page is chosen */
export const listingPath = (cfg: ListingConfig): string => `/${cfg.base ?? cfg.fallbackBase}`;
export const entryPath = (cfg: ListingConfig, slug: string): string => `${listingPath(cfg)}/${slug}`;
export const categoryPath = (cfg: ListingConfig, category?: string | null): string => (category ? `${listingPath(cfg)}/${CATEGORY_SEGMENT}/${category}` : listingPath(cfg));
/** page n (from 0) of a list: page 0 has no query */
export const pagePath = (base: string, page: number): string => (page > 0 ? `${base}?page=${page + 1}` : base);
/** a title typed with its serif accent, as plain text (cards, breadcrumbs, meta titles) */
export const plainTitle = (title: string): string => title.replace(/<\/?span>/g, '');
