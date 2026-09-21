import React from 'react';

import {listingAtBase} from '@/lib/listing-pages';
import {plainTitle} from '@/lib/listings';
import {loadCase} from '@/lib/cases';
import {loadPost} from '@/lib/posts';
import {getLocale, getSite} from '@/lib/site';
import {PageRoute, pageRouteMetadata, redirectOrNotFound} from '../PageRoute';
import {CasePage} from './CasePage';
import {PostPage} from './PostPage';

export const dynamic = 'force-dynamic';

/**
 * /<a>/<b>: an entry of a listing (a post under the blog's address, a case study under the case
 * studies'), otherwise a page at level 2 (nested pages). An unknown entry redirects when a redirect
 * says where, else 404.
 */
async function load(slug: string, entrySlug: string) {
  const locale = await getLocale();
  const site = await getSite(locale);
  const listing = listingAtBase(site, locale, slug);
  if (listing?.cfg.kind === 'blog') {
    const post = await loadPost(locale, entrySlug);
    if (post) return {kind: 'blog' as const, locale, site, entry: post};
  }
  if (listing?.cfg.kind === 'cases') {
    const caseStudy = await loadCase(locale, entrySlug);
    if (caseStudy) return {kind: 'cases' as const, locale, site, entry: caseStudy};
  }
  return listing ? {kind: 'missing' as const} : null;
}

type Params = {params: Promise<{slug: string; entry: string}>};

export async function generateMetadata({params}: Params) {
  const {slug, entry} = await params;
  const data = await load(slug, entry);
  if (!data) return pageRouteMetadata([slug, entry]);
  if (data.kind === 'missing') return {title: 'Vidomia'};
  const {entry: doc} = data;
  return {title: doc.meta?.title || `${plainTitle(doc.title)} · Vidomia`, description: doc.meta?.description || doc.excerpt || undefined};
}

export default async function Page({params}: Params) {
  const {slug, entry} = await params;
  const data = await load(slug, entry);
  if (!data) return <PageRoute segments={[slug, entry]} />;
  if (data.kind === 'missing') return redirectOrNotFound([slug, entry], true);
  return data.kind === 'cases' ? <CasePage locale={data.locale} site={data.site} caseStudy={data.entry} /> : <PostPage locale={data.locale} site={data.site} post={data.entry} />;
}
