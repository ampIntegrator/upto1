import config from '@payload-config';
import {notFound} from 'next/navigation';
import {getPayload} from 'payload';
import React from 'react';

import {BreadcrumbBand} from '@/components/BreadcrumbBand';
import {Hero} from '@/components/Hero';
import {PageSections} from '@/components/PageSections';
import {SitePage} from '@/components/SitePage';
import {blogConfig} from '@/lib/blog';
import {toSections} from '@/lib/sections';
import {BlogList, pageFromQuery} from './BlogList';
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
  if (!page) return {title: 'Vidomia'};
  const blog = blogConfig(site.settings);
  // the blog page: its settings title (without the serif span) when the page has no SEO title
  if (blog.pageId === page.id) return {title: page.meta?.title || `${blog.title.replace(/<\/?span>/g, '')} · Vidomia`, description: page.meta?.description || blog.lead || undefined};
  return {title: page.meta?.title || `${page.title} · Vidomia`, description: page.meta?.description || undefined};
}

export default async function Page({params, searchParams}: {params: Promise<{slug: string}>; searchParams: Promise<{page?: string | string[]}>}) {
  const {slug} = await params;
  const locale = await getLocale();
  const [page, site] = await Promise.all([loadPage(slug, locale), getSite(locale)]);
  if (!page) notFound();
  // the page chosen as the blog (Site settings › Blog) shows the list of posts instead of its content
  const blog = blogConfig(site.settings);
  if (blog.pageId === page.id) return <BlogList locale={locale} blog={blog} site={site} page={pageFromQuery((await searchParams).page)} />;
  const hero = toHero(page, site.settings);
  // full screen: the breadcrumb is a strip below the hero; page top: it is inside the Hero
  const bandBreadcrumb = hero.variant !== 'page' && showBreadcrumb(page, site.settings);
  const tone = hero.variant === 'media' || hero.background === 'night-halo' || hero.background === 'image' ? 'dark' : 'light';
  return (
    <SitePage silo={pageSilo(page, site.settings)} header={toHeader(site.settings, site.header, site.languages)} footer={toFooter(site.settings, site.footer, site.posts, locale)} tone={tone} currentHref={`/${slug}`}>
      <Hero {...hero} />
      {bandBreadcrumb ? <BreadcrumbBand {...breadcrumbProps(page, site.settings)} /> : null}
      <PageSections sections={await toSections(page.sections, site.settings, sectionsContext(locale, site.settings))} />
    </SitePage>
  );
}
