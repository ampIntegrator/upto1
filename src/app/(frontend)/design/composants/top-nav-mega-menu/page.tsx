/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TopNavMegaMenuShowcase from '../../_showcases/TopNavMegaMenuShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Top Nav Mega Menu — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TopNavMegaMenu" id="top-nav-mega-menu" doc={"top-nav"} parent="TopNav" category="Navigation">
        <TopNavMegaMenuShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="top-nav-mega-menu" />
    </VStack>
  );
}
