import {CONTENT_SPECS, type ContentRef} from '@/components/content-specs';

import {CARD_VARIANTS} from './cardBlocks';
import {EMPTY_SLUG} from './emptyBlock';
import {MEDIA_SLUG} from './mediaBlock';
import {MEDIA_QUOTE_SLUG} from './mediaQuoteBlock';

/**
 * Bridge between a column's Payload blocks and the span registry
 * (content-specs.ts). One block = one content; its deciding settings are read here.
 * Shared by server validation (column width) and admin labels.
 */
export type ContentBlockData = {blockType?: string; [key: string]: unknown};

/** The block → its reference in the registry; null if the block is not in it (should never happen). */
export function toContentRef(block: ContentBlockData | null | undefined): ContentRef | null {
  const slug = block?.blockType ?? '';
  if (slug in CARD_VARIANTS) return {type: 'card'};
  switch (slug) {
    case MEDIA_SLUG:
      return {type: 'image'};
    case MEDIA_QUOTE_SLUG:
      return {type: 'mediaQuote'};
    case 'text':
      return {type: 'text'};
    default:
      return null;
  }
}

export function toContentRefs(blocks: unknown): ContentRef[] {
  if (!Array.isArray(blocks)) return [];
  return blocks.map((b) => toContentRef(b as ContentBlockData)).filter((c): c is ContentRef => c !== null);
}

/** Short label of a block, for row and column labels. */
export function contentLabel(block: ContentBlockData | null | undefined): string {
  if (block?.blockType === EMPTY_SLUG) return 'Case vide';
  const variant = CARD_VARIANTS[block?.blockType ?? ''];
  if (variant) return variant.label;
  const ref = toContentRef(block);
  return ref ? CONTENT_SPECS[ref.type].label : String(block?.blockType ?? '?');
}
