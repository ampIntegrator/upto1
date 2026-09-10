/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ChatDictationButtonShowcase from '../../_showcases/ChatDictationButtonShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Chat Dictation Button — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="ChatDictationButton" id="chat-dictation-button" doc={"chat-composer"} parent="ChatComposer" category="Chat">
        <ChatDictationButtonShowcase />
      </ShowcaseBlock>
      <ComponentNav category="chat" current="chat-dictation-button" />
    </VStack>
  );
}
