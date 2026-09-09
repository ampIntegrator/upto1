import type {OrbitaSilo} from '../orbita';

/** Les 7 silos d'accent Orbita (valeurs : orbita.css `[data-theme]`).
 *  highlight / highlightDeep : complémentaires franches validées le 9 sept. 2026
 *  (le bleu garde la maquette ; les autres s'alignent sur son écart indigo → turquoise). */
export const SILOS = {
  blue:    {slug: 'blue',    bg: '#F4F6FB', bg2: '#E8ECF6', primary: '#4F46E5', primaryDeep: '#3D34C9', highlight: '#10E0C8', highlightDeep: '#0A9E8E', night: '#1B1A4E'},
  green:   {slug: 'green',   bg: '#F1F6F2', bg2: '#E4EFE7', primary: '#40916C', primaryDeep: '#2F6E51', highlight: '#F5B841', highlightDeep: '#B8800A', night: '#0E2C2E'},
  orange:  {slug: 'orange',  bg: '#FBF5EF', bg2: '#F4E8DC', primary: '#DC5A20', primaryDeep: '#B5470F', highlight: '#38BDF8', highlightDeep: '#0F7FC0', night: '#2A1409'},
  violet:  {slug: 'violet',  bg: '#F7F3FB', bg2: '#EDE4F5', primary: '#8B47BE', primaryDeep: '#6E2FA0', highlight: '#A3E635', highlightDeep: '#5C9A0A', night: '#241038'},
  brique:  {slug: 'brique',  bg: '#FBF2F1', bg2: '#F4DFDC', primary: '#C2362F', primaryDeep: '#9F2620', highlight: '#2ED3C3', highlightDeep: '#0E9C8F', night: '#2A1012'},
  magenta: {slug: 'magenta', bg: '#FBF1F7', bg2: '#F4DCEC', primary: '#C42E86', primaryDeep: '#9E2068', highlight: '#4ADE9B', highlightDeep: '#158F5E', night: '#2A0E22'},
  ambre:   {slug: 'ambre',   bg: '#FBF6EC', bg2: '#F3E7CC', primary: '#C99016', primaryDeep: '#9E6F08', highlight: '#4DA3F0', highlightDeep: '#1F6FCC', night: '#241B06'},
} as const satisfies Record<string, OrbitaSilo>;

export type SiloName = keyof typeof SILOS;
export const SILO_NAMES = Object.keys(SILOS) as SiloName[];
