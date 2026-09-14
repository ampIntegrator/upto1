import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_text_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_text_locales\`("text", "id", "_locale", "_parent_id") SELECT "text", "id", "_locale", "_parent_id" FROM \`pages_blocks_text_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_text_locales\` RENAME TO \`pages_blocks_text_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_text_locales_locale_parent_id_unique\` ON \`pages_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_section_rows_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '12',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_section_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_section_rows_columns\`("_order", "_parent_id", "id", "span") SELECT "_order", "_parent_id", "id", "span" FROM \`pages_blocks_section_rows_columns\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_section_rows_columns\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_section_rows_columns\` RENAME TO \`pages_blocks_section_rows_columns\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_rows_columns_order_idx\` ON \`pages_blocks_section_rows_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_rows_columns_parent_id_idx\` ON \`pages_blocks_section_rows_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_section\` (
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
  	\`save_as_shared\` integer DEFAULT false,
  	\`shared_title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_section\`("_order", "_parent_id", "_path", "id", "mode", "tint", "texture", "dark_style", "media_type", "image_id", "video_id", "poster_id", "overlay", "spacing_top", "spacing_bottom", "anchor", "save_as_shared", "shared_title", "block_name") SELECT "_order", "_parent_id", "_path", "id", "mode", "tint", "texture", "dark_style", "media_type", "image_id", "video_id", "poster_id", "overlay", "spacing_top", "spacing_bottom", "anchor", "save_as_shared", "shared_title", "block_name" FROM \`pages_blocks_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_section\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_section\` RENAME TO \`pages_blocks_section\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_order_idx\` ON \`pages_blocks_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_parent_id_idx\` ON \`pages_blocks_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_path_idx\` ON \`pages_blocks_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_image_idx\` ON \`pages_blocks_section\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_video_idx\` ON \`pages_blocks_section\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_poster_idx\` ON \`pages_blocks_section\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_sections_blocks_text_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_sections_blocks_text_locales\`("text", "id", "_locale", "_parent_id") SELECT "text", "id", "_locale", "_parent_id" FROM \`sections_blocks_text_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_text_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_sections_blocks_text_locales\` RENAME TO \`sections_blocks_text_locales\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_text_locales_locale_parent_id_unique\` ON \`sections_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_sections_rows_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '12',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_sections_rows_columns\`("_order", "_parent_id", "id", "span") SELECT "_order", "_parent_id", "id", "span" FROM \`sections_rows_columns\`;`)
  await db.run(sql`DROP TABLE \`sections_rows_columns\`;`)
  await db.run(sql`ALTER TABLE \`__new_sections_rows_columns\` RENAME TO \`sections_rows_columns\`;`)
  await db.run(sql`CREATE INDEX \`sections_rows_columns_order_idx\` ON \`sections_rows_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_rows_columns_parent_id_idx\` ON \`sections_rows_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_sections\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
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
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_sections\`("id", "title", "mode", "tint", "texture", "dark_style", "media_type", "image_id", "video_id", "poster_id", "overlay", "spacing_top", "spacing_bottom", "anchor", "updated_at", "created_at") SELECT "id", "title", "mode", "tint", "texture", "dark_style", "media_type", "image_id", "video_id", "poster_id", "overlay", "spacing_top", "spacing_bottom", "anchor", "updated_at", "created_at" FROM \`sections\`;`)
  await db.run(sql`DROP TABLE \`sections\`;`)
  await db.run(sql`ALTER TABLE \`__new_sections\` RENAME TO \`sections\`;`)
  await db.run(sql`CREATE INDEX \`sections_image_idx\` ON \`sections\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_video_idx\` ON \`sections\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_poster_idx\` ON \`sections\` (\`poster_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_updated_at_idx\` ON \`sections\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sections_created_at_idx\` ON \`sections\` (\`created_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_text_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_text_locales\`("text", "id", "_locale", "_parent_id") SELECT "text", "id", "_locale", "_parent_id" FROM \`pages_blocks_text_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_text_locales\` RENAME TO \`pages_blocks_text_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_text_locales_locale_parent_id_unique\` ON \`pages_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_section_rows_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '12' NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_section_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_section_rows_columns\`("_order", "_parent_id", "id", "span") SELECT "_order", "_parent_id", "id", "span" FROM \`pages_blocks_section_rows_columns\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_section_rows_columns\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_section_rows_columns\` RENAME TO \`pages_blocks_section_rows_columns\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_rows_columns_order_idx\` ON \`pages_blocks_section_rows_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_rows_columns_parent_id_idx\` ON \`pages_blocks_section_rows_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mode\` text DEFAULT 'light' NOT NULL,
  	\`tint\` text DEFAULT 'body',
  	\`texture\` text DEFAULT 'none',
  	\`dark_style\` text DEFAULT 'night',
  	\`media_type\` text DEFAULT 'image',
  	\`image_id\` integer,
  	\`video_id\` integer,
  	\`poster_id\` integer,
  	\`overlay\` numeric DEFAULT 0.3,
  	\`spacing_top\` text DEFAULT 'md',
  	\`spacing_bottom\` text DEFAULT 'md',
  	\`anchor\` text,
  	\`save_as_shared\` integer DEFAULT false,
  	\`shared_title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_section\`("_order", "_parent_id", "_path", "id", "mode", "tint", "texture", "dark_style", "media_type", "image_id", "video_id", "poster_id", "overlay", "spacing_top", "spacing_bottom", "anchor", "save_as_shared", "shared_title", "block_name") SELECT "_order", "_parent_id", "_path", "id", "mode", "tint", "texture", "dark_style", "media_type", "image_id", "video_id", "poster_id", "overlay", "spacing_top", "spacing_bottom", "anchor", "save_as_shared", "shared_title", "block_name" FROM \`pages_blocks_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_section\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_section\` RENAME TO \`pages_blocks_section\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_order_idx\` ON \`pages_blocks_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_parent_id_idx\` ON \`pages_blocks_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_path_idx\` ON \`pages_blocks_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_image_idx\` ON \`pages_blocks_section\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_video_idx\` ON \`pages_blocks_section\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_poster_idx\` ON \`pages_blocks_section\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_sections_blocks_text_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_sections_blocks_text_locales\`("text", "id", "_locale", "_parent_id") SELECT "text", "id", "_locale", "_parent_id" FROM \`sections_blocks_text_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_text_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_sections_blocks_text_locales\` RENAME TO \`sections_blocks_text_locales\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_text_locales_locale_parent_id_unique\` ON \`sections_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_sections_rows_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '12' NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_sections_rows_columns\`("_order", "_parent_id", "id", "span") SELECT "_order", "_parent_id", "id", "span" FROM \`sections_rows_columns\`;`)
  await db.run(sql`DROP TABLE \`sections_rows_columns\`;`)
  await db.run(sql`ALTER TABLE \`__new_sections_rows_columns\` RENAME TO \`sections_rows_columns\`;`)
  await db.run(sql`CREATE INDEX \`sections_rows_columns_order_idx\` ON \`sections_rows_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_rows_columns_parent_id_idx\` ON \`sections_rows_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_sections\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`mode\` text DEFAULT 'light' NOT NULL,
  	\`tint\` text DEFAULT 'body',
  	\`texture\` text DEFAULT 'none',
  	\`dark_style\` text DEFAULT 'night',
  	\`media_type\` text DEFAULT 'image',
  	\`image_id\` integer,
  	\`video_id\` integer,
  	\`poster_id\` integer,
  	\`overlay\` numeric DEFAULT 0.3,
  	\`spacing_top\` text DEFAULT 'md',
  	\`spacing_bottom\` text DEFAULT 'md',
  	\`anchor\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_sections\`("id", "title", "mode", "tint", "texture", "dark_style", "media_type", "image_id", "video_id", "poster_id", "overlay", "spacing_top", "spacing_bottom", "anchor", "updated_at", "created_at") SELECT "id", "title", "mode", "tint", "texture", "dark_style", "media_type", "image_id", "video_id", "poster_id", "overlay", "spacing_top", "spacing_bottom", "anchor", "updated_at", "created_at" FROM \`sections\`;`)
  await db.run(sql`DROP TABLE \`sections\`;`)
  await db.run(sql`ALTER TABLE \`__new_sections\` RENAME TO \`sections\`;`)
  await db.run(sql`CREATE INDEX \`sections_image_idx\` ON \`sections\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_video_idx\` ON \`sections\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_poster_idx\` ON \`sections\` (\`poster_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_updated_at_idx\` ON \`sections\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sections_created_at_idx\` ON \`sections\` (\`created_at\`);`)
}
