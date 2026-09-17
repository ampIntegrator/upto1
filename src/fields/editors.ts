import {BoldFeature, EXPERIMENTAL_TableFeature, FixedToolbarFeature, InlineToolbarFeature, ItalicFeature, lexicalEditor, LinkFeature, OrderedListFeature, ParagraphFeature, UnorderedListFeature} from '@payloadcms/richtext-lexical';

/**
 * The restricted rich text editors of the site, rendered by RichText. Server only: never import
 * this file (or a block that imports it) from client code; block slugs live in *Slug.ts files.
 *
 *   tabsEditor    : paragraphs, bold, italic, links, lists (tabs, key points);
 *   textBoxEditor : the same plus tables (text box: pages need tables too).
 * The post editor, with headings, quotes, images and inserted blocks, is in blocks/prose.
 */
export const baseFeatures = () => [
  ParagraphFeature(),
  BoldFeature(),
  ItalicFeature(),
  LinkFeature({enabledCollections: ['pages', 'posts']}),
  UnorderedListFeature(),
  OrderedListFeature(),
  // fixed toolbar above the field and inline toolbar on selection: without them bold and links have no button
  FixedToolbarFeature(),
  InlineToolbarFeature(),
];

export const tabsEditor = lexicalEditor({features: () => baseFeatures()});

export const textBoxEditor = lexicalEditor({features: () => [...baseFeatures(), EXPERIMENTAL_TableFeature()]});
