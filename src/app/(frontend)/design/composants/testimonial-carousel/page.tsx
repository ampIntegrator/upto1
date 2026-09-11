/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TestimonialCarouselShowcase from '../../_showcases/TestimonialCarouselShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Testimonial Carousel — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TestimonialCarousel" id="testimonial-carousel" doc={null} dressed category="Conteneurs">
        <TestimonialCarouselShowcase />
      </ShowcaseBlock>
      <ComponentNav category="conteneurs" current="testimonial-carousel" />
    </VStack>
  );
}
