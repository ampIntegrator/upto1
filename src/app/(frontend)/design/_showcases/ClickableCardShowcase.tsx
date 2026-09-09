/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/OrbitaCard (avec cta) */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {BlocRows, EditorialRows, Night} from '../_ui/CardRows';

export default function ClickableCardShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        La carte cliquable : même châssis que Card, avec une barre d'action. La carte entière est un lien et son survol remplit la barre. Bloc : quatre médias au choix. Article et réalisation : image 16/10, métadonnées, titre sur deux lignes, sur trois colonnes.
      </Text>

      <BlocRows linked />
      <EditorialRows />

      <Night>
        <BlocRows linked seed="-n" />
        <EditorialRows seed="-n" />
      </Night>
    </VStack>
  );
}
