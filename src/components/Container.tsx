/**
 * Container — l'unique conteneur de contenu du site : 1440 px maximum,
 * 20 px de marge de chaque côté, centré. Un seul, toujours le même ; un
 * contenu plus étroit se place dans des colonnes de la Grid (12 colonnes).
 */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import styles from './Container.module.css';

export function Container({children, gap}: {children: React.ReactNode; gap?: 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10}) {
  return (
    <VStack className={styles.container} gap={gap}>
      {children}
    </VStack>
  );
}
