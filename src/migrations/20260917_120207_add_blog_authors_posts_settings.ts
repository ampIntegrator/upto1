import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  	\`block_name\` text,
  	FOREIGN KEY (\`posts_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_collection_order_idx\` ON \`posts_blocks_collection\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_collection_parent_id_idx\` ON \`posts_blocks_collection\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_collection_path_idx\` ON \`posts_blocks_collection\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_collection_posts_category_idx\` ON \`posts_blocks_collection\` (\`posts_category_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_collection_locales\` (
  	\`posts_cta\` text,
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
  await db.run(sql`CREATE TABLE \`authors\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`photo_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`authors_photo_idx\` ON \`authors\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX \`authors_updated_at_idx\` ON \`authors\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`authors_created_at_idx\` ON \`authors\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`authors_locales\` (
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`authors_locales_locale_parent_id_unique\` ON \`authors_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`author_id\` integer REFERENCES authors(id);`)
  await db.run(sql`CREATE INDEX \`posts_author_idx\` ON \`posts\` (\`author_id\`);`)
  await db.run(sql`ALTER TABLE \`posts_locales\` ADD \`cover_caption\` text;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`authors_id\` integer REFERENCES authors(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_authors_id_idx\` ON \`payload_locked_documents_rels\` (\`authors_id\`);`)
  await db.run(sql`ALTER TABLE \`settings\` ADD \`blog_page_id\` integer REFERENCES pages(id);`)
  await db.run(sql`ALTER TABLE \`settings\` ADD \`blog_tone\` text DEFAULT 'light';`)
  await db.run(sql`ALTER TABLE \`settings\` ADD \`blog_per_page\` numeric DEFAULT 12;`)
  await db.run(sql`CREATE INDEX \`settings_blog_blog_page_idx\` ON \`settings\` (\`blog_page_id\`);`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_eyebrow\` text DEFAULT 'Le blog';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_title\` text DEFAULT 'Actualités';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_lead\` text;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_all\` text DEFAULT 'Tous';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_read_more\` text DEFAULT 'Lire l’article';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_date_label\` text DEFAULT 'Publié le';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_toc\` text DEFAULT 'Sommaire';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_category_prefix\` text DEFAULT 'Catégorie';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_more\` text DEFAULT 'Voir le blog';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_related_eyebrow\` text DEFAULT 'Le blog';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_related_title\` text DEFAULT 'Pour continuer <span>sur le sujet.</span>';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`posts_blocks_empty\`;`)
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
  await db.run(sql`DROP TABLE \`posts_blocks_collection\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_collection_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_section_rows_columns\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_section_rows\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_section\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_shared_section\`;`)
  await db.run(sql`DROP TABLE \`authors\`;`)
  await db.run(sql`DROP TABLE \`authors_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`cover_id\` integer,
  	\`slug\` text NOT NULL,
  	\`category_id\` integer NOT NULL,
  	\`published_at\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`cover_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_posts\`("id", "cover_id", "slug", "category_id", "published_at", "updated_at", "created_at") SELECT "id", "cover_id", "slug", "category_id", "published_at", "updated_at", "created_at" FROM \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`ALTER TABLE \`__new_posts\` RENAME TO \`posts\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`posts_cover_idx\` ON \`posts\` (\`cover_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_category_idx\` ON \`posts\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`sections_id\` integer,
  	\`posts_id\` integer,
  	\`categories_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`sections_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "pages_id", "sections_id", "posts_id", "categories_id", "media_id", "users_id") SELECT "id", "order", "parent_id", "path", "pages_id", "sections_id", "posts_id", "categories_id", "media_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_sections_id_idx\` ON \`payload_locked_documents_rels\` (\`sections_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`silo\` text DEFAULT 'blue' NOT NULL,
  	\`brand_name\` text DEFAULT 'Vidomia' NOT NULL,
  	\`logo_id\` integer,
  	\`phone\` text,
  	\`phone_href\` text,
  	\`email\` text,
  	\`address\` text,
  	\`breadcrumb_enabled\` integer DEFAULT true,
  	\`breadcrumb_home_style\` text DEFAULT 'icon',
  	\`section_grid_gap_x\` text DEFAULT '30' NOT NULL,
  	\`section_grid_gap_y\` text DEFAULT '40' NOT NULL,
  	\`section_grid_gap_y_mobile\` text DEFAULT '40' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_settings\`("id", "silo", "brand_name", "logo_id", "phone", "phone_href", "email", "address", "breadcrumb_enabled", "breadcrumb_home_style", "section_grid_gap_x", "section_grid_gap_y", "section_grid_gap_y_mobile", "updated_at", "created_at") SELECT "id", "silo", "brand_name", "logo_id", "phone", "phone_href", "email", "address", "breadcrumb_enabled", "breadcrumb_home_style", "section_grid_gap_x", "section_grid_gap_y", "section_grid_gap_y_mobile", "updated_at", "created_at" FROM \`settings\`;`)
  await db.run(sql`DROP TABLE \`settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_settings\` RENAME TO \`settings\`;`)
  await db.run(sql`CREATE INDEX \`settings_logo_idx\` ON \`settings\` (\`logo_id\`);`)
  await db.run(sql`ALTER TABLE \`posts_locales\` DROP COLUMN \`cover_caption\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_title\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_lead\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_all\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_read_more\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_date_label\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_toc\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_category_prefix\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_more\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_related_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_related_title\`;`)
}
