import config from '@payload-config';
import {redirect} from 'next/navigation';
import {getPayload} from 'payload';
import React from 'react';

import {Hero} from '@/components/Hero';
import {PageModals} from '@/components/PageModals';
import {PageSections} from '@/components/PageSections';
import {SitePage} from '@/components/SitePage';
import {stampInternalLinks} from '@/lib/links';
import {toSections} from '@/lib/sections';
import {getLocale, getSite, sectionsContext, pageSilo, toFooter, toHeader, toHero} from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const payload = await getPayload({config});
  const res = await payload.find({collection: 'pages', where: {slug: {equals: 'accueil'}}, locale: await getLocale(), depth: 0, limit: 1});
  const page = res.docs[0];
  if (!page) return {title: 'Vidomia'};
  return {title: page.meta?.title || `${page.title} · Vidomia`, description: page.meta?.description || undefined};
}

/** Site root: the Payload page « accueil »; without it, the catalogue. */
export default async function Page() {
  const locale = await getLocale();
  const payload = await getPayload({config});
  const res = await payload.find({collection: 'pages', where: {slug: {equals: 'accueil'}}, locale, depth: 2, limit: 1});
  const page = res.docs[0];
  if (!page) redirect('/design');
  const site = await getSite(locale);
  // buttons targeting a content of the site (hero…): their address (the sections get it in toSections)
  stampInternalLinks(page.hero, site);
  const hero = toHero(page, site.settings);
  const tone = hero.variant === 'media' || hero.background === 'night-halo' || hero.background === 'image' ? 'dark' : 'light';
  return (
    <SitePage silo={pageSilo(page, site.settings)} header={toHeader(site.settings, site.header, site.languages, site.blog)} footer={toFooter(site.settings, site.footer, site.posts, locale, site.blog)} tone={tone} currentHref="/">
      <Hero {...hero} />
      <PageSections sections={await toSections(page.sections, site.settings, sectionsContext(locale, site))} />
      {/* the modals this page, its header and its footer link to, closed until their anchor is reached */}
      <PageModals sources={[page.hero, page.sections, ...site.modalSources]} locale={locale} />
    </SitePage>
  );
}
