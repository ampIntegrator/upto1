/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CenterShowcase from '../../_showcases/CenterShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Center — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Center" id="center" doc={"center"} category="Mise en page">
        <CenterShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="center" />
    </VStack>
  );
}
