/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ChatComposerShowcase from '../../_showcases/ChatComposerShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Chat Composer — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ChatComposer" id="chat-composer" doc={"chat-composer"} category="Chat">
        <ChatComposerShowcase />
      </ShowcaseBlock>
      <ComponentNav category="chat" current="chat-composer" />
    </VStack>
  );
}
