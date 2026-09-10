/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import BreadcrumbsShowcase from '../../_showcases/BreadcrumbsShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Breadcrumbs — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="Breadcrumbs" id="breadcrumbs" doc={"breadcrumbs"} dressed category="Navigation">
        <BreadcrumbsShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="breadcrumbs" />
    </VStack>
  );
}
