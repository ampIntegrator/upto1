/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import MediaShowcase from '../../_showcases/MediaShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Media — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Media" id="media" doc={null} dressed category="Contenu">
        <MediaShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="media" />
    </VStack>
  );
}
