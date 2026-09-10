/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TabListShowcase from '../../_showcases/TabListShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Tab List — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TabList" id="tab-list" doc={"tab-list"} dressed category="Navigation">
        <TabListShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="tab-list" />
    </VStack>
  );
}
