/* Design-system-specific component: src/components/ButtonGroup (attached or spaced site buttons, a column of 6 to 12). Replaces the original Astryx demo. */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {ButtonGroup} from '@/components/ButtonGroup';
import {Container} from '@/components/Container';
import {Section} from '@/components/Section';
import type {TextBoxButton} from '@/components/TextBox';

const B = (label: string, variant: TextBoxButton['variant'], extra: Partial<TextBoxButton> = {}): TextBoxButton => ({label, href: '#', variant, size: 'md', ...extra});
const SIMPLE: TextBoxButton[] = [B('Particuliers', 'secondary', {iconKey: 'home'}), B('Professionnels', 'secondary', {iconKey: 'calculator'}), B('Collectivités', 'secondary', {iconKey: 'building'})];
const SPLIT: TextBoxButton[] = [B('Demander une démo', 'primary', {arrow: true}), B('Voir les tarifs', 'high', {arrow: true})];
const MIXED: TextBoxButton[] = [B('Commencer', 'primary', {arrow: true}), B('Tarifs', 'high'), B('Nous appeler', 'ghost', {iconKey: 'phone'}), B('Documentation', 'secondary', {arrow: true})];

export default function ButtonGroupShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Le groupe de boutons, contenu de colonne de 6 à 12 : un à quatre boutons du site, simples (icône facultative) ou split, dans tous les styles. Collés, ils forment un seul contrôle ; espacés, chaque bouton a sa colonne et l'écart est celui de la section. Largeur naturelle, alignée à gauche, au centre ou à droite, ou pleine largeur. 2 boutons au plus sur 6 ou 7 colonnes, 3 sur 8 ou 9, 4 sur 12 ; sous 640 px de colonne, les boutons s'empilent.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Collés : trois boutons simples avec icône, puis deux split</Heading>
        <ButtonGroup mode="attached" buttons={SIMPLE} label="Profils" />
        <ButtonGroup mode="attached" buttons={SPLIT} label="Actions" />
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Collés, pleine largeur, sur 8 colonnes</Heading>
        <Grid columns={12} gap={6} className="page-grid">
          <GridSpan columns={8}>
            <ButtonGroup mode="attached" width="full" buttons={SIMPLE} label="Profils" />
          </GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Espacés sur 12 : quatre colonnes, largeur naturelle centrée, puis pleine largeur</Heading>
        <ButtonGroup mode="spaced" align="center" buttons={MIXED} />
        <ButtonGroup mode="spaced" width="full" buttons={MIXED} />
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Espacés sur 6 : deux colonnes ; nuit</Heading>
        <Section background="night-halo" spacing="sm">
          <Container>
            <Grid columns={12} gap={6} className="page-grid">
              <GridSpan columns={6}>
                <ButtonGroup mode="spaced" width="full" buttons={SPLIT} />
              </GridSpan>
              <GridSpan columns={6}>
                <ButtonGroup mode="attached" align="end" buttons={SPLIT} label="Actions" />
              </GridSpan>
            </Grid>
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
