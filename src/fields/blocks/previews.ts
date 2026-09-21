import {EMPTY_SLUG} from '@/fields/sections/emptyBlock';

import {BUTTON_GROUP_SLUG} from './buttonGroupBlock';
import {CARD_SLUGS} from './cardBlocks';
import {CTA_BAND_SLUG, GALLERY_SLUG, KEY_POINTS_SLUG, QUOTE_CARD_SLUG, STATS_BAND_SLUG} from './prose/slugs';
import {CASE_CARD_SLUG} from './caseCardBlock';
import {POST_CARD_SLUG} from './postCardBlock';
import {SECTION_HEADING_SLUG} from './sectionHeadingBlock';
import {COLLECTION_SLUG} from './collectionBlock';
import {COMPARE_CARD_SLUG} from './compareCardBlock';
import {FAQ_SLUG} from './faqBlock';
import {FORM_SLUG} from './formBlock';
import {MEDIA_SLUG} from './mediaBlock';
import {MEDIA_QUOTE_SLUG} from './mediaQuoteBlock';
import {PLAN_SLUG} from './planBlock';
import {PRICE_SINGLE_SLUG} from './priceSingleBlock';
import {PROCESS_STEPS_SLUG} from './processStepsBlock';
import {TESTIMONIAL_SLUG} from './testimonialBlock';
import {TABS_SLUG} from './tabsSlug';
import {TEXT_BOX_SLUG} from './textBoxSlug';

/** Blocks with a picker preview: the /apercu/<slug> route and `pnpm previews:build` follow this list. */
export const PREVIEW_SLUGS: string[] = [EMPTY_SLUG, SECTION_HEADING_SLUG, TEXT_BOX_SLUG, MEDIA_SLUG, MEDIA_QUOTE_SLUG, ...CARD_SLUGS, PRICE_SINGLE_SLUG, PLAN_SLUG, FAQ_SLUG, TESTIMONIAL_SLUG, COMPARE_CARD_SLUG, PROCESS_STEPS_SLUG, TABS_SLUG, BUTTON_GROUP_SLUG, POST_CARD_SLUG, CASE_CARD_SLUG, KEY_POINTS_SLUG, CTA_BAND_SLUG, STATS_BAND_SLUG, QUOTE_CARD_SLUG, GALLERY_SLUG, COLLECTION_SLUG, FORM_SLUG];
