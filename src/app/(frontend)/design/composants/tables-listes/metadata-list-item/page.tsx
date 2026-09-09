/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import MetadataListItemShowcase from '../../../_showcases/MetadataListItemShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Metadata List Item — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="MetadataListItem" id="metadata-list-item" doc="metadata-list" parent="MetadataList" category="Tables & listes">
        <MetadataListItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="tables-listes" current="metadata-list-item" />
    </VStack>
  );
}
