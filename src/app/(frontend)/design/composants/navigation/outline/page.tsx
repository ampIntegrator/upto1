/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import OutlineShowcase from '../../../_showcases/OutlineShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Outline — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Outline" id="outline" doc="outline" category="Navigation">
        <OutlineShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="outline" />
    </VStack>
  );
}
