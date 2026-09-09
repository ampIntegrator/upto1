/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TooltipShowcase from '../../_showcases/TooltipShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Tooltip — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Tooltip" id="tooltip" doc="tooltip" category="Surcouches">
        <TooltipShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="tooltip" />
    </VStack>
  );
}
