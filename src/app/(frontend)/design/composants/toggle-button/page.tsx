/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ToggleButtonShowcase from '../../_showcases/ToggleButtonShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Toggle Button — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ToggleButton" id="toggle-button" doc={"toggle-button"} category="Actions">
        <ToggleButtonShowcase />
      </ShowcaseBlock>
      <ComponentNav category="actions" current="toggle-button" />
    </VStack>
  );
}
