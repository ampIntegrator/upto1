/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import AvatarStatusDotShowcase from '../../_showcases/AvatarStatusDotShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Avatar Status Dot — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="AvatarStatusDot" id="avatar-status-dot" doc={"avatar"} parent="Avatar" category="Contenu">
        <AvatarStatusDotShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="avatar-status-dot" />
    </VStack>
  );
}
