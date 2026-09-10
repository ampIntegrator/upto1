/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ChatSendButtonShowcase from '../../_showcases/ChatSendButtonShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Chat Send Button — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ChatSendButton" id="chat-send-button" doc={"chat-composer"} parent="ChatComposer" category="Chat">
        <ChatSendButtonShowcase />
      </ShowcaseBlock>
      <ComponentNav category="chat" current="chat-send-button" />
    </VStack>
  );
}
