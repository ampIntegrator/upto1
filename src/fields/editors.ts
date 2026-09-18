import {BoldFeature, EXPERIMENTAL_TableFeature, FixedToolbarFeature, InlineToolbarFeature, ItalicFeature, lexicalEditor, LinkFeature, OrderedListFeature, ParagraphFeature, UnorderedListFeature} from '@payloadcms/richtext-lexical';

import {LoremFeature} from './lorem/feature.server';

/**
 * The restricted rich text editors of the site, rendered by RichText. Server only: never import
 * this file (or a block that imports it) from client code; block slugs live in *Slug.ts files.
 *
 *   tabsEditor    : paragraphs, bold, italic, links, lists (tabs, key points);
 *   textBoxEditor : the same plus tables (text box: pages need tables too).
 * In all of them (the post editor too), « lorem40 » + space inserts forty words of lorem ipsum.
 * The post editor, with headings, quotes, images and inserted blocks, is in blocks/prose.
 */
export const baseFeatures = () => [
  ParagraphFeature(),
  BoldFeature(),
  ItalicFeature(),
  LinkFeature({enabledCollections: ['pages', 'posts', 'case-studies']}),
  UnorderedListFeature(),
  OrderedListFeature(),
  // fixed toolbar above the field and inline toolbar on selection: without them bold and links have no button
  FixedToolbarFeature(),
  InlineToolbarFeature(),
  // « lorem40 » + space: forty words of lorem ipsum (admin shortcut, nothing stored differently)
  LoremFeature(),
];

export const tabsEditor = lexicalEditor({features: () => baseFeatures()});

export const textBoxEditor = lexicalEditor({features: () => [...baseFeatures(), EXPERIMENTAL_TableFeature()]});
