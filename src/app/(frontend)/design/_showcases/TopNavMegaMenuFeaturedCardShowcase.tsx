/* Showcase habillé Orbita — thème : orbita.ts section NAVIGATION */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {TopNavMegaMenuFeaturedCard} from '@astryxdesign/core/TopNav';
import React from 'react';

export default function TopNavMegaMenuFeaturedCardShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">La carte mise en avant du méga-menu : image, titre, description et lien, sur fond nuit à angles vifs.</Text>
      <VStack maxWidth={400}>
        <TopNavMegaMenuFeaturedCard title="Chiffrer juste, gagner plus." description="Comment 1 200 pros ont réduit leurs délais de devis de 40 % en six mois." image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=70&auto=format&fit=crop" linkLabel="Lire l'étude" linkHref="#" />
      </VStack>
    </VStack>
  );
}
