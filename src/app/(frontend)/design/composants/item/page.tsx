/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ItemShowcase from '../../_showcases/ItemShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Item — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Item" id="item" doc={"item"} category="Tables & listes">
        <ItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="tables-listes" current="item" />
    </VStack>
  );
}
