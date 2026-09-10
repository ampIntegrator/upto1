/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SideNavHeadingShowcase from '../../_showcases/SideNavHeadingShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Side Nav Heading — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="SideNavHeading" id="side-nav-heading" doc={"side-nav"} parent="SideNav" category="Navigation">
        <SideNavHeadingShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="side-nav-heading" />
    </VStack>
  );
}
