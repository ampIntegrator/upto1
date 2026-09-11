'use client';

/**
 * CardGrid — la grille de cartes, le contenu générique qui pose des cartes côte à côte
 * dans une colonne de page (2, 3 ou 4 colonnes internes). C'est lui qui porte le
 * côte à côte : la page ne découpe qu'une fois (voir content-specs.ts). La grille suit la
 * largeur de sa colonne, pas de l'écran : sous 720 px de colonne elle passe à 2, sous
 * 480 px à 1. Emprise minimale : 3 colonnes de page par colonne interne.
 */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {Card, type CardProps} from './Card';
import styles from './CardGrid.module.css';

export type CardGridProps = {
  items: CardProps[];
  columns?: 2 | 3 | 4;
};

export function CardGrid({items, columns = 3}: CardGridProps) {
  return (
    <VStack className={styles.host}>
      <VStack as="ul" className={styles.grid} data-columns={columns} style={{'--columns': columns} as React.CSSProperties}>
        {items.map((it, i) => (
          <VStack as="li" key={i} className={styles.cell}>
            <Card {...it} />
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
}
