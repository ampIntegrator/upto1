/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SelectableCardShowcase from '../../../_showcases/SelectableCardShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Selectable Card — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="SelectableCard" id="selectable-card" doc="selectable-card" category="Conteneurs">
        <SelectableCardShowcase />
      </ShowcaseBlock>
      <ComponentNav category="conteneurs" current="selectable-card" />
    </VStack>
  );
}
