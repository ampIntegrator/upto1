'use client';

/**
 * Section — the full-width block that pages are stacked from (mockups 13
 * fullwidthtextimage, 00-fondations §4 textures, .c-darkbg sections).
 *
 * It only carries the background and vertical padding; content goes
 * in a <Container>, then in a 12-column Grid.
 *
 *   background : 'light' (page background) | 'paper' (white) | 'glow' (light, highlight glow
 *                at the top) | 'grid' | 'dots' | 'losange' (textures, light only) |
 *                'night' | 'night-halo' (night with silo and gold halos) | 'image' | 'video'
 *   image / video : the media (covers the whole section)
 *   overlay    : black layer over the image or video, under the content;
 *                opacity from 0 to 1, adjustable in admin (0 = none)
 *   edge       : gradient edge line at the bottom (on by default for image and video,
 *                available everywhere)
 *   (no veil or halo: the overlay is the only darkening setting)
 *   tint       : light background color: 'body' (page background, --color-background-body) |
 *                'light' (silo primary at 5 %, --color-background-light) | 'highlight' (silo
 *                highlight at 5 %, --color-highlight-light)
 *   spacing    : vertical padding 'none' | 'xs' | 'sm' | 'md' | 'lg'
 *   spacingTop / spacingBottom : separate top and bottom, in pixels (0 to 160 in steps of 20 in admin);
 *                override spacing; halved below 640 px
 *   dividers   : top and bottom rules (figures bar)
 *
 * night, image and video switch their content to night mode (Theme dark):
 * headings, text, buttons and cards follow on their own.
 * Renders a <section> (Astryx Stack as="section"); used with <Container>.
 */
import {VStack} from '@astryxdesign/core/Stack';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';
import styles from './Section.module.css';

export type SectionBackground = 'light' | 'paper' | 'glow' | 'grid' | 'dots' | 'losange' | 'blueprint' | 'night' | 'night-halo' | 'night-beam' | 'image' | 'video';
export type SectionSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg';
export type SectionTint = 'body' | 'light' | 'highlight';

export type SectionProps = {
  background?: SectionBackground;
  image?: {src: string; alt?: string};
  video?: {src: string; poster?: string};
  /** black layer over the media, under the content: opacity 0 to 1 (image, video) */
  overlay?: number;
  /** silo → highlight → silo gradient edge line at the bottom */
  edge?: boolean;
  /** the same edge line at the top: the junction with the section above (same background, another texture) */
  edgeTop?: boolean;
  /** light background color (combines with textures) */
  tint?: SectionTint;
  spacing?: SectionSpacing;
  spacingTop?: number;
  spacingBottom?: number;
  /** top and bottom rules */
  dividers?: boolean;
  /** first block of a page under the fixed header: reserves its height at the top (light hero) */
  underHeader?: boolean;
  /** vertically centers the content within the section height (with minHeight) */
  centered?: boolean;
  /** minimum height (e.g. 600 for an image block) */
  minHeight?: number | string;
  id?: string;
  children: React.ReactNode;
  /** content placed on the section outside the flow (e.g. scroll prompt), above the content */
  foot?: React.ReactNode;
};

const DARK: SectionBackground[] = ['night', 'night-halo', 'night-beam', 'image', 'video'];
const MEDIA: SectionBackground[] = ['image', 'video'];

export function Section({background = 'light', image, video, overlay = 0, edge, edgeTop, tint, spacing = 'md', spacingTop, spacingBottom, dividers, underHeader, centered, minHeight, id, children, foot}: SectionProps) {
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
      data-tint={tint}
      data-edge={showEdge || undefined}
      data-edge-top={edgeTop || undefined}
      data-dividers={dividers || undefined}
      data-under-header={underHeader || undefined}
      data-centered={centered || undefined}
      style={{
        ...(minHeight != null ? {minHeight} : null),
        ...(spacingTop != null ? {'--section-pad-top': `${spacingTop}px`} : null),
        ...(spacingBottom != null ? {'--section-pad-bottom': `${spacingBottom}px`} : null),
      } as React.CSSProperties}
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
