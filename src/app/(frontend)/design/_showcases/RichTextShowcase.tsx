/* Design-system-specific component: src/components/RichText (Lexical document → site typography). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {RichText} from '@/components/RichText';
import {Section} from '@/components/Section';
import {LOREM_DOC, PROSE_DOC} from './textbox.shared';

export default function RichTextShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Le texte riche saisi dans l’admin (éditeur Lexical) rendu avec la typographie du site. Listes à puces en losange silo, listes numérotées sur deux chiffres dans un carré silo, liens en silo soulignés, gras en texte principal. Pour un article : titres h2 à h4 avec ancres (le sommaire s’y accroche), citation avec barre or et attribution, image légendée, tableau éditorial à en-tête nuit qui défile quand il est étroit, filet. Deux tailles : « body » pour l’encart texte et les onglets, « prose » pour les articles. Les blocs insérés dans le texte sont rendus par le site.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Taille « body » : paragraphes, gras, lien, listes</Heading>
        <Grid columns={12} gap={6} className="page-grid">
          <GridSpan columns={6}>
            <RichText content={LOREM_DOC} />
          </GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Taille « prose » (article, 760 px) : titres, citation, tableau</Heading>
        <VStack style={{maxWidth: 760}}>
          <RichText content={PROSE_DOC} size="prose" />
        </VStack>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit</Heading>
        <Section background="night" spacing="sm">
          <Container>
            <VStack style={{maxWidth: 760}}>
              <RichText content={PROSE_DOC} size="prose" />
            </VStack>
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
