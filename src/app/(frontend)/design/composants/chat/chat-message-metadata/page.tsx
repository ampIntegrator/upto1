/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ChatMessageMetadataShowcase from '../../../_showcases/ChatMessageMetadataShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Chat Message Metadata — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ChatMessageMetadata" id="chat-message-metadata" doc="chat-message" parent="ChatMessage" category="Chat">
        <ChatMessageMetadataShowcase />
      </ShowcaseBlock>
      <ComponentNav category="chat" current="chat-message-metadata" />
    </VStack>
  );
}
