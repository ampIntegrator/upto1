/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SegmentedControlShowcase from '../../_showcases/SegmentedControlShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Segmented Control — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="SegmentedControl" id="segmented-control" doc={"segmented-control"} category="Actions">
        <SegmentedControlShowcase />
      </ShowcaseBlock>
      <ComponentNav category="actions" current="segmented-control" />
    </VStack>
  );
}
