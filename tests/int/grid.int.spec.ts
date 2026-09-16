import {describe, expect, it} from 'vitest';

import {COLUMN_SPANS, GRID_COLUMNS, ROW_PRESETS, rowIsComplete, rowTotal, snapUp, spansKey, toSpan} from '@/fields/sections/grid';
import {rowWidthError, tooNarrowError} from '@/fields/sections/validation';

describe('grille du constructeur de sections', () => {
  it('arrondit une largeur calculée à la largeur autorisée suivante', () => {
    expect(snapUp(1)).toBe(2);
    expect(snapUp(6)).toBe(6);
    expect(snapUp(10)).toBe(12);
    expect(snapUp(40)).toBe(12);
  });

  it('ramène toute valeur stockée à une largeur autorisée', () => {
    expect(toSpan('4')).toBe(4);
    expect(toSpan(9)).toBe(9);
    expect(toSpan('10')).toBe(GRID_COLUMNS);
    expect(toSpan(undefined)).toBe(GRID_COLUMNS);
  });

  it('propose des dispositions qui font toutes 12, avec des largeurs autorisées', () => {
    for (const preset of ROW_PRESETS) {
      expect(rowIsComplete(preset)).toBe(true);
      for (const span of preset) expect(COLUMN_SPANS).toContain(span);
    }
    expect(new Set(ROW_PRESETS.map(spansKey)).size).toBe(ROW_PRESETS.length);
  });

  it('identifie une disposition quel que soit l’ordre des colonnes', () => {
    expect(spansKey([4, 8])).toBe(spansKey([8, 4]));
    expect(rowTotal([6, 4])).toBe(10);
  });

  it('exige 12 colonnes par rangée, dans la langue de l’admin', () => {
    expect(rowWidthError([4, 4, 4], 'fr')).toBeNull();
    expect(rowWidthError([6, 4], 'fr')).toMatch(/font 10/);
    expect(rowWidthError([6, 4], 'en')).toMatch(/add up to 10/);
    expect(rowWidthError([], 'fr')).toMatch(/au moins une colonne/);
  });

  it('refuse un contenu trop large pour sa colonne, avec un message clair', () => {
    expect(tooNarrowError('Liste de prix', 8, 4, 'fr')).toBe("« Liste de prix » a besoin d'au moins 8 colonnes ; cette colonne en fait 4.");
    expect(tooNarrowError('Price list', 8, 4, 'en')).toMatch(/needs at least 8 columns/);
  });
});
