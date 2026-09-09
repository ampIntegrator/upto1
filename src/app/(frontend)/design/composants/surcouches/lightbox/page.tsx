/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import LightboxShowcase from '../../../_showcases/LightboxShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Lightbox — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Lightbox" id="lightbox" doc="lightbox" category="Surcouches">
        <LightboxShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="lightbox" />
    </VStack>
  );
}
