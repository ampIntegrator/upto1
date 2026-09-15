import {notFound} from 'next/navigation';
import React from 'react';

import {CARD_VARIANTS} from '@/fields/sections/cardBlocks';
import {EMPTY_SLUG} from '@/fields/sections/emptyBlock';
import {MEDIA_SLUG} from '@/fields/sections/mediaBlock';
import {MEDIA_QUOTE_SLUG} from '@/fields/sections/mediaQuoteBlock';
import {Apercu} from './Apercu';

export const dynamicParams = false;

export function generateStaticParams() {
  return [EMPTY_SLUG, MEDIA_SLUG, MEDIA_QUOTE_SLUG, ...Object.keys(CARD_VARIANTS)].map((slug) => ({slug}));
}

/**
 * Aperçu d'un bloc de contenu, silo bleu, données de démo : la page que photographie
 * `pnpm previews:build` pour illustrer le sélecteur de blocs de l'admin (public/apercus).
 * Hors catalogue, hors site.
 */
export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  if (slug !== EMPTY_SLUG && slug !== MEDIA_SLUG && slug !== MEDIA_QUOTE_SLUG && !(slug in CARD_VARIANTS)) notFound();
  return <Apercu slug={slug} />;
}
