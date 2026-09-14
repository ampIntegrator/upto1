import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_order_idx\` ON \`pages_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_parent_id_idx\` ON \`pages_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_path_idx\` ON \`pages_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_text_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_text_locales_locale_parent_id_unique\` ON \`pages_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_section_rows_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '12' NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_section_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_rows_columns_order_idx\` ON \`pages_blocks_section_rows_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_rows_columns_parent_id_idx\` ON \`pages_blocks_section_rows_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_section_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_rows_order_idx\` ON \`pages_blocks_section_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_rows_parent_id_idx\` ON \`pages_blocks_section_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_section\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_section_order_idx\` ON \`pages_blocks_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_parent_id_idx\` ON \`pages_blocks_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_path_idx\` ON \`pages_blocks_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_image_idx\` ON \`pages_blocks_section\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_video_idx\` ON \`pages_blocks_section\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_poster_idx\` ON \`pages_blocks_section\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_shared_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`section_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_shared_section_order_idx\` ON \`pages_blocks_shared_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_shared_section_parent_id_idx\` ON \`pages_blocks_shared_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_shared_section_path_idx\` ON \`pages_blocks_shared_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_shared_section_section_idx\` ON \`pages_blocks_shared_section\` (\`section_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_text_order_idx\` ON \`sections_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_text_parent_id_idx\` ON \`sections_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_text_path_idx\` ON \`sections_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_text_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_text_locales_locale_parent_id_unique\` ON \`sections_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_rows_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '12' NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_rows_columns_order_idx\` ON \`sections_rows_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_rows_columns_parent_id_idx\` ON \`sections_rows_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_rows_order_idx\` ON \`sections_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_rows_parent_id_idx\` ON \`sections_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections\` (
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
  await db.run(sql`CREATE INDEX \`sections_image_idx\` ON \`sections\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_video_idx\` ON \`sections\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_poster_idx\` ON \`sections\` (\`poster_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_updated_at_idx\` ON \`sections\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sections_created_at_idx\` ON \`sections\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`sections_id\` integer REFERENCES sections(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_sections_id_idx\` ON \`payload_locked_documents_rels\` (\`sections_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_section_rows_columns\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_section_rows\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_shared_section\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_text_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_rows_columns\`;`)
  await db.run(sql`DROP TABLE \`sections_rows\`;`)
  await db.run(sql`DROP TABLE \`sections\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`categories_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "pages_id", "posts_id", "categories_id", "media_id", "users_id") SELECT "id", "order", "parent_id", "path", "pages_id", "posts_id", "categories_id", "media_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
}
