import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_tabs_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_tabs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_items_order_idx\` ON \`pages_blocks_tabs_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_items_parent_id_idx\` ON \`pages_blocks_tabs_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_tabs_items_locales\` (
  	\`label\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_tabs_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_tabs_items_locales_locale_parent_id_unique\` ON \`pages_blocks_tabs_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_order_idx\` ON \`pages_blocks_tabs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_parent_id_idx\` ON \`pages_blocks_tabs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_path_idx\` ON \`pages_blocks_tabs\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_tabs_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_tabs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_tabs_items_order_idx\` ON \`sections_blocks_tabs_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_tabs_items_parent_id_idx\` ON \`sections_blocks_tabs_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_tabs_items_locales\` (
  	\`label\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_tabs_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_tabs_items_locales_locale_parent_id_unique\` ON \`sections_blocks_tabs_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_tabs_order_idx\` ON \`sections_blocks_tabs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_tabs_parent_id_idx\` ON \`sections_blocks_tabs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_tabs_path_idx\` ON \`sections_blocks_tabs\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_tabs_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_tabs_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_tabs\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_tabs_items\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_tabs_items_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_tabs\`;`)
}
