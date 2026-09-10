/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TabMenuShowcase from '../../_showcases/TabMenuShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Tab Menu — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TabMenu" id="tab-menu" doc="tab-list" parent="TabList" dressed category="Navigation">
        <TabMenuShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="tab-menu" />
    </VStack>
  );
}
