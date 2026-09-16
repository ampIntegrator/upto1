import type {Block, CollectionBeforeChangeHook, CollectionSlug, Condition, Field} from 'payload';

import {sectionsText as T} from '@/i18n/admin/sections';

import type {ContentBlock} from './contentBlock';
import {sectionFields} from './sectionFields';
import {shareSectionsHook} from './shareSections';

/**
 * Entry point of the section builder, shaped like the future plugin's options:
 * the host declares its content blocks and its section settings, and gets back
 * the pieces to wire into its collections. Nothing in this folder knows the
 * host's components, its media collection or its theme.
 */
export type SectionBuilderOptions = {
  /** Content blocks offered in a column, with their minimum column width. */
  blocks: ContentBlock[];
  /** Host fields shown at the top of « Section settings » (background, etc.). */
  settings?: Field[];
  /** Name of the sections field on the documents (default « sections »). */
  fieldName?: string;
  /** Shared sections: the collection that stores them, or false to disable sharing. */
  shared?: {collection: string} | false;
  /** Shows spacing, gaps, sharing and the rows only when it holds (see SectionFieldsOptions). */
  condition?: Condition;
};

export type SectionBuilder = {
  /** The content blocks, as declared by the host (the site's rendering reads their layout flags). */
  blocks: ContentBlock[];
  /** The documents' sections field: a stack of « Section » (and « Shared section ») blocks. */
  field: Field;
  /** The fields of the shared sections collection (the collection adds its title). */
  sharedFields: Field[];
  /** beforeChange hook of the documents: copies sections ticked « save as shared ». */
  beforeChange: CollectionBeforeChangeHook[];
};

export function createSectionBuilder({blocks, settings = [], fieldName = 'sections', shared = false, condition}: SectionBuilderOptions): SectionBuilder {
  /** A section built in place. */
  const sectionBlock: Block = {
    slug: 'section',
    labels: {singular: T.blocks.section.singular, plural: T.blocks.section.plural},
    fields: sectionFields({blocks, settings, shareable: Boolean(shared), condition}),
  };
  const sectionBlocks: Block[] = [sectionBlock];
  if (shared) {
    /** A shared section, edited in one place for every document. */
    sectionBlocks.push({
      slug: 'sharedSection',
      labels: {singular: T.blocks.sharedSection.singular, plural: T.blocks.sharedSection.plural},
      fields: [{name: 'section', type: 'relationship', relationTo: shared.collection as CollectionSlug, label: T.blocks.sectionField, required: true}],
    });
  }
  return {
    blocks,
    field: {
      name: fieldName,
      type: 'blocks',
      label: T.blocks.sectionsField,
      labels: {singular: T.blocks.section.singular, plural: T.blocks.section.plural},
      blocks: sectionBlocks,
      admin: {description: T.blocks.sectionsDescription},
    },
    sharedFields: sectionFields({blocks, settings, shareable: false, condition}),
    beforeChange: shared ? [shareSectionsHook({fieldName, collection: shared.collection})] : [],
  };
}
