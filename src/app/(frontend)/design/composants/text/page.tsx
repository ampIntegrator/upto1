/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TextShowcase from '../../_showcases/TextShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Text — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Text" id="text" doc="text" category="Contenu">
        <TextShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="text" />
    </VStack>
  );
}
