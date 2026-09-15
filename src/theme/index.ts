/**
 * Entry point for the compiled Orbita themes (SSR-safe).
 * Regenerate after any change to src/theme/orbita.ts or the palettes:
 *   pnpm theme:build
 */
import type {DefinedTheme} from '@astryxdesign/core/theme';

import {orbitaAmbreTheme} from './built/orbita-ambre';
import {orbitaBlueTheme} from './built/orbita-blue';
import {orbitaGreenTheme} from './built/orbita-green';
import {orbitaMagentaTheme} from './built/orbita-magenta';
import {orbitaOrangeTheme} from './built/orbita-orange';
import {orbitaVioletTheme} from './built/orbita-violet';
import {SILO_LABELS, SILO_NAMES, SILOS, type SiloName} from './silos/palettes';

export {SILO_LABELS, SILO_NAMES, SILOS, type SiloName};

export const ORBITA_THEMES: Record<SiloName, DefinedTheme> = {
  blue: orbitaBlueTheme,
  green: orbitaGreenTheme,
  orange: orbitaOrangeTheme,
  violet: orbitaVioletTheme,
  magenta: orbitaMagentaTheme,
  ambre: orbitaAmbreTheme,
};

export const DEFAULT_SILO: SiloName = 'blue';
export type ColorMode = 'light' | 'dark' | 'system';
