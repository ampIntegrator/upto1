/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import BadgeShowcase from '../../_showcases/BadgeShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Badge — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Badge" id="badge" doc={"badge"} dressed category="Retours & statuts">
        <BadgeShowcase />
      </ShowcaseBlock>
      <ComponentNav category="retours" current="badge" />
    </VStack>
  );
}
