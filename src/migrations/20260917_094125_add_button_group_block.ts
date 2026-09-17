import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_button_group_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`shape\` text DEFAULT 'simple',
  	\`variant\` text DEFAULT 'primary',
  	\`size\` text DEFAULT 'md',
  	\`icon_key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_button_group\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_button_group_buttons_order_idx\` ON \`pages_blocks_button_group_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_button_group_buttons_parent_id_idx\` ON \`pages_blocks_button_group_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_button_group_buttons_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_button_group_buttons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_button_group_buttons_locales_locale_parent_id_u\` ON \`pages_blocks_button_group_buttons_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_button_group\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mode\` text DEFAULT 'spaced',
  	\`width\` text DEFAULT 'natural',
  	\`align\` text DEFAULT 'start',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_button_group_order_idx\` ON \`pages_blocks_button_group\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_button_group_parent_id_idx\` ON \`pages_blocks_button_group\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_button_group_path_idx\` ON \`pages_blocks_button_group\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_button_group_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`shape\` text DEFAULT 'simple',
  	\`variant\` text DEFAULT 'primary',
  	\`size\` text DEFAULT 'md',
  	\`icon_key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_button_group\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_button_group_buttons_order_idx\` ON \`sections_blocks_button_group_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_button_group_buttons_parent_id_idx\` ON \`sections_blocks_button_group_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_button_group_buttons_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_button_group_buttons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_button_group_buttons_locales_locale_parent_i\` ON \`sections_blocks_button_group_buttons_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_button_group\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mode\` text DEFAULT 'spaced',
  	\`width\` text DEFAULT 'natural',
  	\`align\` text DEFAULT 'start',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_button_group_order_idx\` ON \`sections_blocks_button_group\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_button_group_parent_id_idx\` ON \`sections_blocks_button_group\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_button_group_path_idx\` ON \`sections_blocks_button_group\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_button_group_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_button_group_buttons_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_button_group\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_button_group_buttons\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_button_group_buttons_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_button_group\`;`)
}
