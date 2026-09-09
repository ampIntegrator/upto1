/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CheckboxInputShowcase from '../../_showcases/CheckboxInputShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Checkbox Input — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CheckboxInput" id="checkbox-input" doc="checkbox-input" dressed category="Formulaires">
        <CheckboxInputShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="checkbox-input" />
    </VStack>
  );
}
