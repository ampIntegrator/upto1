import {notFound} from 'next/navigation';
import React from 'react';

import {listingAtBase} from '@/lib/listing-pages';
import {plainTitle} from '@/lib/listings';
import {loadCase} from '@/lib/cases';
import {loadPost} from '@/lib/posts';
import {getLocale, getSite} from '@/lib/site';
import {CasePage} from './CasePage';
import {PostPage} from './PostPage';

export const dynamic = 'force-dynamic';

/** An entry of a listing, at /<listing page>/<entry>: a post under the blog page, a case study under the case studies page. Anything else: 404. */
async function load(slug: string, entrySlug: string) {
  const locale = await getLocale();
  const site = await getSite(locale);
  const listing = listingAtBase(site, locale, slug);
  if (listing?.cfg.kind === 'blog') {
    const post = await loadPost(locale, entrySlug);
    return post ? {kind: 'blog' as const, locale, site, entry: post} : null;
  }
  if (listing?.cfg.kind === 'cases') {
    const caseStudy = await loadCase(locale, entrySlug);
    return caseStudy ? {kind: 'cases' as const, locale, site, entry: caseStudy} : null;
  }
  return null;
}

type Params = {params: Promise<{slug: string; entry: string}>};

export async function generateMetadata({params}: Params) {
  const {slug, entry} = await params;
  const data = await load(slug, entry);
  if (!data) return {title: 'Vidomia'};
  const {entry: doc} = data;
  return {title: doc.meta?.title || `${plainTitle(doc.title)} · Vidomia`, description: doc.meta?.description || doc.excerpt || undefined};
}

export default async function Page({params}: Params) {
  const {slug, entry} = await params;
  const data = await load(slug, entry);
  if (!data) notFound();
  return data.kind === 'cases' ? <CasePage locale={data.locale} site={data.site} caseStudy={data.entry} /> : <PostPage locale={data.locale} site={data.site} post={data.entry} />;
}
