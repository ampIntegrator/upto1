import {notFound} from 'next/navigation';
import React from 'react';

import {loadCategory} from '@/lib/posts';
import {getLocale, getSite} from '@/lib/site';
import {BlogList, pageFromQuery} from '../../BlogList';

export const dynamic = 'force-dynamic';

/** A category archive, at /<blog page>/categorie/<category>: automatic h1, no lead. */
async function load(slug: string, categorySlug: string) {
  const locale = await getLocale();
  const site = await getSite(locale);
  const blog = site.blog;
  if (!blog.base || blog.base !== slug) return null;
  const category = await loadCategory(locale, categorySlug);
  return category ? {locale, site, blog, category} : null;
}

export async function generateMetadata({params}: {params: Promise<{slug: string; category: string}>}) {
  const {slug, category} = await params;
  const data = await load(slug, category);
  return {title: data ? `${data.category.title} · ${data.blog.title.replace(/<\/?span>/g, '')} · Vidomia` : 'Vidomia'};
}

export default async function Page({params, searchParams}: {params: Promise<{slug: string; category: string}>; searchParams: Promise<{page?: string | string[]}>}) {
  const {slug, category} = await params;
  const data = await load(slug, category);
  if (!data) notFound();
  return <BlogList locale={data.locale} blog={data.blog} site={data.site} category={data.category} page={pageFromQuery((await searchParams).page)} />;
}
