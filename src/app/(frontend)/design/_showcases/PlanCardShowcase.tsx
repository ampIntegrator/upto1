/* Composant propre au design system : src/components/PlanCard (carte de palier, maquettes 08 et 09). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {PlanCard} from '@/components/PlanCard';
import {Section} from '@/components/Section';
import {SectionHeading} from '@/components/SectionHeading';
import {PLANS} from './blocks.shared';

export default function PlanCardShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        La carte de palier : tête sur fond atténué (nom, accroche, prix), corps (« Tout Solo, plus » et liste serrée), pied sur fond atténué (bouton pleine largeur, mention, garantie). La carte mise en avant prend un cadre silo, une ombre teintée, le chip « Populaire » et le bouton split. Trois cartes sur 4 colonnes, hauteur égale.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Trois volumes (maquette 08)</Heading>
        <Section background="blueprint" spacing="md">
          <Container gap={10}>
            <SectionHeading eyebrow="Plusieurs volumes" title="Trois volumes. <span>Une seule promesse.</span>" text="Chaque palier reprend tout le précédent et y ajoute ce qu'il faut pour passer à l'échelle." />
            <Grid columns={12} gap={6} className="page-grid" align="stretch">
              {PLANS.map((p) => <GridSpan key={p.name} columns={4}><PlanCard {...p} /></GridSpan>)}
            </Grid>
          </Container>
        </Section>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit à faisceau (maquette 09)</Heading>
        <Section background="night-beam" spacing="md">
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
