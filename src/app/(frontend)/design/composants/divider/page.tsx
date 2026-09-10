/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import DividerShowcase from '../../_showcases/DividerShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Divider — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Divider" id="divider" doc={"divider"} category="Mise en page">
        <DividerShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="divider" />
    </VStack>
  );
}
