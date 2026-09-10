/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import MarkdownShowcase from '../../_showcases/MarkdownShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Markdown — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Markdown" id="markdown" doc={"markdown"} category="Contenu">
        <MarkdownShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="markdown" />
    </VStack>
  );
}
