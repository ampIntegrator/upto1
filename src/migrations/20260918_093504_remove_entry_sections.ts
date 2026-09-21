import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`posts_blocks_empty\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_section_heading\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_section_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_text_box_badges\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_text_box_badges_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_text_box_buttons\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_text_box_buttons_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_text_box\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_text_box_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_media\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_media_quote\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_media_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_image\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_image_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_icon\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_icon_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_number\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_number_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_title\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_title_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_image_link\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_image_link_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_icon_link\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_icon_link_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_number_link\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_number_link_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_title_link\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_card_title_link_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_price_single_features\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_price_single_features_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_price_single\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_price_single_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_plan_features\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_plan_features_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_plan\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_plan_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_testimonial\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_testimonial_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_compare_card_items\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_compare_card_items_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_compare_card\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_compare_card_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_process_steps_steps_checks\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_process_steps_steps_checks_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_process_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_process_steps_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_process_steps\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_tabs_items\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_tabs_items_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_tabs\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_button_group_buttons\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_button_group_buttons_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_button_group\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_post_card\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_case_card\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_key_points\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_key_points_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_cta_band\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_cta_band_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_stats_band_items\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_stats_band_items_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_stats_band\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_quote_card\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_quote_card_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_collection\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_collection_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_section_rows_columns\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_section_rows\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_section\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_shared_section\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_empty\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_section_heading\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_section_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_text_box_badges\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_text_box_badges_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_text_box_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_text_box_buttons_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_text_box\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_text_box_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_media\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_media_quote\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_media_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_image\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_image_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_icon\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_icon_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_number\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_number_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_title\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_title_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_image_link\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_image_link_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_icon_link\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_icon_link_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_number_link\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_number_link_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_title_link\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_title_link_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_price_single_features\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_price_single_features_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_price_single\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_price_single_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_plan_features\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_plan_features_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_plan\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_plan_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_testimonial\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_testimonial_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_compare_card_items\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_compare_card_items_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_compare_card\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_compare_card_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_process_steps_steps_checks\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_process_steps_steps_checks_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_process_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_process_steps_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_process_steps\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_tabs_items\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_tabs_items_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_tabs\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_button_group_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_button_group_buttons_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_button_group\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_post_card\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_case_card\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_key_points\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_key_points_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_cta_band\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_cta_band_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_stats_band_items\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_stats_band_items_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_stats_band\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_quote_card\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_quote_card_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_collection\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_collection_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_section_rows_columns\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_section_rows\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_section\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_shared_section\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`posts_blocks_empty\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_empty_order_idx\` ON \`posts_blocks_empty\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_empty_parent_id_idx\` ON \`posts_blocks_empty\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_empty_path_idx\` ON \`posts_blocks_empty\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_section_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text DEFAULT 'h2',
  	\`align\` text DEFAULT 'center',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_section_heading_order_idx\` ON \`posts_blocks_section_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_section_heading_parent_id_idx\` ON \`posts_blocks_section_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_section_heading_path_idx\` ON \`posts_blocks_section_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_section_heading_locales\` (
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_section_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_section_heading_locales_locale_parent_id_unique\` ON \`posts_blocks_section_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_text_box_badges\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'high',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_text_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_text_box_badges_order_idx\` ON \`posts_blocks_text_box_badges\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_text_box_badges_parent_id_idx\` ON \`posts_blocks_text_box_badges\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_text_box_badges_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_text_box_badges\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_text_box_badges_locales_locale_parent_id_unique\` ON \`posts_blocks_text_box_badges_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_text_box_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`shape\` text DEFAULT 'simple',
  	\`variant\` text DEFAULT 'primary',
  	\`size\` text DEFAULT 'md',
  	\`icon_key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_text_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_text_box_buttons_order_idx\` ON \`posts_blocks_text_box_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_text_box_buttons_parent_id_idx\` ON \`posts_blocks_text_box_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_text_box_buttons_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_text_box_buttons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_text_box_buttons_locales_locale_parent_id_uniqu\` ON \`posts_blocks_text_box_buttons_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_text_box\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title_tag\` text DEFAULT 'h2',
  	\`title_size\` text DEFAULT 'heading-1',
  	\`framed\` integer DEFAULT false,
  	\`center\` integer DEFAULT false,
  	\`v_align\` text DEFAULT 'start',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_text_box_order_idx\` ON \`posts_blocks_text_box\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_text_box_parent_id_idx\` ON \`posts_blocks_text_box\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_text_box_path_idx\` ON \`posts_blocks_text_box\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_text_box_locales\` (
  	\`title\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_text_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_text_box_locales_locale_parent_id_unique\` ON \`posts_blocks_text_box_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`min_height\` text DEFAULT '320',
  	\`min_height_mobile\` text DEFAULT '240',
  	\`overlay\` numeric DEFAULT 0,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_media_order_idx\` ON \`posts_blocks_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_media_parent_id_idx\` ON \`posts_blocks_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_media_path_idx\` ON \`posts_blocks_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_media_image_idx\` ON \`posts_blocks_media\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_media_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`tag\` text DEFAULT 'h2',
  	\`size\` text DEFAULT 'display-3',
  	\`min_height\` text DEFAULT '320',
  	\`min_height_mobile\` text DEFAULT '240',
  	\`overlay\` numeric DEFAULT 0.4,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_media_quote_order_idx\` ON \`posts_blocks_media_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_media_quote_parent_id_idx\` ON \`posts_blocks_media_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_media_quote_path_idx\` ON \`posts_blocks_media_quote\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_media_quote_image_idx\` ON \`posts_blocks_media_quote\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_media_quote_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_media_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_media_quote_locales_locale_parent_id_unique\` ON \`posts_blocks_media_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`tag\` text DEFAULT 'h3',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_image_order_idx\` ON \`posts_blocks_card_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_image_parent_id_idx\` ON \`posts_blocks_card_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_image_path_idx\` ON \`posts_blocks_card_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_image_image_idx\` ON \`posts_blocks_card_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_image_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_card_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_card_image_locales_locale_parent_id_unique\` ON \`posts_blocks_card_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_icon\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_key\` text,
  	\`tag\` text DEFAULT 'h3',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_icon_order_idx\` ON \`posts_blocks_card_icon\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_icon_parent_id_idx\` ON \`posts_blocks_card_icon\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_icon_path_idx\` ON \`posts_blocks_card_icon\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_icon_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_card_icon\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_card_icon_locales_locale_parent_id_unique\` ON \`posts_blocks_card_icon_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`tag\` text DEFAULT 'h3',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_number_order_idx\` ON \`posts_blocks_card_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_number_parent_id_idx\` ON \`posts_blocks_card_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_number_path_idx\` ON \`posts_blocks_card_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_number_locales\` (
  	\`prefix\` text,
  	\`suffix\` text,
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_card_number\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_card_number_locales_locale_parent_id_unique\` ON \`posts_blocks_card_number_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_title\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text DEFAULT 'h3',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_title_order_idx\` ON \`posts_blocks_card_title\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_title_parent_id_idx\` ON \`posts_blocks_card_title\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_title_path_idx\` ON \`posts_blocks_card_title\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_title_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_card_title\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_card_title_locales_locale_parent_id_unique\` ON \`posts_blocks_card_title_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_image_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`tag\` text DEFAULT 'h3',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_image_link_order_idx\` ON \`posts_blocks_card_image_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_image_link_parent_id_idx\` ON \`posts_blocks_card_image_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_image_link_path_idx\` ON \`posts_blocks_card_image_link\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_image_link_image_idx\` ON \`posts_blocks_card_image_link\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_image_link_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_card_image_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_card_image_link_locales_locale_parent_id_unique\` ON \`posts_blocks_card_image_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_icon_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_key\` text,
  	\`tag\` text DEFAULT 'h3',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_icon_link_order_idx\` ON \`posts_blocks_card_icon_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_icon_link_parent_id_idx\` ON \`posts_blocks_card_icon_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_icon_link_path_idx\` ON \`posts_blocks_card_icon_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_icon_link_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_card_icon_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_card_icon_link_locales_locale_parent_id_unique\` ON \`posts_blocks_card_icon_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_number_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`tag\` text DEFAULT 'h3',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_number_link_order_idx\` ON \`posts_blocks_card_number_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_number_link_parent_id_idx\` ON \`posts_blocks_card_number_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_number_link_path_idx\` ON \`posts_blocks_card_number_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_number_link_locales\` (
  	\`prefix\` text,
  	\`suffix\` text,
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_card_number_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_card_number_link_locales_locale_parent_id_uniqu\` ON \`posts_blocks_card_number_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_title_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text DEFAULT 'h3',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_title_link_order_idx\` ON \`posts_blocks_card_title_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_title_link_parent_id_idx\` ON \`posts_blocks_card_title_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_card_title_link_path_idx\` ON \`posts_blocks_card_title_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_card_title_link_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_card_title_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_card_title_link_locales_locale_parent_id_unique\` ON \`posts_blocks_card_title_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_price_single_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_price_single\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_price_single_features_order_idx\` ON \`posts_blocks_price_single_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_price_single_features_parent_id_idx\` ON \`posts_blocks_price_single_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_price_single_features_locales\` (
  	\`label\` text,
  	\`end\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_price_single_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_price_single_features_locales_locale_parent_id_\` ON \`posts_blocks_price_single_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_price_single\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`price_value\` text,
  	\`price_currency\` text DEFAULT '€',
  	\`cta_href\` text,
  	\`guarantee_title_tag\` text DEFAULT 'p',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_price_single_order_idx\` ON \`posts_blocks_price_single\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_price_single_parent_id_idx\` ON \`posts_blocks_price_single\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_price_single_path_idx\` ON \`posts_blocks_price_single\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_price_single_locales\` (
  	\`features_label\` text,
  	\`total_label\` text,
  	\`total_value\` text,
  	\`price_label\` text,
  	\`price_period\` text,
  	\`cta_label\` text,
  	\`mention\` text,
  	\`guarantee_title\` text,
  	\`guarantee_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_price_single\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_price_single_locales_locale_parent_id_unique\` ON \`posts_blocks_price_single_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_plan_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_plan\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_plan_features_order_idx\` ON \`posts_blocks_plan_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_plan_features_parent_id_idx\` ON \`posts_blocks_plan_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_plan_features_locales\` (
  	\`label\` text,
  	\`end\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_plan_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_plan_features_locales_locale_parent_id_unique\` ON \`posts_blocks_plan_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_plan\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name_tag\` text DEFAULT 'p',
  	\`price_value\` text,
  	\`price_currency\` text DEFAULT '€',
  	\`featured\` integer DEFAULT false,
  	\`cta_href\` text,
  	\`guarantee_title_tag\` text DEFAULT 'p',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_plan_order_idx\` ON \`posts_blocks_plan\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_plan_parent_id_idx\` ON \`posts_blocks_plan\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_plan_path_idx\` ON \`posts_blocks_plan\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_plan_locales\` (
  	\`name\` text,
  	\`tagline\` text,
  	\`price_period\` text,
  	\`badge\` text,
  	\`inherits\` text,
  	\`features_label\` text,
  	\`cta_label\` text,
  	\`mention\` text,
  	\`guarantee_title\` text,
  	\`guarantee_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_plan\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_plan_locales_locale_parent_id_unique\` ON \`posts_blocks_plan_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_faq_items_order_idx\` ON \`posts_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_faq_items_parent_id_idx\` ON \`posts_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_faq_items_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_faq_items_locales_locale_parent_id_unique\` ON \`posts_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mode\` text DEFAULT 'single',
  	\`columns\` text DEFAULT '1',
  	\`first_open\` integer DEFAULT true,
  	\`tag\` text DEFAULT 'h3',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_faq_order_idx\` ON \`posts_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_faq_parent_id_idx\` ON \`posts_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_faq_path_idx\` ON \`posts_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_testimonial\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_testimonial_order_idx\` ON \`posts_blocks_testimonial\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_testimonial_parent_id_idx\` ON \`posts_blocks_testimonial\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_testimonial_path_idx\` ON \`posts_blocks_testimonial\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_testimonial_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`result\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_testimonial\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_testimonial_locales_locale_parent_id_unique\` ON \`posts_blocks_testimonial_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_compare_card_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_compare_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_compare_card_items_order_idx\` ON \`posts_blocks_compare_card_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_compare_card_items_parent_id_idx\` ON \`posts_blocks_compare_card_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_compare_card_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_compare_card_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_compare_card_items_locales_locale_parent_id_uni\` ON \`posts_blocks_compare_card_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_compare_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`chip_tone\` text DEFAULT 'accent',
  	\`tone\` text DEFAULT 'check',
  	\`featured\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_compare_card_order_idx\` ON \`posts_blocks_compare_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_compare_card_parent_id_idx\` ON \`posts_blocks_compare_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_compare_card_path_idx\` ON \`posts_blocks_compare_card\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_compare_card_locales\` (
  	\`chip_label\` text,
  	\`meta\` text,
  	\`quote\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_compare_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_compare_card_locales_locale_parent_id_unique\` ON \`posts_blocks_compare_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_process_steps_steps_checks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_process_steps_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_process_steps_steps_checks_order_idx\` ON \`posts_blocks_process_steps_steps_checks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_process_steps_steps_checks_parent_id_idx\` ON \`posts_blocks_process_steps_steps_checks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_process_steps_steps_checks_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_process_steps_steps_checks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_process_steps_steps_checks_locales_locale_paren\` ON \`posts_blocks_process_steps_steps_checks_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_process_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`asterisk\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_process_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_process_steps_steps_order_idx\` ON \`posts_blocks_process_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_process_steps_steps_parent_id_idx\` ON \`posts_blocks_process_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_process_steps_steps_locales\` (
  	\`title\` text,
  	\`duration\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_process_steps_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_process_steps_steps_locales_locale_parent_id_un\` ON \`posts_blocks_process_steps_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text DEFAULT 'h3',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_process_steps_order_idx\` ON \`posts_blocks_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_process_steps_parent_id_idx\` ON \`posts_blocks_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_process_steps_path_idx\` ON \`posts_blocks_process_steps\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_tabs_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_tabs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_tabs_items_order_idx\` ON \`posts_blocks_tabs_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_tabs_items_parent_id_idx\` ON \`posts_blocks_tabs_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_tabs_items_locales\` (
  	\`label\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_tabs_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_tabs_items_locales_locale_parent_id_unique\` ON \`posts_blocks_tabs_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_tabs_order_idx\` ON \`posts_blocks_tabs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_tabs_parent_id_idx\` ON \`posts_blocks_tabs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_tabs_path_idx\` ON \`posts_blocks_tabs\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_button_group_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`shape\` text DEFAULT 'simple',
  	\`variant\` text DEFAULT 'primary',
  	\`size\` text DEFAULT 'md',
  	\`icon_key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_button_group\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_button_group_buttons_order_idx\` ON \`posts_blocks_button_group_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_button_group_buttons_parent_id_idx\` ON \`posts_blocks_button_group_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_button_group_buttons_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_button_group_buttons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_button_group_buttons_locales_locale_parent_id_u\` ON \`posts_blocks_button_group_buttons_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_button_group\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mode\` text DEFAULT 'spaced',
  	\`width\` text DEFAULT 'natural',
  	\`align\` text DEFAULT 'start',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_button_group_order_idx\` ON \`posts_blocks_button_group\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_button_group_parent_id_idx\` ON \`posts_blocks_button_group\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_button_group_path_idx\` ON \`posts_blocks_button_group\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_post_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`post_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_post_card_order_idx\` ON \`posts_blocks_post_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_post_card_parent_id_idx\` ON \`posts_blocks_post_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_post_card_path_idx\` ON \`posts_blocks_post_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_post_card_post_idx\` ON \`posts_blocks_post_card\` (\`post_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_case_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`case_study_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`case_study_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_case_card_order_idx\` ON \`posts_blocks_case_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_case_card_parent_id_idx\` ON \`posts_blocks_case_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_case_card_path_idx\` ON \`posts_blocks_case_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_case_card_case_study_idx\` ON \`posts_blocks_case_card\` (\`case_study_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_key_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_key_points_order_idx\` ON \`posts_blocks_key_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_key_points_parent_id_idx\` ON \`posts_blocks_key_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_key_points_path_idx\` ON \`posts_blocks_key_points\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_key_points_locales\` (
  	\`eyebrow\` text DEFAULT 'À retenir',
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_key_points\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_key_points_locales_locale_parent_id_unique\` ON \`posts_blocks_key_points_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_cta_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'icon',
  	\`icon_key\` text,
  	\`button_href\` text,
  	\`button_shape\` text DEFAULT 'simple',
  	\`button_variant\` text DEFAULT 'primary',
  	\`button_size\` text DEFAULT 'md',
  	\`button_icon_key\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_band_order_idx\` ON \`posts_blocks_cta_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_band_parent_id_idx\` ON \`posts_blocks_cta_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_band_path_idx\` ON \`posts_blocks_cta_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_cta_band_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_cta_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_cta_band_locales_locale_parent_id_unique\` ON \`posts_blocks_cta_band_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_stats_band_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_stats_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_stats_band_items_order_idx\` ON \`posts_blocks_stats_band_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_stats_band_items_parent_id_idx\` ON \`posts_blocks_stats_band_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_stats_band_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_stats_band_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_stats_band_items_locales_locale_parent_id_uniqu\` ON \`posts_blocks_stats_band_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_stats_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_stats_band_order_idx\` ON \`posts_blocks_stats_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_stats_band_parent_id_idx\` ON \`posts_blocks_stats_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_stats_band_path_idx\` ON \`posts_blocks_stats_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_quote_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`photo_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_quote_card_order_idx\` ON \`posts_blocks_quote_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_quote_card_parent_id_idx\` ON \`posts_blocks_quote_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_quote_card_path_idx\` ON \`posts_blocks_quote_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_quote_card_photo_idx\` ON \`posts_blocks_quote_card\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_quote_card_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_quote_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_quote_card_locales_locale_parent_id_unique\` ON \`posts_blocks_quote_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_gallery_images_order_idx\` ON \`posts_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_gallery_images_parent_id_idx\` ON \`posts_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_gallery_images_image_idx\` ON \`posts_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`wide_first\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_gallery_order_idx\` ON \`posts_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_gallery_parent_id_idx\` ON \`posts_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_gallery_path_idx\` ON \`posts_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_gallery_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_gallery_locales_locale_parent_id_unique\` ON \`posts_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_collection\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'swipe',
  	\`per_view\` text DEFAULT '3',
  	\`step\` text DEFAULT 'page',
  	\`indicator\` text DEFAULT 'segments',
  	\`arrows\` integer DEFAULT true,
  	\`source\` text DEFAULT 'manual',
  	\`posts_limit\` numeric DEFAULT 6,
  	\`posts_category_id\` integer,
  	\`cases_limit\` numeric DEFAULT 6,
  	\`cases_category_id\` integer,
  	\`more_link\` text DEFAULT 'none',
  	\`more_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`posts_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cases_category_id\`) REFERENCES \`case_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_collection_order_idx\` ON \`posts_blocks_collection\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_collection_parent_id_idx\` ON \`posts_blocks_collection\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_collection_path_idx\` ON \`posts_blocks_collection\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_collection_posts_category_idx\` ON \`posts_blocks_collection\` (\`posts_category_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_collection_cases_category_idx\` ON \`posts_blocks_collection\` (\`cases_category_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_collection_locales\` (
  	\`posts_cta\` text,
  	\`cases_cta\` text,
  	\`more_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_collection\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_collection_locales_locale_parent_id_unique\` ON \`posts_blocks_collection_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_section_rows_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '12',
  	\`mobile_order\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_section_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_section_rows_columns_order_idx\` ON \`posts_blocks_section_rows_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_section_rows_columns_parent_id_idx\` ON \`posts_blocks_section_rows_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_section_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_section_rows_order_idx\` ON \`posts_blocks_section_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_section_rows_parent_id_idx\` ON \`posts_blocks_section_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mode\` text NOT NULL,
  	\`tint\` text,
  	\`texture\` text DEFAULT 'none',
  	\`dark_style\` text,
  	\`media_type\` text,
  	\`image_id\` integer,
  	\`video_id\` integer,
  	\`poster_id\` integer,
  	\`overlay\` numeric DEFAULT 0.3,
  	\`spacing_top\` text DEFAULT '80',
  	\`spacing_bottom\` text DEFAULT '80',
  	\`anchor\` text,
  	\`gap_x\` text DEFAULT 'site',
  	\`gap_y\` text DEFAULT 'site',
  	\`gap_y_mobile\` text DEFAULT 'site',
  	\`save_as_shared\` integer DEFAULT false,
  	\`shared_title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_section_order_idx\` ON \`posts_blocks_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_section_parent_id_idx\` ON \`posts_blocks_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_section_path_idx\` ON \`posts_blocks_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_section_image_idx\` ON \`posts_blocks_section\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_section_video_idx\` ON \`posts_blocks_section\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_section_poster_idx\` ON \`posts_blocks_section\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_shared_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`section_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_shared_section_order_idx\` ON \`posts_blocks_shared_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_shared_section_parent_id_idx\` ON \`posts_blocks_shared_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_shared_section_path_idx\` ON \`posts_blocks_shared_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_shared_section_section_idx\` ON \`posts_blocks_shared_section\` (\`section_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_empty\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_empty_order_idx\` ON \`case_studies_blocks_empty\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_empty_parent_id_idx\` ON \`case_studies_blocks_empty\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_empty_path_idx\` ON \`case_studies_blocks_empty\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_section_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text DEFAULT 'h2',
  	\`align\` text DEFAULT 'center',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_section_heading_order_idx\` ON \`case_studies_blocks_section_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_section_heading_parent_id_idx\` ON \`case_studies_blocks_section_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_section_heading_path_idx\` ON \`case_studies_blocks_section_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_section_heading_locales\` (
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_section_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_section_heading_locales_locale_parent_id\` ON \`case_studies_blocks_section_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_text_box_badges\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'high',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_text_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_text_box_badges_order_idx\` ON \`case_studies_blocks_text_box_badges\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_text_box_badges_parent_id_idx\` ON \`case_studies_blocks_text_box_badges\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_text_box_badges_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_text_box_badges\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_text_box_badges_locales_locale_parent_id\` ON \`case_studies_blocks_text_box_badges_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_text_box_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`shape\` text DEFAULT 'simple',
  	\`variant\` text DEFAULT 'primary',
  	\`size\` text DEFAULT 'md',
  	\`icon_key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_text_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_text_box_buttons_order_idx\` ON \`case_studies_blocks_text_box_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_text_box_buttons_parent_id_idx\` ON \`case_studies_blocks_text_box_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_text_box_buttons_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_text_box_buttons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_text_box_buttons_locales_locale_parent_i\` ON \`case_studies_blocks_text_box_buttons_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_text_box\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title_tag\` text DEFAULT 'h2',
  	\`title_size\` text DEFAULT 'heading-1',
  	\`framed\` integer DEFAULT false,
  	\`center\` integer DEFAULT false,
  	\`v_align\` text DEFAULT 'start',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_text_box_order_idx\` ON \`case_studies_blocks_text_box\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_text_box_parent_id_idx\` ON \`case_studies_blocks_text_box\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_text_box_path_idx\` ON \`case_studies_blocks_text_box\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_text_box_locales\` (
  	\`title\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_text_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_text_box_locales_locale_parent_id_unique\` ON \`case_studies_blocks_text_box_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`min_height\` text DEFAULT '320',
  	\`min_height_mobile\` text DEFAULT '240',
  	\`overlay\` numeric DEFAULT 0,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_media_order_idx\` ON \`case_studies_blocks_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_media_parent_id_idx\` ON \`case_studies_blocks_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_media_path_idx\` ON \`case_studies_blocks_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_media_image_idx\` ON \`case_studies_blocks_media\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_media_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`tag\` text DEFAULT 'h2',
  	\`size\` text DEFAULT 'display-3',
  	\`min_height\` text DEFAULT '320',
  	\`min_height_mobile\` text DEFAULT '240',
  	\`overlay\` numeric DEFAULT 0.4,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_media_quote_order_idx\` ON \`case_studies_blocks_media_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_media_quote_parent_id_idx\` ON \`case_studies_blocks_media_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_media_quote_path_idx\` ON \`case_studies_blocks_media_quote\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_media_quote_image_idx\` ON \`case_studies_blocks_media_quote\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_media_quote_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_media_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_media_quote_locales_locale_parent_id_uni\` ON \`case_studies_blocks_media_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`tag\` text DEFAULT 'h3',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_image_order_idx\` ON \`case_studies_blocks_card_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_image_parent_id_idx\` ON \`case_studies_blocks_card_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_image_path_idx\` ON \`case_studies_blocks_card_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_image_image_idx\` ON \`case_studies_blocks_card_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_image_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_card_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_card_image_locales_locale_parent_id_uniq\` ON \`case_studies_blocks_card_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_icon\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_key\` text,
  	\`tag\` text DEFAULT 'h3',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_icon_order_idx\` ON \`case_studies_blocks_card_icon\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_icon_parent_id_idx\` ON \`case_studies_blocks_card_icon\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_icon_path_idx\` ON \`case_studies_blocks_card_icon\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_icon_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_card_icon\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_card_icon_locales_locale_parent_id_uniqu\` ON \`case_studies_blocks_card_icon_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`tag\` text DEFAULT 'h3',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_number_order_idx\` ON \`case_studies_blocks_card_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_number_parent_id_idx\` ON \`case_studies_blocks_card_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_number_path_idx\` ON \`case_studies_blocks_card_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_number_locales\` (
  	\`prefix\` text,
  	\`suffix\` text,
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_card_number\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_card_number_locales_locale_parent_id_uni\` ON \`case_studies_blocks_card_number_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_title\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text DEFAULT 'h3',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_title_order_idx\` ON \`case_studies_blocks_card_title\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_title_parent_id_idx\` ON \`case_studies_blocks_card_title\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_title_path_idx\` ON \`case_studies_blocks_card_title\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_title_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_card_title\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_card_title_locales_locale_parent_id_uniq\` ON \`case_studies_blocks_card_title_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_image_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`tag\` text DEFAULT 'h3',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_image_link_order_idx\` ON \`case_studies_blocks_card_image_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_image_link_parent_id_idx\` ON \`case_studies_blocks_card_image_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_image_link_path_idx\` ON \`case_studies_blocks_card_image_link\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_image_link_image_idx\` ON \`case_studies_blocks_card_image_link\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_image_link_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_card_image_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_card_image_link_locales_locale_parent_id\` ON \`case_studies_blocks_card_image_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_icon_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_key\` text,
  	\`tag\` text DEFAULT 'h3',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_icon_link_order_idx\` ON \`case_studies_blocks_card_icon_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_icon_link_parent_id_idx\` ON \`case_studies_blocks_card_icon_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_icon_link_path_idx\` ON \`case_studies_blocks_card_icon_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_icon_link_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_card_icon_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_card_icon_link_locales_locale_parent_id_\` ON \`case_studies_blocks_card_icon_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_number_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`tag\` text DEFAULT 'h3',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_number_link_order_idx\` ON \`case_studies_blocks_card_number_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_number_link_parent_id_idx\` ON \`case_studies_blocks_card_number_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_number_link_path_idx\` ON \`case_studies_blocks_card_number_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_number_link_locales\` (
  	\`prefix\` text,
  	\`suffix\` text,
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_card_number_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_card_number_link_locales_locale_parent_i\` ON \`case_studies_blocks_card_number_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_title_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text DEFAULT 'h3',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_title_link_order_idx\` ON \`case_studies_blocks_card_title_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_title_link_parent_id_idx\` ON \`case_studies_blocks_card_title_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_title_link_path_idx\` ON \`case_studies_blocks_card_title_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_title_link_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_card_title_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_card_title_link_locales_locale_parent_id\` ON \`case_studies_blocks_card_title_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_price_single_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_price_single\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_price_single_features_order_idx\` ON \`case_studies_blocks_price_single_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_price_single_features_parent_id_idx\` ON \`case_studies_blocks_price_single_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_price_single_features_locales\` (
  	\`label\` text,
  	\`end\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_price_single_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_price_single_features_locales_locale_par\` ON \`case_studies_blocks_price_single_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_price_single\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`price_value\` text,
  	\`price_currency\` text DEFAULT '€',
  	\`cta_href\` text,
  	\`guarantee_title_tag\` text DEFAULT 'p',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_price_single_order_idx\` ON \`case_studies_blocks_price_single\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_price_single_parent_id_idx\` ON \`case_studies_blocks_price_single\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_price_single_path_idx\` ON \`case_studies_blocks_price_single\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_price_single_locales\` (
  	\`features_label\` text,
  	\`total_label\` text,
  	\`total_value\` text,
  	\`price_label\` text,
  	\`price_period\` text,
  	\`cta_label\` text,
  	\`mention\` text,
  	\`guarantee_title\` text,
  	\`guarantee_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_price_single\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_price_single_locales_locale_parent_id_un\` ON \`case_studies_blocks_price_single_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_plan_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_plan\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_plan_features_order_idx\` ON \`case_studies_blocks_plan_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_plan_features_parent_id_idx\` ON \`case_studies_blocks_plan_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_plan_features_locales\` (
  	\`label\` text,
  	\`end\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_plan_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_plan_features_locales_locale_parent_id_u\` ON \`case_studies_blocks_plan_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_plan\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name_tag\` text DEFAULT 'p',
  	\`price_value\` text,
  	\`price_currency\` text DEFAULT '€',
  	\`featured\` integer DEFAULT false,
  	\`cta_href\` text,
  	\`guarantee_title_tag\` text DEFAULT 'p',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_plan_order_idx\` ON \`case_studies_blocks_plan\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_plan_parent_id_idx\` ON \`case_studies_blocks_plan\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_plan_path_idx\` ON \`case_studies_blocks_plan\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_plan_locales\` (
  	\`name\` text,
  	\`tagline\` text,
  	\`price_period\` text,
  	\`badge\` text,
  	\`inherits\` text,
  	\`features_label\` text,
  	\`cta_label\` text,
  	\`mention\` text,
  	\`guarantee_title\` text,
  	\`guarantee_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_plan\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_plan_locales_locale_parent_id_unique\` ON \`case_studies_blocks_plan_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_faq_items_order_idx\` ON \`case_studies_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_faq_items_parent_id_idx\` ON \`case_studies_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_faq_items_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_faq_items_locales_locale_parent_id_uniqu\` ON \`case_studies_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mode\` text DEFAULT 'single',
  	\`columns\` text DEFAULT '1',
  	\`first_open\` integer DEFAULT true,
  	\`tag\` text DEFAULT 'h3',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_faq_order_idx\` ON \`case_studies_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_faq_parent_id_idx\` ON \`case_studies_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_faq_path_idx\` ON \`case_studies_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_testimonial\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_testimonial_order_idx\` ON \`case_studies_blocks_testimonial\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_testimonial_parent_id_idx\` ON \`case_studies_blocks_testimonial\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_testimonial_path_idx\` ON \`case_studies_blocks_testimonial\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_testimonial_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`result\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_testimonial\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_testimonial_locales_locale_parent_id_uni\` ON \`case_studies_blocks_testimonial_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_compare_card_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_compare_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_compare_card_items_order_idx\` ON \`case_studies_blocks_compare_card_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_compare_card_items_parent_id_idx\` ON \`case_studies_blocks_compare_card_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_compare_card_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_compare_card_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_compare_card_items_locales_locale_parent\` ON \`case_studies_blocks_compare_card_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_compare_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`chip_tone\` text DEFAULT 'accent',
  	\`tone\` text DEFAULT 'check',
  	\`featured\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_compare_card_order_idx\` ON \`case_studies_blocks_compare_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_compare_card_parent_id_idx\` ON \`case_studies_blocks_compare_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_compare_card_path_idx\` ON \`case_studies_blocks_compare_card\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_compare_card_locales\` (
  	\`chip_label\` text,
  	\`meta\` text,
  	\`quote\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_compare_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_compare_card_locales_locale_parent_id_un\` ON \`case_studies_blocks_compare_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_process_steps_steps_checks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_process_steps_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_steps_steps_checks_order_idx\` ON \`case_studies_blocks_process_steps_steps_checks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_steps_steps_checks_parent_id_idx\` ON \`case_studies_blocks_process_steps_steps_checks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_process_steps_steps_checks_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_process_steps_steps_checks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_process_steps_steps_checks_locales_local\` ON \`case_studies_blocks_process_steps_steps_checks_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_process_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`asterisk\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_process_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_steps_steps_order_idx\` ON \`case_studies_blocks_process_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_steps_steps_parent_id_idx\` ON \`case_studies_blocks_process_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_process_steps_steps_locales\` (
  	\`title\` text,
  	\`duration\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_process_steps_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_process_steps_steps_locales_locale_paren\` ON \`case_studies_blocks_process_steps_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text DEFAULT 'h3',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_steps_order_idx\` ON \`case_studies_blocks_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_steps_parent_id_idx\` ON \`case_studies_blocks_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_steps_path_idx\` ON \`case_studies_blocks_process_steps\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_tabs_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_tabs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_items_order_idx\` ON \`case_studies_blocks_tabs_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_items_parent_id_idx\` ON \`case_studies_blocks_tabs_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_tabs_items_locales\` (
  	\`label\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_tabs_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_tabs_items_locales_locale_parent_id_uniq\` ON \`case_studies_blocks_tabs_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_order_idx\` ON \`case_studies_blocks_tabs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_parent_id_idx\` ON \`case_studies_blocks_tabs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_path_idx\` ON \`case_studies_blocks_tabs\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_button_group_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`shape\` text DEFAULT 'simple',
  	\`variant\` text DEFAULT 'primary',
  	\`size\` text DEFAULT 'md',
  	\`icon_key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_button_group\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_button_group_buttons_order_idx\` ON \`case_studies_blocks_button_group_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_button_group_buttons_parent_id_idx\` ON \`case_studies_blocks_button_group_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_button_group_buttons_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_button_group_buttons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_button_group_buttons_locales_locale_pare\` ON \`case_studies_blocks_button_group_buttons_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_button_group\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mode\` text DEFAULT 'spaced',
  	\`width\` text DEFAULT 'natural',
  	\`align\` text DEFAULT 'start',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_button_group_order_idx\` ON \`case_studies_blocks_button_group\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_button_group_parent_id_idx\` ON \`case_studies_blocks_button_group\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_button_group_path_idx\` ON \`case_studies_blocks_button_group\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_post_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`post_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_post_card_order_idx\` ON \`case_studies_blocks_post_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_post_card_parent_id_idx\` ON \`case_studies_blocks_post_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_post_card_path_idx\` ON \`case_studies_blocks_post_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_post_card_post_idx\` ON \`case_studies_blocks_post_card\` (\`post_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_case_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`case_study_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`case_study_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_card_order_idx\` ON \`case_studies_blocks_case_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_card_parent_id_idx\` ON \`case_studies_blocks_case_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_card_path_idx\` ON \`case_studies_blocks_case_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_card_case_study_idx\` ON \`case_studies_blocks_case_card\` (\`case_study_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_key_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_key_points_order_idx\` ON \`case_studies_blocks_key_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_key_points_parent_id_idx\` ON \`case_studies_blocks_key_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_key_points_path_idx\` ON \`case_studies_blocks_key_points\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_key_points_locales\` (
  	\`eyebrow\` text DEFAULT 'À retenir',
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_key_points\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_key_points_locales_locale_parent_id_uniq\` ON \`case_studies_blocks_key_points_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_cta_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'icon',
  	\`icon_key\` text,
  	\`button_href\` text,
  	\`button_shape\` text DEFAULT 'simple',
  	\`button_variant\` text DEFAULT 'primary',
  	\`button_size\` text DEFAULT 'md',
  	\`button_icon_key\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_cta_band_order_idx\` ON \`case_studies_blocks_cta_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_cta_band_parent_id_idx\` ON \`case_studies_blocks_cta_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_cta_band_path_idx\` ON \`case_studies_blocks_cta_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_cta_band_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_cta_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_cta_band_locales_locale_parent_id_unique\` ON \`case_studies_blocks_cta_band_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_stats_band_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_stats_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_band_items_order_idx\` ON \`case_studies_blocks_stats_band_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_band_items_parent_id_idx\` ON \`case_studies_blocks_stats_band_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_stats_band_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_stats_band_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_stats_band_items_locales_locale_parent_i\` ON \`case_studies_blocks_stats_band_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_stats_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_band_order_idx\` ON \`case_studies_blocks_stats_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_band_parent_id_idx\` ON \`case_studies_blocks_stats_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_band_path_idx\` ON \`case_studies_blocks_stats_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_quote_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`photo_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_quote_card_order_idx\` ON \`case_studies_blocks_quote_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_quote_card_parent_id_idx\` ON \`case_studies_blocks_quote_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_quote_card_path_idx\` ON \`case_studies_blocks_quote_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_quote_card_photo_idx\` ON \`case_studies_blocks_quote_card\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_quote_card_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_quote_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_quote_card_locales_locale_parent_id_uniq\` ON \`case_studies_blocks_quote_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_images_order_idx\` ON \`case_studies_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_images_parent_id_idx\` ON \`case_studies_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_images_image_idx\` ON \`case_studies_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`wide_first\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_order_idx\` ON \`case_studies_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_parent_id_idx\` ON \`case_studies_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_path_idx\` ON \`case_studies_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_gallery_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_gallery_locales_locale_parent_id_unique\` ON \`case_studies_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_collection\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'swipe',
  	\`per_view\` text DEFAULT '3',
  	\`step\` text DEFAULT 'page',
  	\`indicator\` text DEFAULT 'segments',
  	\`arrows\` integer DEFAULT true,
  	\`source\` text DEFAULT 'manual',
  	\`posts_limit\` numeric DEFAULT 6,
  	\`posts_category_id\` integer,
  	\`cases_limit\` numeric DEFAULT 6,
  	\`cases_category_id\` integer,
  	\`more_link\` text DEFAULT 'none',
  	\`more_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`posts_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cases_category_id\`) REFERENCES \`case_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_collection_order_idx\` ON \`case_studies_blocks_collection\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_collection_parent_id_idx\` ON \`case_studies_blocks_collection\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_collection_path_idx\` ON \`case_studies_blocks_collection\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_collection_posts_category_idx\` ON \`case_studies_blocks_collection\` (\`posts_category_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_collection_cases_category_idx\` ON \`case_studies_blocks_collection\` (\`cases_category_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_collection_locales\` (
  	\`posts_cta\` text,
  	\`cases_cta\` text,
  	\`more_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_collection\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_blocks_collection_locales_locale_parent_id_uniq\` ON \`case_studies_blocks_collection_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_section_rows_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '12',
  	\`mobile_order\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_section_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_section_rows_columns_order_idx\` ON \`case_studies_blocks_section_rows_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_section_rows_columns_parent_id_idx\` ON \`case_studies_blocks_section_rows_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_section_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_section_rows_order_idx\` ON \`case_studies_blocks_section_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_section_rows_parent_id_idx\` ON \`case_studies_blocks_section_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mode\` text NOT NULL,
  	\`tint\` text,
  	\`texture\` text DEFAULT 'none',
  	\`dark_style\` text,
  	\`media_type\` text,
  	\`image_id\` integer,
  	\`video_id\` integer,
  	\`poster_id\` integer,
  	\`overlay\` numeric DEFAULT 0.3,
  	\`spacing_top\` text DEFAULT '80',
  	\`spacing_bottom\` text DEFAULT '80',
  	\`anchor\` text,
  	\`gap_x\` text DEFAULT 'site',
  	\`gap_y\` text DEFAULT 'site',
  	\`gap_y_mobile\` text DEFAULT 'site',
  	\`save_as_shared\` integer DEFAULT false,
  	\`shared_title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_section_order_idx\` ON \`case_studies_blocks_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_section_parent_id_idx\` ON \`case_studies_blocks_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_section_path_idx\` ON \`case_studies_blocks_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_section_image_idx\` ON \`case_studies_blocks_section\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_section_video_idx\` ON \`case_studies_blocks_section\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_section_poster_idx\` ON \`case_studies_blocks_section\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_shared_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`section_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_shared_section_order_idx\` ON \`case_studies_blocks_shared_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_shared_section_parent_id_idx\` ON \`case_studies_blocks_shared_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_shared_section_path_idx\` ON \`case_studies_blocks_shared_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_shared_section_section_idx\` ON \`case_studies_blocks_shared_section\` (\`section_id\`);`)
}
