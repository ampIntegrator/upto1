/**
 * The blog, as the Site settings › Blog tab describes it (like WordPress's « posts page »): the
 * chosen page is the blog, posts live under its address, category archives under
 * /<blog>/categorie/<category>. No React here: used by routes, conversions and the footer.
 */
import type {Setting} from '@/payload-types';

export type BlogConfig = {
  /** id and slug of the page chosen as the blog (null: no blog page chosen) */
  pageId: number | null;
  base: string | null;
  eyebrow?: string;
  title: string;
  lead?: string;
  tone: 'light' | 'night';
  perPage: number;
  labels: {all: string; readMore: string; dateLabel: string; toc: string; categoryPrefix: string; more: string; relatedEyebrow: string; relatedTitle: string};
};

/** the category archive segment: /<blog>/categorie/<category> */
export const CATEGORY_SEGMENT = 'categorie';

export function blogConfig(s: Pick<Setting, 'blog'> | null | undefined): BlogConfig {
  const b = s?.blog;
  const page = b?.page;
  const pageDoc = page && typeof page === 'object' ? page : null;
  const l = b?.labels;
  return {
    pageId: pageDoc?.id ?? (typeof page === 'number' ? page : null),
    base: pageDoc?.slug ?? null,
    eyebrow: b?.eyebrow || undefined,
    title: b?.title || 'Actualités',
    lead: b?.lead || undefined,
    tone: b?.tone === 'night' ? 'night' : 'light',
    perPage: Math.min(Math.max(Number(b?.perPage ?? 12), 4), 48),
    labels: {
      all: l?.all || 'Tous',
      readMore: l?.readMore || 'Lire l’article',
      dateLabel: l?.dateLabel || 'Publié le',
      toc: l?.toc || 'Sommaire',
      categoryPrefix: l?.categoryPrefix || 'Catégorie',
      more: l?.more || 'Voir le blog',
      relatedEyebrow: l?.relatedEyebrow || 'Le blog',
      relatedTitle: l?.relatedTitle || 'Pour continuer <span>sur le sujet.</span>',
    },
  };
}

/** /<blog>, or /blog while no blog page is chosen */
export const blogPath = (blog: BlogConfig): string => `/${blog.base ?? 'blog'}`;
export const postPath = (blog: BlogConfig, slug: string): string => `${blogPath(blog)}/${slug}`;
export const categoryPath = (blog: BlogConfig, category?: string | null): string => (category ? `${blogPath(blog)}/${CATEGORY_SEGMENT}/${category}` : blogPath(blog));
/** page n (from 0) of a list: page 0 has no query */
export const pagePath = (base: string, page: number): string => (page > 0 ? `${base}?page=${page + 1}` : base);
