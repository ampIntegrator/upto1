/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import CarouselShowcase from '../../_showcases/CarouselShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Carousel — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Carousel" id="carousel" doc={"carousel"} category="Conteneurs">
        <CarouselShowcase />
      </ShowcaseBlock>
      <ComponentNav category="conteneurs" current="carousel" />
    </VStack>
  );
}
