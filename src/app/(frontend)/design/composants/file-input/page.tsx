/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import FileInputShowcase from '../../_showcases/FileInputShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'File Input — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="FileInput" id="file-input" doc={"file-input"} dressed category="Formulaires">
        <FileInputShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="file-input" />
    </VStack>
  );
}
