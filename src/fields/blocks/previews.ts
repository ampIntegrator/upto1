import {EMPTY_SLUG} from '@/fields/sections/emptyBlock';

import {CARD_SLUGS} from './cardBlocks';
import {COLLECTION_SLUG} from './collectionBlock';
import {COMPARE_CARD_SLUG} from './compareCardBlock';
import {FAQ_SLUG} from './faqBlock';
import {MEDIA_SLUG} from './mediaBlock';
import {MEDIA_QUOTE_SLUG} from './mediaQuoteBlock';
import {PLAN_SLUG} from './planBlock';
import {PRICE_SINGLE_SLUG} from './priceSingleBlock';
import {PROCESS_STEPS_SLUG} from './processStepsBlock';
import {TESTIMONIAL_SLUG} from './testimonialBlock';

/** Blocks with a picker preview: the /apercu/<slug> route and `pnpm previews:build` follow this list. */
export const PREVIEW_SLUGS: string[] = [EMPTY_SLUG, MEDIA_SLUG, MEDIA_QUOTE_SLUG, ...CARD_SLUGS, PRICE_SINGLE_SLUG, PLAN_SLUG, FAQ_SLUG, TESTIMONIAL_SLUG, COMPARE_CARD_SLUG, PROCESS_STEPS_SLUG, COLLECTION_SLUG];
