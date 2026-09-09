/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import VStackShowcase from '../../../_showcases/VStackShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'VStack — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="VStack" id="vstack" doc="stack" parent="Stack" category="Mise en page">
        <VStackShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="vstack" />
    </VStack>
  );
}
