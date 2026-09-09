/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TokenShowcase from '../../_showcases/TokenShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Token — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Token" id="token" doc="token" category="Contenu">
        <TokenShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="token" />
    </VStack>
  );
}
