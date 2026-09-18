import {createServerFeature} from '@payloadcms/richtext-lexical';

/**
 * Admin shortcut of every site editor: « lorem40 » then a space inserts forty words of lorem
 * ipsum. Client only (a Lexical markdown shortcut): nothing is stored or rendered differently.
 */
export const LoremFeature = createServerFeature({
  feature: {ClientFeature: '@/fields/lorem/LoremFeatureClient#LoremFeatureClient'},
  key: 'lorem',
});
