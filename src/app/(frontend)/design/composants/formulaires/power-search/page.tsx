/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import PowerSearchShowcase from '../../../_showcases/PowerSearchShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Power Search — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="PowerSearch" id="power-search" doc="power-search" dressed category="Formulaires">
        <PowerSearchShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="power-search" />
    </VStack>
  );
}
