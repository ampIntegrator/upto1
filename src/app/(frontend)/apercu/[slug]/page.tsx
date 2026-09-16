import {notFound} from 'next/navigation';
import React from 'react';

import {PREVIEW_SLUGS} from '@/fields/blocks/previews';
import {Apercu} from './Apercu';

export const dynamicParams = false;

export function generateStaticParams() {
  return PREVIEW_SLUGS.map((slug) => ({slug}));
}

/**
 * Preview of a content block, blue silo, demo data: the page captured by
 * `pnpm previews:build` to illustrate the admin block picker (public/apercus).
 * Outside the catalogue, outside the site.
 */
export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  if (!PREVIEW_SLUGS.includes(slug)) notFound();
  return <Apercu slug={slug} />;
}
