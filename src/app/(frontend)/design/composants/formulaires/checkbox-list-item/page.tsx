/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CheckboxListItemShowcase from '../../../_showcases/CheckboxListItemShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Checkbox List Item — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CheckboxListItem" id="checkbox-list-item" doc="checkbox-list" parent="CheckboxList" category="Formulaires">
        <CheckboxListItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="checkbox-list-item" />
    </VStack>
  );
}
