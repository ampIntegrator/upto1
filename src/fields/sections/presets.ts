import {COLUMN_SPANS, type ColumnSpan} from '@/components/content-specs';

/**
 * Préréglages de rangée : des raccourcis qui remplissent les colonnes d'un coup (14, la colonne
 * la plus large en premier ; pas de miroirs, les colonnes se réordonnent dans la case).
 * Les largeurs restent libres ensuite (chaque colonne porte la sienne), la seule règle
 * étant que la rangée fasse 12. Partagé par le bouton de l'admin et les libellés.
 */
export const ROW_PRESETS: readonly ColumnSpan[][] = [
  // une seule version par combinaison de largeurs : les flèches de la case réordonnent les colonnes
  [12],
  [6, 6],
  [8, 4],
  [7, 5],
  [9, 3],
  [4, 4, 4],
  [6, 3, 3],
  [6, 4, 2],
  [3, 3, 3, 3],
  [6, 2, 2, 2],
  [4, 4, 2, 2],
  [4, 2, 2, 2, 2],
  [3, 3, 2, 2, 2],
  [2, 2, 2, 2, 2, 2],
];

/** Clé d'une combinaison de largeurs, indépendante de l'ordre (vignette active d'une rangée). */
export const spansKey = (spans: readonly number[]): string => [...spans].sort((a, b) => b - a).join('|');

export const presetLabel = (spans: readonly number[]): string => spans.join(' | ');

/** Options du sélecteur de largeur (valeurs en chaîne : champ select Payload). */
export const SPAN_OPTIONS = COLUMN_SPANS.map((s) => ({label: `${s} / 12`, value: String(s)}));

export const toSpan = (v: unknown): ColumnSpan => {
  const n = Number(v);
  return (COLUMN_SPANS as readonly number[]).includes(n) ? (n as ColumnSpan) : 12;
};
