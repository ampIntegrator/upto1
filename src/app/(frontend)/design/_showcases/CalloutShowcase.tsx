/* Composant propre au design system : src/components/Callout (encadré highlight, maquettes 08, 09, 18, 23). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Callout} from '@/components/Callout';
import {Container} from '@/components/Container';
import {Section} from '@/components/Section';
import {GUARANTEE} from './blocks.shared';

export default function CalloutShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        L'encadré de mise en avant : cadre highlight-deep, fond highlight à 12 %, titre 14 px gras, texte 12 px. Eyebrow optionnel en Geist Mono pour les callouts d'article (maquettes 18 et 23). Ce n'est pas le Banner Astryx, réservé aux statuts.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Garantie (tarifs) et callout d'article</Heading>
        <Grid columns={12} gap={6} className="page-grid">
          <GridSpan columns={4}><Callout {...GUARANTEE} /></GridSpan>
          <GridSpan columns={4}><Callout size="sm" {...GUARANTEE} /></GridSpan>
          <GridSpan columns={4}><Callout eyebrow="À retenir" text="Le chiffrage validé par un expert engage sa signature : c'est ce qui rassure le client final." /></GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit</Heading>
        <Section background="night" spacing="sm">
          <Container>
            <Grid columns={12} gap={6} className="page-grid">
              <GridSpan columns={6}><Callout {...GUARANTEE} /></GridSpan>
              <GridSpan columns={6}><Callout eyebrow="À retenir" text="Le chiffrage validé par un expert engage sa signature." /></GridSpan>
            </Grid>
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
