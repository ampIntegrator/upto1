/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SiteFooterShowcase from '../../_showcases/SiteFooterShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Site Footer — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="SiteFooter" id="site-footer" doc={null} dressed category="Navigation">
        <SiteFooterShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="site-footer" />
    </VStack>
  );
}
