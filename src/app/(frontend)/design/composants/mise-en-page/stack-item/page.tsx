/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import StackItemShowcase from '../../../_showcases/StackItemShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Stack Item — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="StackItem" id="stack-item" doc="stack" parent="Stack" category="Mise en page">
        <StackItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="stack-item" />
    </VStack>
  );
}
