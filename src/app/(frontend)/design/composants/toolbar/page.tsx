/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ToolbarShowcase from '../../_showcases/ToolbarShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Toolbar — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Toolbar" id="toolbar" doc={"toolbar"} category="Actions">
        <ToolbarShowcase />
      </ShowcaseBlock>
      <ComponentNav category="actions" current="toolbar" />
    </VStack>
  );
}
