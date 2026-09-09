/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ButtonShowcase from '../../_showcases/ButtonShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Button — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Button" id="button" doc="button" dressed category="Actions">
        <ButtonShowcase />
      </ShowcaseBlock>
      <ComponentNav category="actions" current="button" />
    </VStack>
  );
}
