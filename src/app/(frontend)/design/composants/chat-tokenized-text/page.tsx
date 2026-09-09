/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ChatTokenizedTextShowcase from '../../_showcases/ChatTokenizedTextShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Chat Tokenized Text — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ChatTokenizedText" id="chat-tokenized-text" doc="chat-message" parent="ChatMessage" category="Chat">
        <ChatTokenizedTextShowcase />
      </ShowcaseBlock>
      <ComponentNav category="chat" current="chat-tokenized-text" />
    </VStack>
  );
}
