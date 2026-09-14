import {COLUMN_SPANS, type ColumnSpan} from '@/components/content-specs';

/**
 * Préréglages de rangée : des raccourcis qui remplissent les colonnes d'un coup.
 * Les largeurs restent libres ensuite (chaque colonne porte la sienne), la seule règle
 * étant que la rangée fasse 12. Partagé par le bouton de l'admin et les libellés.
 */
export const ROW_PRESETS: readonly ColumnSpan[][] = [
  [12],
  [6, 6],
  [4, 4, 4],
  [3, 3, 3, 3],
  [2, 2, 2, 2, 2, 2],
  [8, 4],
  [4, 8],
  [3, 6, 3],
  [9, 3],
  [3, 9],
  [6, 3, 3],
  [3, 3, 6],
  [6, 2, 2, 2],
  [2, 2, 2, 6],
];

export const presetLabel = (spans: readonly number[]): string => spans.join(' | ');

/** Options du sélecteur de largeur (valeurs en chaîne : champ select Payload). */
export const SPAN_OPTIONS = COLUMN_SPANS.map((s) => ({label: `${s} / 12`, value: String(s)}));

export const toSpan = (v: unknown): ColumnSpan => {
  const n = Number(v);
  return (COLUMN_SPANS as readonly number[]).includes(n) ? (n as ColumnSpan) : 12;
};
