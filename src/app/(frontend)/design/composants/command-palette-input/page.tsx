/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CommandPaletteInputShowcase from '../../_showcases/CommandPaletteInputShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Command Palette Input — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CommandPaletteInput" id="command-palette-input" doc={"command-palette"} parent="CommandPalette" category="Surcouches">
        <CommandPaletteInputShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="command-palette-input" />
    </VStack>
  );
}
