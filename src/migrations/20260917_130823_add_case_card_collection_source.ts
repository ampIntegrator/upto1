import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_case_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`case_study_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`case_study_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_card_order_idx\` ON \`pages_blocks_case_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_card_parent_id_idx\` ON \`pages_blocks_case_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_card_path_idx\` ON \`pages_blocks_case_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_card_case_study_idx\` ON \`pages_blocks_case_card\` (\`case_study_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_case_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`case_study_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`case_study_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_case_card_order_idx\` ON \`sections_blocks_case_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_case_card_parent_id_idx\` ON \`sections_blocks_case_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_case_card_path_idx\` ON \`sections_blocks_case_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_case_card_case_study_idx\` ON \`sections_blocks_case_card\` (\`case_study_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_case_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`case_study_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`case_study_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_case_card_order_idx\` ON \`posts_blocks_case_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_case_card_parent_id_idx\` ON \`posts_blocks_case_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_case_card_path_idx\` ON \`posts_blocks_case_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_case_card_case_study_idx\` ON \`posts_blocks_case_card\` (\`case_study_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_case_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`case_study_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`case_study_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_card_order_idx\` ON \`case_studies_blocks_case_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_card_parent_id_idx\` ON \`case_studies_blocks_case_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_card_path_idx\` ON \`case_studies_blocks_case_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_card_case_study_idx\` ON \`case_studies_blocks_case_card\` (\`case_study_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` ADD \`cases_limit\` numeric DEFAULT 6;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` ADD \`cases_category_id\` integer REFERENCES case_categories(id);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_collection_cases_category_idx\` ON \`pages_blocks_collection\` (\`cases_category_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection_locales\` ADD \`cases_cta\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` ADD \`cases_limit\` numeric DEFAULT 6;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` ADD \`cases_category_id\` integer REFERENCES case_categories(id);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_collection_cases_category_idx\` ON \`sections_blocks_collection\` (\`cases_category_id\`);`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection_locales\` ADD \`cases_cta\` text;`)
  await db.run(sql`ALTER TABLE \`posts_blocks_collection\` ADD \`cases_limit\` numeric DEFAULT 6;`)
  await db.run(sql`ALTER TABLE \`posts_blocks_collection\` ADD \`cases_category_id\` integer REFERENCES case_categories(id);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_collection_cases_category_idx\` ON \`posts_blocks_collection\` (\`cases_category_id\`);`)
  await db.run(sql`ALTER TABLE \`posts_blocks_collection_locales\` ADD \`cases_cta\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_collection\` ADD \`cases_limit\` numeric DEFAULT 6;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_collection\` ADD \`cases_category_id\` integer REFERENCES case_categories(id);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_collection_cases_category_idx\` ON \`case_studies_blocks_collection\` (\`cases_category_id\`);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_collection_locales\` ADD \`cases_cta\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_case_card\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_case_card\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_case_card\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_case_card\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_collection\` (
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
  await db.run(sql`INSERT INTO \`__new_pages_blocks_collection\`("_order", "_parent_id", "_path", "id", "layout", "per_view", "step", "indicator", "arrows", "source", "posts_limit", "posts_category_id", "block_name") SELECT "_order", "_parent_id", "_path", "id", "layout", "per_view", "step", "indicator", "arrows", "source", "posts_limit", "posts_category_id", "block_name" FROM \`pages_blocks_collection\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_collection\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_collection\` RENAME TO \`pages_blocks_collection\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_collection_order_idx\` ON \`pages_blocks_collection\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_collection_parent_id_idx\` ON \`pages_blocks_collection\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_collection_path_idx\` ON \`pages_blocks_collection\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_collection_posts_category_idx\` ON \`pages_blocks_collection\` (\`posts_category_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_sections_blocks_collection\` (
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
  await db.run(sql`INSERT INTO \`__new_sections_blocks_collection\`("_order", "_parent_id", "_path", "id", "layout", "per_view", "step", "indicator", "arrows", "source", "posts_limit", "posts_category_id", "block_name") SELECT "_order", "_parent_id", "_path", "id", "layout", "per_view", "step", "indicator", "arrows", "source", "posts_limit", "posts_category_id", "block_name" FROM \`sections_blocks_collection\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_collection\`;`)
  await db.run(sql`ALTER TABLE \`__new_sections_blocks_collection\` RENAME TO \`sections_blocks_collection\`;`)
  await db.run(sql`CREATE INDEX \`sections_blocks_collection_order_idx\` ON \`sections_blocks_collection\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_collection_parent_id_idx\` ON \`sections_blocks_collection\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_collection_path_idx\` ON \`sections_blocks_collection\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_collection_posts_category_idx\` ON \`sections_blocks_collection\` (\`posts_category_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_posts_blocks_collection\` (
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
  await db.run(sql`INSERT INTO \`__new_posts_blocks_collection\`("_order", "_parent_id", "_path", "id", "layout", "per_view", "step", "indicator", "arrows", "source", "posts_limit", "posts_category_id", "block_name") SELECT "_order", "_parent_id", "_path", "id", "layout", "per_view", "step", "indicator", "arrows", "source", "posts_limit", "posts_category_id", "block_name" FROM \`posts_blocks_collection\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_collection\`;`)
  await db.run(sql`ALTER TABLE \`__new_posts_blocks_collection\` RENAME TO \`posts_blocks_collection\`;`)
  await db.run(sql`CREATE INDEX \`posts_blocks_collection_order_idx\` ON \`posts_blocks_collection\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_collection_parent_id_idx\` ON \`posts_blocks_collection\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_collection_path_idx\` ON \`posts_blocks_collection\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_collection_posts_category_idx\` ON \`posts_blocks_collection\` (\`posts_category_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_case_studies_blocks_collection\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_case_studies_blocks_collection\`("_order", "_parent_id", "_path", "id", "layout", "per_view", "step", "indicator", "arrows", "source", "posts_limit", "posts_category_id", "block_name") SELECT "_order", "_parent_id", "_path", "id", "layout", "per_view", "step", "indicator", "arrows", "source", "posts_limit", "posts_category_id", "block_name" FROM \`case_studies_blocks_collection\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_collection\`;`)
  await db.run(sql`ALTER TABLE \`__new_case_studies_blocks_collection\` RENAME TO \`case_studies_blocks_collection\`;`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_collection_order_idx\` ON \`case_studies_blocks_collection\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_collection_parent_id_idx\` ON \`case_studies_blocks_collection\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_collection_path_idx\` ON \`case_studies_blocks_collection\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_collection_posts_category_idx\` ON \`case_studies_blocks_collection\` (\`posts_category_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection_locales\` DROP COLUMN \`cases_cta\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection_locales\` DROP COLUMN \`cases_cta\`;`)
  await db.run(sql`ALTER TABLE \`posts_blocks_collection_locales\` DROP COLUMN \`cases_cta\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_collection_locales\` DROP COLUMN \`cases_cta\`;`)
}
