'use client';

/**
 * TestimonialCard — the testimonial card (mockup 07-testimonials): serif quote mark,
 * quote, rule, name in silo color, role in capitals, result chip. Markup
 * figure > blockquote + figcaption. Light on paper; night on a night card via the
 * Section. Used by TestimonialCarousel, usable alone in a grid.
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
  /** numeric result, in a highlight chip (« + 28 % de closing ») */
  result?: string;
};

export function TestimonialCard({quote, name, role, result}: Testimonial) {
  return (
    <VStack as="figure" className={styles.card}>
      <Text type="serif-upright" className={styles.mark} aria-hidden="true">“</Text>
      <VStack className={styles.quote}>
        <Blockquote data-part="quote">{quote}</Blockquote>
      </VStack>
      <VStack as="figcaption" gap={0.5} className={styles.foot}>
        <Text type="body" className={styles.name} data-part="name">{name}</Text>
        {role ? <Text type="tag" className={styles.role} data-part="role">{role}</Text> : null}
        {result ? <HStack className={styles.result}><Chip label={result} tone="high" part="result" /></HStack> : null}
      </VStack>
    </VStack>
  );
}
