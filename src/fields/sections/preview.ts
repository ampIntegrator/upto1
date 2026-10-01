/**
 * Live preview of the section being managed (« Gérer » dialog): the admin posts the section's
 * unsaved values to an iframe of the host's site, which renders them with its own components.
 * This file is the neutral protocol between the two sides; the host gives the preview address
 * (`SectionPreviewOptions.url`) and renders the section there.
 */
import type {Text} from '@/i18n/admin/languages';

/** admin → preview: the section's current values */
export const PREVIEW_DATA = 'section-builder:data';
/** preview → admin: the frame is listening (the admin then sends the current values) */
export const PREVIEW_READY = 'section-builder:ready';

/** preview → admin: the height of what the frame shows, so the admin fits the frame to it */
export const PREVIEW_SIZE = 'section-builder:size';

export type PreviewBreakpoint = {name: string; label: Text; width: number};

export type SectionPreviewOptions = {
  /** address of the host's preview page (same origin as the admin); the frame gets a unique `frame` query parameter */
  url: string;
  /** top-level fields of the document sent along with the section (the page's colour scheme…) */
  documentFields?: string[];
  /** width switch above the preview; the first one is the default */
  breakpoints?: PreviewBreakpoint[];
};

export type PreviewDataMessage = {
  type: typeof PREVIEW_DATA;
  /** the section's values, as stored (relations as IDs) */
  section: Record<string, unknown>;
  /** the section just above it in the document, when there is one (what the junction between the two depends on) */
  above?: Record<string, unknown>;
  /** the document's fields listed in `documentFields` */
  document: Record<string, unknown>;
  /** the edited document, when it exists (the host may use it to load relations) */
  id?: number | string;
  collection?: string;
  locale?: string;
};

export const DEFAULT_BREAKPOINTS: PreviewBreakpoint[] = [
  {name: 'desktop', label: {fr: 'Ordinateur', en: 'Desktop'}, width: 1440},
  {name: 'tablet', label: {fr: 'Tablette', en: 'Tablet'}, width: 768},
  {name: 'mobile', label: {fr: 'Mobile', en: 'Mobile'}, width: 390},
];

export const isPreviewData = (x: unknown): x is PreviewDataMessage => Boolean(x && typeof x === 'object' && (x as {type?: unknown}).type === PREVIEW_DATA);
export const isPreviewReady = (x: unknown): boolean => Boolean(x && typeof x === 'object' && (x as {type?: unknown}).type === PREVIEW_READY);
export const previewSize = (x: unknown): number | null => {
  if (!x || typeof x !== 'object' || (x as {type?: unknown}).type !== PREVIEW_SIZE) return null;
  const h = (x as {height?: unknown}).height;
  return typeof h === 'number' && Number.isFinite(h) && h >= 0 ? h : null;
};
