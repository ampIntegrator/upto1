/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import DropdownMenuItemShowcase from '../../../_showcases/DropdownMenuItemShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Dropdown Menu Item — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="DropdownMenuItem" id="dropdown-menu-item" doc="dropdown-menu" parent="DropdownMenu" category="Actions">
        <DropdownMenuItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="actions" current="dropdown-menu-item" />
    </VStack>
  );
}
