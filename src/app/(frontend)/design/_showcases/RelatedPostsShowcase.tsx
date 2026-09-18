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
      <Text type="body" color="secondary">Sous un article : en-tête de section centré facultatif (surtitre, titre et sa balise, communs à tous les articles ; sans titre, pas d’en-tête), trois ou quatre cartes article, bouton vers le blog.</Text>
      <RelatedPosts eyebrow="Le blog" title="Pour continuer <span>sur le sujet.</span>" items={ARTICLE_CARDS.slice(0, 3)} more={{label: 'Voir le blog', href: '#'}} />
      <Text type="body" color="secondary">Sans titre :</Text>
      <RelatedPosts items={ARTICLE_CARDS.slice(0, 4)} more={{label: 'Voir le blog', href: '#'}} />
    </VStack>
  );
}
