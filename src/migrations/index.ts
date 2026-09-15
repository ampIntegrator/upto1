import * as migration_20260911_154044_site_initial from './20260911_154044_site_initial';
import * as migration_20260911_155220_users_name from './20260911_155220_users_name';
import * as migration_20260911_160753_breadcrumb_settings from './20260911_160753_breadcrumb_settings';
import * as migration_20260911_161603_breadcrumb_home_style from './20260911_161603_breadcrumb_home_style';
import * as migration_20260914_085627_page_sections from './20260914_085627_page_sections';
import * as migration_20260914_092235_section_questions from './20260914_092235_section_questions';
import * as migration_20260914_093340_seo from './20260914_093340_seo';
import * as migration_20260914_094621_card_blocks from './20260914_094621_card_blocks';
import * as migration_20260915_080833_mobile_order from './20260915_080833_mobile_order';
import * as migration_20260915_090426_section_gaps from './20260915_090426_section_gaps';
import * as migration_20260915_094635_empty_block from './20260915_094635_empty_block';

export const migrations = [
  {
    up: migration_20260911_154044_site_initial.up,
    down: migration_20260911_154044_site_initial.down,
    name: '20260911_154044_site_initial',
  },
  {
    up: migration_20260911_155220_users_name.up,
    down: migration_20260911_155220_users_name.down,
    name: '20260911_155220_users_name',
  },
  {
    up: migration_20260911_160753_breadcrumb_settings.up,
    down: migration_20260911_160753_breadcrumb_settings.down,
    name: '20260911_160753_breadcrumb_settings',
  },
  {
    up: migration_20260911_161603_breadcrumb_home_style.up,
    down: migration_20260911_161603_breadcrumb_home_style.down,
    name: '20260911_161603_breadcrumb_home_style',
  },
  {
    up: migration_20260914_085627_page_sections.up,
    down: migration_20260914_085627_page_sections.down,
    name: '20260914_085627_page_sections',
  },
  {
    up: migration_20260914_092235_section_questions.up,
    down: migration_20260914_092235_section_questions.down,
    name: '20260914_092235_section_questions',
  },
  {
    up: migration_20260914_093340_seo.up,
    down: migration_20260914_093340_seo.down,
    name: '20260914_093340_seo',
  },
  {
    up: migration_20260914_094621_card_blocks.up,
    down: migration_20260914_094621_card_blocks.down,
    name: '20260914_094621_card_blocks',
  },
  {
    up: migration_20260915_080833_mobile_order.up,
    down: migration_20260915_080833_mobile_order.down,
    name: '20260915_080833_mobile_order',
  },
  {
    up: migration_20260915_090426_section_gaps.up,
    down: migration_20260915_090426_section_gaps.down,
    name: '20260915_090426_section_gaps',
  },
  {
    up: migration_20260915_094635_empty_block.up,
    down: migration_20260915_094635_empty_block.down,
    name: '20260915_094635_empty_block'
  },
];
