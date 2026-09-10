/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CommandPaletteGroupShowcase from '../../_showcases/CommandPaletteGroupShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Command Palette Group — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CommandPaletteGroup" id="command-palette-group" doc={"command-palette"} parent="CommandPalette" category="Surcouches">
        <CommandPaletteGroupShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="command-palette-group" />
    </VStack>
  );
}
