/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CollapsibleGroupShowcase from '../../_showcases/CollapsibleGroupShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Collapsible Group — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CollapsibleGroup" id="collapsible-group" doc={"collapsible"} parent="Collapsible" dressed category="Conteneurs">
        <CollapsibleGroupShowcase />
      </ShowcaseBlock>
      <ComponentNav category="conteneurs" current="collapsible-group" />
    </VStack>
  );
}
