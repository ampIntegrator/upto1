/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import DialogHeaderShowcase from '../../../_showcases/DialogHeaderShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Dialog Header — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="DialogHeader" id="dialog-header" doc="dialog" parent="Dialog" category="Surcouches">
        <DialogHeaderShowcase />
      </ShowcaseBlock>
      <ComponentNav category="surcouches" current="dialog-header" />
    </VStack>
  );
}
