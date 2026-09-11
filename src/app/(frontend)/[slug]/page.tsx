import config from '@payload-config';
import {notFound} from 'next/navigation';
import {getPayload} from 'payload';
import React from 'react';

import {BreadcrumbBand} from '@/components/BreadcrumbBand';
import {Hero} from '@/components/Hero';
import {SitePage} from '@/components/SitePage';
import {breadcrumbProps, getLocale, getSite, pageSilo, showBreadcrumb, toFooter, toHeader, toHero} from '@/lib/site';

export const dynamic = 'force-dynamic';

async function loadPage(slug: string, locale: Awaited<ReturnType<typeof getLocale>>) {
  const payload = await getPayload({config});
  const res = await payload.find({collection: 'pages', where: {slug: {equals: slug}}, locale, depth: 1, limit: 1});
  return res.docs[0] ?? null;
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const page = await loadPage(slug, await getLocale());
  return {title: page ? `${page.title} · Vidomia` : 'Vidomia'};
}

export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const locale = await getLocale();
  const [page, site] = await Promise.all([loadPage(slug, locale), getSite(locale)]);
  if (!page) notFound();
  const hero = toHero(page, site.settings);
  // plein écran : le fil d'Ariane est une bande sous le hero ; haut de page : il est dans le Hero
  const bandBreadcrumb = hero.variant !== 'page' && showBreadcrumb(page, site.settings);
  const tone = hero.variant === 'media' || hero.background === 'night-halo' || hero.background === 'image' ? 'dark' : 'light';
  return (
    <SitePage silo={pageSilo(page, site.settings)} header={toHeader(site.settings, site.header)} footer={toFooter(site.settings, site.footer, site.posts, locale)} tone={tone} currentHref={`/${slug}`}>
      <Hero {...hero} />
      {bandBreadcrumb ? <BreadcrumbBand {...breadcrumbProps(page, site.settings)} /> : null}
    </SitePage>
  );
}
