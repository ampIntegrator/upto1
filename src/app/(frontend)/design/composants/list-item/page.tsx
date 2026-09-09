/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ListItemShowcase from '../../_showcases/ListItemShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'List Item — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ListItem" id="list-item" doc="list" parent="List" category="Tables & listes">
        <ListItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="tables-listes" current="list-item" />
    </VStack>
  );
}
