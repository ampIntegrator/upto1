/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TopNavShowcase from '../../_showcases/TopNavShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Top Nav — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TopNav" id="top-nav" doc={"top-nav"} category="Navigation">
        <TopNavShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="top-nav" />
    </VStack>
  );
}
