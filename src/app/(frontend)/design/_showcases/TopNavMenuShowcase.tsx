/* Showcase habillé Orbita — thème : orbita.ts section NAVIGATION (sous-menu simple, maquette 01) */
'use client';

import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {TopNav, TopNavHeading, TopNavItem, TopNavMenu} from '@astryxdesign/core/TopNav';
import React from 'react';

import {ChartIcon, FileIcon, GaugeIcon} from '@/theme/icons/nucleo';

export default function TopNavMenuShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Le sous-menu simple : une liste d'items à icône, titre et description, ouverte au survol. Survolez Ressources.</Text>
      <VStack style={{border: 'var(--border-width) solid var(--color-border)', minHeight: 320}}>
        <TopNav
          label="Sous-menu"
          heading={<TopNavHeading heading="Vidomia" />}
          startContent={
            <HStack vAlign="stretch">
              <TopNavItem label="Tarifs" href="#" />
              <TopNavMenu
                label="Ressources"
                items={[
                  {title: 'Guides & livres blancs', description: 'Méthodes et retours de terrain.', icon: <GaugeIcon width={24} height={24} />, href: '#'},
                  {title: 'Webinaires', description: 'Sessions en direct et replays.', icon: <ChartIcon width={24} height={24} />, href: '#'},
                  {title: 'Blog', description: 'Actualité du chiffrage et du chantier.', icon: <FileIcon width={24} height={24} />, href: '#'},
                ]}
              />
            </HStack>
          }
        />
      </VStack>
    </VStack>
  );
}
