/**
 * ListingList — a listing page (at the address typed in Blog › Réglages du blog, or in Réalisations
 * › Réglages des réalisations) and its category archives: the page top (title, lead, light or
 * night; a category archive gets the category as h1 and no lead), the category chips, the cards
 * and the pagination.
 */
import React from 'react';

import {Hero} from '@/components/Hero';
import {PostArchive} from '@/components/PostArchive';
import {SitePage} from '@/components/SitePage';
import type {ListingAdapter, ListingCategory} from '@/lib/listing-pages';
import {categoryPath, listingPath, pagePath, plainTitle} from '@/lib/listings';
import {getSite, pageSilo, toFooter, toHeader} from '@/lib/site';
import type {Locale} from '@/locales';

export async function ListingList({locale, listing, site, page, category}: {locale: Locale; listing: ListingAdapter; site: Awaited<ReturnType<typeof getSite>>; page: number; category?: ListingCategory}) {
  const {cfg} = listing;
  const [list, categories] = await Promise.all([listing.loadPage(locale, page, category?.id), listing.loadCategories(locale)]);
  const base = category ? categoryPath(cfg, category.slug) : listingPath(cfg);
  const night = cfg.tone === 'night';
  const s = site.settings;
  return (
    <SitePage silo={pageSilo(null, s)} header={toHeader(s, site.header, site.languages, site.blog)} footer={toFooter(s, site.footer, site.posts, locale, site.blog)} tone={night ? 'dark' : 'light'} currentHref={listingPath(cfg)}>
      <Hero
        variant="page"
        background={night ? 'night-halo' : 'glow'}
        eyebrow={category ? cfg.labels.categoryPrefix : cfg.eyebrow}
        title={category ? category.title : cfg.title}
        lead={category ? undefined : cfg.lead}
        breadcrumb={
          s.breadcrumb?.enabled !== false
            ? {items: category ? [{label: plainTitle(cfg.title), href: listingPath(cfg)}] : [], current: category ? category.title : plainTitle(cfg.title), homeLabel: s.breadcrumb?.homeLabel ?? 'Accueil', homeStyle: (s.breadcrumb?.homeStyle ?? 'icon') as 'icon' | 'text'}
            : undefined
        }
      />
      <PostArchive
        categories={categories.length > 1 ? [{label: cfg.labels.all, href: listingPath(cfg), active: !category}, ...categories.map((c) => ({label: c.title, href: categoryPath(cfg, c.slug), active: c.id === category?.id}))] : []}
        items={list.cards}
        page={list.page}
        pages={list.pages}
        hrefFor={(p) => pagePath(base, p)}
        gaps={{x: Number(s.sectionGrid?.gapX ?? 30), y: Number(s.sectionGrid?.gapY ?? 40), yMobile: Number(s.sectionGrid?.gapYMobile ?? 40)}}
        empty={cfg.labels.empty}
      />
    </SitePage>
  );
}

export const pageFromQuery = (value: string | string[] | undefined): number => Math.max(0, Math.floor(Number(Array.isArray(value) ? value[0] : (value ?? 1))) - 1 || 0);

/** Metadata of a listing page or archive: the SEO tab of the listing's global wins over its title and lead. */
export function listingMetadata(listing: ListingAdapter, category?: ListingCategory) {
  const {cfg} = listing;
  if (category) return {title: `${category.title} · ${plainTitle(cfg.title)} · Vidomia`, description: cfg.lead};
  return {title: cfg.meta?.title || `${plainTitle(cfg.title)} · Vidomia`, description: cfg.meta?.description || cfg.lead || undefined};
}
