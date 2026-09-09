/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import DateRangeInputShowcase from '../../../_showcases/DateRangeInputShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Date Range Input — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="DateRangeInput" id="date-range-input" doc="date-range-input" dressed category="Formulaires">
        <DateRangeInputShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="date-range-input" />
    </VStack>
  );
}
