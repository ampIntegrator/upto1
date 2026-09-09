/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import StatusDotShowcase from '../../_showcases/StatusDotShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Status Dot — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="StatusDot" id="status-dot" doc="status-dot" category="Retours & statuts">
        <StatusDotShowcase />
      </ShowcaseBlock>
      <ComponentNav category="retours" current="status-dot" />
    </VStack>
  );
}
