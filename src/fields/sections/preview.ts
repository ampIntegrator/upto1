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

/** `icon`: the device drawn on the width switch (the label is its tooltip and accessible name) */
/** preview → admin: where each column is drawn in the frame (after each rendering, and when sizes change) */
export const PREVIEW_LAYOUT = 'section-builder:layout';
/** preview → admin: a column was clicked */
export const PREVIEW_SELECT = 'section-builder:select';
/** preview → admin: show this column's content panel (double click, pencil, a part that is not edited in place) */
export const PREVIEW_OPEN = 'section-builder:open';
/** preview → admin: a text typed in place */
export const PREVIEW_EDIT = 'section-builder:edit';
/** preview → admin: an image or an icon was clicked: show its field next to it */
export const PREVIEW_PICK = 'section-builder:pick';

/** a column of the section: row and column indexes */
export type PreviewColumn = {row: number; col: number};
export type PreviewBox = {x: number; y: number; width: number; height: number};
/** a column as drawn in the frame, in the frame's own pixels */
export type PreviewColumnBox = PreviewColumn & PreviewBox;

/**
 * What the editor does in the preview. `field`: the block's field, as the host's components mark it
 * (`data-field="title"`, `data-field="cta.label"`); `box`: the clicked part, in the frame's pixels.
 */
export type PreviewEvent =
  | ({type: typeof PREVIEW_SELECT} & PreviewColumn)
  | ({type: typeof PREVIEW_OPEN; field?: string} & PreviewColumn)
  | ({type: typeof PREVIEW_EDIT; field: string; value: string} & PreviewColumn)
  | ({type: typeof PREVIEW_PICK; field: string; box: PreviewBox} & PreviewColumn);

export type PreviewBreakpoint = {name: string; label: Text; width: number; icon?: 'desktop' | 'tablet' | 'mobile'};

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
  {name: 'desktop', label: {fr: 'Ordinateur', en: 'Desktop'}, width: 1440, icon: 'desktop'},
  {name: 'tablet', label: {fr: 'Tablette', en: 'Tablet'}, width: 990, icon: 'tablet'},
  {name: 'mobile', label: {fr: 'Mobile', en: 'Mobile'}, width: 420, icon: 'mobile'},
];

export const isPreviewData = (x: unknown): x is PreviewDataMessage => Boolean(x && typeof x === 'object' && (x as {type?: unknown}).type === PREVIEW_DATA);
export const isPreviewReady = (x: unknown): boolean => Boolean(x && typeof x === 'object' && (x as {type?: unknown}).type === PREVIEW_READY);
export const previewSize = (x: unknown): number | null => {
  if (!x || typeof x !== 'object' || (x as {type?: unknown}).type !== PREVIEW_SIZE) return null;
  const h = (x as {height?: unknown}).height;
  return typeof h === 'number' && Number.isFinite(h) && h >= 0 ? h : null;
};

const isIndex = (n: unknown): n is number => typeof n === 'number' && Number.isInteger(n) && n >= 0;
const isBox = (b: unknown): b is PreviewBox => Boolean(b && typeof b === 'object' && ['x', 'y', 'width', 'height'].every((k) => Number.isFinite((b as Record<string, unknown>)[k])));

/** the columns of a PREVIEW_LAYOUT message, or null */
export const previewLayout = (x: unknown): PreviewColumnBox[] | null => {
  if (!x || typeof x !== 'object' || (x as {type?: unknown}).type !== PREVIEW_LAYOUT) return null;
  const columns = (x as {columns?: unknown}).columns;
  return Array.isArray(columns) ? columns.filter((c): c is PreviewColumnBox => isBox(c) && isIndex((c as unknown as PreviewColumn).row) && isIndex((c as unknown as PreviewColumn).col)) : null;
};

/** a checked PreviewEvent, or null */
export const previewEvent = (x: unknown): PreviewEvent | null => {
  if (!x || typeof x !== 'object') return null;
  const e = x as {type?: unknown; row?: unknown; col?: unknown; field?: unknown; value?: unknown; box?: unknown};
  if (!isIndex(e.row) || !isIndex(e.col)) return null;
  const at = {row: e.row, col: e.col};
  if (e.type === PREVIEW_SELECT) return {type: PREVIEW_SELECT, ...at};
  if (e.type === PREVIEW_OPEN) return {type: PREVIEW_OPEN, ...at, field: typeof e.field === 'string' ? e.field : undefined};
  if (e.type === PREVIEW_EDIT && typeof e.field === 'string' && typeof e.value === 'string') return {type: PREVIEW_EDIT, ...at, field: e.field, value: e.value};
  if (e.type === PREVIEW_PICK && typeof e.field === 'string' && isBox(e.box)) return {type: PREVIEW_PICK, ...at, field: e.field, box: e.box};
  return null;
};
