import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_collection\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_collection_order_idx\` ON \`pages_blocks_collection\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_collection_parent_id_idx\` ON \`pages_blocks_collection\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_collection_path_idx\` ON \`pages_blocks_collection\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_collection_posts_category_idx\` ON \`pages_blocks_collection\` (\`posts_category_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_collection_locales\` (
  	\`posts_cta\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_collection\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_collection_locales_locale_parent_id_unique\` ON \`pages_blocks_collection_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_collection\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_collection_order_idx\` ON \`sections_blocks_collection\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_collection_parent_id_idx\` ON \`sections_blocks_collection\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_collection_path_idx\` ON \`sections_blocks_collection\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_collection_posts_category_idx\` ON \`sections_blocks_collection\` (\`posts_category_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_collection_locales\` (
  	\`posts_cta\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_collection\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_collection_locales_locale_parent_id_unique\` ON \`sections_blocks_collection_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_collection\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_collection_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_collection\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_collection_locales\`;`)
}
