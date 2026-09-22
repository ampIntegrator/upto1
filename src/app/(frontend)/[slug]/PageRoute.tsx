/**
 * PageRoute — a page at its full address, whatever the number of segments (nested pages, up to
 * MAX_PAGE_DEPTH): the routes /[slug], /[slug]/[entry], /[slug]/[entry]/[term] and deeper hand it
 * the segments once they know the address is not a listing's. An address that is not a page any
 * more redirects (308) when a redirect or a page by the last slug says where; otherwise 404.
 */
import {notFound, permanentRedirect} from 'next/navigation';
import React from 'react';

import {BreadcrumbBand} from '@/components/BreadcrumbBand';
import {Hero} from '@/components/Hero';
import {PageModals} from '@/components/PageModals';
import {PageSections} from '@/components/PageSections';
import {SitePage} from '@/components/SitePage';
import {loadPageByPath, missingTarget} from '@/lib/pages';
import {pagePath} from '@/lib/page-paths';
import {toSections} from '@/lib/sections';
import {breadcrumbProps, getLocale, getSite, pageSilo, sectionsContext, showBreadcrumb, toFooter, toHeader, toHero} from '@/lib/site';

const toPath = (segments: string[]) => `/${segments.map((s) => decodeURIComponent(s)).join('/')}`;

export async function pageRouteMetadata(segments: string[]) {
  const page = await loadPageByPath(toPath(segments), await getLocale());
  if (!page) return {title: 'Vidomia'};
  return {title: page.meta?.title || `${page.title} · Vidomia`, description: page.meta?.description || undefined};
}

/**
 * an address that is not a page nor a listing's entry: redirect when something says where, else 404;
 * `underListing`: only the redirects count (a missing post never leads to a page)
 */
export async function redirectOrNotFound(segments: string[], underListing = false): Promise<never> {
  const locale = await getLocale();
  const target = await missingTarget(toPath(segments), locale, await getSite(locale), {pageFallback: !underListing});
  if (target) permanentRedirect(target);
  notFound();
}

export async function PageRoute({segments}: {segments: string[]}) {
  const locale = await getLocale();
  const [page, site] = await Promise.all([loadPageByPath(toPath(segments), locale), getSite(locale)]);
  if (!page) return redirectOrNotFound(segments);
  const hero = toHero(page, site.settings);
  // full screen: the breadcrumb is a strip below the hero; page top: it is inside the Hero
  const bandBreadcrumb = hero.variant !== 'page' && showBreadcrumb(page, site.settings);
  const tone = hero.variant === 'media' || hero.background === 'night-halo' || hero.background === 'image' ? 'dark' : 'light';
  return (
    <SitePage silo={pageSilo(page, site.settings)} header={toHeader(site.settings, site.header, site.languages, site.blog)} footer={toFooter(site.settings, site.footer, site.posts, locale, site.blog)} tone={tone} currentHref={pagePath(page)}>
      <Hero {...hero} />
      {bandBreadcrumb ? <BreadcrumbBand {...breadcrumbProps(page, site.settings)} /> : null}
      <PageSections sections={await toSections(page.sections, site.settings, sectionsContext(locale, site))} />
      {/* the modals this page links to, closed until their anchor is reached */}
      <PageModals sources={[page.hero, page.sections]} locale={locale} />
    </SitePage>
  );
}
