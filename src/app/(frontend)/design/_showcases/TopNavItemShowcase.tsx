/* Showcase habillé Orbita — thème : orbita.ts section NAVIGATION */
'use client';

import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {TopNav, TopNavHeading, TopNavItem} from '@astryxdesign/core/TopNav';
import React from 'react';

export default function TopNavItemShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Un lien direct de la navigation : 14,5 px medium, encre secondaire, encre au survol, courant en encre. Le soulignement silo animé est ajouté par SiteHeader.</Text>
      <VStack style={{border: 'var(--border-width) solid var(--color-border)'}}>
        <TopNav label="Liens" heading={<TopNavHeading heading="Vidomia" />} startContent={<HStack vAlign="stretch"><TopNavItem label="Tarifs" href="#" isSelected /><TopNavItem label="À propos" href="#" /><TopNavItem label="Carrières" href="#" isDisabled /></HStack>} />
      </VStack>
    </VStack>
  );
}
