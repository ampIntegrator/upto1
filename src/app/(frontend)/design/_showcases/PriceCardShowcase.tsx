/* Composant propre au design system : src/components/PriceCard (prix unique, maquettes 08 et 09). */
'use client';

import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {PriceCard} from '@/components/PriceCard';
import {Section} from '@/components/Section';
import {SectionHeading} from '@/components/SectionHeading';
import {PRICE_SINGLE} from './blocks.shared';

export default function PriceCardShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        La carte de prix unique : à gauche le détail de l'offre avec la valeur barrée de chaque poste et la valeur totale, à droite sur fond atténué le prix en 84 px, le bouton split, la mention et la garantie. 900 px au plus ; sous 1024 px, une colonne avec le prix en premier.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Un prix (maquette 08)</Heading>
        <Section background="blueprint" spacing="md">
          <Container gap={10}>
            <SectionHeading eyebrow="L'offre" title="Un prix. <span>Tout dedans.</span>" text="Pas de palier, pas d'option cachée : tout ce qu'il vous faut pour chiffrer, certifier et livrer est compris dans un seul forfait." />
            <PriceCard {...PRICE_SINGLE} />
          </Container>
        </Section>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit à faisceau (maquette 09)</Heading>
        <Section background="night-beam" spacing="md">
          <Container>
            <PriceCard {...PRICE_SINGLE} />
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
