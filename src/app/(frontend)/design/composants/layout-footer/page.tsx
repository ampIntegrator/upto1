/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import LayoutFooterShowcase from '../../_showcases/LayoutFooterShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Layout Footer — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="LayoutFooter" id="layout-footer" doc="layout" parent="Layout" category="Mise en page">
        <LayoutFooterShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="layout-footer" />
    </VStack>
  );
}
