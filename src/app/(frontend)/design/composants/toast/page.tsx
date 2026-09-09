/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ToastShowcase from '../../_showcases/ToastShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Toast — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Toast" id="toast" doc="toast" category="Retours & statuts">
        <ToastShowcase />
      </ShowcaseBlock>
      <ComponentNav category="retours" current="toast" />
    </VStack>
  );
}
