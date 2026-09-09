/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import OverlayShowcase from '../../../_showcases/OverlayShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Overlay — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Overlay" id="overlay" doc="overlay" category="Surcouches">
        <OverlayShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="overlay" />
    </VStack>
  );
}
