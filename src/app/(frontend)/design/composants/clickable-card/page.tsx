/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ClickableCardShowcase from '../../_showcases/ClickableCardShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Clickable Card — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ClickableCard" id="clickable-card" doc="clickable-card" dressed category="Conteneurs">
        <ClickableCardShowcase />
      </ShowcaseBlock>
      <ComponentNav category="conteneurs" current="clickable-card" />
    </VStack>
  );
}
