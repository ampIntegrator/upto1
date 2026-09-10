/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ChatComposerInputShowcase from '../../_showcases/ChatComposerInputShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Chat Composer Input — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ChatComposerInput" id="chat-composer-input" doc={"chat-composer"} parent="ChatComposer" category="Chat">
        <ChatComposerInputShowcase />
      </ShowcaseBlock>
      <ComponentNav category="chat" current="chat-composer-input" />
    </VStack>
  );
}
