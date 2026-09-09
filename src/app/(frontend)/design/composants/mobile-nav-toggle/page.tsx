/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import MobileNavToggleShowcase from '../../_showcases/MobileNavToggleShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Mobile Nav Toggle — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="MobileNavToggle" id="mobile-nav-toggle" doc="mobile-nav" parent="MobileNav" category="Navigation">
        <MobileNavToggleShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="mobile-nav-toggle" />
    </VStack>
  );
}
