/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import HoverCardShowcase from '../../_showcases/HoverCardShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Hover Card — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="HoverCard" id="hover-card" doc={"hover-card"} category="Surcouches">
        <HoverCardShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="hover-card" />
    </VStack>
  );
}
