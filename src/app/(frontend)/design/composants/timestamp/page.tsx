/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TimestampShowcase from '../../_showcases/TimestampShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Timestamp — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Timestamp" id="timestamp" doc="timestamp" category="Contenu">
        <TimestampShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="timestamp" />
    </VStack>
  );
}
