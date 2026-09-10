/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import BannerShowcase from '../../_showcases/BannerShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Banner — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Banner" id="banner" doc={"banner"} category="Retours & statuts">
        <BannerShowcase />
      </ShowcaseBlock>
      <ComponentNav category="retours" current="banner" />
    </VStack>
  );
}
