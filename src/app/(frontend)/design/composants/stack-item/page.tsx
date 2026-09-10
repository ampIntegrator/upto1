/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import StackItemShowcase from '../../_showcases/StackItemShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Stack Item — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="StackItem" id="stack-item" doc={"stack"} parent="Stack" category="Mise en page">
        <StackItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="stack-item" />
    </VStack>
  );
}
