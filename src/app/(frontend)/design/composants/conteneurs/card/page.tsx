/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CardShowcase from '../../../_showcases/CardShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Card — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Card" id="card" doc="card" category="Conteneurs">
        <CardShowcase />
      </ShowcaseBlock>
      <ComponentNav category="conteneurs" current="card" />
    </VStack>
  );
}
