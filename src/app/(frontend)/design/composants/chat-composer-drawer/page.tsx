/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ChatComposerDrawerShowcase from '../../_showcases/ChatComposerDrawerShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Chat Composer Drawer — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ChatComposerDrawer" id="chat-composer-drawer" doc={"chat-composer"} parent="ChatComposer" category="Chat">
        <ChatComposerDrawerShowcase />
      </ShowcaseBlock>
      <ComponentNav category="chat" current="chat-composer-drawer" />
    </VStack>
  );
}
