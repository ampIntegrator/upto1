/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import InputGroupShowcase from '../../_showcases/InputGroupShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Input Group — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="InputGroup" id="input-group" doc={"input-group"} dressed category="Formulaires">
        <InputGroupShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="input-group" />
    </VStack>
  );
}
