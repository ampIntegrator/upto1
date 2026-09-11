'use client';

import React from 'react';

/** Onglet Contenu des pages : message d'attente, le temps que les sections de contenu soient modélisées. */
export function ContentPlaceholder() {
  return (
    <div style={{padding: 24, border: '1px dashed var(--theme-elevation-200)', borderRadius: 4, color: 'var(--theme-elevation-600)', fontSize: 14, lineHeight: 1.5}}>
      Le contenu de la page se composera de rangées et de colonnes remplies de contenus (texte, cartes, étapes, tarifs…),
      selon le modèle décrit dans le catalogue, Fondations « Grille &amp; emprises ». Cet onglet se remplira à l'étape suivante.
    </div>
  );
}
