/**
 * Listings: the blog and the case studies, each described by its settings global (Blog ›
 * Réglages du blog, Réalisations › Réglages des réalisations). A listing is not a page: its global
 * holds its address (« actualites » → /actualites), its page top, labels and SEO; its entries live
 * under /<address>/<entry>, the category archives under /<address>/categorie/<category>. No React and no Payload runtime here: used by routes,
 * conversions, the footer and the section builder.
 */
import {type TitleTag, toTitleTag} from '@/components/title-tags';

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
  /** archive without entries */
  empty: string;
};

export type ListingConfig<L extends ListingLabels = ListingLabels> = {
  kind: ListingKind;
  /** the listing's address, first segment of its URLs (« actualites ») */
  base: string;
  /** SEO of the listing page (its global's SEO tab) */
  meta?: {title?: string; description?: string};
  eyebrow?: string;
  title: string;
  lead?: string;
  tone: 'light' | 'night';
  perPage: number;
  labels: L;
  /** headings under the entries (FAQ, related entries): no title = no heading */
  faq: EntryHeading;
  related: EntryHeading;
  /** related entries under an entry */
  relatedCount: 3 | 4;
};

/** a section heading under an entry (settings, « Sous les articles / réalisations ») */
export type EntryHeading = {eyebrow?: string; title?: string; tag: TitleTag};

/** the category archive segment: /<listing>/categorie/<category> */
export const CATEGORY_SEGMENT = 'categorie';

type LabelsDoc = Partial<Record<string, string | null>> | null | undefined;
/** the fields every listing global shares (src/fields/listingSettings.ts) */
export type ListingGlobalDoc = {slug?: string | null; meta?: {title?: string | null; description?: string | null} | null; eyebrow?: string | null; title?: string | null; lead?: string | null; tone?: string | null; perPage?: number | null; labels?: LabelsDoc; faqEyebrow?: string | null; faqTitle?: string | null; faqTag?: string | null; relatedEyebrow?: string | null; relatedTitle?: string | null; relatedTag?: string | null; relatedCount?: string | null} | null | undefined;

/** Reads a listing global: its address, page top, pagination, SEO, and labels with their defaults. */
export function listingConfig<L extends ListingLabels>(kind: ListingKind, doc: ListingGlobalDoc, defaults: {base: string; title: string; labels: L}): ListingConfig<L> {
  const given = doc?.labels ?? {};
  const labels = Object.fromEntries(Object.entries(defaults.labels).map(([key, fallback]) => [key, given[key] || fallback])) as L;
  return {
    kind,
    base: doc?.slug || defaults.base,
    meta: {title: doc?.meta?.title || undefined, description: doc?.meta?.description || undefined},
    eyebrow: doc?.eyebrow || undefined,
    title: doc?.title || defaults.title,
    lead: doc?.lead || undefined,
    tone: doc?.tone === 'night' ? 'night' : 'light',
    perPage: Math.min(Math.max(Number(doc?.perPage ?? 12), 4), 48),
    labels,
    faq: {eyebrow: doc?.faqEyebrow || undefined, title: doc?.faqTitle || undefined, tag: toTitleTag(doc?.faqTag, 'h2')},
    related: {eyebrow: doc?.relatedEyebrow || undefined, title: doc?.relatedTitle || undefined, tag: toTitleTag(doc?.relatedTag, 'h2')},
    relatedCount: doc?.relatedCount === '4' ? 4 : 3,
  };
}

export type BlogLabels = ListingLabels & {dateLabel: string; toc: string};
export type BlogConfig = ListingConfig<BlogLabels>;

export const blogConfig = (doc: ListingGlobalDoc): BlogConfig =>
  listingConfig('blog', doc, {
    base: 'blog',
    title: 'Actualités',
    labels: {all: 'Tous', readMore: 'Lire l’article', dateLabel: 'Publié le', toc: 'Sommaire', categoryPrefix: 'Catégorie', more: 'Voir le blog', empty: 'Aucun article pour le moment.'},
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
    base: 'realisations',
    title: 'Des chantiers <span>chiffrés juste.</span>',
    labels: {
      all: 'Toutes', readMore: 'Voir l’étude', badge: 'Étude de cas', categoryPrefix: 'Catégorie', more: 'Voir toutes les réalisations', empty: 'Aucune réalisation pour le moment.',
      client: 'Client', category: 'Catégorie', location: 'Localisation', deployment: 'Déploiement', modules: 'Modules Orbita', clientLink: 'Site du client',
    },
  });
  const label = doc?.cta?.label;
  const href = doc?.cta?.href;
  return {...cfg, cta: label && href ? {label, href} : undefined};
}

/** /<listing address> */
export const listingPath = (cfg: ListingConfig): string => `/${cfg.base}`;
export const entryPath = (cfg: ListingConfig, slug: string): string => `${listingPath(cfg)}/${slug}`;
export const categoryPath = (cfg: ListingConfig, category?: string | null): string => (category ? `${listingPath(cfg)}/${CATEGORY_SEGMENT}/${category}` : listingPath(cfg));
/** page n (from 0) of a list: page 0 has no query */
export const pagePath = (base: string, page: number): string => (page > 0 ? `${base}?page=${page + 1}` : base);
/** a title typed with its serif accent, as plain text (cards, breadcrumbs, meta titles) */
export const plainTitle = (title: string): string => title.replace(/<\/?span>/g, '');
