/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CommandPaletteListShowcase from '../../../_showcases/CommandPaletteListShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Command Palette List — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CommandPaletteList" id="command-palette-list" doc="command-palette" parent="CommandPalette" category="Surcouches">
        <CommandPaletteListShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="command-palette-list" />
    </VStack>
  );
}
