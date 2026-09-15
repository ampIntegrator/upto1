/**
 * Media — an image that fills all the space of its container, cropped at the center
 * (column component; video will come later).
 *
 *   image           : source and alt text (empty = decorative image)
 *   minHeight       : minimum height on desktop, in px; if absent, the media takes the
 *                     height of its container (in a row, that of the neighboring contents)
 *   minHeightMobile : minimum height below 768 px (stacked columns); default: minHeight
 *   overlay         : black overlay between 0 and 1 (0 by default, no overlay)
 *   sizes           : displayed width per screen, so the browser downloads the
 *                     right size (default: full width on mobile, half above)
 *   children        : optional content placed over the image, centered on X and Y (MediaQuote)
 *
 * Image via next/image in fill mode: screen-adapted sizes, lazy loading,
 * alt text. Square corners. The container must have a height (stretched row or
 * minimum height), otherwise the media is 0 px tall.
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
  children?: React.ReactNode;
};

const DEFAULT_SIZES = '(max-width: 767px) 100vw, 50vw';

export function Media({image, minHeight, minHeightMobile, overlay = 0, sizes = DEFAULT_SIZES, children}: MediaProps) {
  const vars = {
    ...(minHeight != null ? {'--media-min-height': `${minHeight}px`} : null),
    ...(minHeightMobile != null ? {'--media-min-height-mobile': `${minHeightMobile}px`} : null),
  } as React.CSSProperties;
  const opacity = Math.min(1, Math.max(0, overlay));
  return (
    <VStack className={styles.root} style={vars}>
      <Image src={image.src} alt={image.alt ?? ''} fill sizes={sizes} className={styles.image} />
      {opacity > 0 ? <i className={styles.overlay} style={{opacity}} aria-hidden="true" /> : null}
      {children != null ? (
        <VStack hAlign="center" vAlign="center" className={styles.content}>
          {children}
        </VStack>
      ) : null}
    </VStack>
  );
}
