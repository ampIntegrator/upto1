/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SegmentedControlItemShowcase from '../../_showcases/SegmentedControlItemShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Segmented Control Item — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="SegmentedControlItem" id="segmented-control-item" doc={"segmented-control"} parent="SegmentedControl" category="Actions">
        <SegmentedControlItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="actions" current="segmented-control-item" />
    </VStack>
  );
}
