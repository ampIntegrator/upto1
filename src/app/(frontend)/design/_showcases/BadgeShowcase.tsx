/* Showcase habillé Orbita — Badge Astryx : les chips Orbita ajoutés comme variantes (thème), via Chip. */
'use client';

import {Badge} from '@astryxdesign/core/Badge';
import {Card} from '@astryxdesign/core/Card';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {Chip} from '@/components/Chip';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';

function Chips() {
  return (
    <HStack gap={3} wrap="wrap" vAlign="center">
      <Chip label="Ligne" tone="line" />
      <Chip label="Résultat" tone="high" />
      <Chip label="Architectes" tone="accent" />
      <Chip label="Catégorie" tone="cat" />
      <Chip label="Avant" tone="danger" />
    </HStack>
  );
}

export default function BadgeShowcase() {
  const {theme} = useOrbitaTheme();
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Chips, 28 px à angles vifs : bordé, highlight, accent, catégorie pleine en capitales espacées, danger. Ce sont des variantes du Badge déclarées par le thème ; Chip les nomme par leur ton. Les badges de statut restent disponibles.</Text>
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
