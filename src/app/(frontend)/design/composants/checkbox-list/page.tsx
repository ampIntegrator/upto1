/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CheckboxListShowcase from '../../_showcases/CheckboxListShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Checkbox List — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CheckboxList" id="checkbox-list" doc={"checkbox-list"} category="Formulaires">
        <CheckboxListShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="checkbox-list" />
    </VStack>
  );
}
