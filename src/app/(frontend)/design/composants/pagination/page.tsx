/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import PaginationShowcase from '../../_showcases/PaginationShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Pagination — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Pagination" id="pagination" doc={"pagination"} category="Navigation">
        <PaginationShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="pagination" />
    </VStack>
  );
}
