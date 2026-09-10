/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import StepperShowcase from '../../_showcases/StepperShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Stepper — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Stepper" id="stepper" doc={"stepper"} category="Navigation">
        <StepperShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="stepper" />
    </VStack>
  );
}
