/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import GridShowcase from '../../_showcases/GridShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Grid — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Grid" id="grid" doc={"grid"} category="Mise en page">
        <GridShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="grid" />
    </VStack>
  );
}
