import config from '@payload-config';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {headers} from 'next/headers';
import {getPayload} from 'payload';
import React from 'react';

import {tr} from '@/i18n/admin/languages';
import {sectionsText as T} from '@/i18n/admin/sections';

import {SectionPreviewFrame} from '../apercu-section/SectionPreviewFrame';
import {getPreview, isFrameKey} from '../apercu-section/store';
import {PreviewHero} from './render';

export const dynamic = 'force-dynamic';

export const metadata = {title: 'Aperçu du haut de page', robots: {index: false, follow: false}};

/**
 * The page top's live preview (« Gérer » dialog of the hero, src/fields/HeroManager.tsx), in the
 * admin's iframe: the hero last sent for this frame (`?frame=`), rendered alone. Admin users only.
 */
export default async function Page({searchParams}: {searchParams: Promise<{frame?: string}>}) {
  const {frame} = await searchParams;
  const payload = await getPayload({config});
  const {user} = await payload.auth({headers: await headers()});
  const input = user && isFrameKey(frame) ? getPreview(frame) : undefined;
  return (
    <SectionPreviewFrame frame={isFrameKey(frame) ? frame : ''} bare>
      {!user ? <EmptyState title={tr(T.preview.adminOnlyTitle, undefined)} description={tr(T.preview.adminOnlyDescription, undefined)} /> : input ? <PreviewHero input={input} /> : null}
    </SectionPreviewFrame>
  );
}
