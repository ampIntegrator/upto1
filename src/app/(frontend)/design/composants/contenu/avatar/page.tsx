/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import AvatarShowcase from '../../../_showcases/AvatarShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Avatar — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Avatar" id="avatar" doc="avatar" category="Contenu">
        <AvatarShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="avatar" />
    </VStack>
  );
}
