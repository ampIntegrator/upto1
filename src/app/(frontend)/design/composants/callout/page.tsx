/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CalloutShowcase from '../../_showcases/CalloutShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Callout — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Callout" id="callout" doc={null} dressed category="Retours & statuts">
        <CalloutShowcase />
      </ShowcaseBlock>
      <ComponentNav category="retours" current="callout" />
    </VStack>
  );
}
