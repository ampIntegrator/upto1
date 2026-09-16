import {describe, expect, it} from 'vitest';

import {columnMinSpan, maxSpan, minSpan, STEPS_MIN_SPAN, stepsCapacity} from '@/components/content-specs';

describe('registre des emprises', () => {
  it('donne une emprise fixe aux contenus simples', () => {
    expect(minSpan({type: 'stat'})).toBe(2);
    expect(minSpan({type: 'card'})).toBe(3);
    expect(minSpan({type: 'priceList', variant: 'single'})).toBe(6);
    expect(minSpan({type: 'statsBar'})).toBe(12);
  });

  it('calcule l’emprise depuis les réglages, arrondie aux largeurs autorisées', () => {
    expect(minSpan({type: 'cardGrid', columns: 2})).toBe(6);
    expect(minSpan({type: 'cardGrid', columns: 3})).toBe(9);
    expect(minSpan({type: 'cardGrid', columns: 4})).toBe(12);
    expect(minSpan({type: 'priceList', variant: 'columns', plans: 2})).toBe(8);
    expect(minSpan({type: 'priceList', variant: 'columns', plans: 3})).toBe(12);
  });

  it('borne les contenus qui ne doivent pas s’étaler (16 sept. 2026)', () => {
    expect([minSpan({type: 'priceList', variant: 'single'}), maxSpan({type: 'priceList', variant: 'single'})]).toEqual([6, 9]);
    expect([minSpan({type: 'plan'}), maxSpan({type: 'plan'})]).toEqual([3, 4]);
    expect([minSpan({type: 'collapsibleGroup'}), maxSpan({type: 'collapsibleGroup'})]).toEqual([6, 9]);
    expect([minSpan({type: 'testimonialCard'}), maxSpan({type: 'testimonialCard'})]).toEqual([3, 4]);
    expect([minSpan({type: 'compareCard'}), maxSpan({type: 'compareCard'})]).toEqual([3, 6]);
    expect(maxSpan({type: 'card'})).toBe(12);
  });

  it('étapes : 1 sur 4 et 5, 2 sur 6 et 7, 3 sur 8 et 9, 4 sur 12', () => {
    expect(STEPS_MIN_SPAN).toEqual({1: 4, 2: 6, 3: 8, 4: 12});
    expect(minSpan({type: 'processSteps', steps: 1})).toBe(4);
    expect(minSpan({type: 'processSteps', steps: 2})).toBe(6);
    expect(minSpan({type: 'processSteps', steps: 3})).toBe(8);
    expect(minSpan({type: 'processSteps', steps: 4})).toBe(12);
    expect([2, 3, 4, 5, 6, 7, 8, 9, 12].map(stepsCapacity)).toEqual([0, 0, 1, 1, 2, 2, 3, 3, 4]);
  });

  it('prend le contenu le plus large pour une colonne', () => {
    expect(columnMinSpan([{type: 'stat'}, {type: 'card'}, {type: 'sectionNote'}])).toBe(6);
    expect(columnMinSpan([])).toBe(2);
  });
});
