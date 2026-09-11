/* Composant propre au design system : src/components/TestimonialCard (carte témoignage, maquette 07). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {Section} from '@/components/Section';
import {TestimonialCard} from '@/components/TestimonialCard';
import {TESTIMONIALS} from './blocks.shared';

export default function TestimonialCardShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        La carte témoignage : guillemet serif droit, citation, filet, nom en couleur silo, rôle en capitales espacées, chip résultat. Balisage figure, blockquote et figcaption. Le carrousel la porte ; seule, elle se pose dans une grille de page.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Trois cartes en grille</Heading>
        <Grid columns={12} gap={6} className="page-grid" align="stretch">
          {TESTIMONIALS.slice(0, 3).map((t) => <GridSpan key={t.name} columns={4}><TestimonialCard {...t} /></GridSpan>)}
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit</Heading>
        <Section background="night" spacing="sm">
          <Container>
            <Grid columns={12} gap={6} className="page-grid" align="stretch">
              {TESTIMONIALS.slice(3, 6).map((t) => <GridSpan key={t.name} columns={4}><TestimonialCard {...t} /></GridSpan>)}
            </Grid>
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
