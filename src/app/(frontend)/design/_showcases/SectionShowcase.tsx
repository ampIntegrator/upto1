/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/Section (+ Container) */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {OrbitaButton} from '@/components/OrbitaButton';
import {Section, type SectionBackground} from '@/components/Section';

const IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=70';
const VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

const MODES: Array<{bg: SectionBackground; label: string; note: string}> = [
  {bg: 'light', label: 'Clair', note: 'Fond de page, sans texture.'},
  {bg: 'grid', label: 'Texture grid', note: 'Filets 48 px (00-fondations §4).'},
  {bg: 'dots', label: 'Texture points', note: 'Points 32 px.'},
  {bg: 'losange', label: 'Texture losanges', note: 'Losanges 32 px.'},
  {bg: 'night', label: 'Nuit', note: 'Nuit du silo + lueur silo centrale, pas de texture ; contenu en mode nuit.'},
  {bg: 'image', label: 'Image', note: 'Image de fond, voile, halo derrière le contenu, liseré en pied ; contenu en mode nuit.'},
  {bg: 'video', label: 'Vidéo', note: 'Vidéo muette en boucle, mêmes couches que l\'image.'},
];

export default function SectionShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Le bloc pleine largeur qui empile les pages. Il porte l'arrière-plan et le padding vertical, rien d'autre : le contenu se place dans le Container (1440 px, marges de 20 px), puis dans la Grid de 12 colonnes. Sept arrière-plans, montrés ici en padding sm ; la page Fondations › Mise en page les assemble en pleine largeur.
      </Text>
      {MODES.map((m) => (
        <VStack key={m.bg} gap={3}>
          <Heading level={3}>{m.label}</Heading>
          <Text type="supporting">{m.note}</Text>
          <Section background={m.bg} spacing="sm" image={m.bg === 'image' ? {src: IMG} : undefined} video={m.bg === 'video' ? {src: VIDEO, poster: IMG} : undefined}>
            <Container>
              <Grid columns={12} gap={6} className="page-grid">
                <GridSpan style={{gridColumn: '4 / span 6'}}>
                  <VStack gap={3} align="center" style={{textAlign: 'center'}}>
                    <Text type="eyebrow">Section · {m.bg}</Text>
                    <Heading level={3} type="display-3">
                      Titre de section <Text type="serif">accentué.</Text>
                    </Heading>
                    <Text type="large" color="secondary">Colonne de six sur douze, centrée. Titre, texte et bouton du catalogue.</Text>
                    <OrbitaButton variant={m.bg === 'light' || m.bg === 'grid' || m.bg === 'dots' || m.bg === 'losange' ? 'primary' : 'ghost'} arrow label="Découvrir" />
                  </VStack>
                </GridSpan>
              </Grid>
            </Container>
          </Section>
        </VStack>
      ))}
    </VStack>
  );
}
