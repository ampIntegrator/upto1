/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CodeShowcase from '../../_showcases/CodeShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Code — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Code" id="code" doc={"code"} category="Contenu">
        <CodeShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="code" />
    </VStack>
  );
}
