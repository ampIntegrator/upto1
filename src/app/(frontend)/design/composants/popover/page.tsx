/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import PopoverShowcase from '../../_showcases/PopoverShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Popover — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Popover" id="popover" doc={"popover"} category="Surcouches">
        <PopoverShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="popover" />
    </VStack>
  );
}
