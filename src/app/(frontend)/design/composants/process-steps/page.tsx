/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ProcessStepsShowcase from '../../_showcases/ProcessStepsShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Process Steps — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ProcessSteps" id="process-steps" doc={null} dressed category="Mise en page">
        <ProcessStepsShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="process-steps" />
    </VStack>
  );
}
