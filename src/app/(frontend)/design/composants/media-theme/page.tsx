/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import MediaThemeShowcase from '../../_showcases/MediaThemeShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Media Theme — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="MediaTheme" id="media-theme" doc="media-theme" category="Utilitaires">
        <MediaThemeShowcase />
      </ShowcaseBlock>
      <ComponentNav category="utilitaires" current="media-theme" />
    </VStack>
  );
}
