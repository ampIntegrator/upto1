/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import PriceListShowcase from '../../_showcases/PriceListShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Price List — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="PriceList" id="price-list" doc={null} dressed category="Contenu">
        <PriceListShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="price-list" />
    </VStack>
  );
}
