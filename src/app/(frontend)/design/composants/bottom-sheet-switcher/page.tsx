/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import BottomSheetSwitcherShowcase from '../../_showcases/BottomSheetSwitcherShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Bottom Sheet Switcher — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="BottomSheetSwitcher" id="bottom-sheet-switcher" doc={"bottom-sheet-switcher"} category="Surcouches">
        <BottomSheetSwitcherShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="bottom-sheet-switcher" />
    </VStack>
  );
}
