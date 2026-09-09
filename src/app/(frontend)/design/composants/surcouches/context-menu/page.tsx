/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ContextMenuShowcase from '../../../_showcases/ContextMenuShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Context Menu — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ContextMenu" id="context-menu" doc="context-menu" category="Surcouches">
        <ContextMenuShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="context-menu" />
    </VStack>
  );
}
