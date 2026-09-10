/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CommandPaletteFooterShowcase from '../../_showcases/CommandPaletteFooterShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Command Palette Footer — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CommandPaletteFooter" id="command-palette-footer" doc={"command-palette"} parent="CommandPalette" category="Surcouches">
        <CommandPaletteFooterShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="command-palette-footer" />
    </VStack>
  );
}
