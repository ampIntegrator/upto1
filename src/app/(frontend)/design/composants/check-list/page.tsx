/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CheckListShowcase from '../../_showcases/CheckListShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Check List — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CheckList" id="check-list" doc={null} dressed category="Tables & listes">
        <CheckListShowcase />
      </ShowcaseBlock>
      <ComponentNav category="tables-listes" current="check-list" />
    </VStack>
  );
}
