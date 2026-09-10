/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import GridSpanShowcase from '../../_showcases/GridSpanShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Grid Span — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="GridSpan" id="grid-span" doc={"grid"} parent="Grid" category="Mise en page">
        <GridSpanShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="grid-span" />
    </VStack>
  );
}
