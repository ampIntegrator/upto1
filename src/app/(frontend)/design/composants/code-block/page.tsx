/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CodeBlockShowcase from '../../_showcases/CodeBlockShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Code Block — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="CodeBlock" id="code-block" doc={"code-block"} category="Contenu">
        <CodeBlockShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="code-block" />
    </VStack>
  );
}
