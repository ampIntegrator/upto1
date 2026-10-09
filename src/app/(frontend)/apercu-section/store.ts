/**
 * The sections sent by the « Gérer » dialogs, kept in memory a few minutes, one per preview
 * frame (its `frame` key). On globalThis: the server action and the page render share it even
 * when the bundler loads this module twice.
 */
import type {PreviewDataMessage} from '@/fields/sections/preview';

export type StoredPreview = Omit<PreviewDataMessage, 'type'> & {at: number};

/** how long a section stays, in minutes (PREVIEW_TTL_MINUTES in the environment; 10 by default) */
const TTL_MS = (Number(process.env.PREVIEW_TTL_MINUTES) || 10) * 60 * 1000;
const holder = globalThis as unknown as {__sectionPreviews?: Map<string, StoredPreview>};
const store = (holder.__sectionPreviews ??= new Map());

export const isFrameKey = (k: unknown): k is string => typeof k === 'string' && /^[a-z0-9-]{8,64}$/i.test(k);

export function putPreview(key: string, value: Omit<PreviewDataMessage, 'type'>) {
  const now = Date.now();
  for (const [k, v] of store) if (now - v.at > TTL_MS) store.delete(k);
  store.set(key, {...value, at: now});
}

export const getPreview = (key: string): StoredPreview | undefined => store.get(key);
