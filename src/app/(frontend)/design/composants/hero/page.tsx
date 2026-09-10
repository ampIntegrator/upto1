/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import HeroShowcase from '../../_showcases/HeroShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Hero — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Hero" id="hero" doc={null} dressed category="Mise en page">
        <HeroShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="hero" />
    </VStack>
  );
}
