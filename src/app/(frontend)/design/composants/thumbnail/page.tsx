/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ThumbnailShowcase from '../../_showcases/ThumbnailShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Thumbnail — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Thumbnail" id="thumbnail" doc={"thumbnail"} category="Contenu">
        <ThumbnailShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="thumbnail" />
    </VStack>
  );
}
