import type {CollectionBeforeChangeHook, CollectionSlug, RequiredDataFromCollectionSlug} from 'payload';

import {tr} from '@/i18n/admin/languages';
import {sectionsText} from '@/i18n/admin/sections';

/**
 * « Save to shared sections » checkbox of a Section block: when the document is saved,
 * the section is copied into the shared collection and the block becomes a
 * « Shared section » block referencing it. Internal ids of rows, columns and
 * contents are stripped from the copy (new tables, new ids).
 */
type Block = {blockType?: string; blockName?: string | null; id?: string; [key: string]: unknown};

function stripIds<T>(value: T): T {
  if (Array.isArray(value)) return value.map(stripIds) as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (k === 'id') continue;
      out[k] = stripIds(v);
    }
    return out as T;
  }
  return value;
}

export type ShareSectionsOptions = {
  /** Name of the sections field on the document. */
  fieldName: string;
  /** Slug of the shared sections collection. */
  collection: string;
  /** Document field used to name a section saved without a title. */
  titleField?: string;
};

export function shareSectionsHook({fieldName, collection, titleField = 'title'}: ShareSectionsOptions): CollectionBeforeChangeHook {
  return async ({data, req}) => {
    const sections = data?.[fieldName];
    if (!Array.isArray(sections)) return data;
    const out: Block[] = [];
    let n = 0;
    for (const block of sections as Block[]) {
      n += 1;
      if (block?.blockType !== 'section' || !block.saveAsShared) {
        out.push(block);
        continue;
      }
      const {saveAsShared: _s, sharedTitle, id: _id, blockName, blockType: _t, ...fields} = block;
      const docTitle = data[titleField];
      const title = typeof sharedTitle === 'string' && sharedTitle.trim() ? sharedTitle.trim() : tr(sectionsText.settings.sharedDefaultTitle, req.i18n?.language, {page: typeof docTitle === 'string' ? docTitle : null, n});
      const doc = await req.payload.create({
        collection: collection as CollectionSlug,
        data: {...stripIds(fields), title} as unknown as RequiredDataFromCollectionSlug<CollectionSlug>,
        req,
        locale: req.locale === 'all' ? undefined : req.locale,
      });
      out.push({blockType: 'sharedSection', blockName: blockName ?? title, section: doc.id});
    }
    return {...data, [fieldName]: out};
  };
}
