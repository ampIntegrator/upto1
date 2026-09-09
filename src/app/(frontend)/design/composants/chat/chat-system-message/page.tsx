/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ChatSystemMessageShowcase from '../../../_showcases/ChatSystemMessageShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Chat System Message — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ChatSystemMessage" id="chat-system-message" doc="chat-system-message" category="Chat">
        <ChatSystemMessageShowcase />
      </ShowcaseBlock>
      <ComponentNav category="chat" current="chat-system-message" />
    </VStack>
  );
}
