/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import BreadcrumbItemShowcase from '../../_showcases/BreadcrumbItemShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Breadcrumb Item — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="BreadcrumbItem" id="breadcrumb-item" doc={"breadcrumbs"} parent="Breadcrumbs" category="Navigation">
        <BreadcrumbItemShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="breadcrumb-item" />
    </VStack>
  );
}
