import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {PageIntro} from '../../../_ui/PageIntro';
import {HighlightCompare} from './HighlightCompare';

export const metadata = {title: 'Comparatif highlight — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro
        eyebrow="Fondations · Couleurs"
        title="Comparatif highlight"
        lead="Trace de l'harmonisation du 9 sept. 2026 : pour chaque silo, les valeurs de la maquette Orbita (avant) et celles en vigueur dans src/theme/silos/palettes.ts (après), en clair et en nuit, sur les éléments qui consomment highlight : signe des nombres, ornement, bouton high."
      />
      <HighlightCompare />
    </VStack>
  );
}
