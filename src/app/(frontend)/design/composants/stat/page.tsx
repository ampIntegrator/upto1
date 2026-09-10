/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import StatShowcase from '../../_showcases/StatShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Stat — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Stat" id="stat" doc={null} dressed category="Contenu">
        <StatShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="stat" />
    </VStack>
  );
}
