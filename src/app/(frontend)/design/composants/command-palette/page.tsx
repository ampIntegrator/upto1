/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CommandPaletteShowcase from '../../_showcases/CommandPaletteShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Command Palette — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CommandPalette" id="command-palette" doc={"command-palette"} category="Surcouches">
        <CommandPaletteShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="command-palette" />
    </VStack>
  );
}
