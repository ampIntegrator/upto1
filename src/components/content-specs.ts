/**
 * Registre des emprises — la seule source de vérité sur « quel contenu tient dans quelle
 * colonne ». Décidé le 11 sept. 2026 :
 *
 *   - Une page = des Sections ; une Section = des rangées ; une rangée = des colonnes dont
 *     les largeurs (sur 12) font 12 ; une colonne = des contenus empilés verticalement.
 *   - Un seul niveau de colonnes, jamais d'imbrication. Ce qui doit se subdiviser est un
 *     contenu qui porte sa propre grille (grille de cartes, liste de prix en colonnes,
 *     étapes, carrousel…).
 *   - Chaque contenu déclare ici son emprise minimale en colonnes de page ; elle peut
 *     dépendre de ses réglages (une grille de cartes à 3 colonnes internes demande 9).
 *   - Sous 768 px, toutes les colonnes passent en pleine largeur (styles.css, .page-grid).
 *
 * Ce fichier est consommé par le front (page Fondations « Grille ») et, plus tard, par la
 * config Payload : `validateColumn` et `validateRow` deviennent les validations des blocs
 * Colonne et Rangée, avec ces messages en français dans l'admin. Aucune valeur visuelle ici :
 * uniquement des largeurs de grille et des règles.
 */

/** Largeurs de colonne autorisées (sur 12). */
export const COLUMN_SPANS = [2, 3, 4, 6, 8, 9, 12] as const;
export type ColumnSpan = (typeof COLUMN_SPANS)[number];

/** Un contenu placé dans une colonne, avec les seuls réglages qui changent son emprise. */
export type ContentRef =
  | {type: 'text'}
  | {type: 'image'}
  | {type: 'stat'}
  | {type: 'checkList'}
  | {type: 'callout'}
  | {type: 'card'}
  | {type: 'testimonialCard'}
  | {type: 'compareCard'}
  | {type: 'cardGrid'; columns: 2 | 3 | 4}
  | {type: 'sectionHeading'}
  | {type: 'sectionNote'}
  | {type: 'tabs'}
  | {type: 'collapsibleGroup'}
  | {type: 'testimonialCarousel'}
  | {type: 'processSteps'; steps: number}
  | {type: 'priceList'; variant: 'single'}
  | {type: 'priceList'; variant: 'columns'; plans: number}
  | {type: 'statsBar'};

export type ContentType = ContentRef['type'];

/** Arrondit une emprise calculée à la largeur de colonne autorisée juste au-dessus. */
function snapUp(n: number): ColumnSpan {
  return COLUMN_SPANS.find((s) => s >= n) ?? 12;
}

/** Libellé (admin, catalogue) et emprise minimale de chaque contenu. */
export const CONTENT_SPECS: {[T in ContentType]: {label: string; minSpan: (c: Extract<ContentRef, {type: T}>) => ColumnSpan}} = {
  text: {label: 'Texte', minSpan: () => 2},
  image: {label: 'Image', minSpan: () => 2},
  stat: {label: 'Chiffre clé', minSpan: () => 2},
  checkList: {label: 'Liste à pastilles', minSpan: () => 2},
  callout: {label: 'Encadré', minSpan: () => 3},
  card: {label: 'Carte', minSpan: () => 3},
  testimonialCard: {label: 'Carte témoignage', minSpan: () => 3},
  compareCard: {label: 'Carte comparative', minSpan: () => 4},
  // grille de cartes : 3 colonnes de page par colonne interne (2 → 6, 3 → 9, 4 → 12)
  cardGrid: {label: 'Grille de cartes', minSpan: (c) => snapUp(c.columns * 3)},
  sectionHeading: {label: 'En-tête de section', minSpan: () => 6},
  sectionNote: {label: 'Note et bouton', minSpan: () => 6},
  tabs: {label: 'Onglets', minSpan: () => 6},
  collapsibleGroup: {label: 'Dépliants (FAQ)', minSpan: () => 6},
  testimonialCarousel: {label: 'Carrousel de témoignages', minSpan: () => 8},
  // étapes : 4 colonnes de page par étape (2 → 8, 3 et 4 → 12)
  processSteps: {label: 'Étapes', minSpan: (c) => snapUp(c.steps * 4)},
  // liste de prix : prix unique 8 ; colonnes, 4 par palier (2 → 8, 3 et 4 → 12)
  priceList: {label: 'Liste de prix', minSpan: (c) => (c.variant === 'single' ? 8 : snapUp(c.plans * 4))},
  statsBar: {label: 'Barre de chiffres', minSpan: () => 12},
};

/** Emprise minimale d'un contenu. */
export function minSpan(content: ContentRef): ColumnSpan {
  const spec = CONTENT_SPECS[content.type] as {minSpan: (c: ContentRef) => ColumnSpan};
  return spec.minSpan(content);
}

/** Emprise minimale d'une colonne : celle de son contenu le plus large. */
export function columnMinSpan(contents: ContentRef[]): ColumnSpan {
  return contents.reduce<ColumnSpan>((m, c) => Math.max(m, minSpan(c)) as ColumnSpan, 2);
}

/** Libellé lisible d'un contenu, avec son réglage déterminant. */
export function describeContent(content: ContentRef): string {
  const label = CONTENT_SPECS[content.type].label;
  switch (content.type) {
    case 'cardGrid':
      return `${label} à ${content.columns} colonnes`;
    case 'processSteps':
      return `${label} (${content.steps})`;
    case 'priceList':
      return content.variant === 'single' ? `${label}, prix unique` : `${label} en ${content.plans} colonnes`;
    default:
      return label;
  }
}

/** Erreurs d'une colonne : chaque contenu trop large pour la largeur choisie. */
export function validateColumn(span: ColumnSpan, contents: ContentRef[]): string[] {
  return contents.flatMap((c) => {
    const min = minSpan(c);
    return min > span ? [`« ${describeContent(c)} » a besoin d'au moins ${min} colonnes ; cette colonne en fait ${span}.`] : [];
  });
}

/** Erreur d'une rangée : les largeurs doivent faire 12. */
export function validateRow(spans: ColumnSpan[]): string | null {
  if (!spans.length) return 'Une rangée contient au moins une colonne.';
  const total = spans.reduce<number>((s, n) => s + n, 0);
  return total === 12 ? null : `Les largeurs des colonnes font ${total} ; il en faut 12.`;
}
