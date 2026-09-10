/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SkeletonShowcase from '../../_showcases/SkeletonShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Skeleton — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Skeleton" id="skeleton" doc={"skeleton"} category="Retours & statuts">
        <SkeletonShowcase />
      </ShowcaseBlock>
      <ComponentNav category="retours" current="skeleton" />
    </VStack>
  );
}
