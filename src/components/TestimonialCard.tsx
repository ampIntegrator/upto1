'use client';

/**
 * TestimonialCard — la carte témoignage (maquette 07-testimonials) : guillemet serif,
 * citation, filet, nom en couleur silo, rôle en capitales, chip résultat. Balisage
 * figure > blockquote + figcaption. Clair sur papier ; nuit sur carte nuit via la
 * Section. Portée par TestimonialCarousel, utilisable seule dans une grille.
 */
import {Blockquote} from '@astryxdesign/core/Blockquote';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Chip} from './Chip';
import styles from './TestimonialCard.module.css';

export type Testimonial = {
  quote: string;
  name: string;
  /** « Courtière · Lyon » */
  role?: string;
  /** résultat chiffré, dans un chip highlight (« + 28 % de closing ») */
  result?: string;
};

export function TestimonialCard({quote, name, role, result}: Testimonial) {
  return (
    <VStack as="figure" className={styles.card}>
      <Text type="serif-upright" className={styles.mark} aria-hidden="true">“</Text>
      <VStack className={styles.quote}>
        <Blockquote>{quote}</Blockquote>
      </VStack>
      <VStack as="figcaption" gap={0.5} className={styles.foot}>
        <Text type="body" className={styles.name}>{name}</Text>
        {role ? <Text type="tag" className={styles.role}>{role}</Text> : null}
        {result ? <HStack className={styles.result}><Chip label={result} tone="high" /></HStack> : null}
      </VStack>
    </VStack>
  );
}
