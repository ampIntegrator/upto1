/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import AvatarGroupShowcase from '../../_showcases/AvatarGroupShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Avatar Group — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="AvatarGroup" id="avatar-group" doc="avatar-group" category="Contenu">
        <AvatarGroupShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="avatar-group" />
    </VStack>
  );
}
