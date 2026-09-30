/* Design-system-specific component: src/components/PostHeader (top of a post, mockup 18). */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {PostHeader} from '@/components/PostHeader';
import {AUTHOR, COVER} from './post.shared';

export default function PostHeaderShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Le haut d’un article : chip de catégorie, titre display avec accent serif, chapô, auteur (avatar carré, nom, rôle), date de publication, puis l’image à la une en 16:7 avec sa légende. Page complète : Page · article de blog (18).</Text>
      <PostHeader category={{label: 'Chiffrage'}} title={'Du devis à la facturation :\n<span>industrialiser</span> le cycle commercial'} lead="Entre l’estimation envoyée et le paiement encaissé, le temps se perd en ressaisies, en relances et en allers-retours." author={AUTHOR} date={{label: '2 juin 2026', iso: '2026-06-02'}} cover={{src: COVER}} coverCaption="Un cycle commercial piloté de bout en bout." coverCaptionTone="light" />
    </VStack>
  );
}
