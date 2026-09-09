/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import MetadataListShowcase from '../../_showcases/MetadataListShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Metadata List — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="MetadataList" id="metadata-list" doc="metadata-list" category="Tables & listes">
        <MetadataListShowcase />
      </ShowcaseBlock>
      <ComponentNav category="tables-listes" current="metadata-list" />
    </VStack>
  );
}
