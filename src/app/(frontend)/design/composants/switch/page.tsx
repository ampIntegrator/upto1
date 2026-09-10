/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SwitchShowcase from '../../_showcases/SwitchShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Switch — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Switch" id="switch" doc={"switch"} dressed category="Formulaires">
        <SwitchShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="switch" />
    </VStack>
  );
}
