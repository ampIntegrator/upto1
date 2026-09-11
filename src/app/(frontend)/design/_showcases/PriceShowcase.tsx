/* Composant propre au design system : src/components/Price (prix des tarifs, maquettes 08 et 09). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {Price} from '@/components/Price';
import {Section} from '@/components/Section';

export default function PriceShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Le prix : montant Schibsted 800 en couleur silo, devise en semibold alignée sur la ligne de base, période en 14 px gris. Taille palier (56 px) ou prix unique (84 px). Un contenu de la même famille que Stat, réservé aux tarifs.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Palier et prix unique</Heading>
        <Grid columns={12} gap={6} className="page-grid" align="end">
          <GridSpan columns={4}><Price value="49" period="/ mois" /></GridSpan>
          <GridSpan columns={4}><Price value="1 490" period="/ an" align="center" /></GridSpan>
          <GridSpan columns={4}><Price value="79" size="single" /></GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit</Heading>
        <Section background="night" spacing="sm">
          <Container>
            <Grid columns={12} gap={6} className="page-grid" align="end">
              <GridSpan columns={6}><Price value="79" period="/ mois" /></GridSpan>
              <GridSpan columns={6}><Price value="79" size="single" /></GridSpan>
            </Grid>
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
