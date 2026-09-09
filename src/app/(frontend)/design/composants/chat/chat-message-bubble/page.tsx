/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ChatMessageBubbleShowcase from '../../../_showcases/ChatMessageBubbleShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Chat Message Bubble — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ChatMessageBubble" id="chat-message-bubble" doc="chat-message" parent="ChatMessage" category="Chat">
        <ChatMessageBubbleShowcase />
      </ShowcaseBlock>
      <ComponentNav category="chat" current="chat-message-bubble" />
    </VStack>
  );
}
