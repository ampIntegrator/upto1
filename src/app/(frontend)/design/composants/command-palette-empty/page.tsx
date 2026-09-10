/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CommandPaletteEmptyShowcase from '../../_showcases/CommandPaletteEmptyShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Command Palette Empty — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CommandPaletteEmpty" id="command-palette-empty" doc={"command-palette"} parent="CommandPalette" category="Surcouches">
        <CommandPaletteEmptyShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="command-palette-empty" />
    </VStack>
  );
}
