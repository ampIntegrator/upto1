/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ToggleButtonGroupShowcase from '../../../_showcases/ToggleButtonGroupShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Toggle Button Group — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ToggleButtonGroup" id="toggle-button-group" doc="toggle-button-group" category="Actions">
        <ToggleButtonGroupShowcase />
      </ShowcaseBlock>
      <ComponentNav category="actions" current="toggle-button-group" />
    </VStack>
  );
}
