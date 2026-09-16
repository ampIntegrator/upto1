import {notFound} from 'next/navigation';
import React from 'react';

import {CARD_VARIANTS} from '@/fields/blocks/cardBlocks';
import {EMPTY_SLUG} from '@/fields/sections/emptyBlock';
import {MEDIA_SLUG} from '@/fields/blocks/mediaBlock';
import {MEDIA_QUOTE_SLUG} from '@/fields/blocks/mediaQuoteBlock';
import {Apercu} from './Apercu';

export const dynamicParams = false;

export function generateStaticParams() {
  return [EMPTY_SLUG, MEDIA_SLUG, MEDIA_QUOTE_SLUG, ...Object.keys(CARD_VARIANTS)].map((slug) => ({slug}));
}

/**
 * Preview of a content block, blue silo, demo data: the page captured by
 * `pnpm previews:build` to illustrate the admin block picker (public/apercus).
 * Outside the catalogue, outside the site.
 */
export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  if (slug !== EMPTY_SLUG && slug !== MEDIA_SLUG && slug !== MEDIA_QUOTE_SLUG && !(slug in CARD_VARIANTS)) notFound();
  return <Apercu slug={slug} />;
}
