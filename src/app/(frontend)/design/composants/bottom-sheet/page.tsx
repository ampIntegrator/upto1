/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import BottomSheetShowcase from '../../_showcases/BottomSheetShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Bottom Sheet — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="BottomSheet" id="bottom-sheet" doc="bottom-sheet" category="Surcouches">
        <BottomSheetShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="bottom-sheet" />
    </VStack>
  );
}
