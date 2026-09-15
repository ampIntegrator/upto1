/* Composant propre au design system : src/components/Media (image qui remplit sa colonne). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Card} from '@/components/Card';
import {Media} from '@/components/Media';

const IMG = {src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80', alt: 'Charpentier sur un chantier'};
const IMG_2 = {src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80', alt: 'Plans et maquette de bâtiment'};
const HALF = '(max-width: 767px) 100vw, (max-width: 1440px) 50vw, 720px';
const THIRD = '(max-width: 767px) 100vw, (max-width: 1440px) 33vw, 480px';

export default function MediaShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Une image qui remplit tout l'espace de sa colonne, recadrée au centre, angles droits. Seule dans sa rangée, elle prend sa hauteur minimale ; à côté d'autres contenus, elle prend la hauteur de la rangée, même si sa hauteur minimale est plus grande. Sous 768 px, colonnes empilées, c'est la hauteur minimale mobile qui s'applique. Calque noir optionnel, opacité réglable. Image optimisée par Next.js : taille adaptée à l'écran et chargement différé.
      </Text>

      <VStack gap={3}>
        <Heading level={3}>Seule dans sa rangée : hauteur minimale</Heading>
        <Text type="body" color="secondary">À gauche, 320 px sur desktop et 240 px sur mobile ; à droite, 480 px et 320 px. Dans une même rangée, la plus grande hauteur minimale l'emporte : sur desktop, les deux images font 480 px. Sur mobile, chacune garde la sienne.</Text>
        <Grid columns={12} gap={8} className="page-grid">
          <GridSpan columns={6}><Media image={IMG} minHeight={320} minHeightMobile={240} sizes={HALF} /></GridSpan>
          <GridSpan columns={6}><Media image={IMG_2} minHeight={480} minHeightMobile={320} sizes={HALF} /></GridSpan>
        </Grid>
      </VStack>

      <VStack gap={3}>
        <Heading level={3}>À côté d'une carte : la rangée donne la hauteur</Heading>
        <Text type="body" color="secondary">Sans hauteur minimale desktop, l'image prend la hauteur de la carte voisine. Sur mobile, elle garde 240 px.</Text>
        <Grid columns={12} gap={8} className="page-grid" align="stretch">
          <GridSpan columns={6}><Media image={IMG} minHeightMobile={240} sizes={HALF} /></GridSpan>
          <GridSpan columns={6}>
            <Card media={{type: 'icon', iconKey: 'calculator'}} title="Chiffrage détaillé" text="Chaque poste chiffré, du gros œuvre aux finitions, avec les quantités et les prix unitaires." />
          </GridSpan>
        </Grid>
      </VStack>

      <VStack gap={3}>
        <Heading level={3}>Calque noir</Heading>
        <Text type="body" color="secondary">Opacité 0, 0,3 et 0,6.</Text>
        <Grid columns={12} gap={8} className="page-grid">
          <GridSpan columns={4}><Media image={IMG_2} minHeight={240} sizes={THIRD} /></GridSpan>
          <GridSpan columns={4}><Media image={IMG_2} minHeight={240} overlay={0.3} sizes={THIRD} /></GridSpan>
          <GridSpan columns={4}><Media image={IMG_2} minHeight={240} overlay={0.6} sizes={THIRD} /></GridSpan>
        </Grid>
      </VStack>
    </VStack>
  );
}
