/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import IconButtonShowcase from '../../_showcases/IconButtonShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Icon Button — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="IconButton" id="icon-button" doc={"icon-button"} category="Actions">
        <IconButtonShowcase />
      </ShowcaseBlock>
      <ComponentNav category="actions" current="icon-button" />
    </VStack>
  );
}
