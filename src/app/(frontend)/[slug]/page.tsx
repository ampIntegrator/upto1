import React from 'react';

import {listingAtBase} from '@/lib/listing-pages';
import {getLocale, getSite} from '@/lib/site';
import {ListingList, listingMetadata, pageFromQuery} from './ListingList';
import {PageRoute, pageRouteMetadata} from './PageRoute';

export const dynamic = 'force-dynamic';

type Params = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: Params) {
  const {slug} = await params;
  const locale = await getLocale();
  // a listing address (blog, case studies): the SEO of its settings global
  const listing = listingAtBase(await getSite(locale), locale, slug);
  return listing ? listingMetadata(listing) : pageRouteMetadata([slug]);
}

/** /<slug>: a listing (Blog settings, Case studies settings), otherwise a page at the root. */
export default async function Page({params, searchParams}: Params & {searchParams: Promise<{page?: string | string[]}>}) {
  const {slug} = await params;
  const locale = await getLocale();
  const site = await getSite(locale);
  const listing = listingAtBase(site, locale, slug);
  if (listing) return <ListingList locale={locale} listing={listing} site={site} page={pageFromQuery((await searchParams).page)} />;
  return <PageRoute segments={[slug]} />;
}
