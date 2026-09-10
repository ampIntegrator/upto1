/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SpinnerShowcase from '../../_showcases/SpinnerShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Spinner — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Spinner" id="spinner" doc={"spinner"} category="Retours & statuts">
        <SpinnerShowcase />
      </ShowcaseBlock>
      <ComponentNav category="retours" current="spinner" />
    </VStack>
  );
}
