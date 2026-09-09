/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ResizableShowcase from '../../../_showcases/ResizableShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Resizable — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Resizable" id="resizable" doc="resizable" category="Mise en page">
        <ResizableShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="resizable" />
    </VStack>
  );
}
