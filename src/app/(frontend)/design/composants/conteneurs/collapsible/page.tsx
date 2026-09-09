/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CollapsibleShowcase from '../../../_showcases/CollapsibleShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Collapsible — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Collapsible" id="collapsible" doc="collapsible" category="Conteneurs">
        <CollapsibleShowcase />
      </ShowcaseBlock>
      <ComponentNav category="conteneurs" current="collapsible" />
    </VStack>
  );
}
