/* Composant propre au design system : src/components/TestimonialCarousel (carrousel de témoignages, maquettes 07 et 07b). */
'use client';

import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {Section} from '@/components/Section';
import {SectionHeading} from '@/components/SectionHeading';
import {TestimonialCarousel} from '@/components/TestimonialCarousel';
import {TESTIMONIALS} from './blocks.shared';


export default function TestimonialCarouselShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Le carrousel de témoignages : Carousel Astryx (défilement natif, snap, clavier) sans ses boutons ni son fondu, et les contrôles de la maquette en dessous : segments de page à gauche, flèches carrées à droite. Une carte par vue, deux dès 640 px, trois dès 1280 px ; sous 640 px on balaie, sans contrôles. Nuit : Section « nuit à halos » (maquette 07b).
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Clair (maquette 07)</Heading>
        <Section background="light" spacing="md">
          <Container gap={8}>
            <SectionHeading eyebrow="Ils ont arrêté d'attendre" title="Ils <span>closent.</span>" ghost="CLOSENT" />
            <TestimonialCarousel items={TESTIMONIALS} />
          </Container>
        </Section>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit à halos (maquette 07b)</Heading>
        <Section background="night-halo" spacing="md">
          <Container gap={8}>
            <SectionHeading eyebrow="Ils ont arrêté d'attendre" title="Ils <span>closent.</span>" ghost="CLOSENT" />
            <TestimonialCarousel items={TESTIMONIALS} />
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
