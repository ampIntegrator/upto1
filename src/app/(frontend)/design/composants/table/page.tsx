/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TableShowcase from '../../_showcases/TableShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Table — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Table" id="table" doc={"table"} category="Tables & listes">
        <TableShowcase />
      </ShowcaseBlock>
      <ComponentNav category="tables-listes" current="table" />
    </VStack>
  );
}
