import config from '@payload-config';
import {notFound} from 'next/navigation';
import {getPayload} from 'payload';
import React from 'react';

import {Hero} from '@/components/Hero';
import {SitePage} from '@/components/SitePage';
import {getLocale, getSite, pageSilo, toFooter, toHeader, toHero} from '@/lib/site';

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
  const hero = toHero(page);
  const tone = hero.variant === 'media' || hero.background === 'night-halo' || hero.background === 'image' ? 'dark' : 'light';
  return (
    <SitePage silo={pageSilo(page, site.settings)} header={toHeader(site.settings, site.header)} footer={toFooter(site.settings, site.footer, site.posts, locale)} tone={tone} currentHref={`/${slug}`}>
      <Hero {...hero} />
    </SitePage>
  );
}
