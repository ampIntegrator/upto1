/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ProgressBarShowcase from '../../_showcases/ProgressBarShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Progress Bar — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ProgressBar" id="progress-bar" doc={"progress-bar"} category="Retours & statuts">
        <ProgressBarShowcase />
      </ShowcaseBlock>
      <ComponentNav category="retours" current="progress-bar" />
    </VStack>
  );
}
