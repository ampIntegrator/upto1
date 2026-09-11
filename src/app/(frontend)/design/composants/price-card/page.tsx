/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import PriceCardShowcase from '../../_showcases/PriceCardShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Price Card — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="PriceCard" id="price-card" doc={null} dressed category="Conteneurs">
        <PriceCardShowcase />
      </ShowcaseBlock>
      <ComponentNav category="conteneurs" current="price-card" />
    </VStack>
  );
}
