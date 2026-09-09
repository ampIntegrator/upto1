/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import BlockquoteShowcase from '../../../_showcases/BlockquoteShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Blockquote — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Blockquote" id="blockquote" doc="blockquote" category="Contenu">
        <BlockquoteShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="blockquote" />
    </VStack>
  );
}
