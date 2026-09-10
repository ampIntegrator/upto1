'use client';

/**
 * Section — le bloc pleine largeur qui empile les pages (maquettes 13
 * fullwidthtextimage, 00-fondations §4 textures, sections .c-darkbg).
 *
 * Elle ne porte que l'arrière-plan et le padding vertical ; le contenu se met
 * dans un <Container>, puis dans une Grid de 12 colonnes.
 *
 *   background : 'light' | 'grid' | 'dots' | 'losange' (textures, clair
 *                seulement) | 'night' | 'image' | 'video'
 *   image / video : le média (couvre toute la section)
 *   scrim / halo / edge : voile de lisibilité, halo nuit derrière le contenu,
 *                liseré dégradé en pied (maquette 13 ; actifs par défaut sur
 *                image et vidéo, edge disponible partout)
 *   spacing    : padding vertical 'sm' | 'md' | 'lg' | 'none'
 *
 * night, image et video basculent leur contenu en mode nuit (Theme dark) :
 * titres, textes, boutons et cartes suivent d'eux-mêmes.
 * Rend un <section> (Stack Astryx as="section") ; s'utilise avec <Container>.
 */
import {VStack} from '@astryxdesign/core/Stack';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';
import styles from './Section.module.css';

export type SectionBackground = 'light' | 'grid' | 'dots' | 'losange' | 'night' | 'image' | 'video';
export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg';

export type SectionProps = {
  background?: SectionBackground;
  image?: {src: string; alt?: string};
  video?: {src: string; poster?: string};
  /** voile léger haut/bas (image, vidéo) */
  scrim?: boolean;
  /** halo nuit derrière le contenu (image, vidéo) */
  halo?: boolean;
  /** liseré dégradé silo → highlight → silo en pied */
  edge?: boolean;
  spacing?: SectionSpacing;
  /** hauteur minimale (ex. 600 pour un bloc image) */
  minHeight?: number | string;
  id?: string;
  children: React.ReactNode;
};

const DARK: SectionBackground[] = ['night', 'image', 'video'];
const MEDIA: SectionBackground[] = ['image', 'video'];

export function Section({background = 'light', image, video, scrim, halo, edge, spacing = 'md', minHeight, id, children}: SectionProps) {
  const {theme} = useOrbitaTheme();
  const isMedia = MEDIA.includes(background);
  const showScrim = scrim ?? isMedia;
  const showHalo = halo ?? isMedia;
  const showEdge = edge ?? isMedia;

  const content = (
    <VStack
      as="section"
      id={id}
      className={styles.section}
      data-background={background}
      data-spacing={spacing}
      data-scrim={showScrim || undefined}
      data-halo={showHalo || undefined}
      data-edge={showEdge || undefined}
      style={minHeight != null ? {minHeight} : undefined}
    >
      {background === 'image' && image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.media} src={image.src} alt={image.alt ?? ''} loading="lazy" decoding="async" />
      ) : null}
      {background === 'video' && video ? (
        <video className={styles.media} src={video.src} poster={video.poster} autoPlay muted loop playsInline aria-hidden="true" />
      ) : null}
      {showHalo ? <i className={styles.halo} aria-hidden="true" /> : null}
      <VStack className={styles.content}>{children}</VStack>
    </VStack>
  );

  return DARK.includes(background) ? <Theme theme={theme} mode="dark">{content}</Theme> : content;
}
