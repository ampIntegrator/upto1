import React from 'react';

import {listingAtBase} from '@/lib/listing-pages';
import {CATEGORY_SEGMENT} from '@/lib/listings';
import {getLocale, getSite} from '@/lib/site';
import {ListingList, listingMetadata, pageFromQuery} from '../../ListingList';
import {PageRoute, pageRouteMetadata, redirectOrNotFound} from '../../PageRoute';

export const dynamic = 'force-dynamic';

/**
 * /<a>/<b>/<c>: a category archive of a listing, at /<listing>/categorie/<category> (automatic h1,
 * no lead), otherwise a page at level 3 (nested pages). Under a listing, anything else redirects when
 * a redirect says where, else 404.
 */
async function load(slug: string, segment: string, term: string) {
  const locale = await getLocale();
  const site = await getSite(locale);
  const listing = listingAtBase(site, locale, slug);
  if (!listing) return null;
  const category = segment === CATEGORY_SEGMENT ? await listing.loadCategory(locale, term) : null;
  return category ? {kind: 'archive' as const, locale, site, listing, category} : {kind: 'missing' as const};
}

type Params = {params: Promise<{slug: string; entry: string; term: string}>};

export async function generateMetadata({params}: Params) {
  const {slug, entry: segment, term} = await params;
  const data = await load(slug, segment, term);
  if (!data) return pageRouteMetadata([slug, segment, term]);
  return data.kind === 'archive' ? listingMetadata(data.listing, data.category) : {title: 'Vidomia'};
}

export default async function Page({params, searchParams}: Params & {searchParams: Promise<{page?: string | string[]}>}) {
  const {slug, entry: segment, term} = await params;
  const data = await load(slug, segment, term);
  if (!data) return <PageRoute segments={[slug, segment, term]} />;
  if (data.kind === 'missing') return redirectOrNotFound([slug, segment, term], true);
  return <ListingList locale={data.locale} listing={data.listing} site={data.site} category={data.category} page={pageFromQuery((await searchParams).page)} />;
}
