/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TopNavItemShowcase from '../../_showcases/TopNavItemShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Top Nav Item — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TopNavItem" id="top-nav-item" doc={"top-nav"} parent="TopNav" dressed category="Navigation">
        <TopNavItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="top-nav-item" />
    </VStack>
  );
}
