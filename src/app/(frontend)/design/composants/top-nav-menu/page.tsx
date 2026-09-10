/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TopNavMenuShowcase from '../../_showcases/TopNavMenuShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Top Nav Menu — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TopNavMenu" id="top-nav-menu" doc={"top-nav"} parent="TopNav" dressed category="Navigation">
        <TopNavMenuShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="top-nav-menu" />
    </VStack>
  );
}
