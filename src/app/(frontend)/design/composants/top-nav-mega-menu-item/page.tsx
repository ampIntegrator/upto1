/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TopNavMegaMenuItemShowcase from '../../_showcases/TopNavMegaMenuItemShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Top Nav Mega Menu Item — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TopNavMegaMenuItem" id="top-nav-mega-menu-item" doc={"top-nav-mega-menu"} parent="TopNavMegaMenu" category="Navigation">
        <TopNavMegaMenuItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="top-nav-mega-menu-item" />
    </VStack>
  );
}
