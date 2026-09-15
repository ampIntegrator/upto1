import {CONTENT_SPECS, type ContentRef} from '@/components/content-specs';

import {CARD_VARIANTS} from './cardBlocks';
import {EMPTY_SLUG} from './emptyBlock';
import {MEDIA_SLUG} from './mediaBlock';

/**
 * Passerelle entre les blocs Payload d'une colonne et le registre des emprises
 * (content-specs.ts). Un bloc = un contenu ; ses réglages déterminants sont relevés ici.
 * Partagé par la validation serveur (largeur de colonne) et les libellés de l'admin.
 */
export type ContentBlockData = {blockType?: string; [key: string]: unknown};

/** Le bloc → sa référence dans le registre ; null si le bloc n'y est pas (jamais en principe). */
export function toContentRef(block: ContentBlockData | null | undefined): ContentRef | null {
  const slug = block?.blockType ?? '';
  if (slug in CARD_VARIANTS) return {type: 'card'};
  switch (slug) {
    case MEDIA_SLUG:
      return {type: 'image'};
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

/** Libellé court d'un bloc, pour les libellés de rangée et de colonne. */
export function contentLabel(block: ContentBlockData | null | undefined): string {
  if (block?.blockType === EMPTY_SLUG) return 'Case vide';
  const variant = CARD_VARIANTS[block?.blockType ?? ''];
  if (variant) return variant.label;
  const ref = toContentRef(block);
  return ref ? CONTENT_SPECS[ref.type].label : String(block?.blockType ?? '?');
}
