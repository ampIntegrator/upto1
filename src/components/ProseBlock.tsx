/**
 * ProseBlock — renders a figure block inserted in a post's prose (Lexical BlocksFeature) with the
 * site's components: key points, CTA band, stats band, quote card, gallery. Given to RichText as
 * `renderBlock`; the block's relations (images) are populated by the page's query depth.
 */
import React from 'react';

import {CtaBand} from '@/components/CtaBand';
import {Gallery} from '@/components/Gallery';
import {KeyPoints} from '@/components/KeyPoints';
import {QuoteCard} from '@/components/QuoteCard';
import type {RichTextDocument, RichTextNode} from '@/components/rich-text';
import {StatsBand} from '@/components/StatsBand';
import {CTA_BAND_SLUG, GALLERY_SLUG, KEY_POINTS_SLUG, QUOTE_CARD_SLUG, STATS_BAND_SLUG} from '@/fields/blocks/prose/slugs';
import {type ButtonData, toButton} from '@/lib/sections';
import type {NucleoIconKey} from '@/theme/icons/nucleo';

type Media = {url?: string | null; alt?: string | null};
const image = (m: unknown): {src: string; alt?: string} | undefined => {
  const doc = m && typeof m === 'object' ? (m as Media) : null;
  return doc?.url ? {src: doc.url, alt: doc.alt || undefined} : undefined;
};

export function renderProseBlock(node: RichTextNode): React.ReactNode {
  const f = (node.fields ?? {}) as Record<string, unknown>;
  switch (f.blockType) {
    case KEY_POINTS_SLUG:
      return f.content ? <KeyPoints eyebrow={(f.eyebrow as string) || undefined} content={f.content as RichTextDocument} /> : null;
    case CTA_BAND_SLUG: {
      const b = f.button as ButtonData | undefined;
      return f.title ? <CtaBand variant={f.variant === 'arrow' ? 'arrow' : 'icon'} iconKey={(f.iconKey as NucleoIconKey) || undefined} title={f.title as string} text={(f.text as string) || undefined} button={b?.label && b?.href ? toButton(b) : undefined} /> : null;
    }
    case STATS_BAND_SLUG: {
      const items = ((f.items as {value?: string; label?: string}[]) ?? []).filter((i) => i.value && i.label).map((i) => ({value: i.value as string, label: i.label as string}));
      return items.length ? <StatsBand items={items} /> : null;
    }
    case QUOTE_CARD_SLUG:
      return f.quote && f.name ? <QuoteCard quote={f.quote as string} name={f.name as string} role={(f.role as string) || undefined} photo={image(f.photo)} /> : null;
    case GALLERY_SLUG: {
      const images = ((f.images as {image?: unknown}[]) ?? []).map((i) => image(i.image)).filter((i): i is {src: string; alt?: string} => Boolean(i));
      return images.length ? <Gallery images={images} wideFirst={f.wideFirst !== false} caption={(f.caption as string) || undefined} /> : null;
    }
    default:
      return null;
  }
}
