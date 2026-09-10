/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import FormLayoutShowcase from '../../_showcases/FormLayoutShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Form Layout — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="FormLayout" id="form-layout" doc={"form-layout"} dressed category="Formulaires">
        <FormLayoutShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="form-layout" />
    </VStack>
  );
}
