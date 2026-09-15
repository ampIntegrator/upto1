/**
 * MediaQuote — une image qui remplit sa colonne, avec une phrase centrée en X et en Y.
 * Composant de colonne : au moins 6 colonnes sur 12 (registre des emprises).
 *
 *   text  : la phrase (texte simple)
 *   tag   : balise de la phrase, pour la sémantique et le référencement :
 *           h2 à h6, p ou span (défaut h2)
 *   size  : taille visuelle, indépendante de la balise, prise dans l'échelle du thème
 *           (valeurs paires) : display-1, display-2, display-3 (défaut), heading-1, heading-2
 *   + tout Media : image, minHeight, minHeightMobile, overlay, sizes
 *
 * Texte en couleurs claires via MediaTheme (mode sombre) : le calque règle la lisibilité
 * selon l'image.
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
