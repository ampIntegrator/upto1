import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_text_box_badges\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'high',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_text_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_box_badges_order_idx\` ON \`pages_blocks_text_box_badges\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_box_badges_parent_id_idx\` ON \`pages_blocks_text_box_badges\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_text_box_badges_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_text_box_badges\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_text_box_badges_locales_locale_parent_id_unique\` ON \`pages_blocks_text_box_badges_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_text_box_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`shape\` text DEFAULT 'simple',
  	\`variant\` text DEFAULT 'primary',
  	\`size\` text DEFAULT 'md',
  	\`icon_key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_text_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_box_buttons_order_idx\` ON \`pages_blocks_text_box_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_box_buttons_parent_id_idx\` ON \`pages_blocks_text_box_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_text_box_buttons_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_text_box_buttons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_text_box_buttons_locales_locale_parent_id_uniqu\` ON \`pages_blocks_text_box_buttons_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_text_box\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_box_order_idx\` ON \`pages_blocks_text_box\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_box_parent_id_idx\` ON \`pages_blocks_text_box\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_box_path_idx\` ON \`pages_blocks_text_box\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_text_box_locales\` (
  	\`title\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_text_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_text_box_locales_locale_parent_id_unique\` ON \`pages_blocks_text_box_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_text_box_badges\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'high',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_text_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_text_box_badges_order_idx\` ON \`sections_blocks_text_box_badges\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_text_box_badges_parent_id_idx\` ON \`sections_blocks_text_box_badges\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_text_box_badges_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_text_box_badges\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_text_box_badges_locales_locale_parent_id_uni\` ON \`sections_blocks_text_box_badges_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_text_box_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`shape\` text DEFAULT 'simple',
  	\`variant\` text DEFAULT 'primary',
  	\`size\` text DEFAULT 'md',
  	\`icon_key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_text_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_text_box_buttons_order_idx\` ON \`sections_blocks_text_box_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_text_box_buttons_parent_id_idx\` ON \`sections_blocks_text_box_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_text_box_buttons_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_text_box_buttons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_text_box_buttons_locales_locale_parent_id_un\` ON \`sections_blocks_text_box_buttons_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_text_box\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_text_box_order_idx\` ON \`sections_blocks_text_box\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_text_box_parent_id_idx\` ON \`sections_blocks_text_box\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_text_box_path_idx\` ON \`sections_blocks_text_box\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_text_box_locales\` (
  	\`title\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_text_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_text_box_locales_locale_parent_id_unique\` ON \`sections_blocks_text_box_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_text_box_badges\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_box_badges_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_box_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_box_buttons_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_box\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_box_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_text_box_badges\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_text_box_badges_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_text_box_buttons\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_text_box_buttons_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_text_box\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_text_box_locales\`;`)
}
