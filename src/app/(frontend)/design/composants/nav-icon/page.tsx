/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import NavIconShowcase from '../../_showcases/NavIconShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Nav Icon — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="NavIcon" id="nav-icon" doc={"nav-icon"} category="Navigation">
        <NavIconShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="nav-icon" />
    </VStack>
  );
}
