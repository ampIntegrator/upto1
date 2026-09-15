/**
 * Container — the site's single content container: 1440 px maximum,
 * 20 px margin on each side, centered. Only one, always the same; narrower
 * content goes into Grid columns (12 columns).
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
