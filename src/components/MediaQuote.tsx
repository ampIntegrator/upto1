/**
 * MediaQuote — an image that fills its column, with a sentence centered on X and Y.
 * Column component: at least 6 columns out of 12 (span registry).
 *
 *   text  : the sentence (plain text)
 *   tag   : tag of the sentence, for semantics and SEO:
 *           h2 to h6, p or span (default h2)
 *   size  : visual size, independent of the tag, taken from the theme scale
 *           (even values): display-1, display-2, display-3 (default), heading-1, heading-2
 *   + all Media props: image, minHeight, minHeightMobile, overlay, sizes
 *
 * Text in light colors via MediaTheme (dark mode): the overlay sets legibility
 * depending on the image.
 */
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {MediaTheme} from '@astryxdesign/core/theme';
import React from 'react';

import {Media, type MediaProps} from './Media';
import styles from './MediaQuote.module.css';

export type MediaQuoteTag = 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
export type MediaQuoteSize = 'display-1' | 'display-2' | 'display-3' | 'heading-1' | 'heading-2';

export type MediaQuoteProps = Omit<MediaProps, 'children'> & {
  text: string;
  tag?: MediaQuoteTag;
  size?: MediaQuoteSize;
};

const LEVELS: Partial<Record<MediaQuoteTag, 2 | 3 | 4 | 5 | 6>> = {h2: 2, h3: 3, h4: 4, h5: 5, h6: 6};

export function MediaQuote({text, tag = 'h2', size = 'display-3', ...media}: MediaQuoteProps) {
  const level = LEVELS[tag];
  const phrase =
    level != null ? (
      <Heading level={level} className={styles.quote} data-size={size}>
        {text}
      </Heading>
    ) : (
      <Text as={tag === 'span' ? 'span' : 'p'} className={styles.quote} data-size={size}>
        {text}
      </Text>
    );
  return (
    <Media {...media}>
      <MediaTheme mode="dark">{phrase}</MediaTheme>
    </Media>
  );
}
