import {notFound} from 'next/navigation';
import React from 'react';

import {listingAtBase} from '@/lib/listing-pages';
import {plainTitle} from '@/lib/listings';
import {loadPost} from '@/lib/posts';
import {getLocale, getSite} from '@/lib/site';
import {PostPage} from './PostPage';

export const dynamic = 'force-dynamic';

/** An entry of a listing, at /<listing page>/<entry>: a post under the blog page. Any other first segment: 404. */
async function load(slug: string, entrySlug: string) {
  const locale = await getLocale();
  const site = await getSite(locale);
  const listing = listingAtBase(site, locale, slug);
  if (listing?.cfg.kind === 'blog') {
    const post = await loadPost(locale, entrySlug);
    return post ? {kind: 'blog' as const, locale, site, post} : null;
  }
  return null;
}

type Params = {params: Promise<{slug: string; entry: string}>};

export async function generateMetadata({params}: Params) {
  const {slug, entry} = await params;
  const data = await load(slug, entry);
  if (!data) return {title: 'Vidomia'};
  const {post} = data;
  return {title: post.meta?.title || `${plainTitle(post.title)} · Vidomia`, description: post.meta?.description || post.excerpt || undefined};
}

export default async function Page({params}: Params) {
  const {slug, entry} = await params;
  const data = await load(slug, entry);
  if (!data) notFound();
  return <PostPage locale={data.locale} site={data.site} post={data.post} />;
}
