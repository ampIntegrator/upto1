import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {PageIntro} from '../../../_ui/PageIntro';
import {HighlightCompare} from './HighlightCompare';

export const metadata = {title: 'Comparatif highlight — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro
        eyebrow="Fondations · Couleurs"
        title="Comparatif highlight"
        lead="Page de travail : pour chaque silo, les valeurs actuelles de highlight / highlight-deep (avant) et la proposition (après), en clair et en nuit, sur les éléments qui les consomment : signe des nombres, ornement, bouton high. Les valeurs retenues iront dans src/theme/silos/palettes.ts."
      />
      <HighlightCompare />
    </VStack>
  );
}
