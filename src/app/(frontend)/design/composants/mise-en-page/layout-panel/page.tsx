/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import LayoutPanelShowcase from '../../../_showcases/LayoutPanelShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Layout Panel — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="LayoutPanel" id="layout-panel" doc="layout" parent="Layout" category="Mise en page">
        <LayoutPanelShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="layout-panel" />
    </VStack>
  );
}
