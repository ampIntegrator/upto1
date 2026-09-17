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
import * as migration_20260915_102142_media_block from './20260915_102142_media_block';
import * as migration_20260915_105105_media_quote_block from './20260915_105105_media_quote_block';
import * as migration_20260915_155338_languages_global from './20260915_155338_languages_global';
import * as migration_20260915_155407_drop_settings_languages from './20260915_155407_drop_settings_languages';
import * as migration_20260916_093855_add_column_blocks from './20260916_093855_add_column_blocks';
import * as migration_20260916_103955_add_collection_block from './20260916_103955_add_collection_block';
import * as migration_20260916_112754_add_faq_tag from './20260916_112754_add_faq_tag';
import * as migration_20260916_115032_add_title_tags from './20260916_115032_add_title_tags';
import * as migration_20260916_220547_add_text_box from './20260916_220547_add_text_box';
import * as migration_20260916_220607_drop_text_block from './20260916_220607_drop_text_block';
import * as migration_20260917_093047_add_tabs_block from './20260917_093047_add_tabs_block';
import * as migration_20260917_094125_add_button_group_block from './20260917_094125_add_button_group_block';
import * as migration_20260917_101827_add_user_session_days from './20260917_101827_add_user_session_days';
import * as migration_20260917_120207_add_blog_authors_posts_settings from './20260917_120207_add_blog_authors_posts_settings';
import * as migration_20260917_120422_add_section_heading_post_card from './20260917_120422_add_section_heading_post_card';
import * as migration_20260917_121129_add_figure_column_blocks from './20260917_121129_add_figure_column_blocks';
import * as migration_20260917_122335_add_blog_global from './20260917_122335_add_blog_global';
import * as migration_20260917_122357_remove_settings_blog from './20260917_122357_remove_settings_blog';
import * as migration_20260917_130141_add_listing_empty_label from './20260917_130141_add_listing_empty_label';
import * as migration_20260917_130513_add_case_studies_portfolio from './20260917_130513_add_case_studies_portfolio';
import * as migration_20260917_130823_add_case_card_collection_source from './20260917_130823_add_case_card_collection_source';
import * as migration_20260917_132335_add_listing_slug_seo from './20260917_132335_add_listing_slug_seo';
import * as migration_20260917_132348_remove_listing_page from './20260917_132348_remove_listing_page';

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
    name: '20260915_094635_empty_block',
  },
  {
    up: migration_20260915_102142_media_block.up,
    down: migration_20260915_102142_media_block.down,
    name: '20260915_102142_media_block',
  },
  {
    up: migration_20260915_105105_media_quote_block.up,
    down: migration_20260915_105105_media_quote_block.down,
    name: '20260915_105105_media_quote_block',
  },
  {
    up: migration_20260915_155338_languages_global.up,
    down: migration_20260915_155338_languages_global.down,
    name: '20260915_155338_languages_global',
  },
  {
    up: migration_20260915_155407_drop_settings_languages.up,
    down: migration_20260915_155407_drop_settings_languages.down,
    name: '20260915_155407_drop_settings_languages',
  },
  {
    up: migration_20260916_093855_add_column_blocks.up,
    down: migration_20260916_093855_add_column_blocks.down,
    name: '20260916_093855_add_column_blocks',
  },
  {
    up: migration_20260916_103955_add_collection_block.up,
    down: migration_20260916_103955_add_collection_block.down,
    name: '20260916_103955_add_collection_block',
  },
  {
    up: migration_20260916_112754_add_faq_tag.up,
    down: migration_20260916_112754_add_faq_tag.down,
    name: '20260916_112754_add_faq_tag',
  },
  {
    up: migration_20260916_115032_add_title_tags.up,
    down: migration_20260916_115032_add_title_tags.down,
    name: '20260916_115032_add_title_tags',
  },
  {
    up: migration_20260916_220547_add_text_box.up,
    down: migration_20260916_220547_add_text_box.down,
    name: '20260916_220547_add_text_box',
  },
  {
    up: migration_20260916_220607_drop_text_block.up,
    down: migration_20260916_220607_drop_text_block.down,
    name: '20260916_220607_drop_text_block',
  },
  {
    up: migration_20260917_093047_add_tabs_block.up,
    down: migration_20260917_093047_add_tabs_block.down,
    name: '20260917_093047_add_tabs_block',
  },
  {
    up: migration_20260917_094125_add_button_group_block.up,
    down: migration_20260917_094125_add_button_group_block.down,
    name: '20260917_094125_add_button_group_block',
  },
  {
    up: migration_20260917_101827_add_user_session_days.up,
    down: migration_20260917_101827_add_user_session_days.down,
    name: '20260917_101827_add_user_session_days',
  },
  {
    up: migration_20260917_120207_add_blog_authors_posts_settings.up,
    down: migration_20260917_120207_add_blog_authors_posts_settings.down,
    name: '20260917_120207_add_blog_authors_posts_settings',
  },
  {
    up: migration_20260917_120422_add_section_heading_post_card.up,
    down: migration_20260917_120422_add_section_heading_post_card.down,
    name: '20260917_120422_add_section_heading_post_card',
  },
  {
    up: migration_20260917_121129_add_figure_column_blocks.up,
    down: migration_20260917_121129_add_figure_column_blocks.down,
    name: '20260917_121129_add_figure_column_blocks',
  },
  {
    up: migration_20260917_122335_add_blog_global.up,
    down: migration_20260917_122335_add_blog_global.down,
    name: '20260917_122335_add_blog_global',
  },
  {
    up: migration_20260917_122357_remove_settings_blog.up,
    down: migration_20260917_122357_remove_settings_blog.down,
    name: '20260917_122357_remove_settings_blog',
  },
  {
    up: migration_20260917_130141_add_listing_empty_label.up,
    down: migration_20260917_130141_add_listing_empty_label.down,
    name: '20260917_130141_add_listing_empty_label',
  },
  {
    up: migration_20260917_130513_add_case_studies_portfolio.up,
    down: migration_20260917_130513_add_case_studies_portfolio.down,
    name: '20260917_130513_add_case_studies_portfolio',
  },
  {
    up: migration_20260917_130823_add_case_card_collection_source.up,
    down: migration_20260917_130823_add_case_card_collection_source.down,
    name: '20260917_130823_add_case_card_collection_source',
  },
  {
    up: migration_20260917_132335_add_listing_slug_seo.up,
    down: migration_20260917_132335_add_listing_slug_seo.down,
    name: '20260917_132335_add_listing_slug_seo',
  },
  {
    up: migration_20260917_132348_remove_listing_page.up,
    down: migration_20260917_132348_remove_listing_page.down,
    name: '20260917_132348_remove_listing_page'
  },
];
