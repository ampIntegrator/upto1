/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TopNavHeadingShowcase from '../../_showcases/TopNavHeadingShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Top Nav Heading — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TopNavHeading" id="top-nav-heading" doc={"top-nav"} parent="TopNav" dressed category="Navigation">
        <TopNavHeadingShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="top-nav-heading" />
    </VStack>
  );
}
