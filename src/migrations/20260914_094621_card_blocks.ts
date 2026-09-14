import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_card_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_image_order_idx\` ON \`pages_blocks_card_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_image_parent_id_idx\` ON \`pages_blocks_card_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_image_path_idx\` ON \`pages_blocks_card_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_image_image_idx\` ON \`pages_blocks_card_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_image_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_card_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_card_image_locales_locale_parent_id_unique\` ON \`pages_blocks_card_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_icon\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_key\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_icon_order_idx\` ON \`pages_blocks_card_icon\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_icon_parent_id_idx\` ON \`pages_blocks_card_icon\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_icon_path_idx\` ON \`pages_blocks_card_icon\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_icon_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_card_icon\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_card_icon_locales_locale_parent_id_unique\` ON \`pages_blocks_card_icon_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_number_order_idx\` ON \`pages_blocks_card_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_number_parent_id_idx\` ON \`pages_blocks_card_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_number_path_idx\` ON \`pages_blocks_card_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_number_locales\` (
  	\`prefix\` text,
  	\`suffix\` text,
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_card_number\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_card_number_locales_locale_parent_id_unique\` ON \`pages_blocks_card_number_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_title\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_title_order_idx\` ON \`pages_blocks_card_title\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_title_parent_id_idx\` ON \`pages_blocks_card_title\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_title_path_idx\` ON \`pages_blocks_card_title\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_title_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_card_title\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_card_title_locales_locale_parent_id_unique\` ON \`pages_blocks_card_title_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_image_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_image_link_order_idx\` ON \`pages_blocks_card_image_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_image_link_parent_id_idx\` ON \`pages_blocks_card_image_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_image_link_path_idx\` ON \`pages_blocks_card_image_link\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_image_link_image_idx\` ON \`pages_blocks_card_image_link\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_image_link_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_card_image_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_card_image_link_locales_locale_parent_id_unique\` ON \`pages_blocks_card_image_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_icon_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_key\` text,
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_icon_link_order_idx\` ON \`pages_blocks_card_icon_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_icon_link_parent_id_idx\` ON \`pages_blocks_card_icon_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_icon_link_path_idx\` ON \`pages_blocks_card_icon_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_icon_link_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_card_icon_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_card_icon_link_locales_locale_parent_id_unique\` ON \`pages_blocks_card_icon_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_number_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_number_link_order_idx\` ON \`pages_blocks_card_number_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_number_link_parent_id_idx\` ON \`pages_blocks_card_number_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_number_link_path_idx\` ON \`pages_blocks_card_number_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_number_link_locales\` (
  	\`prefix\` text,
  	\`suffix\` text,
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_card_number_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_card_number_link_locales_locale_parent_id_uniqu\` ON \`pages_blocks_card_number_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_title_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_title_link_order_idx\` ON \`pages_blocks_card_title_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_title_link_parent_id_idx\` ON \`pages_blocks_card_title_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_title_link_path_idx\` ON \`pages_blocks_card_title_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_title_link_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_card_title_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_card_title_link_locales_locale_parent_id_unique\` ON \`pages_blocks_card_title_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_image_order_idx\` ON \`sections_blocks_card_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_image_parent_id_idx\` ON \`sections_blocks_card_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_image_path_idx\` ON \`sections_blocks_card_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_image_image_idx\` ON \`sections_blocks_card_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_image_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_card_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_card_image_locales_locale_parent_id_unique\` ON \`sections_blocks_card_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_icon\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_key\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_icon_order_idx\` ON \`sections_blocks_card_icon\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_icon_parent_id_idx\` ON \`sections_blocks_card_icon\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_icon_path_idx\` ON \`sections_blocks_card_icon\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_icon_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_card_icon\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_card_icon_locales_locale_parent_id_unique\` ON \`sections_blocks_card_icon_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_number_order_idx\` ON \`sections_blocks_card_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_number_parent_id_idx\` ON \`sections_blocks_card_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_number_path_idx\` ON \`sections_blocks_card_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_number_locales\` (
  	\`prefix\` text,
  	\`suffix\` text,
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_card_number\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_card_number_locales_locale_parent_id_unique\` ON \`sections_blocks_card_number_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_title\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_title_order_idx\` ON \`sections_blocks_card_title\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_title_parent_id_idx\` ON \`sections_blocks_card_title\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_title_path_idx\` ON \`sections_blocks_card_title\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_title_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_card_title\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_card_title_locales_locale_parent_id_unique\` ON \`sections_blocks_card_title_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_image_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_image_link_order_idx\` ON \`sections_blocks_card_image_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_image_link_parent_id_idx\` ON \`sections_blocks_card_image_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_image_link_path_idx\` ON \`sections_blocks_card_image_link\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_image_link_image_idx\` ON \`sections_blocks_card_image_link\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_image_link_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_card_image_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_card_image_link_locales_locale_parent_id_uni\` ON \`sections_blocks_card_image_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_icon_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_key\` text,
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_icon_link_order_idx\` ON \`sections_blocks_card_icon_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_icon_link_parent_id_idx\` ON \`sections_blocks_card_icon_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_icon_link_path_idx\` ON \`sections_blocks_card_icon_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_icon_link_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_card_icon_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_card_icon_link_locales_locale_parent_id_uniq\` ON \`sections_blocks_card_icon_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_number_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_number_link_order_idx\` ON \`sections_blocks_card_number_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_number_link_parent_id_idx\` ON \`sections_blocks_card_number_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_number_link_path_idx\` ON \`sections_blocks_card_number_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_number_link_locales\` (
  	\`prefix\` text,
  	\`suffix\` text,
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_card_number_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_card_number_link_locales_locale_parent_id_un\` ON \`sections_blocks_card_number_link_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_title_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_title_link_order_idx\` ON \`sections_blocks_card_title_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_title_link_parent_id_idx\` ON \`sections_blocks_card_title_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_card_title_link_path_idx\` ON \`sections_blocks_card_title_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_card_title_link_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_card_title_link\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_card_title_link_locales_locale_parent_id_uni\` ON \`sections_blocks_card_title_link_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_card_image\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_image_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_icon\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_icon_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_number\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_number_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_title\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_title_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_image_link\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_image_link_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_icon_link\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_icon_link_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_number_link\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_number_link_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_title_link\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_title_link_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_image\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_image_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_icon\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_icon_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_number\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_number_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_title\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_title_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_image_link\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_image_link_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_icon_link\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_icon_link_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_number_link\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_number_link_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_title_link\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_card_title_link_locales\`;`)
}
