/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CitationShowcase from '../../_showcases/CitationShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Citation — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Citation" id="citation" doc="citation" category="Contenu">
        <CitationShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="citation" />
    </VStack>
  );
}
