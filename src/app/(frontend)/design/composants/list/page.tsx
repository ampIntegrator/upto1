/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ListShowcase from '../../_showcases/ListShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'List — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="List" id="list" doc="list" category="Tables & listes">
        <ListShowcase />
      </ShowcaseBlock>
      <ComponentNav category="tables-listes" current="list" />
    </VStack>
  );
}
