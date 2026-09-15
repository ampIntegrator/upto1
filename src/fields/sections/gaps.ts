/**
 * Écarts de la grille des sections construites dans l'admin (15 sept. 2026) :
 *   - gapX : entre les colonnes d'une rangée ;
 *   - gapY : entre les rangées ;
 *   - gapYMobile : sous 768 px, entre tous les blocs empilés (remplace les deux autres).
 * Réglage global dans Réglages du site › Mise en page, surchargeable par section
 * (« site » = hériter). Valeurs en pixels, de 0 à 60 par pas de 10, posées en variables CSS
 * sur la grille de la section (styles.css, .section-grid), comme les espaces haut et bas.
 */
export const GAP_VALUES = ['0', '10', '20', '30', '40', '50', '60'] as const;
export type GapValue = (typeof GAP_VALUES)[number];

export type Gaps = {gapX: number; gapY: number; gapYMobile: number};

/** Valeurs par défaut : 30 entre colonnes, 40 entre rangées et sur mobile. */
export const DEFAULT_GAPS: Gaps = {gapX: 30, gapY: 40, gapYMobile: 40};

export const GAP_OPTIONS = GAP_VALUES.map((v) => ({label: `${v} px`, value: v}));

/** Option « Réglage du site » en tête, pour les sections. */
export const SITE_GAP = 'site';
export const SECTION_GAP_OPTIONS = [{label: 'Réglage du site', value: SITE_GAP}, ...GAP_OPTIONS];

const toGap = (v: unknown): number | undefined => {
  const n = Number(v);
  return (GAP_VALUES as readonly string[]).includes(String(v)) && Number.isFinite(n) ? n : undefined;
};

/** Écarts du site : le réglage global, sinon les valeurs par défaut. */
export function siteGaps(global: {gapX?: unknown; gapY?: unknown; gapYMobile?: unknown} | null | undefined): Gaps {
  return {
    gapX: toGap(global?.gapX) ?? DEFAULT_GAPS.gapX,
    gapY: toGap(global?.gapY) ?? DEFAULT_GAPS.gapY,
    gapYMobile: toGap(global?.gapYMobile) ?? DEFAULT_GAPS.gapYMobile,
  };
}

/** Écarts d'une section : sa surcharge quand elle en a une, sinon ceux du site. */
export function sectionGaps(section: {gapX?: unknown; gapY?: unknown; gapYMobile?: unknown}, site: Gaps): Gaps {
  return {
    gapX: toGap(section.gapX) ?? site.gapX,
    gapY: toGap(section.gapY) ?? site.gapY,
    gapYMobile: toGap(section.gapYMobile) ?? site.gapYMobile,
  };
}
