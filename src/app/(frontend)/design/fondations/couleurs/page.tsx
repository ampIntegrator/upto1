import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';
import {SwatchGroup} from '../../_ui/TokenSwatch';

export const metadata = {title: 'Couleurs — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro
        eyebrow="Fondations"
        title="Couleurs"
        lead="Chaque silo redéfinit l'accent, ses fonds teintés, le highlight et la nuit. Les neutres (encre, filets, papier) et l'or éditorial sont partagés par tous les silos. Changez de silo ou passez en mode nuit pour voir les tokens se résoudre."
      />
      <SwatchGroup
        title="Accent (primaire du silo)"
        note="Généré par Astryx depuis la couleur primaire Orbita : nuances, muted, on-accent."
        tokens={['--color-accent', '--color-accent-deep', '--color-accent-muted', '--color-on-accent', '--color-text-accent', '--color-icon-accent']}
      />
      <SwatchGroup
        title="Signature Orbita"
        note="Tokens ajoutés hors nomenclature Astryx : highlight (signal du silo), or éditorial, fond nuit."
        tokens={['--color-highlight', '--color-highlight-deep', '--color-highlight-muted', '--color-editorial', '--color-editorial-deep', '--color-night']}
      />
      <SwatchGroup
        title="Surfaces"
        note="Hiérarchie body → surface → card → popover. En mode nuit : fond nuit du silo, cartes plus sombres, popovers plus clairs."
        tokens={['--color-background-body', '--color-background-surface', '--color-background-card', '--color-background-popover', '--color-background-muted', '--color-background-inverted']}
      />
      <SwatchGroup
        title="Texte & icônes"
        tokens={['--color-text-primary', '--color-text-secondary', '--color-text-disabled', '--color-icon-primary', '--color-icon-secondary', '--color-icon-disabled']}
      />
      <SwatchGroup
        title="Filets & pistes"
        tokens={['--color-border', '--color-border-emphasized', '--color-track', '--color-skeleton', '--color-overlay', '--color-shadow']}
      />
      <SwatchGroup
        title="États"
        note="Danger et succès Orbita ; l'avertissement reprend l'or éditorial."
        tokens={['--color-error', '--color-error-muted', '--color-success', '--color-success-muted', '--color-warning', '--color-warning-muted']}
      />
      <SwatchGroup
        title="Catégorielles (Badge, Card, Token)"
        note="Palette de catégorisation Astryx, non teintée par le silo. À harmoniser plus tard si le site en a besoin."
        tokens={['--color-background-blue', '--color-background-cyan', '--color-background-green', '--color-background-orange', '--color-background-pink', '--color-background-purple', '--color-background-red', '--color-background-teal', '--color-background-yellow', '--color-background-gray']}
      />
    </VStack>
  );
}
