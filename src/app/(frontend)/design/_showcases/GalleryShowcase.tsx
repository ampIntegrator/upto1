/* Design-system-specific component: src/components/Gallery (image gallery, mockup 23). */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Gallery} from '@/components/Gallery';
import {GALLERY} from './post.shared';

export default function GalleryShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">La galerie : deux colonnes d’images en 4:3, la première en large (16:8) si demandé, légende en mono. Une colonne sous 480 px.</Text>
      <VStack style={{maxWidth: 760}}>
        <Gallery images={GALLERY} caption="Chantier Vasseur, Nantes : métré automatique sur plans." />
      </VStack>
    </VStack>
  );
}
