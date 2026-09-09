/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ContextMenuItemShowcase from '../../../_showcases/ContextMenuItemShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Context Menu Item — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ContextMenuItem" id="context-menu-item" doc="context-menu" parent="ContextMenu" category="Surcouches">
        <ContextMenuItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="context-menu-item" />
    </VStack>
  );
}
