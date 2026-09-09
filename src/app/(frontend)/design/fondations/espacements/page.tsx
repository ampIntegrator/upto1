import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';

export const metadata = {title: 'Espacements — Orbita × Astryx'};

const SPACING = ['0-5', '1', '1-5', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const SIZES = ['sm', 'md', 'lg'];

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro
        eyebrow="Fondations"
        title="Espacements"
        lead="Échelle Astryx sur grille de 4 px, de 2 px (0,5) à 48 px (12). Les composants la consomment via leurs props gap et padding ; Orbita utilisait les mêmes pas via Tailwind (px-5, py-16…)."
      />

      <VStack gap={3}>
        <Heading level={2}>Échelle --spacing-*</Heading>
        <Card padding={5}>
          <VStack gap={2}>
            {SPACING.map((s) => (
              <HStack key={s} gap={4} vAlign="center">
                <Text type="code" size="xsm" color="secondary" style={{width: 130}}>{`--spacing-${s}`}</Text>
                <VStack style={{width: `var(--spacing-${s})`, height: 20, background: 'var(--color-accent)'}} />
                <Text type="supporting">{`gap={${s.replace('-', '.')}}`}</Text>
              </HStack>
            ))}
          </VStack>
        </Card>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Hauteurs de contrôle --size-element-*</Heading>
        <Text type="supporting">Boutons, champs et sélecteurs partagent trois hauteurs (props size).</Text>
        <Card padding={5}>
          <HStack gap={6} vAlign="end" wrap="wrap">
            {SIZES.map((s) => (
              <VStack key={s} gap={2} hAlign="center">
                <VStack style={{width: 120, height: `var(--size-element-${s})`, background: 'var(--color-accent-muted)', border: '1px solid var(--color-accent)'}} />
                <Text type="code" size="xsm" color="secondary">{`--size-element-${s}`}</Text>
              </VStack>
            ))}
          </HStack>
        </Card>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Conteneur de page Orbita</Heading>
        <Text type="supporting">Rappel de la convention d'intégration : contenu 1280 px max, marges latérales 20 px en mobile et 32 px dès 640 px, sections 56/80 px ou 64/96 px. À porter via Layout contentWidth et Section padding lors de la reconstruction des blocs.</Text>
      </VStack>
    </VStack>
  );
}
