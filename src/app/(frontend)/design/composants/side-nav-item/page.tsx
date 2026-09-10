/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SideNavItemShowcase from '../../_showcases/SideNavItemShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Side Nav Item — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="SideNavItem" id="side-nav-item" doc={"side-nav"} parent="SideNav" category="Navigation">
        <SideNavItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="side-nav-item" />
    </VStack>
  );
}
