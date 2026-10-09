import config from '@payload-config';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {headers} from 'next/headers';
import {getPayload} from 'payload';
import React from 'react';

import {tr} from '@/i18n/admin/languages';
import {sectionsText as T} from '@/i18n/admin/sections';

import {PreviewSection} from './render';
import {SectionPreviewFrame} from './SectionPreviewFrame';
import {getPreview, isFrameKey} from './store';

export const dynamic = 'force-dynamic';

export const metadata = {title: 'Aperçu de la section', robots: {index: false, follow: false}};

/**
 * The « Gérer » dialog's live preview (src/fields/sections/preview.ts), in the admin's iframe:
 * the section last sent for this frame (`?frame=`), rendered alone. Admin users only.
 */
export default async function Page({searchParams}: {searchParams: Promise<{frame?: string}>}) {
  const {frame} = await searchParams;
  const payload = await getPayload({config});
  const {user} = await payload.auth({headers: await headers()});
  const input = user && isFrameKey(frame) ? getPreview(frame) : undefined;
  return (
    <SectionPreviewFrame frame={isFrameKey(frame) ? frame : ''}>
      {!user ? <EmptyState title={tr(T.preview.adminOnlyTitle, undefined)} description={tr(T.preview.adminOnlyDescription, undefined)} /> : input ? <PreviewSection input={input} /> : null}
    </SectionPreviewFrame>
  );
}
