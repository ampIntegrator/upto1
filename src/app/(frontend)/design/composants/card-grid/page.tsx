/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CardGridShowcase from '../../_showcases/CardGridShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Card Grid — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CardGrid" id="card-grid" doc={null} dressed category="Conteneurs">
        <CardGridShowcase />
      </ShowcaseBlock>
      <ComponentNav category="conteneurs" current="card-grid" />
    </VStack>
  );
}
