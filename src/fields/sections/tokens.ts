/**
 * Reads a measure of the section builder from its variables (`tokens.scss`, on `:root`), in px.
 * For the few computations done in TypeScript (how many thumbnails fill a row, how many tracks fit
 * the content panel): the value is written once, in the stylesheet. In the browser only: 0 on the
 * server and until the stylesheet is in (callers wait for a value above 0).
 */
import './tokens.scss';

export type Token = 'thumb-height' | 'thumb-min-width' | 'thumb-gap' | 'guide-width' | 'track-min' | 'track-gap';

export function token(name: Token): number {
  if (typeof document === 'undefined') return 0;
  const value = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(`--sm-${name}`));
  return Number.isFinite(value) ? value : 0;
}
