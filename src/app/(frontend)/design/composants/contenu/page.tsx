/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). Démos Astryx d'origine, ou habillées Orbita (badge). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';
import AvatarShowcase from '../../_showcases/AvatarShowcase';
import AvatarGroupShowcase from '../../_showcases/AvatarGroupShowcase';
import AvatarGroupOverflowShowcase from '../../_showcases/AvatarGroupOverflowShowcase';
import AvatarStatusDotShowcase from '../../_showcases/AvatarStatusDotShowcase';
import BlockquoteShowcase from '../../_showcases/BlockquoteShowcase';
import CitationShowcase from '../../_showcases/CitationShowcase';
import CodeShowcase from '../../_showcases/CodeShowcase';
import CodeBlockShowcase from '../../_showcases/CodeBlockShowcase';
import EmptyStateShowcase from '../../_showcases/EmptyStateShowcase';
import HeadingShowcase from '../../_showcases/HeadingShowcase';
import IconShowcase from '../../_showcases/IconShowcase';
import KbdShowcase from '../../_showcases/KbdShowcase';
import MarkdownShowcase from '../../_showcases/MarkdownShowcase';
import TextShowcase from '../../_showcases/TextShowcase';
import ThumbnailShowcase from '../../_showcases/ThumbnailShowcase';
import TimestampShowcase from '../../_showcases/TimestampShowcase';
import TokenShowcase from '../../_showcases/TokenShowcase';

export const metadata = {title: 'Contenu — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro eyebrow="Composants · 17" title="Contenu" lead="Texte, titres, médias et éléments éditoriaux." />
      <ShowcaseBlock name="Avatar" id="avatar" doc="avatar">
        <AvatarShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="AvatarGroup" id="avatar-group" doc="avatar-group">
        <AvatarGroupShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="AvatarGroupOverflow" id="avatar-group-overflow" doc="avatar-group" parent="AvatarGroup">
        <AvatarGroupOverflowShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="AvatarStatusDot" id="avatar-status-dot" doc="avatar" parent="Avatar">
        <AvatarStatusDotShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Blockquote" id="blockquote" doc="blockquote">
        <BlockquoteShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Citation" id="citation" doc="citation">
        <CitationShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Code" id="code" doc="code">
        <CodeShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="CodeBlock" id="code-block" doc="code-block">
        <CodeBlockShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="EmptyState" id="empty-state" doc="empty-state">
        <EmptyStateShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Heading" id="heading" doc="heading">
        <HeadingShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Icon" id="icon" doc="icon">
        <IconShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Kbd" id="kbd" doc="kbd">
        <KbdShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Markdown" id="markdown" doc="markdown">
        <MarkdownShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Text" id="text" doc="text">
        <TextShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Thumbnail" id="thumbnail" doc="thumbnail">
        <ThumbnailShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Timestamp" id="timestamp" doc="timestamp">
        <TimestampShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Token" id="token" doc="token">
        <TokenShowcase />
      </ShowcaseBlock>
    </VStack>
  );
}
