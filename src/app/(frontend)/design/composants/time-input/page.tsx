/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TimeInputShowcase from '../../_showcases/TimeInputShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Time Input — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TimeInput" id="time-input" doc={"time-input"} dressed category="Formulaires">
        <TimeInputShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="time-input" />
    </VStack>
  );
}
