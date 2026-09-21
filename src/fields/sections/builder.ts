import type {Block, CollectionBeforeChangeHook, CollectionSlug, Condition, Field} from 'payload';

import {sectionsText as T} from '@/i18n/admin/sections';

import type {ContentBlock} from './contentBlock';
import {GRID_COLUMNS, type PresetRow, rowTotal} from './grid';
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
  /** Extra thumbnails that create a row with blocks already placed (the slugs must be in `blocks`). */
  presetRows?: PresetRow[];
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

export function createSectionBuilder({blocks, settings = [], fieldName = 'sections', shared = false, condition, presetRows = []}: SectionBuilderOptions): SectionBuilder {
  // configuration errors surface at start-up, not in the admin
  const slugs = new Set(blocks.map((b) => b.block.slug));
  for (const p of presetRows) {
    if (rowTotal(p.spans) !== GRID_COLUMNS) throw new Error(`Section builder: preset row « ${p.id} » does not add up to ${GRID_COLUMNS}.`);
    if (p.blocks.length > p.spans.length) throw new Error(`Section builder: preset row « ${p.id} » has more blocks than columns.`);
    for (const slug of p.blocks) if (slug && !slugs.has(slug)) throw new Error(`Section builder: preset row « ${p.id} » uses the unknown block « ${slug} ».`);
  }
  /** A section built in place. */
  const sectionBlock: Block = {
    slug: 'section',
    labels: {singular: T.blocks.section.singular, plural: T.blocks.section.plural},
    fields: sectionFields({blocks, settings, shareable: Boolean(shared), condition, presetRows}),
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
      // every section folded when the document opens (inside: settings folded, rows open)
      admin: {description: T.blocks.sectionsDescription, initCollapsed: true},
    },
    sharedFields: sectionFields({blocks, settings, shareable: false, condition, presetRows}),
    beforeChange: shared ? [shareSectionsHook({fieldName, collection: shared.collection})] : [],
  };
}
