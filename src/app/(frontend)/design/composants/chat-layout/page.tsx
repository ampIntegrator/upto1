/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ChatLayoutShowcase from '../../_showcases/ChatLayoutShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Chat Layout — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ChatLayout" id="chat-layout" doc={"chat-layout"} category="Chat">
        <ChatLayoutShowcase />
      </ShowcaseBlock>
      <ComponentNav category="chat" current="chat-layout" />
    </VStack>
  );
}
