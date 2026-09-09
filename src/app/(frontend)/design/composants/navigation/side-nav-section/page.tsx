/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SideNavSectionShowcase from '../../../_showcases/SideNavSectionShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Side Nav Section — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="SideNavSection" id="side-nav-section" doc="side-nav" parent="SideNav" category="Navigation">
        <SideNavSectionShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="side-nav-section" />
    </VStack>
  );
}
