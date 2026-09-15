import {sectionsText} from '@/i18n/admin/sections';

/**
 * Grid gaps of sections built in the admin (15 Sept. 2026):
 *   - gapX: between the columns of a row;
 *   - gapY: between rows;
 *   - gapYMobile: below 768 px, between all stacked blocks (replaces the other two).
 * Global setting in Réglages du site › Mise en page, overridable per section
 * (« site » = inherit). Values in pixels, 0 to 60 in steps of 10, set as CSS variables
 * on the section grid (styles.css, .section-grid), like the top and bottom spacing.
 */
export const GAP_VALUES = ['0', '10', '20', '30', '40', '50', '60'] as const;
export type GapValue = (typeof GAP_VALUES)[number];

export type Gaps = {gapX: number; gapY: number; gapYMobile: number};

/** Default values: 30 between columns, 40 between rows and on mobile. */
export const DEFAULT_GAPS: Gaps = {gapX: 30, gapY: 40, gapYMobile: 40};

export const GAP_OPTIONS = GAP_VALUES.map((v) => ({label: `${v} px`, value: v}));

/** « Réglage du site » option first, for sections. */
export const SITE_GAP = 'site';
export const SECTION_GAP_OPTIONS = [{label: sectionsText.settings.siteGap, value: SITE_GAP}, ...GAP_OPTIONS];

const toGap = (v: unknown): number | undefined => {
  const n = Number(v);
  return (GAP_VALUES as readonly string[]).includes(String(v)) && Number.isFinite(n) ? n : undefined;
};

/** Site gaps: the global setting, otherwise the default values. */
export function siteGaps(global: {gapX?: unknown; gapY?: unknown; gapYMobile?: unknown} | null | undefined): Gaps {
  return {
    gapX: toGap(global?.gapX) ?? DEFAULT_GAPS.gapX,
    gapY: toGap(global?.gapY) ?? DEFAULT_GAPS.gapY,
    gapYMobile: toGap(global?.gapYMobile) ?? DEFAULT_GAPS.gapYMobile,
  };
}

/** Gaps of a section: its override when it has one, otherwise the site's. */
export function sectionGaps(section: {gapX?: unknown; gapY?: unknown; gapYMobile?: unknown}, site: Gaps): Gaps {
  return {
    gapX: toGap(section.gapX) ?? site.gapX,
    gapY: toGap(section.gapY) ?? site.gapY,
    gapYMobile: toGap(section.gapYMobile) ?? site.gapYMobile,
  };
}
