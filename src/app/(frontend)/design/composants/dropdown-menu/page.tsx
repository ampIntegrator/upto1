/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import DropdownMenuShowcase from '../../_showcases/DropdownMenuShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Dropdown Menu — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="DropdownMenu" id="dropdown-menu" doc="dropdown-menu" category="Actions">
        <DropdownMenuShowcase />
      </ShowcaseBlock>
      <ComponentNav category="actions" current="dropdown-menu" />
    </VStack>
  );
}
