/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TabShowcase from '../../_showcases/TabShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Tab — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Tab" id="tab" doc="tab-list" parent="TabList" category="Navigation">
        <TabShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="tab" />
    </VStack>
  );
}
