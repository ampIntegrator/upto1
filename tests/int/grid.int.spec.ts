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

  it('propose 15 dispositions, dont 8·2·2 (colonne de 66 % centrée une fois réordonnée)', () => {
    expect(ROW_PRESETS).toHaveLength(15);
    expect(ROW_PRESETS).toContainEqual([8, 2, 2]);
    expect(spansKey([2, 8, 2])).toBe(spansKey([8, 2, 2]));
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

describe('déclarations des blocs de contenu', async () => {
  const {columnSpanAt, maxSpanMap} = await import('@/fields/sections/contentBlock');
  const {tooWideError} = await import('@/fields/sections/validation');
  it('retrouve la largeur de la colonne depuis le chemin d’un champ de bloc', () => {
    const data = {sections: [{rows: [{columns: [{span: '8', contents: [{blockType: 'processSteps', steps: []}]}]}]}]};
    expect(columnSpanAt(data, ['sections', 0, 'rows', 0, 'columns', 0, 'contents', 0, 'steps'])).toBe(8);
    expect(columnSpanAt(data, ['title'])).toBe(12);
  });
  it('donne 12 comme maximum aux blocs qui n’en déclarent pas', () => {
    expect(maxSpanMap([{block: {slug: 'a', fields: []}, minSpan: 2}, {block: {slug: 'b', fields: []}, minSpan: 3, maxSpan: 4}])).toEqual({a: 12, b: 4});
  });
  it('refuse un contenu trop large, dans la langue de l’admin', () => {
    expect(tooWideError('FAQ', 9, 12, 'fr')).toMatch(/ne dépasse pas 9 colonnes/);
    expect(tooWideError('FAQ', 9, 12, 'en')).toMatch(/must not exceed 9 columns/);
  });
});

describe('rangées pré-remplies (option du constructeur)', async () => {
  const {createSectionBuilder} = await import('@/fields/sections/builder');
  const block = (slug: string) => ({block: {slug, fields: []}, minSpan: 2 as const});
  it('refuse une rangée pré-remplie qui ne fait pas 12 ou qui cite un bloc inconnu', () => {
    expect(() => createSectionBuilder({blocks: [block('a')], presetRows: [{id: 'x', label: 'X', spans: [6, 4], blocks: ['a']}]})).toThrow(/add up to 12/);
    expect(() => createSectionBuilder({blocks: [block('a')], presetRows: [{id: 'x', label: 'X', spans: [12], blocks: ['b']}]})).toThrow(/unknown block/);
    expect(() => createSectionBuilder({blocks: [block('a')], presetRows: [{id: 'x', label: 'X', spans: [12], blocks: ['a']}]})).not.toThrow();
  });
});
