/**
 * Astryx semantic icons → Nucleo paths.
 * Injected into each Orbita theme by OrbitaThemeProvider (theme `icons`
 * key): any Astryx component requesting `chevronDown`, `close`, `check`…
 * receives the Nucleo path. A key missing from the set keeps the default Astryx icon.
 */
import type {DefinedTheme} from '@astryxdesign/core/theme';

type ThemeIconOverrides = NonNullable<DefinedTheme['icons']>;
import React from 'react';

import {NUCLEO_ICONS, type NucleoIconKey} from './nucleo';

/** Astryx semantic name → Nucleo key (file name in icons/astryx). */
export const ASTRYX_SEMANTIC_MAP: Record<string, string> = {
  close: 'close',
  chevronDown: 'chevron-down',
  chevronLeft: 'chevron-left',
  chevronRight: 'chevron-right',
  chevronsLeft: 'chevrons-left',
  chevronsRight: 'chevrons-right',
  check: 'check',
  checkDouble: 'check-double',
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
  calendar: 'calendar',
  clock: 'clock',
  externalLink: 'external-link',
  menu: 'menu',
  moreHorizontal: 'more-horizontal',
  search: 'search',
  arrowUp: 'arrow-up',
  arrowDown: 'arrow-down',
  arrowsUpDown: 'arrows-up-down',
  funnel: 'funnel',
  eyeSlash: 'eye-slash',
  viewColumns: 'view-columns',
  copy: 'copy',
  wrench: 'wrench',
  stop: 'stop',
  microphone: 'microphone',
  // namespaced key: number field arrow (Astryx flips the same one for up)
  'numberInput:stepperDown': 'chevron-down',
};

export const ASTRYX_NUCLEO_ICONS: ThemeIconOverrides = Object.fromEntries(
  Object.entries(ASTRYX_SEMANTIC_MAP)
    .filter(([, key]) => key in NUCLEO_ICONS)
    .map(([name, key]) => {
      const Glyph = NUCLEO_ICONS[key as NucleoIconKey];
      return [name, <Glyph key={name} />];
    }),
) as ThemeIconOverrides;

/** Semantic names still served by the default Astryx paths. */
