/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). Démos Astryx d'origine, ou habillées Orbita (badge). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';
import BadgeShowcase from '../../_showcases/BadgeShowcase';
import BannerShowcase from '../../_showcases/BannerShowcase';
import ProgressBarShowcase from '../../_showcases/ProgressBarShowcase';
import SkeletonShowcase from '../../_showcases/SkeletonShowcase';
import SpinnerShowcase from '../../_showcases/SpinnerShowcase';
import StatusDotShowcase from '../../_showcases/StatusDotShowcase';
import ToastShowcase from '../../_showcases/ToastShowcase';

export const metadata = {title: 'Retours & statuts — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro eyebrow="Composants · 7" title="Retours & statuts" lead="Signaler un état, un progrès ou une information." />
      <ShowcaseBlock name="Badge" id="badge" doc="badge">
        <BadgeShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Banner" id="banner" doc="banner">
        <BannerShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ProgressBar" id="progress-bar" doc="progress-bar">
        <ProgressBarShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Skeleton" id="skeleton" doc="skeleton">
        <SkeletonShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Spinner" id="spinner" doc="spinner">
        <SpinnerShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="StatusDot" id="status-dot" doc="status-dot">
        <StatusDotShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Toast" id="toast" doc="toast">
        <ToastShowcase />
      </ShowcaseBlock>
    </VStack>
  );
}
