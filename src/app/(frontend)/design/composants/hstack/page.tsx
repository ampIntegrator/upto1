/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import HStackShowcase from '../../_showcases/HStackShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'HStack — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="HStack" id="hstack" doc={"stack"} parent="Stack" category="Mise en page">
        <HStackShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="hstack" />
    </VStack>
  );
}
