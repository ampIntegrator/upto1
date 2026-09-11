/* Composant propre au design system : src/components/SectionHeading (en-tête de section, maquette 15). */
'use client';

import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {Section} from '@/components/Section';
import {SectionHeading} from '@/components/SectionHeading';

export default function SectionHeadingShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        L'en-tête de section : eyebrow à tirets or, titre display avec accent serif (saisi comme un titre de haut de page : retours à la ligne et span), chapô sur 640 px, appel à l'action. Centré sur 820 px ; les blocs étapes, comparatif et témoignages l'embarquent en tête.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Complet (maquette 15)</Heading>
        <Section background="light" spacing="sm">
          <Container>
            <SectionHeading eyebrow="Notre approche" title="Le chiffrage adapté <span>à votre métier.</span>" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." cta={{label: 'Découvrir la méthode', href: '#'}} />
          </Container>
        </Section>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit à halos, aligné à gauche</Heading>
        <Section background="night-halo" spacing="sm">
          <Container>
            <SectionHeading eyebrow="Pour qui" title="Un outil, <span>trois métiers.</span>" text="Chaque profil tire Chiffrage Pro vers son usage." align="start" cta={{label: 'Trouver mon profil', href: '#'}} />
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
