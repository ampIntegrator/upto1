/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TreeListShowcase from '../../_showcases/TreeListShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Tree List — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TreeList" id="tree-list" doc={"tree-list"} category="Tables & listes">
        <TreeListShowcase />
      </ShowcaseBlock>
      <ComponentNav category="tables-listes" current="tree-list" />
    </VStack>
  );
}
