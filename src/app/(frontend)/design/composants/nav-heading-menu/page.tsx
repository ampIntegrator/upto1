/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import NavHeadingMenuShowcase from '../../_showcases/NavHeadingMenuShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Nav Heading Menu — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="NavHeadingMenu" id="nav-heading-menu" doc={"side-nav"} parent="SideNav" category="Navigation">
        <NavHeadingMenuShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="nav-heading-menu" />
    </VStack>
  );
}
