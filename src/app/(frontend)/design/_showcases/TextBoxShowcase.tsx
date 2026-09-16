/* Design-system-specific component: src/components/TextBox (« Encart texte », a column of 3 to 9). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {Media} from '@/components/Media';
import {Section} from '@/components/Section';
import {TextBox} from '@/components/TextBox';
import {LOREM_DOC} from './textbox.shared';

const IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80';
const BADGES = [{label: 'Nouveau', tone: 'high' as const}, {label: 'Chiffrage', tone: 'line' as const}];
const BUTTONS = [{label: 'Commencer', href: '#', variant: 'primary' as const, arrow: true}, {label: 'En savoir plus', href: '#', variant: 'ghost' as const}];

export default function TextBoxShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        L'encart texte, de 3 à 9 colonnes : de haut en bas, un ou deux badges, un titre avec le séparateur animé toujours centré dessous, du texte riche (paragraphes, gras, liens, listes), un ou deux boutons. Avec un cadre comme les cartes ou sans fond ; contenu à gauche ou centré ; aligné en haut, au centre ou en bas de sa rangée. La balise du titre (h2 à h6, p, span) et sa taille sont indépendantes ; les deux tailles display demandent 6 colonnes au moins.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Cadré à gauche sur 6, centré sans fond sur 6</Heading>
        <Grid columns={12} gap={6} className="page-grid" align="stretch">
          <GridSpan columns={6}>
            <TextBox badges={BADGES} title="Le chiffrage juste, en 20 minutes" titleTag="h2" titleSize="display-3" content={LOREM_DOC} buttons={BUTTONS} framed />
          </GridSpan>
          <GridSpan columns={6}>
            <TextBox badges={[BADGES[0]]} title="Contenu centré" titleTag="h3" titleSize="heading-1" content={LOREM_DOC} buttons={[{label: 'Démarrer', href: '#', variant: 'high', size: 'lg'}]} center />
          </GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Sur 3 colonnes, titre heading-2 ; à côté d'une image, centré verticalement</Heading>
        <Grid columns={12} gap={6} className="page-grid" align="stretch">
          <GridSpan columns={3}>
            <TextBox title="Trois colonnes" titleTag="h4" titleSize="heading-2" content={LOREM_DOC} buttons={[{label: 'Voir', href: '#', variant: 'secondary'}]} framed />
          </GridSpan>
          <GridSpan columns={4} style={{alignSelf: 'stretch'}}>
            <Media image={{src: IMG, alt: ''}} minHeight={420} sizes="480px" />
          </GridSpan>
          <GridSpan columns={5} style={{alignSelf: 'stretch'}}>
            <TextBox badges={[BADGES[1]]} title="Aligné au centre de la rangée" titleTag="h2" titleSize="heading-1" content={LOREM_DOC} buttons={BUTTONS} vAlign="center" />
          </GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit, display-2 sur 9, cadré</Heading>
        <Section background="night-halo" spacing="sm">
          <Container>
            <Grid columns={12} gap={6} className="page-grid" align="start">
              <GridSpan columns={9}>
                <TextBox badges={BADGES} title="Sortez de l'attente" titleTag="h2" titleSize="display-2" content={LOREM_DOC} buttons={BUTTONS} framed center />
              </GridSpan>
            </Grid>
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
