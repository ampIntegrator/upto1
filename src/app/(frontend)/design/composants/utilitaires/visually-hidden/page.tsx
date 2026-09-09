/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import VisuallyHiddenShowcase from '../../../_showcases/VisuallyHiddenShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Visually Hidden — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="VisuallyHidden" id="visually-hidden" doc="visually-hidden" category="Utilitaires">
        <VisuallyHiddenShowcase />
      </ShowcaseBlock>
      <ComponentNav category="utilitaires" current="visually-hidden" />
    </VStack>
  );
}
