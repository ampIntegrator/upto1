/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import FieldStatusShowcase from '../../_showcases/FieldStatusShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Field Status — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="FieldStatus" id="field-status" doc={"field"} parent="Field" category="Formulaires">
        <FieldStatusShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="field-status" />
    </VStack>
  );
}
