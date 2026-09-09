/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import LayoutContentShowcase from '../../../_showcases/LayoutContentShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Layout Content — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="LayoutContent" id="layout-content" doc="layout" parent="Layout" category="Mise en page">
        <LayoutContentShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="layout-content" />
    </VStack>
  );
}
