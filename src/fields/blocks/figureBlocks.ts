import type {Block, PayloadRequest} from 'payload';

import {buttonsCapacity, minSpan} from '@/components/content-specs';
import {columnSpanAt, type ContentBlock} from '@/fields/sections/contentBlock';
import {tr} from '@/i18n/admin/languages';
import {statsBandColumnText} from '../../i18n/admin/blocks';
import {ctaBandBlock, galleryBlock, keyPointsBlock, quoteCardBlock, statsBandBlock} from './prose';

/**
 * The figure blocks of a post, offered as column blocks of the section builder (fresh configs from
 * the prose factories). Widths from the catalogue's registry: key points from 4, CTA band from 6,
 * stats band 2 cells on 6 or 7 columns, 3 on 8 or 9, 4 on 12, quote card 4 to 9, gallery from 6.
 */
function withStatsCapacity(block: Block): Block {
  return {
    ...block,
    fields: block.fields.map((f) =>
      'name' in f && f.name === 'items' && f.type === 'array'
        ? {
            ...f,
            validate: (value: unknown, {data, path, req}: {data: unknown; path: (number | string)[]; req: PayloadRequest}) => {
              const count = Array.isArray(value) ? value.length : 0;
              const span = columnSpanAt(data, path);
              const capacity = buttonsCapacity(span);
              return count <= capacity || tr(statsBandColumnText.tooMany, req.i18n?.language, {count, capacity, span});
            },
          }
        : f,
    ),
  };
}

export const FIGURE_BLOCKS: ContentBlock[] = [
  {block: keyPointsBlock(), minSpan: minSpan({type: 'keyPoints'}), fill: true},
  {block: ctaBandBlock(), minSpan: minSpan({type: 'ctaBand'})},
  {block: withStatsCapacity(statsBandBlock()), minSpan: minSpan({type: 'statsBand', count: 2})},
  {block: quoteCardBlock(), minSpan: minSpan({type: 'quoteCard'}), maxSpan: 9, fill: true},
  {block: galleryBlock(), minSpan: minSpan({type: 'gallery'})},
];
