/**
 * CoverCaption — the caption of a cover image, laid over the image in its bottom right corner
 * (Nicolas, 24 Sept. 2026): 14 px mono, white or black text (`tone`), and on hover a 40 %
 * veil of the opposite colour behind the text to read it on any photo. No veil otherwise, on
 * any screen. Rendered as a figcaption inside a figure (post header), as a span elsewhere
 * (case study top). The parent must be positioned.
 */
import React from 'react';

import styles from './CoverCaption.module.css';

export type CoverCaptionTone = 'light' | 'dark';

export type CoverCaptionProps = {
  children: React.ReactNode;
  /** text colour: light (white, default) or dark (black) */
  tone?: CoverCaptionTone;
  as?: 'figcaption' | 'span';
  className?: string;
};

export function CoverCaption({children, tone = 'light', as: Tag = 'figcaption', className}: CoverCaptionProps) {
  return (
    <Tag className={[styles.caption, className].filter(Boolean).join(' ')} data-tone={tone}>
      {children}
    </Tag>
  );
}
