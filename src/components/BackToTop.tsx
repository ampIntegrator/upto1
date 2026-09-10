'use client';

/**
 * BackToTop — bouton fixe « haut de page » (maquette 21 .ftr-top) : IconButton
 * Astryx primaire, en bas à droite, visible après 200 px de défilement.
 * Rendu par SiteFooter, donc présent sur toutes les pages.
 */
import {IconButton} from '@astryxdesign/core/IconButton';
import React, {useEffect, useState} from 'react';

import {ArrowUpIcon} from '@/theme/icons/nucleo';
import styles from './BackToTop.module.css';

const THRESHOLD = 200;

export function BackToTop({label = 'Haut de page'}: {label?: string}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <span className={styles.wrap} data-visible={visible || undefined}>
      <IconButton
        label={label}
        icon={<ArrowUpIcon width={20} height={20} />}
        variant="primary"
        size="lg"
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      />
    </span>
  );
}
