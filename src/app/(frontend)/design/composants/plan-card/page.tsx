/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import PlanCardShowcase from '../../_showcases/PlanCardShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Plan Card — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="PlanCard" id="plan-card" doc={null} dressed category="Conteneurs">
        <PlanCardShowcase />
      </ShowcaseBlock>
      <ComponentNav category="conteneurs" current="plan-card" />
    </VStack>
  );
}
