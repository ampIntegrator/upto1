/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import DateInputShowcase from '../../_showcases/DateInputShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Date Input — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="DateInput" id="date-input" doc="date-input" dressed category="Formulaires">
        <DateInputShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="date-input" />
    </VStack>
  );
}
