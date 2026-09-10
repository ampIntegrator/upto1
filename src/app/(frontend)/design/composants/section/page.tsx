/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SectionShowcase from '../../_showcases/SectionShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Section — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Section" id="section" doc="section" dressed category="Mise en page">
        <SectionShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="section" />
    </VStack>
  );
}
