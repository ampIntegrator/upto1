/* Design-system-specific component: src/components/PostArchive (posts list of the blog page, mockup 19). */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {PostArchive} from '@/components/PostArchive';
import {ARTICLE_CARDS} from './post.shared';

export default function PostArchiveShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">La liste des articles de la page blog et des archives de catégorie : chips de catégories (liens), cartes article sur quatre colonnes (deux sous 1024 px, une sous 640 px) avec les écarts du site, pagination reprise des contrôles du carrousel, en liens (numéros au-delà de dix pages). Page complète : Page · blog (19).</Text>
      <PostArchive categories={[{label: 'Tous', href: '#tous', active: true}, {label: 'Chiffrage', href: '#chiffrage'}, {label: 'Chantier', href: '#chantier'}]} items={ARTICLE_CARDS.slice(0, 4)} page={0} pages={3} hrefFor={(p) => `#page-${p + 1}`} />
    </VStack>
  );
}
