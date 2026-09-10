/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/OrbitaCollapsible */
'use client';

import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {OrbitaCollapsible} from '@/components/OrbitaCollapsible';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';
import {FAQ} from './faq.shared';

function Pair() {
  return (
    <Grid columns={{minWidth: 420, max: 2}} gap={6} align="start">
      <OrbitaCollapsible question={FAQ[0].q} defaultIsOpen><Text type="body">{FAQ[0].a}</Text></OrbitaCollapsible>
      <OrbitaCollapsible question={FAQ[1].q}><Text type="body">{FAQ[1].a}</Text></OrbitaCollapsible>
    </Grid>
  );
}

export default function CollapsibleShowcase() {
  const {theme} = useOrbitaTheme();
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        L'item d'accordéon de la FAQ : boîte bordée, question, icône plus qui devient un moins. Ouvert, la boîte se remplit en couleur silo. Seul, chaque item s'ouvre et se ferme librement ; relié aux autres dans un Collapsible Group, il suit la règle du groupe.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Ouvert et fermé</Heading>
        <Pair />
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit</Heading>
        <Theme theme={theme} mode="dark">
          <VStack padding={6} style={{background: 'var(--color-background-body)'}}>
            <Pair />
          </VStack>
        </Theme>
      </VStack>
    </VStack>
  );
}
