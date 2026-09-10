/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import LayoutHeaderShowcase from '../../_showcases/LayoutHeaderShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Layout Header — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="LayoutHeader" id="layout-header" doc={"layout"} parent="Layout" category="Mise en page">
        <LayoutHeaderShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="layout-header" />
    </VStack>
  );
}
