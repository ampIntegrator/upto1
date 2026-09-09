/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ChatToolCallsShowcase from '../../_showcases/ChatToolCallsShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Chat Tool Calls — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ChatToolCalls" id="chat-tool-calls" doc="chat-tool-calls" category="Chat">
        <ChatToolCallsShowcase />
      </ShowcaseBlock>
      <ComponentNav category="chat" current="chat-tool-calls" />
    </VStack>
  );
}
