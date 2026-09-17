import config from '@payload-config';
import {notFound} from 'next/navigation';
import {getPayload} from 'payload';
import React from 'react';

import {BreadcrumbBand} from '@/components/BreadcrumbBand';
import {Hero} from '@/components/Hero';
import {PageSections} from '@/components/PageSections';
import {SitePage} from '@/components/SitePage';
import {toSections} from '@/lib/sections';
import {listingAtBase} from '@/lib/listing-pages';
import {ListingList, listingMetadata, pageFromQuery} from './ListingList';
import {breadcrumbProps, getLocale, getSite, sectionsContext, pageSilo, showBreadcrumb, toFooter, toHeader, toHero} from '@/lib/site';

export const dynamic = 'force-dynamic';

async function loadPage(slug: string, locale: Awaited<ReturnType<typeof getLocale>>) {
  const payload = await getPayload({config});
  const res = await payload.find({collection: 'pages', where: {slug: {equals: slug}}, locale, depth: 2, limit: 1});
  return res.docs[0] ?? null;
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const locale = await getLocale();
  const [page, site] = await Promise.all([loadPage(slug, locale), getSite(locale)]);
  // a listing address (blog, case studies): the SEO of its settings global
  const listing = listingAtBase(site, locale, slug);
  if (listing) return listingMetadata(listing);
  if (!page) return {title: 'Vidomia'};
  return {title: page.meta?.title || `${page.title} · Vidomia`, description: page.meta?.description || undefined};
}

export default async function Page({params, searchParams}: {params: Promise<{slug: string}>; searchParams: Promise<{page?: string | string[]}>}) {
  const {slug} = await params;
  const locale = await getLocale();
  const [page, site] = await Promise.all([loadPage(slug, locale), getSite(locale)]);
  // a listing address (Blog settings, Case studies settings): the list of its entries, no page involved
  const listing = listingAtBase(site, locale, slug);
  if (listing) return <ListingList locale={locale} listing={listing} site={site} page={pageFromQuery((await searchParams).page)} />;
  if (!page) notFound();
  const hero = toHero(page, site.settings);
  // full screen: the breadcrumb is a strip below the hero; page top: it is inside the Hero
  const bandBreadcrumb = hero.variant !== 'page' && showBreadcrumb(page, site.settings);
  const tone = hero.variant === 'media' || hero.background === 'night-halo' || hero.background === 'image' ? 'dark' : 'light';
  return (
    <SitePage silo={pageSilo(page, site.settings)} header={toHeader(site.settings, site.header, site.languages, site.blog)} footer={toFooter(site.settings, site.footer, site.posts, locale, site.blog)} tone={tone} currentHref={`/${slug}`}>
      <Hero {...hero} />
      {bandBreadcrumb ? <BreadcrumbBand {...breadcrumbProps(page, site.settings)} /> : null}
      <PageSections sections={await toSections(page.sections, site.settings, sectionsContext(locale, site))} />
    </SitePage>
  );
}
