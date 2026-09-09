/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import NumberInputShowcase from '../../../_showcases/NumberInputShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Number Input — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="NumberInput" id="number-input" doc="number-input" dressed category="Formulaires">
        <NumberInputShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="number-input" />
    </VStack>
  );
}
