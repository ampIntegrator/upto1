import {describe, expect, it} from 'vitest';

import {columnMinSpan, minSpan, validateColumn, validateRow} from '@/components/content-specs';

describe('registre des emprises', () => {
  it('donne une emprise fixe aux contenus simples', () => {
    expect(minSpan({type: 'stat'})).toBe(2);
    expect(minSpan({type: 'card'})).toBe(3);
    expect(minSpan({type: 'priceList', variant: 'single'})).toBe(8);
    expect(minSpan({type: 'statsBar'})).toBe(12);
  });

  it('calcule l’emprise depuis les réglages, arrondie aux largeurs autorisées', () => {
    expect(minSpan({type: 'cardGrid', columns: 2})).toBe(6);
    expect(minSpan({type: 'cardGrid', columns: 3})).toBe(9);
    expect(minSpan({type: 'cardGrid', columns: 4})).toBe(12);
    expect(minSpan({type: 'processSteps', steps: 2})).toBe(8);
    expect(minSpan({type: 'processSteps', steps: 3})).toBe(12);
    expect(minSpan({type: 'priceList', variant: 'columns', plans: 2})).toBe(8);
    expect(minSpan({type: 'priceList', variant: 'columns', plans: 3})).toBe(12);
  });

  it('prend le contenu le plus large pour une colonne', () => {
    expect(columnMinSpan([{type: 'stat'}, {type: 'card'}, {type: 'sectionNote'}])).toBe(6);
    expect(columnMinSpan([])).toBe(2);
  });

  it('refuse un contenu trop large pour sa colonne, avec un message clair', () => {
    expect(validateColumn(4, [{type: 'card'}])).toEqual([]);
    expect(validateColumn(4, [{type: 'priceList', variant: 'single'}])).toEqual(['« Liste de prix, prix unique » a besoin d’au moins 8 colonnes ; cette colonne en fait 4.'.replace('’', "'")]);
    expect(validateColumn(3, [{type: 'cardGrid', columns: 2}, {type: 'stat'}])).toHaveLength(1);
  });

  it('exige 12 colonnes par rangée', () => {
    expect(validateRow([4, 4, 4])).toBeNull();
    expect(validateRow([6, 6])).toBeNull();
    expect(validateRow([6, 4])).toMatch(/font 10/);
    expect(validateRow([])).toMatch(/au moins une colonne/);
  });
});
