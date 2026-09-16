/* Design-system-specific component: src/components/RichText (Lexical document → site typography). */
'use client';

import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {RichText} from '@/components/RichText';
import {Section} from '@/components/Section';
import {LOREM_DOC} from './textbox.shared';

export default function RichTextShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Le texte riche saisi dans l'admin (éditeur Lexical restreint) rendu avec la typographie du site : paragraphes en texte secondaire, gras en texte principal, liens en couleur silo soulignés, listes à puces et numérotées avec leurs marqueurs en silo. Rien d'autre n'est rendu : le titre est un champ à part.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Paragraphes, gras, lien, listes</Heading>
        <RichText content={LOREM_DOC} />
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit</Heading>
        <Section background="night" spacing="sm">
          <Container>
            <RichText content={LOREM_DOC} />
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
