/* Composant propre au design system : src/components/MediaQuote (image avec phrase centrée). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {MediaQuote} from '@/components/MediaQuote';

const IMG = {src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80', alt: ''};
const IMG_2 = {src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80', alt: ''};
const FULL = '(max-width: 767px) 100vw, (max-width: 1440px) 100vw, 1440px';
const HALF = '(max-width: 767px) 100vw, (max-width: 1440px) 50vw, 720px';
const PHRASE = 'Le chiffrage juste, dès la première visite.';

export default function MediaQuoteShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Une image qui remplit sa colonne, avec une phrase centrée en X et en Y. Au moins 6 colonnes sur 12. La balise (h2 à h6, p ou span) sert la sémantique ; la taille est un choix visuel indépendant, pris dans l'échelle du thème. Texte clair via MediaTheme ; le calque noir règle la lisibilité selon l'image. Hauteurs minimales et comportement de hauteur : ceux de Media.
      </Text>

      <VStack gap={3}>
        <Heading level={3}>Pleine largeur</Heading>
        <Text type="body" color="secondary">Balise h2, taille display-1, calque 0,45, 480 px sur desktop et 320 px sur mobile.</Text>
        <MediaQuote image={IMG} text={PHRASE} tag="h2" size="display-1" overlay={0.45} minHeight={480} minHeightMobile={320} sizes={FULL} />
      </VStack>

      <VStack gap={3}>
        <Heading level={3}>Toutes les tailles</Heading>
        <Text type="body" color="secondary">Même phrase, calque 0,5 : display-2 en h3, display-3 (défaut) en h4, heading-1 en p, heading-2 en span.</Text>
        <Grid columns={12} gap={8} className="page-grid">
          <GridSpan columns={6}><MediaQuote image={IMG_2} text={PHRASE} tag="h3" size="display-2" overlay={0.5} minHeight={320} minHeightMobile={240} sizes={HALF} /></GridSpan>
          <GridSpan columns={6}><MediaQuote image={IMG} text={PHRASE} tag="h4" size="display-3" overlay={0.5} minHeight={320} minHeightMobile={240} sizes={HALF} /></GridSpan>
          <GridSpan columns={6}><MediaQuote image={IMG} text={PHRASE} tag="p" size="heading-1" overlay={0.5} minHeight={320} minHeightMobile={240} sizes={HALF} /></GridSpan>
          <GridSpan columns={6}><MediaQuote image={IMG_2} text={PHRASE} tag="span" size="heading-2" overlay={0.5} minHeight={320} minHeightMobile={240} sizes={HALF} /></GridSpan>
        </Grid>
      </VStack>
    </VStack>
  );
}
