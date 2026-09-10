/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SyntaxThemeShowcase from '../../_showcases/SyntaxThemeShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Syntax Theme — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="SyntaxTheme" id="syntax-theme" doc={"syntax-theme"} category="Utilitaires">
        <SyntaxThemeShowcase />
      </ShowcaseBlock>
      <ComponentNav category="utilitaires" current="syntax-theme" />
    </VStack>
  );
}
