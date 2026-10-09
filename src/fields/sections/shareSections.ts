import {type CollectionBeforeChangeHook, type CollectionSlug, type RequiredDataFromCollectionSlug, ValidationError} from 'payload';

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
};

export function shareSectionsHook({fieldName, collection}: ShareSectionsOptions): CollectionBeforeChangeHook {
  return async ({collection: collectionConfig, data, req}) => {
    const collectionSlug = collectionConfig?.slug;
    const sections = data?.[fieldName];
    if (!Array.isArray(sections)) return data;
    const out: Block[] = [];
    // the checks happen here, not in a field's `validate`: Payload validates the fields after this
    // hook, when the section is already turned into a reference
    const refuse = (index: number, message: string) => {
      throw new ValidationError({collection: collectionSlug, errors: [{message, path: `${fieldName}.${index}.saveAsShared`}], req}, req.t);
    };
    for (const [index, block] of (sections as Block[]).entries()) {
      if (block?.blockType !== 'section' || !block.saveAsShared) {
        out.push(block);
        continue;
      }
      const {saveAsShared: _s, id: _id, blockName, blockType: _t, ...fields} = block;
      // the shared section takes the section's name (its header): refused without one, or when a
      // shared section has that name already
      const title = typeof blockName === 'string' ? blockName.trim() : '';
      if (!title) refuse(index, tr(sectionsText.validation.sharedNeedsName, req.i18n?.language));
      const taken = await req.payload.count({collection: collection as CollectionSlug, where: {title: {equals: title}}, req});
      if (taken.totalDocs > 0) refuse(index, tr(sectionsText.validation.sharedNameTaken, req.i18n?.language, {name: title}));
      const doc = await req.payload.create({
        collection: collection as CollectionSlug,
        data: {...stripIds(fields), title} as unknown as RequiredDataFromCollectionSlug<CollectionSlug>,
        req,
        locale: req.locale === 'all' ? undefined : req.locale,
      });
      out.push({blockType: 'sharedSection', blockName: title, section: doc.id});
    }
    return {...data, [fieldName]: out};
  };
}
