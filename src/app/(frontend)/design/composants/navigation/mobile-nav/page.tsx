/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import MobileNavShowcase from '../../../_showcases/MobileNavShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Mobile Nav — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="MobileNav" id="mobile-nav" doc="mobile-nav" category="Navigation">
        <MobileNavShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="mobile-nav" />
    </VStack>
  );
}
