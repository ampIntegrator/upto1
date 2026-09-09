/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import LayoutShowcase from '../../_showcases/LayoutShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Layout — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Layout" id="layout" doc="layout" category="Mise en page">
        <LayoutShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="layout" />
    </VStack>
  );
}
