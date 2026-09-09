/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ChatMessageListShowcase from '../../_showcases/ChatMessageListShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Chat Message List — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ChatMessageList" id="chat-message-list" doc="chat-message-list" category="Chat">
        <ChatMessageListShowcase />
      </ShowcaseBlock>
      <ComponentNav category="chat" current="chat-message-list" />
    </VStack>
  );
}
