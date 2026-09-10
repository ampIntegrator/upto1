/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import FieldShowcase from '../../_showcases/FieldShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Field — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Field" id="field" doc={"field"} category="Formulaires">
        <FieldShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="field" />
    </VStack>
  );
}
