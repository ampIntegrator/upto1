/* Design-system-specific component: src/components/RelatedPosts (« Pour continuer sur le sujet », mockup 19). */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {RelatedPosts} from '@/components/RelatedPosts';
import {ARTICLE_CARDS} from './post.shared';

export default function RelatedPostsShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Sous un article : en-tête de section centré, trois ou quatre cartes article de la même catégorie, bouton vers le blog.</Text>
      <RelatedPosts items={ARTICLE_CARDS.slice(0, 3)} more={{label: 'Voir le blog', href: '#'}} />
    </VStack>
  );
}
