/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SectionNoteShowcase from '../../_showcases/SectionNoteShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Section Note — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="SectionNote" id="section-note" doc={null} dressed category="Mise en page">
        <SectionNoteShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="section-note" />
    </VStack>
  );
}
