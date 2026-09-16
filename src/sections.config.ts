import type {Field} from 'payload';

import {CARD_BLOCKS} from '@/fields/blocks/cardBlocks';
import {collectionBlock} from '@/fields/blocks/collectionBlock';
import {compareCardBlock} from '@/fields/blocks/compareCardBlock';
import {faqBlock} from '@/fields/blocks/faqBlock';
import {mediaBlock} from '@/fields/blocks/mediaBlock';
import {mediaQuoteBlock} from '@/fields/blocks/mediaQuoteBlock';
import {planBlock} from '@/fields/blocks/planBlock';
import {priceSingleBlock} from '@/fields/blocks/priceSingleBlock';
import {processStepsBlock} from '@/fields/blocks/processStepsBlock';
import {testimonialBlock} from '@/fields/blocks/testimonialBlock';
import {textBlock} from '@/fields/blocks/textBlock';
import {createSectionBuilder} from '@/fields/sections/builder';
import {sectionsText as T} from '@/i18n/admin/sections';

/**
 * Site-side configuration of the section builder: everything that is specific to
 * Vidomia and to the Orbita theme lives here, so that src/fields/sections/ stays a
 * neutral tool (the future plugin). Two things are declared:
 *   - the section settings shown before the rows: the background of the Astryx Section
 *     component (light with tint and texture, night, or media with overlay);
 *   - the content blocks offered in a column, each with its minimum width.
 * The rendering of these settings and blocks is in src/lib/sections.ts and
 * src/components/PageSections.tsx.
 */

type Sibling = Record<string, unknown>;
const when = (name: string, ...values: string[]) => (_d: unknown, s: Sibling) => values.includes(String(s?.[name] ?? ''));
/** Settings are asked in order: the rest of the section appears once a background is chosen. */
const modeChosen = when('mode', 'light', 'dark', 'media');

/** Background of a section: light, night or media, then the settings of that background. */
export const orbitaSectionSettings: Field[] = [
  // 1. the background (no default value: the question must be asked)
  {
    name: 'mode',
    type: 'radio',
    label: T.settings.background,
    required: true,
    options: [
      {label: T.settings.backgroundLight, value: 'light'},
      {label: T.settings.backgroundDark, value: 'dark'},
      {label: T.settings.backgroundMedia, value: 'media'},
    ],
  },
  // 2a. light: tint and texture, side by side
  {
    type: 'row',
    admin: {condition: when('mode', 'light')},
    fields: [
      {
        name: 'tint',
        type: 'radio',
        label: T.settings.tint,
        required: true,
        options: [
          {label: T.settings.tintBody, value: 'body'},
          {label: T.settings.tintHighlight, value: 'highlight'},
        ],
        // condition repeated on the field (not only on the row): without it, Payload makes
        // the column required in the database, and a night or media section could no longer be saved
        admin: {width: '50%', condition: when('mode', 'light')},
      },
      {
        name: 'texture',
        type: 'radio',
        label: T.settings.texture,
        defaultValue: 'none',
        options: [
          {label: T.settings.textureNone, value: 'none'},
          {label: T.settings.textureGrid, value: 'grid'},
          {label: T.settings.textureDots, value: 'dots'},
          {label: T.settings.textureLosange, value: 'losange'},
        ],
        admin: {width: '50%'},
      },
    ],
  },
  // 2b. night: the colour, no texture
  {
    name: 'darkStyle',
    type: 'radio',
    label: T.settings.tint,
    required: true,
    options: [
      {label: T.settings.darkNight, value: 'night'},
      {label: T.settings.darkNightHalo, value: 'night-halo'},
    ],
    admin: {condition: when('mode', 'dark')},
  },
  // 2c. media: the type, then the files and the overlay
  {
    name: 'mediaType',
    type: 'radio',
    label: T.settings.mediaType,
    required: true,
    options: [
      {label: T.settings.mediaImage, value: 'image'},
      {label: T.settings.mediaVideo, value: 'video'},
    ],
    admin: {condition: when('mode', 'media')},
  },
  {name: 'image', type: 'upload', relationTo: 'media', label: T.settings.image, admin: {condition: (_d, s: Sibling) => s?.mode === 'media' && s?.mediaType === 'image'}},
  {
    type: 'row',
    admin: {condition: (_d, s: Sibling) => s?.mode === 'media' && s?.mediaType === 'video'},
    fields: [
      {name: 'video', type: 'upload', relationTo: 'media', label: T.settings.video},
      {name: 'poster', type: 'upload', relationTo: 'media', label: T.settings.poster},
    ],
  },
  {name: 'overlay', type: 'number', label: T.settings.overlay, min: 0, max: 1, defaultValue: 0.3, admin: {step: 0.05, condition: (_d, s: Sibling) => s?.mode === 'media' && ['image', 'video'].includes(String(s?.mediaType ?? ''))}},
];

/** The site's section builder: pages get `sections.field` and `sections.beforeChange`, the shared collection `sections.sharedFields`. */
export const sections = createSectionBuilder({
  blocks: [mediaBlock, mediaQuoteBlock, textBlock, ...CARD_BLOCKS, priceSingleBlock, planBlock, faqBlock, testimonialBlock, compareCardBlock, processStepsBlock, collectionBlock],
  settings: orbitaSectionSettings,
  fieldName: 'sections',
  shared: {collection: 'sections'},
  condition: modeChosen,
});
