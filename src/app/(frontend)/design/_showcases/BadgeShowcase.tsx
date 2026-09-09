/* Showcase habillé Orbita — Badge Astryx : les chips Orbita ajoutés comme variantes (thème), via OrbitaChip. */
'use client';

import {Badge} from '@astryxdesign/core/Badge';
import {Card} from '@astryxdesign/core/Card';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {OrbitaChip} from '@/components/OrbitaChip';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';

function Chips() {
  return (
    <HStack gap={3} wrap="wrap" vAlign="center">
      <OrbitaChip label="Ligne" tone="line" />
      <OrbitaChip label="Résultat" tone="high" />
      <OrbitaChip label="Architectes" tone="accent" />
      <OrbitaChip label="Catégorie" tone="cat" />
      <OrbitaChip label="Avant" tone="danger" />
    </HStack>
  );
}

export default function BadgeShowcase() {
  const {theme} = useOrbitaTheme();
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Chips Orbita, 28 px à angles vifs : bordé, highlight, accent, catégorie pleine en capitales espacées, danger. Ce sont des variantes du Badge Astryx déclarées par le thème ; OrbitaChip les nomme par leur ton. Les badges de statut Astryx restent disponibles.</Text>
      <Card padding={6}><Chips /></Card>
      <Theme theme={theme} mode="dark"><Card padding={6}><Chips /></Card></Theme>
      <Card padding={6}>
        <HStack gap={2} wrap="wrap">
          <Badge label="Neutre" variant="neutral" />
          <Badge label="Info" variant="info" />
          <Badge label="Succès" variant="success" />
          <Badge label="Avertissement" variant="warning" />
          <Badge label="Erreur" variant="error" />
        </HStack>
      </Card>
    </VStack>
  );
}
