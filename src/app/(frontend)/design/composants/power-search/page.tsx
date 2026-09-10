/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import PowerSearchShowcase from '../../_showcases/PowerSearchShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Power Search — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="PowerSearch" id="power-search" doc={"power-search"} dressed category="Formulaires">
        <PowerSearchShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="power-search" />
    </VStack>
  );
}
