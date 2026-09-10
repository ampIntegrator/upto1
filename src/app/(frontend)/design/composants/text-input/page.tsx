/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TextInputShowcase from '../../_showcases/TextInputShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Text Input — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TextInput" id="text-input" doc={"text-input"} dressed category="Formulaires">
        <TextInputShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="text-input" />
    </VStack>
  );
}
