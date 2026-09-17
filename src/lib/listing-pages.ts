/**
 * The listings as routes see them: which listing an address belongs to, and, for each
 * listing, how to load one page of cards, its categories and one category. Server only.
 * Adding a listing: a config in `listings.ts`, loaders, and an adapter here.
 */
import type {CardProps} from '@/components/Card';
import {caseCard, postCard} from '@/lib/cards';
import {loadCaseCategories, loadCaseCategory, loadCasePage} from '@/lib/cases';
import type {BlogConfig, CasesConfig, ListingConfig} from '@/lib/listings';
import {loadCategories, loadCategory, loadPostPage} from '@/lib/posts';
import type {Locale} from '@/locales';

export type ListingCategory = {id: number; title: string; slug: string};

export type ListingAdapter = {
  cfg: ListingConfig;
  /** one page of cards (from 0), all categories or one */
  loadPage: (locale: Locale, page: number, category?: number) => Promise<{cards: CardProps[]; page: number; pages: number}>;
  loadCategories: (locale: Locale) => Promise<ListingCategory[]>;
  loadCategory: (locale: Locale, slug: string) => Promise<ListingCategory | null>;
};

type SiteListings = {blog: BlogConfig; cases: CasesConfig};

export function listingAdapters(site: SiteListings, locale: Locale): ListingAdapter[] {
  const {blog, cases} = site;
  return [
    {
      cfg: blog,
      loadPage: async (loc, page, category) => {
        const list = await loadPostPage(loc, blog, page, category);
        return {cards: list.posts.map((p) => postCard(p, blog, locale)), page: list.page, pages: list.pages};
      },
      loadCategories,
      loadCategory,
    },
    {
      cfg: cases,
      loadPage: async (loc, page, category) => {
        const list = await loadCasePage(loc, cases, page, category);
        return {cards: list.docs.map((c) => caseCard(c, cases)), page: list.page, pages: list.pages};
      },
      loadCategories: loadCaseCategories,
      loadCategory: loadCaseCategory,
    },
  ];
}

/** the listing living at this first segment of the address */
export const listingAtBase = (site: SiteListings, locale: Locale, base: string): ListingAdapter | null => listingAdapters(site, locale).find((l) => l.cfg.base === base) ?? null;
