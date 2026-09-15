/**
 * Ordre mobile des colonnes d'une rangée (sous 768 px, colonnes en pleine largeur).
 * Partagé par le constructeur de l'admin et le rendu front, pour qu'ils calculent le même ordre.
 *
 *   - chaque colonne porte un champ caché `mobileOrder` (position, ou vide) ;
 *   - les colonnes vides sont masquées sur mobile : elles n'ont pas de position ;
 *   - sans aucune position enregistrée, l'ordre mobile est l'ordre desktop ;
 *   - une colonne sans position (ajoutée après coup) passe après celles qui en ont une.
 */
export type MobileColumn = {mobileOrder?: number | null; empty: boolean};

const hasPosition = (v: number | null | undefined): v is number => typeof v === 'number' && Number.isFinite(v);

/** Index desktop des colonnes non vides, dans l'ordre mobile. */
export function mobileSequence(columns: readonly MobileColumn[]): number[] {
  return columns
    .map((c, index) => ({index, empty: c.empty, pos: hasPosition(c.mobileOrder) ? c.mobileOrder : Number.POSITIVE_INFINITY}))
    .filter((c) => !c.empty)
    .sort((a, b) => a.pos - b.pos || a.index - b.index)
    .map((c) => c.index);
}

/** Vrai si au moins une colonne a une position mobile enregistrée. */
export function hasMobileOrder(columns: readonly MobileColumn[]): boolean {
  return columns.some((c) => !c.empty && hasPosition(c.mobileOrder));
}

/** Rang mobile de chaque colonne (index desktop → rang), null pour une colonne vide. */
export function mobileRanks(columns: readonly MobileColumn[]): (number | null)[] {
  const ranks: (number | null)[] = columns.map(() => null);
  mobileSequence(columns).forEach((index, rank) => {
    ranks[index] = rank;
  });
  return ranks;
}
