import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

// IF NOT EXISTS: a first run stopped on SQLITE_BUSY after creating posts_faq_items(_locales) and posts_rels
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`posts_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts_faq_items_order_idx\` ON \`posts_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts_faq_items_parent_id_idx\` ON \`posts_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`posts_faq_items_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`posts_faq_items_locales_locale_parent_id_unique\` ON \`posts_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts_rels_posts_id_idx\` ON \`posts_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`case_studies_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`case_studies_faq_items_order_idx\` ON \`case_studies_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`case_studies_faq_items_parent_id_idx\` ON \`case_studies_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`case_studies_faq_items_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`case_studies_faq_items_locales_locale_parent_id_unique\` ON \`case_studies_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`case_studies_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`case_studies_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`case_studies_rels_order_idx\` ON \`case_studies_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`case_studies_rels_parent_idx\` ON \`case_studies_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`case_studies_rels_path_idx\` ON \`case_studies_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`case_studies_rels_case_studies_id_idx\` ON \`case_studies_rels\` (\`case_studies_id\`);`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`faq_show\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`related_mode\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`sheet_custom_defaults\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`faq_show\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`related_mode\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`blog\` ADD \`faq_tag\` text DEFAULT 'h2';`)
  await db.run(sql`ALTER TABLE \`blog\` ADD \`related_count\` text DEFAULT '3';`)
  await db.run(sql`ALTER TABLE \`blog_locales\` ADD \`faq_title\` text;`)
  await db.run(sql`ALTER TABLE \`portfolio\` ADD \`faq_tag\` text DEFAULT 'h2';`)
  await db.run(sql`ALTER TABLE \`portfolio\` ADD \`related_count\` text DEFAULT '3';`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` ADD \`faq_title\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`posts_faq_items\`;`)
  await db.run(sql`DROP TABLE \`posts_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`case_studies_faq_items\`;`)
  await db.run(sql`DROP TABLE \`case_studies_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`case_studies_rels\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`faq_show\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`related_mode\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`sheet_custom_defaults\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`faq_show\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`related_mode\`;`)
  await db.run(sql`ALTER TABLE \`blog\` DROP COLUMN \`faq_tag\`;`)
  await db.run(sql`ALTER TABLE \`blog\` DROP COLUMN \`related_count\`;`)
  await db.run(sql`ALTER TABLE \`blog_locales\` DROP COLUMN \`faq_title\`;`)
  await db.run(sql`ALTER TABLE \`portfolio\` DROP COLUMN \`faq_tag\`;`)
  await db.run(sql`ALTER TABLE \`portfolio\` DROP COLUMN \`related_count\`;`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` DROP COLUMN \`faq_title\`;`)
}
