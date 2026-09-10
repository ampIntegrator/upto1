/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import AvatarGroupOverflowShowcase from '../../_showcases/AvatarGroupOverflowShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Avatar Group Overflow — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="AvatarGroupOverflow" id="avatar-group-overflow" doc={"avatar-group"} parent="AvatarGroup" category="Contenu">
        <AvatarGroupOverflowShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="avatar-group-overflow" />
    </VStack>
  );
}
