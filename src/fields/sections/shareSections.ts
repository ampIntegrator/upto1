import type {CollectionBeforeChangeHook, RequiredDataFromCollectionSlug} from 'payload';

import {tr} from '@/i18n/admin/languages';
import {sectionsText} from '@/i18n/admin/sections';

/**
 * « Enregistrer dans les sections partagées » checkbox of a Section block: when the page
 * is saved, the section is copied into the « sections » collection and the block becomes a
 * « Section partagée » block referencing it. Internal ids of rows, columns and
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

export const shareSections: CollectionBeforeChangeHook = async ({data, req}) => {
  const sections = data?.sections;
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
    const title = typeof sharedTitle === 'string' && sharedTitle.trim() ? sharedTitle.trim() : tr(sectionsText.settings.sharedDefaultTitle, req.i18n?.language, {page: typeof data.title === 'string' ? data.title : null, n});
    const doc = await req.payload.create({collection: 'sections', data: {...stripIds(fields), title} as RequiredDataFromCollectionSlug<'sections'>, req, locale: req.locale === 'all' ? undefined : req.locale});
    out.push({blockType: 'sharedSection', blockName: blockName ?? title, section: doc.id});
  }
  return {...data, sections: out};
};
