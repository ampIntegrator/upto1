/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import BlockquoteShowcase from '../../_showcases/BlockquoteShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Blockquote — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Blockquote" id="blockquote" doc={"blockquote"} category="Contenu">
        <BlockquoteShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="blockquote" />
    </VStack>
  );
}
