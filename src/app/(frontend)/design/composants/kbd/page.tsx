/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import KbdShowcase from '../../_showcases/KbdShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Kbd — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Kbd" id="kbd" doc={"kbd"} category="Contenu">
        <KbdShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="kbd" />
    </VStack>
  );
}
