/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import OverflowListShowcase from '../../_showcases/OverflowListShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Overflow List — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="OverflowList" id="overflow-list" doc="overflow-list" category="Tables & listes">
        <OverflowListShowcase />
      </ShowcaseBlock>
      <ComponentNav category="tables-listes" current="overflow-list" />
    </VStack>
  );
}
