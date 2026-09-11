'use client';

/**
 * Section — le bloc pleine largeur qui empile les pages (maquettes 13
 * fullwidthtextimage, 00-fondations §4 textures, sections .c-darkbg).
 *
 * Elle ne porte que l'arrière-plan et le padding vertical ; le contenu se met
 * dans un <Container>, puis dans une Grid de 12 colonnes.
 *
 *   background : 'light' (fond de page) | 'paper' (blanc) | 'glow' (clair, lueur highlight
 *                en haut) | 'grid' | 'dots' | 'losange' (textures, clair seulement) |
 *                'night' | 'night-halo' (nuit à halos silo et or) | 'image' | 'video'
 *   image / video : le média (couvre toute la section)
 *   overlay    : calque noir posé sur l'image ou la vidéo, sous le contenu ;
 *                opacité de 0 à 1, réglable en admin (0 = aucun)
 *   edge       : liseré dégradé en pied (actif par défaut sur image et vidéo,
 *                disponible partout)
 *   (pas de voile ni de halo : l'overlay est le seul réglage d'assombrissement)
 *   spacing    : padding vertical 'none' | 'xs' | 'sm' | 'md' | 'lg'
 *   dividers   : filets haut et bas (barre de chiffres)
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

export type SectionBackground = 'light' | 'paper' | 'glow' | 'grid' | 'dots' | 'losange' | 'blueprint' | 'night' | 'night-halo' | 'night-beam' | 'image' | 'video';
export type SectionSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg';

export type SectionProps = {
  background?: SectionBackground;
  image?: {src: string; alt?: string};
  video?: {src: string; poster?: string};
  /** calque noir sur le média, sous le contenu : opacité 0 à 1 (image, vidéo) */
  overlay?: number;
  /** liseré dégradé silo → highlight → silo en pied */
  edge?: boolean;
  spacing?: SectionSpacing;
  /** filets haut et bas */
  dividers?: boolean;
  /** premier bloc d'une page sous l'en-tête fixe : réserve sa hauteur en haut (hero clair) */
  underHeader?: boolean;
  /** centre le contenu verticalement dans la hauteur de la section (avec minHeight) */
  centered?: boolean;
  /** hauteur minimale (ex. 600 pour un bloc image) */
  minHeight?: number | string;
  id?: string;
  children: React.ReactNode;
  /** contenu posé sur la section hors du flux (ex. invitation à défiler), au-dessus du contenu */
  foot?: React.ReactNode;
};

const DARK: SectionBackground[] = ['night', 'night-halo', 'night-beam', 'image', 'video'];
const MEDIA: SectionBackground[] = ['image', 'video'];

export function Section({background = 'light', image, video, overlay = 0, edge, spacing = 'md', dividers, underHeader, centered, minHeight, id, children, foot}: SectionProps) {
  const {theme} = useOrbitaTheme();
  const isMedia = MEDIA.includes(background);
  const showEdge = edge ?? isMedia;

  const content = (
    <VStack
      as="section"
      id={id}
      className={styles.section}
      data-background={background}
      data-spacing={spacing}
      data-edge={showEdge || undefined}
      data-dividers={dividers || undefined}
      data-under-header={underHeader || undefined}
      data-centered={centered || undefined}
      style={minHeight != null ? {minHeight} : undefined}
    >
      {background === 'image' && image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.media} src={image.src} alt={image.alt ?? ''} loading="lazy" decoding="async" />
      ) : null}
      {background === 'video' && video ? (
        <video className={styles.media} src={video.src} poster={video.poster} autoPlay muted loop playsInline aria-hidden="true" />
      ) : null}
      {isMedia && overlay > 0 ? <i className={styles.overlay} style={{opacity: Math.min(1, overlay)}} aria-hidden="true" /> : null}
      <VStack className={styles.content}>{children}</VStack>
      {foot}
    </VStack>
  );

  return DARK.includes(background) ? <Theme theme={theme} mode="dark">{content}</Theme> : content;
}
