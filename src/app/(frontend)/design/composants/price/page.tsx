/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import PriceShowcase from '../../_showcases/PriceShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Price — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Price" id="price" doc={null} dressed category="Contenu">
        <PriceShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="price" />
    </VStack>
  );
}
