/**
 * Icônes sémantiques Astryx → tracés Nucleo.
 * Injectées dans chaque thème Orbita par OrbitaThemeProvider (clé `icons` du
 * thème) : tout composant Astryx qui demande `chevronDown`, `close`, `check`…
 * reçoit le tracé Nucleo. Une clé absente du lot garde l'icône Astryx par défaut.
 */
import type {DefinedTheme} from '@astryxdesign/core/theme';

type ThemeIconOverrides = NonNullable<DefinedTheme['icons']>;
import React from 'react';

import {NUCLEO_ICONS, type NucleoIconKey} from './nucleo';

/** nom sémantique Astryx → clé Nucleo (nom de fichier dans icons/astryx). */
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
  // clé namespacée : flèche des champs numériques (Astryx retourne la même pour le haut)
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

/** Noms sémantiques encore servis par les tracés Astryx par défaut. */
