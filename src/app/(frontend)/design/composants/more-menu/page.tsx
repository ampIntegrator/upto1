/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import MoreMenuShowcase from '../../_showcases/MoreMenuShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'More Menu — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="MoreMenu" id="more-menu" doc={"more-menu"} category="Actions">
        <MoreMenuShowcase />
      </ShowcaseBlock>
      <ComponentNav category="actions" current="more-menu" />
    </VStack>
  );
}
