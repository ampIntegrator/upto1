import config from '@payload-config';
import {redirect} from 'next/navigation';
import {getPayload} from 'payload';
import React from 'react';

import {Hero} from '@/components/Hero';
import {PageSections} from '@/components/PageSections';
import {SitePage} from '@/components/SitePage';
import {toSections} from '@/lib/sections';
import {getLocale, getSite, pageSilo, toFooter, toHeader, toHero} from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const payload = await getPayload({config});
  const res = await payload.find({collection: 'pages', where: {slug: {equals: 'accueil'}}, locale: await getLocale(), depth: 0, limit: 1});
  const page = res.docs[0];
  if (!page) return {title: 'Vidomia'};
  return {title: page.meta?.title || `${page.title} · Vidomia`, description: page.meta?.description || undefined};
}

/** Racine du site : la page Payload « accueil » ; sans elle, le catalogue. */
export default async function Page() {
  const locale = await getLocale();
  const payload = await getPayload({config});
  const res = await payload.find({collection: 'pages', where: {slug: {equals: 'accueil'}}, locale, depth: 2, limit: 1});
  const page = res.docs[0];
  if (!page) redirect('/design');
  const site = await getSite(locale);
  const hero = toHero(page, site.settings);
  const tone = hero.variant === 'media' || hero.background === 'night-halo' || hero.background === 'image' ? 'dark' : 'light';
  return (
    <SitePage silo={pageSilo(page, site.settings)} header={toHeader(site.settings, site.header)} footer={toFooter(site.settings, site.footer, site.posts, locale)} tone={tone} currentHref="/">
      <Hero {...hero} />
      <PageSections sections={toSections(page.sections, site.settings)} />
    </SitePage>
  );
}
