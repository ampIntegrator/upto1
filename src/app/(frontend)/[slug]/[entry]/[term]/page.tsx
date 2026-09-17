import {notFound} from 'next/navigation';
import React from 'react';

import {listingAtBase} from '@/lib/listing-pages';
import {CATEGORY_SEGMENT} from '@/lib/listings';
import {getLocale, getSite} from '@/lib/site';
import {ListingList, listingMetadata, pageFromQuery} from '../../ListingList';

export const dynamic = 'force-dynamic';

/** A category archive of a listing, at /<listing page>/categorie/<category> (the `entry` segment must be « categorie »): automatic h1, no lead. Anything else: 404. */
async function load(slug: string, segment: string, term: string) {
  if (segment !== CATEGORY_SEGMENT) return null;
  const locale = await getLocale();
  const site = await getSite(locale);
  const listing = listingAtBase(site, locale, slug);
  if (!listing) return null;
  const category = await listing.loadCategory(locale, term);
  return category ? {locale, site, listing, category} : null;
}

type Params = {params: Promise<{slug: string; entry: string; term: string}>};

export async function generateMetadata({params}: Params) {
  const {slug, entry: segment, term} = await params;
  const data = await load(slug, segment, term);
  return data ? listingMetadata(data.listing, data.category) : {title: 'Vidomia'};
}

export default async function Page({params, searchParams}: Params & {searchParams: Promise<{page?: string | string[]}>}) {
  const {slug, entry: segment, term} = await params;
  const data = await load(slug, segment, term);
  if (!data) notFound();
  return <ListingList locale={data.locale} listing={data.listing} site={data.site} category={data.category} page={pageFromQuery((await searchParams).page)} />;
}
