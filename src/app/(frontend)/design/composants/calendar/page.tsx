/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CalendarShowcase from '../../_showcases/CalendarShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Calendar — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Calendar" id="calendar" doc="calendar" category="Formulaires">
        <CalendarShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="calendar" />
    </VStack>
  );
}
