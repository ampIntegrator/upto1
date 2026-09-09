/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import FieldLabelShowcase from '../../../_showcases/FieldLabelShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Field Label — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="FieldLabel" id="field-label" doc="field" parent="Field" category="Formulaires">
        <FieldLabelShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="field-label" />
    </VStack>
  );
}
