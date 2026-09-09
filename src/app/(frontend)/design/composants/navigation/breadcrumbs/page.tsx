/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import BreadcrumbsShowcase from '../../../_showcases/BreadcrumbsShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Breadcrumbs — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Breadcrumbs" id="breadcrumbs" doc="breadcrumbs" category="Navigation">
        <BreadcrumbsShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="breadcrumbs" />
    </VStack>
  );
}
