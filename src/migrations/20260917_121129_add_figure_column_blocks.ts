import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_key_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_key_points_order_idx\` ON \`pages_blocks_key_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_key_points_parent_id_idx\` ON \`pages_blocks_key_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_key_points_path_idx\` ON \`pages_blocks_key_points\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_key_points_locales\` (
  	\`eyebrow\` text DEFAULT 'À retenir',
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_key_points\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_key_points_locales_locale_parent_id_unique\` ON \`pages_blocks_key_points_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_band\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_band_order_idx\` ON \`pages_blocks_cta_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_band_parent_id_idx\` ON \`pages_blocks_cta_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_band_path_idx\` ON \`pages_blocks_cta_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_band_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_cta_band_locales_locale_parent_id_unique\` ON \`pages_blocks_cta_band_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_band_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_band_items_order_idx\` ON \`pages_blocks_stats_band_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_band_items_parent_id_idx\` ON \`pages_blocks_stats_band_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_band_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats_band_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_stats_band_items_locales_locale_parent_id_uniqu\` ON \`pages_blocks_stats_band_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_band_order_idx\` ON \`pages_blocks_stats_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_band_parent_id_idx\` ON \`pages_blocks_stats_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_band_path_idx\` ON \`pages_blocks_stats_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_quote_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`photo_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_quote_card_order_idx\` ON \`pages_blocks_quote_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_quote_card_parent_id_idx\` ON \`pages_blocks_quote_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_quote_card_path_idx\` ON \`pages_blocks_quote_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_quote_card_photo_idx\` ON \`pages_blocks_quote_card\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_quote_card_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_quote_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_quote_card_locales_locale_parent_id_unique\` ON \`pages_blocks_quote_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_order_idx\` ON \`pages_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_parent_id_idx\` ON \`pages_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_image_idx\` ON \`pages_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`wide_first\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_order_idx\` ON \`pages_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_parent_id_idx\` ON \`pages_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_path_idx\` ON \`pages_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_gallery_locales_locale_parent_id_unique\` ON \`pages_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_key_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_key_points_order_idx\` ON \`sections_blocks_key_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_key_points_parent_id_idx\` ON \`sections_blocks_key_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_key_points_path_idx\` ON \`sections_blocks_key_points\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_key_points_locales\` (
  	\`eyebrow\` text DEFAULT 'À retenir',
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_key_points\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_key_points_locales_locale_parent_id_unique\` ON \`sections_blocks_key_points_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_cta_band\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_cta_band_order_idx\` ON \`sections_blocks_cta_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_cta_band_parent_id_idx\` ON \`sections_blocks_cta_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_cta_band_path_idx\` ON \`sections_blocks_cta_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_cta_band_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_cta_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_cta_band_locales_locale_parent_id_unique\` ON \`sections_blocks_cta_band_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_stats_band_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_stats_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_stats_band_items_order_idx\` ON \`sections_blocks_stats_band_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_stats_band_items_parent_id_idx\` ON \`sections_blocks_stats_band_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_stats_band_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_stats_band_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_stats_band_items_locales_locale_parent_id_un\` ON \`sections_blocks_stats_band_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_stats_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_stats_band_order_idx\` ON \`sections_blocks_stats_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_stats_band_parent_id_idx\` ON \`sections_blocks_stats_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_stats_band_path_idx\` ON \`sections_blocks_stats_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_quote_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`photo_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_quote_card_order_idx\` ON \`sections_blocks_quote_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_quote_card_parent_id_idx\` ON \`sections_blocks_quote_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_quote_card_path_idx\` ON \`sections_blocks_quote_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_quote_card_photo_idx\` ON \`sections_blocks_quote_card\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_quote_card_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_quote_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_quote_card_locales_locale_parent_id_unique\` ON \`sections_blocks_quote_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_gallery_images_order_idx\` ON \`sections_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_gallery_images_parent_id_idx\` ON \`sections_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_gallery_images_image_idx\` ON \`sections_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`wide_first\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_gallery_order_idx\` ON \`sections_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_gallery_parent_id_idx\` ON \`sections_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_gallery_path_idx\` ON \`sections_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_gallery_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_gallery_locales_locale_parent_id_unique\` ON \`sections_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
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
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_key_points\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_key_points_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_band\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_band_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_band_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_band_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_band\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_quote_card\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_quote_card_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_key_points\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_key_points_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_cta_band\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_cta_band_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_stats_band_items\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_stats_band_items_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_stats_band\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_quote_card\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_quote_card_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_gallery_locales\`;`)
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
}
