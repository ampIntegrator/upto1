/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SideNavCollapseButtonShowcase from '../../../_showcases/SideNavCollapseButtonShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Side Nav Collapse Button — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="SideNavCollapseButton" id="side-nav-collapse-button" doc="side-nav" parent="SideNav" category="Navigation">
        <SideNavCollapseButtonShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="side-nav-collapse-button" />
    </VStack>
  );
}
