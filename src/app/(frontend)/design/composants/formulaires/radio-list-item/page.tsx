/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import RadioListItemShowcase from '../../../_showcases/RadioListItemShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Radio List Item — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="RadioListItem" id="radio-list-item" doc="radio-list" parent="RadioList" category="Formulaires">
        <RadioListItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="radio-list-item" />
    </VStack>
  );
}
