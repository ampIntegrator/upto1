/* Design-system-specific component: src/components/PlanCard (price tier card, mockups 08 and 09). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {PlanCard} from '@/components/PlanCard';
import {Section} from '@/components/Section';
import {PLANS} from './blocks.shared';

export default function PlanCardShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Le palier de prix, une carte par colonne de page (3 ou 4 colonnes sur 12) : tête sur fond atténué avec nom, accroche et prix en 56 px, corps « Tout Solo, plus » et liste dense, pied avec bouton pleine largeur, mention et garantie. Le palier mis en avant porte le chip « Populaire », un cadre silo et le bouton split. Les paliers d'une même rangée prennent la même hauteur. Nuit via la Section.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Trois paliers sur 4 colonnes (maquette 08)</Heading>
        <Grid columns={12} gap={6} className="page-grid" align="stretch">
          {PLANS.map((p) => <GridSpan key={p.name} columns={4}><PlanCard {...p} /></GridSpan>)}
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Quatre paliers sur 3 colonnes</Heading>
        <Grid columns={12} gap={6} className="page-grid" align="stretch">
          {[...PLANS, {...PLANS[2], name: 'Réseau', tagline: 'Pour les franchises', price: {value: '299'}, inherits: 'Agence', featured: false}].map((p) => <GridSpan key={p.name} columns={3}><PlanCard {...p} /></GridSpan>)}
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit à faisceau (maquette 09)</Heading>
        <Section background="night-beam" spacing="sm">
          <Container>
            <Grid columns={12} gap={6} className="page-grid" align="stretch">
              {PLANS.map((p) => <GridSpan key={p.name} columns={4}><PlanCard {...p} /></GridSpan>)}
            </Grid>
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
