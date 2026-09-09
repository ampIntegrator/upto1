/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ThemeShowcase from '../../../_showcases/ThemeShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Theme — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Theme" id="theme" doc="theme" category="Utilitaires">
        <ThemeShowcase />
      </ShowcaseBlock>
      <ComponentNav category="utilitaires" current="theme" />
    </VStack>
  );
}
