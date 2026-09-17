/* Design-system-specific component: src/components/Tabs (tabs block with rich text, a column of 6 to 12). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {Section} from '@/components/Section';
import {Tabs, type TabsItem} from '@/components/Tabs';
import {TextBox} from '@/components/TextBox';
import {LOREM_DOC} from './textbox.shared';

const LABELS = ['Le standard se perd en route', 'Le reporting est introuvable', 'Les pannes deviennent des incidents', 'La refacturation tourne mal', 'Les délais d’intervention glissent', 'Les devis restent sans réponse', 'Les sites ne se comparent pas', 'Le budget dérive sans alerte'];
const items = (n: number): TabsItem[] => LABELS.slice(0, n).map((label) => ({label, content: LOREM_DOC}));

export default function TabsShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Les onglets comme contenu de colonne : la barre d'onglets du thème (largeur égale, filet entre onglets, ligne active glissante) au-dessus du panneau teinté, chaque onglet portant du texte riche (paragraphes, gras, liens, listes). Tous les panneaux partagent la même cellule : le bloc garde la hauteur du plus haut. De 6 à 12 colonnes : 4 onglets au plus sur 6 ou 7, 6 sur 8 ou 9, 8 sur 12. Chaque onglet garde 144 px : les libellés longs passent sur deux lignes, puis la barre défile ; sur mobile, une ligne et défilement.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>4 onglets sur 6 colonnes, à côté d'un encart</Heading>
        <Grid columns={12} gap={6} className="page-grid" align="stretch">
          <GridSpan columns={6}>
            <Tabs items={items(4)} label="Situations" />
          </GridSpan>
          <GridSpan columns={6}>
            <TextBox title="Quatre situations" titleTag="h3" titleSize="heading-1" content={LOREM_DOC} vAlign="center" />
          </GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>6 onglets sur 8 colonnes (la barre défile)</Heading>
        <Grid columns={12} gap={6} className="page-grid" align="start">
          <GridSpan columns={8}>
            <Tabs items={items(6)} label="Situations" />
          </GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>8 onglets sur 12, nuit</Heading>
        <Section background="night-halo" spacing="sm">
          <Container>
            <Tabs items={items(8)} label="Situations" defaultIndex={2} />
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
