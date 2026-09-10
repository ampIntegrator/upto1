/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import AspectRatioShowcase from '../../_showcases/AspectRatioShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Aspect Ratio — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="AspectRatio" id="aspect-ratio" doc={"aspect-ratio"} category="Mise en page">
        <AspectRatioShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="aspect-ratio" />
    </VStack>
  );
}
