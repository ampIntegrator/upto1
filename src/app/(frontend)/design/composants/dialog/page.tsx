/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import DialogShowcase from '../../_showcases/DialogShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Dialog — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Dialog" id="dialog" doc={"dialog"} dressed category="Surcouches">
        <DialogShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="dialog" />
    </VStack>
  );
}
