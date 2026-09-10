/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SelectShowcase from '../../_showcases/SelectShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Select — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Select" id="select" doc={"selector"} dressed category="Formulaires">
        <SelectShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="select" />
    </VStack>
  );
}
