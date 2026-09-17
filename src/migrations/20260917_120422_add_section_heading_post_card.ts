import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_section_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text DEFAULT 'h2',
  	\`align\` text DEFAULT 'center',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_heading_order_idx\` ON \`pages_blocks_section_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_heading_parent_id_idx\` ON \`pages_blocks_section_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_heading_path_idx\` ON \`pages_blocks_section_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_section_heading_locales\` (
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_section_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_section_heading_locales_locale_parent_id_unique\` ON \`pages_blocks_section_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_post_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`post_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_post_card_order_idx\` ON \`pages_blocks_post_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_post_card_parent_id_idx\` ON \`pages_blocks_post_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_post_card_path_idx\` ON \`pages_blocks_post_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_post_card_post_idx\` ON \`pages_blocks_post_card\` (\`post_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_section_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text DEFAULT 'h2',
  	\`align\` text DEFAULT 'center',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_section_heading_order_idx\` ON \`sections_blocks_section_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_section_heading_parent_id_idx\` ON \`sections_blocks_section_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_section_heading_path_idx\` ON \`sections_blocks_section_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_section_heading_locales\` (
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_section_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_section_heading_locales_locale_parent_id_uni\` ON \`sections_blocks_section_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_post_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`post_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_post_card_order_idx\` ON \`sections_blocks_post_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_post_card_parent_id_idx\` ON \`sections_blocks_post_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_post_card_path_idx\` ON \`sections_blocks_post_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_post_card_post_idx\` ON \`sections_blocks_post_card\` (\`post_id\`);`)
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
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_section_heading\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_section_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_post_card\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_section_heading\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_section_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_post_card\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_section_heading\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_section_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_post_card\`;`)
}
