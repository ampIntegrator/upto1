/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TestimonialCardShowcase from '../../_showcases/TestimonialCardShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Testimonial Card — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TestimonialCard" id="testimonial-card" doc={null} parent="TestimonialCarousel" dressed category="Conteneurs">
        <TestimonialCardShowcase />
      </ShowcaseBlock>
      <ComponentNav category="conteneurs" current="testimonial-card" />
    </VStack>
  );
}
