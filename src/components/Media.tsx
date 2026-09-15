/**
 * Media — une image qui remplit tout l'espace de son conteneur, recadrée au centre
 * (composant de colonne ; la vidéo viendra ensuite).
 *
 *   image           : source et texte alternatif (vide = image décorative)
 *   minHeight       : hauteur minimale sur desktop, en px ; absente, le média prend la
 *                     hauteur de son conteneur (dans une rangée, celle des contenus voisins)
 *   minHeightMobile : hauteur minimale sous 768 px (colonnes empilées) ; défaut : minHeight
 *   overlay         : calque noir entre 0 et 1 (0 par défaut, aucun calque)
 *   sizes           : largeur affichée selon l'écran, pour que le navigateur télécharge la
 *                     bonne taille (défaut : pleine largeur sur mobile, moitié au-delà)
 *
 * Image via next/image en mode fill : tailles adaptées à l'écran, chargement différé,
 * texte alternatif. Angles droits. Le conteneur doit avoir une hauteur (rangée étirée ou
 * hauteur minimale), sinon le média fait 0 px de haut.
 */
import {VStack} from '@astryxdesign/core/Stack';
import Image from 'next/image';
import React from 'react';

import styles from './Media.module.css';

export type MediaProps = {
  image: {src: string; alt?: string};
  minHeight?: number;
  minHeightMobile?: number;
  overlay?: number;
  sizes?: string;
};

const DEFAULT_SIZES = '(max-width: 767px) 100vw, 50vw';

export function Media({image, minHeight, minHeightMobile, overlay = 0, sizes = DEFAULT_SIZES}: MediaProps) {
  const vars = {
    ...(minHeight != null ? {'--media-min-height': `${minHeight}px`} : null),
    ...(minHeightMobile != null ? {'--media-min-height-mobile': `${minHeightMobile}px`} : null),
  } as React.CSSProperties;
  const opacity = Math.min(1, Math.max(0, overlay));
  return (
    <VStack className={styles.root} style={vars}>
      <Image src={image.src} alt={image.alt ?? ''} fill sizes={sizes} className={styles.image} />
      {opacity > 0 ? <i className={styles.overlay} style={{opacity}} aria-hidden="true" /> : null}
    </VStack>
  );
}
