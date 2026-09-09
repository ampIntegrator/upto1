/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). Démos Astryx d'origine, ou habillées Orbita (badge). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';
import ThemeShowcase from '../../_showcases/ThemeShowcase';
import MediaThemeShowcase from '../../_showcases/MediaThemeShowcase';
import SyntaxThemeShowcase from '../../_showcases/SyntaxThemeShowcase';
import VisuallyHiddenShowcase from '../../_showcases/VisuallyHiddenShowcase';

export const metadata = {title: 'Utilitaires — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro eyebrow="Composants · 4" title="Utilitaires" lead="Thème, accessibilité et aides de rendu." />
      <ShowcaseBlock name="Theme" id="theme" doc="theme">
        <ThemeShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="MediaTheme" id="media-theme" doc="media-theme">
        <MediaThemeShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="SyntaxTheme" id="syntax-theme" doc="syntax-theme">
        <SyntaxThemeShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="VisuallyHidden" id="visually-hidden" doc="visually-hidden">
        <VisuallyHiddenShowcase />
      </ShowcaseBlock>
    </VStack>
  );
}
