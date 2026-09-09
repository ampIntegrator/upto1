/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SideNavShowcase from '../../_showcases/SideNavShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Side Nav — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="SideNav" id="side-nav" doc="side-nav" category="Navigation">
        <SideNavShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="side-nav" />
    </VStack>
  );
}
