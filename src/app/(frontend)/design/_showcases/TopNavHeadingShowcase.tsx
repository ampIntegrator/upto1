/* Showcase habillé Orbita — thème : orbita.ts section NAVIGATION */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {TopNav, TopNavHeading} from '@astryxdesign/core/TopNav';
import React from 'react';

export default function TopNavHeadingShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Le logo et le nom du site, en Cormorant capitales espacées. Avec un lien, l'ensemble devient cliquable. Le logo Vidomia est un placeholder en attendant le SVG.</Text>
      <VStack style={{border: 'var(--border-width) solid var(--color-border)'}}>
        <TopNav label="En-tête seul" heading={<TopNavHeading logo={<i style={{display: 'inline-block', width: 40, height: 40, background: 'var(--color-accent)'}} aria-hidden="true" />} heading="Vidomia" headingHref="#" />} />
      </VStack>
    </VStack>
  );
}
