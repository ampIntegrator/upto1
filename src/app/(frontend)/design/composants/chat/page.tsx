/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). Démos Astryx d'origine, ou habillées Orbita (badge). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';
import ChatLayoutShowcase from '../../_showcases/ChatLayoutShowcase';
import ChatComposerShowcase from '../../_showcases/ChatComposerShowcase';
import ChatComposerDrawerShowcase from '../../_showcases/ChatComposerDrawerShowcase';
import ChatComposerInputShowcase from '../../_showcases/ChatComposerInputShowcase';
import ChatDictationButtonShowcase from '../../_showcases/ChatDictationButtonShowcase';
import ChatMessageShowcase from '../../_showcases/ChatMessageShowcase';
import ChatMessageBubbleShowcase from '../../_showcases/ChatMessageBubbleShowcase';
import ChatMessageListShowcase from '../../_showcases/ChatMessageListShowcase';
import ChatMessageMetadataShowcase from '../../_showcases/ChatMessageMetadataShowcase';
import ChatSendButtonShowcase from '../../_showcases/ChatSendButtonShowcase';
import ChatSystemMessageShowcase from '../../_showcases/ChatSystemMessageShowcase';
import ChatTokenizedTextShowcase from '../../_showcases/ChatTokenizedTextShowcase';
import ChatToolCallsShowcase from '../../_showcases/ChatToolCallsShowcase';

export const metadata = {title: 'Chat — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro eyebrow="Composants · 13" title="Chat" lead="Composants conversationnels (assistant IA). Hors périmètre du site vitrine, listés pour référence." />
      <ShowcaseBlock name="ChatLayout" id="chat-layout" doc="chat-layout">
        <ChatLayoutShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ChatComposer" id="chat-composer" doc="chat-composer">
        <ChatComposerShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ChatComposerDrawer" id="chat-composer-drawer" doc="chat-composer" parent="ChatComposer">
        <ChatComposerDrawerShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ChatComposerInput" id="chat-composer-input" doc="chat-composer" parent="ChatComposer">
        <ChatComposerInputShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ChatDictationButton" id="chat-dictation-button" doc="chat-composer" parent="ChatComposer">
        <ChatDictationButtonShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ChatMessage" id="chat-message" doc="chat-message">
        <ChatMessageShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ChatMessageBubble" id="chat-message-bubble" doc="chat-message" parent="ChatMessage">
        <ChatMessageBubbleShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ChatMessageList" id="chat-message-list" doc="chat-message-list">
        <ChatMessageListShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ChatMessageMetadata" id="chat-message-metadata" doc="chat-message" parent="ChatMessage">
        <ChatMessageMetadataShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ChatSendButton" id="chat-send-button" doc="chat-composer" parent="ChatComposer">
        <ChatSendButtonShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ChatSystemMessage" id="chat-system-message" doc="chat-system-message">
        <ChatSystemMessageShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ChatTokenizedText" id="chat-tokenized-text" doc="chat-message" parent="ChatMessage">
        <ChatTokenizedTextShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ChatToolCalls" id="chat-tool-calls" doc="chat-tool-calls">
        <ChatToolCallsShowcase />
      </ShowcaseBlock>
    </VStack>
  );
}
