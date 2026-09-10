/* Showcase habillé Orbita — thème : orbita.ts section NAVIGATION. La barre complète du site est SiteHeader. */
'use client';

import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {TopNav, TopNavHeading, TopNavItem} from '@astryxdesign/core/TopNav';
import React from 'react';

import {SearchIcon} from '@/theme/icons/nucleo';

export default function TopNavShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">
        La barre de navigation Astryx, trois zones : logo, navigation, actions. Hauteur 74 px, fond transparent (c'est SiteHeader qui porte le fond, le bandeau et le défilement). Entrées en 14,5 px, encre au survol et à la page courante.
      </Text>
      <VStack style={{border: 'var(--border-width) solid var(--color-border)'}}>
        <TopNav
          label="Navigation de démonstration"
          heading={<TopNavHeading heading="Vidomia" headingHref="#" />}
          startContent={
            <HStack vAlign="stretch">
              <TopNavItem label="Solutions" href="#" isSelected />
              <TopNavItem label="Ressources" href="#" />
              <TopNavItem label="Tarifs" href="#" />
              <TopNavItem label="À propos" href="#" />
            </HStack>
          }
          endContent={
            <HStack gap={2} vAlign="center">
              <IconButton label="Rechercher" icon={<SearchIcon />} variant="ghost" />
              <Button label="Connexion" variant="ink" />
              <Button label="Demander une démo" variant="primary" />
            </HStack>
          }
        />
      </VStack>
    </VStack>
  );
}
