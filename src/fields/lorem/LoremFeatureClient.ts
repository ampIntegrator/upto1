'use client';
import {createClientFeature} from '@payloadcms/richtext-lexical/client';

import {loremWords} from './words';

/** Typing « lorem40 » then a space replaces it with forty words of lorem ipsum (1 to 999 words). */
const LOREM_SHORTCUT = {
  dependencies: [],
  regExp: /(?<=^|\s)lorem(\d{1,3}) $/i,
  trigger: ' ',
  type: 'text-match' as const,
  replace: (node: {setTextContent: (text: string) => unknown; select: () => unknown}, match: RegExpMatchArray) => {
    const count = Number(match[1]);
    if (!count) return;
    node.setTextContent(`${loremWords(count)} `);
    node.select();
  },
};

export const LoremFeatureClient = createClientFeature({
  markdownTransformers: [LOREM_SHORTCUT as never],
});
