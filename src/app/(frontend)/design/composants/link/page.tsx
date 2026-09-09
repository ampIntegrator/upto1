/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import LinkShowcase from '../../_showcases/LinkShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Link — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Link" id="link" doc="link" category="Actions">
        <LinkShowcase />
      </ShowcaseBlock>
      <ComponentNav category="actions" current="link" />
    </VStack>
  );
}
