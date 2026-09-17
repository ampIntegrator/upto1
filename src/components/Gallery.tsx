/**
 * Gallery — images of a post or a case study (mockup 23 .case-gallery): two columns of 4:3
 * images, the first one wide (16:8) when asked, 12 px gaps, a caption below in mono. One
 * column below 480 px of width.
 */
import {VStack} from '@astryxdesign/core/Stack';
import Image from 'next/image';
import React from 'react';

import styles from './Gallery.module.css';

export type GalleryImage = {src: string; alt?: string};
export type GalleryProps = {images: GalleryImage[]; wideFirst?: boolean; caption?: string};

export function Gallery({images, wideFirst = true, caption}: GalleryProps) {
  if (!images.length) return null;
  return (
    <VStack as="figure" gap={3} className={styles.root}>
      <VStack className={styles.grid}>
        {images.map((img, i) => (
          <VStack key={i} className={styles.cell} data-wide={(wideFirst && i === 0) || undefined}>
            <Image src={img.src} alt={img.alt ?? ''} fill sizes="(max-width: 767px) 100vw, 760px" className={styles.image} />
          </VStack>
        ))}
      </VStack>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </VStack>
  );
}
