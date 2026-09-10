/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import HeadingShowcase from '../../_showcases/HeadingShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Heading — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Heading" id="heading" doc={"heading"} category="Contenu">
        <HeadingShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="heading" />
    </VStack>
  );
}
