'use server';

/**
 * sendSectionPreview — the « Gérer » dialog's live preview (src/fields/sections/preview.ts): keeps
 * the section's unsaved values for the frame that received them; the frame then refreshes and its
 * page renders them (page.tsx). Admin users only: it shows unpublished text.
 */
import config from '@payload-config';
import {headers} from 'next/headers';
import {getPayload} from 'payload';

import type {PreviewDataMessage} from '@/fields/sections/preview';
import {isFrameKey, putPreview} from './store';

export async function sendSectionPreview(frame: string, input: Omit<PreviewDataMessage, 'type'>): Promise<'ok' | 'auth' | 'invalid'> {
  if (!isFrameKey(frame) || !input || typeof input.section !== 'object') return 'invalid';
  const payload = await getPayload({config});
  const {user} = await payload.auth({headers: await headers()});
  if (!user) return 'auth';
  putPreview(frame, {section: input.section, above: input.above && typeof input.above === 'object' ? input.above : undefined, document: input.document ?? {}, id: input.id, collection: input.collection, locale: input.locale});
  return 'ok';
}
