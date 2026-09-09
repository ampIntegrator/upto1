/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import DateTimeInputShowcase from '../../_showcases/DateTimeInputShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Date Time Input — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="DateTimeInput" id="date-time-input" doc="date-time-input" dressed category="Formulaires">
        <DateTimeInputShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="date-time-input" />
    </VStack>
  );
}
