/**
 * Point d'entrée des thèmes Orbita compilés (SSR-safe).
 * Régénérer après toute modification de src/theme/orbita.ts ou des palettes :
 *   pnpm theme:build
 */
import type {DefinedTheme} from '@astryxdesign/core/theme';

import {orbitaAmbreTheme} from './built/orbita-ambre';
import {orbitaBlueTheme} from './built/orbita-blue';
import {orbitaGreenTheme} from './built/orbita-green';
import {orbitaMagentaTheme} from './built/orbita-magenta';
import {orbitaOrangeTheme} from './built/orbita-orange';
import {orbitaVioletTheme} from './built/orbita-violet';
import {SILO_NAMES, SILOS, type SiloName} from './silos/palettes';

export {SILO_NAMES, SILOS, type SiloName};

export const ORBITA_THEMES: Record<SiloName, DefinedTheme> = {
  blue: orbitaBlueTheme,
  green: orbitaGreenTheme,
  orange: orbitaOrangeTheme,
  violet: orbitaVioletTheme,
  magenta: orbitaMagentaTheme,
  ambre: orbitaAmbreTheme,
};

export const SILO_LABELS: Record<SiloName, string> = {
  blue: 'Bleu',
  green: 'Vert',
  orange: 'Orange',
  violet: 'Violet',
  magenta: 'Magenta',
  ambre: 'Ambre',
};

export const DEFAULT_SILO: SiloName = 'blue';
export type ColorMode = 'light' | 'dark' | 'system';
