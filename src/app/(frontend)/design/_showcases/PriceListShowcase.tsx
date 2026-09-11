/* Composant propre au design system : src/components/PriceList (liste de prix, maquettes 08 et 09). */
'use client';

import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {PriceList} from '@/components/PriceList';
import {Section} from '@/components/Section';
import {PLANS, PRICE_SINGLE} from './blocks.shared';

export default function PriceListShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        La liste de prix, un contenu comme Stat, en deux variantes. Prix unique : carte en deux colonnes, détail de l'offre avec valeurs barrées et valeur totale, prix en 84 px, bouton split, mention et garantie ; une colonne sous 1024 px, prix en premier. Colonnes : deux à quatre paliers, chacun avec nom, accroche, prix en 56 px, liste « Tout Solo, plus », bouton, mention et garantie ; le palier mis en avant porte le chip « Populaire », un cadre silo et le bouton split. Nuit via la Section.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Prix unique (maquette 08)</Heading>
        <PriceList variant="single" {...PRICE_SINGLE} />
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Colonnes (maquette 08)</Heading>
        <PriceList variant="columns" plans={PLANS} />
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit à faisceau (maquette 09)</Heading>
        <Section background="night-beam" spacing="md">
          <Container gap={10}>
            <PriceList variant="single" {...PRICE_SINGLE} />
            <PriceList variant="columns" plans={PLANS} />
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
