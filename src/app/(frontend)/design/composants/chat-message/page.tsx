/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ChatMessageShowcase from '../../_showcases/ChatMessageShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Chat Message — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ChatMessage" id="chat-message" doc="chat-message" category="Chat">
        <ChatMessageShowcase />
      </ShowcaseBlock>
      <ComponentNav category="chat" current="chat-message" />
    </VStack>
  );
}
