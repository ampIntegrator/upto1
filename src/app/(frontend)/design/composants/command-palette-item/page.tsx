/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CommandPaletteItemShowcase from '../../_showcases/CommandPaletteItemShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Command Palette Item — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CommandPaletteItem" id="command-palette-item" doc={"command-palette"} parent="CommandPalette" category="Surcouches">
        <CommandPaletteItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="command-palette-item" />
    </VStack>
  );
}
