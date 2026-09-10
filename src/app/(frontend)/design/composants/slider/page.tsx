/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SliderShowcase from '../../_showcases/SliderShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Slider — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Slider" id="slider" doc={"slider"} dressed category="Formulaires">
        <SliderShowcase />
      </ShowcaseBlock>
      <ComponentNav category="formulaires" current="slider" />
    </VStack>
  );
}
