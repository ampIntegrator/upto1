/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import RadioListShowcase from '../../_showcases/RadioListShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Radio List — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="RadioList" id="radio-list" doc={"radio-list"} dressed category="Formulaires">
        <RadioListShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="radio-list" />
    </VStack>
  );
}
