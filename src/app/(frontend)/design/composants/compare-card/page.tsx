/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CompareCardShowcase from '../../_showcases/CompareCardShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Compare Card — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CompareCard" id="compare-card" doc={null} dressed category="Conteneurs">
        <CompareCardShowcase />
      </ShowcaseBlock>
      <ComponentNav category="conteneurs" current="compare-card" />
    </VStack>
  );
}
