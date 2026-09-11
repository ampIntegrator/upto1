/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SectionHeadingShowcase from '../../_showcases/SectionHeadingShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Section Heading — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="SectionHeading" id="section-heading" doc={null} dressed category="Mise en page">
        <SectionHeadingShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="section-heading" />
    </VStack>
  );
}
