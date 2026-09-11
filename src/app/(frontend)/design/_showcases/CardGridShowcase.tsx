/* Composant propre au design system : src/components/CardGrid (grille de cartes, contenu générique). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {CardGrid} from '@/components/CardGrid';
import {type CardProps} from '@/components/Card';
import {Container} from '@/components/Container';
import {Section} from '@/components/Section';

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.';
const ITEMS: CardProps[] = [
  {media: {type: 'icon', iconKey: 'calculator'}, title: 'Chiffrage instantané', text: LOREM, cta: {label: 'Découvrir', href: '#'}},
  {media: {type: 'icon', iconKey: 'clipboard-check'}, title: 'Suivi de chantier', text: LOREM, cta: {label: 'Découvrir', href: '#'}},
  {media: {type: 'icon', iconKey: 'file'}, title: 'Devis client', text: LOREM, cta: {label: 'Découvrir', href: '#'}},
  {media: {type: 'icon', iconKey: 'shield'}, title: 'Validation expert', text: LOREM, cta: {label: 'Découvrir', href: '#'}},
];

export default function CardGridShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        La grille de cartes : le contenu qui pose des cartes côte à côte dans une colonne de page, à 2, 3 ou 4 colonnes internes. C'est lui qui porte le côte à côte, la page ne découpe qu'une fois. Il suit la largeur de sa colonne : sous 720 px de colonne, deux cartes par ligne ; sous 480 px, une seule. Emprise minimale : 3 colonnes de page par colonne interne.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>4 colonnes en pleine largeur</Heading>
        <CardGrid items={ITEMS} columns={4} />
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>2 colonnes internes dans une colonne de 6, texte à côté</Heading>
        <Grid columns={12} gap={6} className="page-grid">
          <GridSpan columns={6}><Text type="body" color="secondary">{LOREM} {LOREM} {LOREM}</Text></GridSpan>
          <GridSpan columns={6}><CardGrid items={ITEMS} columns={2} /></GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit, 3 colonnes</Heading>
        <Section background="night" spacing="sm">
          <Container><CardGrid items={ITEMS.slice(0, 3)} columns={3} /></Container>
        </Section>
      </VStack>
    </VStack>
  );
}
