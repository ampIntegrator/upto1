/* Design-system-specific component: src/components/Collection (identical items side by side, swipe or carousel). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Card} from '@/components/Card';
import {Collection} from '@/components/Collection';
import {CompareCard} from '@/components/CompareCard';
import {Container} from '@/components/Container';
import {Section} from '@/components/Section';
import {TestimonialCard} from '@/components/TestimonialCard';
import {METIERS, TESTIMONIALS} from './blocks.shared';

const IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80';
const ARTICLES = Array.from({length: 7}, (_, i) => ({preset: 'article' as const, media: {type: 'image' as const, src: IMG, alt: ''}, chip: {label: 'Chiffrage'}, date: `${i + 2} septembre 2026`, title: `Article ${i + 1} : lorem ipsum dolor sit amet consectetur`, cta: {label: 'Lire', href: '#'}}));

export default function CollectionShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        La collection : des contenus identiques côte à côte dans une colonne de 8 à 12, 2 à 4 visibles (3 au plus sur 8 ou 9 colonnes, 4 sur 12). Deux mises en page sur le Carousel Astryx : « swipe », sans contrôle, l'élément suivant dépasse du bord droit et des points apparaissent sous 640 px ; « carrousel », flèches et indicateur (segments, points ou numéros), flèches masquées sous 640 px. Défilement par page ou par élément ; jamais automatique, jamais en boucle. Les éléments suivent la largeur de la colonne : 2 entre 640 et 960 px, 1 avec aperçu en dessous.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Carrousel, 3 témoignages visibles, segments (maquette 07)</Heading>
        <Collection layout="carousel" perView={3} label="Témoignages">
          {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} {...t} />)}
        </Collection>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Carrousel d'articles, 4 visibles, points, un élément à la fois</Heading>
        <Collection layout="carousel" perView={4} indicator="dots" step="item" label="Articles">
          {ARTICLES.map((a) => <Card key={a.title} {...a} />)}
        </Collection>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Swipe, dans une colonne de 8 (3 visibles), numéros sur la colonne de 4</Heading>
        <Grid columns={12} gap={6} className="page-grid" align="start">
          <GridSpan columns={8}>
            <Collection layout="swipe" perView={3} label="Métiers">
              {[...METIERS, ...METIERS].map((m, i) => <CompareCard key={i} {...m} />)}
            </Collection>
          </GridSpan>
          <GridSpan columns={4}>
            <Text type="body" color="secondary">Sur 8 colonnes, 3 éléments visibles au plus ; le quatrième dépasse à droite et invite à glisser.</Text>
          </GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit, numéros</Heading>
        <Section background="night-halo" spacing="sm">
          <Container>
            <Collection layout="carousel" perView={3} indicator="numbers" label="Témoignages">
              {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} {...t} />)}
            </Collection>
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
