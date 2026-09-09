/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TextAreaShowcase from '../../_showcases/TextAreaShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Text Area — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TextArea" id="text-area" doc="text-area" dressed category="Formulaires">
        <TextAreaShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="text-area" />
    </VStack>
  );
}
