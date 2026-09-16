import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_price_single_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_price_single\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_price_single_features_order_idx\` ON \`pages_blocks_price_single_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_price_single_features_parent_id_idx\` ON \`pages_blocks_price_single_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_price_single_features_locales\` (
  	\`label\` text,
  	\`end\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_price_single_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_price_single_features_locales_locale_parent_id_\` ON \`pages_blocks_price_single_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_price_single\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`price_value\` text,
  	\`price_currency\` text DEFAULT '€',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_price_single_order_idx\` ON \`pages_blocks_price_single\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_price_single_parent_id_idx\` ON \`pages_blocks_price_single\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_price_single_path_idx\` ON \`pages_blocks_price_single\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_price_single_locales\` (
  	\`features_label\` text,
  	\`total_label\` text,
  	\`total_value\` text,
  	\`price_label\` text,
  	\`price_period\` text,
  	\`cta_label\` text,
  	\`mention\` text,
  	\`guarantee_title\` text,
  	\`guarantee_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_price_single\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_price_single_locales_locale_parent_id_unique\` ON \`pages_blocks_price_single_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_plan_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_plan\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_plan_features_order_idx\` ON \`pages_blocks_plan_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_plan_features_parent_id_idx\` ON \`pages_blocks_plan_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_plan_features_locales\` (
  	\`label\` text,
  	\`end\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_plan_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_plan_features_locales_locale_parent_id_unique\` ON \`pages_blocks_plan_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_plan\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`price_value\` text,
  	\`price_currency\` text DEFAULT '€',
  	\`featured\` integer DEFAULT false,
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_plan_order_idx\` ON \`pages_blocks_plan\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_plan_parent_id_idx\` ON \`pages_blocks_plan\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_plan_path_idx\` ON \`pages_blocks_plan\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_plan_locales\` (
  	\`name\` text,
  	\`tagline\` text,
  	\`price_period\` text,
  	\`badge\` text,
  	\`inherits\` text,
  	\`features_label\` text,
  	\`cta_label\` text,
  	\`mention\` text,
  	\`guarantee_title\` text,
  	\`guarantee_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_plan\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_plan_locales_locale_parent_id_unique\` ON \`pages_blocks_plan_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_order_idx\` ON \`pages_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_parent_id_idx\` ON \`pages_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_items_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_faq_items_locales_locale_parent_id_unique\` ON \`pages_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mode\` text DEFAULT 'single',
  	\`columns\` text DEFAULT '1',
  	\`first_open\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_order_idx\` ON \`pages_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_parent_id_idx\` ON \`pages_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_path_idx\` ON \`pages_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonial\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_order_idx\` ON \`pages_blocks_testimonial\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_parent_id_idx\` ON \`pages_blocks_testimonial\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_path_idx\` ON \`pages_blocks_testimonial\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonial_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`result\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonial\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_testimonial_locales_locale_parent_id_unique\` ON \`pages_blocks_testimonial_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_compare_card_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_compare_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_compare_card_items_order_idx\` ON \`pages_blocks_compare_card_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_compare_card_items_parent_id_idx\` ON \`pages_blocks_compare_card_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_compare_card_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_compare_card_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_compare_card_items_locales_locale_parent_id_uni\` ON \`pages_blocks_compare_card_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_compare_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`chip_tone\` text DEFAULT 'accent',
  	\`tone\` text DEFAULT 'check',
  	\`featured\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_compare_card_order_idx\` ON \`pages_blocks_compare_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_compare_card_parent_id_idx\` ON \`pages_blocks_compare_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_compare_card_path_idx\` ON \`pages_blocks_compare_card\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_compare_card_locales\` (
  	\`chip_label\` text,
  	\`meta\` text,
  	\`quote\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_compare_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_compare_card_locales_locale_parent_id_unique\` ON \`pages_blocks_compare_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process_steps_steps_checks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_process_steps_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_steps_checks_order_idx\` ON \`pages_blocks_process_steps_steps_checks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_steps_checks_parent_id_idx\` ON \`pages_blocks_process_steps_steps_checks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process_steps_steps_checks_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_process_steps_steps_checks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_process_steps_steps_checks_locales_locale_paren\` ON \`pages_blocks_process_steps_steps_checks_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`asterisk\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_process_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_steps_order_idx\` ON \`pages_blocks_process_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_steps_parent_id_idx\` ON \`pages_blocks_process_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process_steps_steps_locales\` (
  	\`title\` text,
  	\`duration\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_process_steps_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_process_steps_steps_locales_locale_parent_id_un\` ON \`pages_blocks_process_steps_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_order_idx\` ON \`pages_blocks_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_parent_id_idx\` ON \`pages_blocks_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_path_idx\` ON \`pages_blocks_process_steps\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_price_single_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_price_single\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_price_single_features_order_idx\` ON \`sections_blocks_price_single_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_price_single_features_parent_id_idx\` ON \`sections_blocks_price_single_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_price_single_features_locales\` (
  	\`label\` text,
  	\`end\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_price_single_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_price_single_features_locales_locale_parent_\` ON \`sections_blocks_price_single_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_price_single\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`price_value\` text,
  	\`price_currency\` text DEFAULT '€',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_price_single_order_idx\` ON \`sections_blocks_price_single\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_price_single_parent_id_idx\` ON \`sections_blocks_price_single\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_price_single_path_idx\` ON \`sections_blocks_price_single\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_price_single_locales\` (
  	\`features_label\` text,
  	\`total_label\` text,
  	\`total_value\` text,
  	\`price_label\` text,
  	\`price_period\` text,
  	\`cta_label\` text,
  	\`mention\` text,
  	\`guarantee_title\` text,
  	\`guarantee_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_price_single\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_price_single_locales_locale_parent_id_unique\` ON \`sections_blocks_price_single_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_plan_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_plan\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_plan_features_order_idx\` ON \`sections_blocks_plan_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_plan_features_parent_id_idx\` ON \`sections_blocks_plan_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_plan_features_locales\` (
  	\`label\` text,
  	\`end\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_plan_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_plan_features_locales_locale_parent_id_uniqu\` ON \`sections_blocks_plan_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_plan\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`price_value\` text,
  	\`price_currency\` text DEFAULT '€',
  	\`featured\` integer DEFAULT false,
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_plan_order_idx\` ON \`sections_blocks_plan\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_plan_parent_id_idx\` ON \`sections_blocks_plan\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_plan_path_idx\` ON \`sections_blocks_plan\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_plan_locales\` (
  	\`name\` text,
  	\`tagline\` text,
  	\`price_period\` text,
  	\`badge\` text,
  	\`inherits\` text,
  	\`features_label\` text,
  	\`cta_label\` text,
  	\`mention\` text,
  	\`guarantee_title\` text,
  	\`guarantee_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_plan\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_plan_locales_locale_parent_id_unique\` ON \`sections_blocks_plan_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_faq_items_order_idx\` ON \`sections_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_faq_items_parent_id_idx\` ON \`sections_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_faq_items_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_faq_items_locales_locale_parent_id_unique\` ON \`sections_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mode\` text DEFAULT 'single',
  	\`columns\` text DEFAULT '1',
  	\`first_open\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_faq_order_idx\` ON \`sections_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_faq_parent_id_idx\` ON \`sections_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_faq_path_idx\` ON \`sections_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_testimonial\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_testimonial_order_idx\` ON \`sections_blocks_testimonial\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_testimonial_parent_id_idx\` ON \`sections_blocks_testimonial\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_testimonial_path_idx\` ON \`sections_blocks_testimonial\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_testimonial_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`result\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_testimonial\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_testimonial_locales_locale_parent_id_unique\` ON \`sections_blocks_testimonial_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_compare_card_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_compare_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_compare_card_items_order_idx\` ON \`sections_blocks_compare_card_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_compare_card_items_parent_id_idx\` ON \`sections_blocks_compare_card_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_compare_card_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_compare_card_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_compare_card_items_locales_locale_parent_id_\` ON \`sections_blocks_compare_card_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_compare_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`chip_tone\` text DEFAULT 'accent',
  	\`tone\` text DEFAULT 'check',
  	\`featured\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_compare_card_order_idx\` ON \`sections_blocks_compare_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_compare_card_parent_id_idx\` ON \`sections_blocks_compare_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_compare_card_path_idx\` ON \`sections_blocks_compare_card\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_compare_card_locales\` (
  	\`chip_label\` text,
  	\`meta\` text,
  	\`quote\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_compare_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_compare_card_locales_locale_parent_id_unique\` ON \`sections_blocks_compare_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_process_steps_steps_checks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_process_steps_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_process_steps_steps_checks_order_idx\` ON \`sections_blocks_process_steps_steps_checks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_process_steps_steps_checks_parent_id_idx\` ON \`sections_blocks_process_steps_steps_checks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_process_steps_steps_checks_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_process_steps_steps_checks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_process_steps_steps_checks_locales_locale_pa\` ON \`sections_blocks_process_steps_steps_checks_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_process_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`asterisk\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_process_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_process_steps_steps_order_idx\` ON \`sections_blocks_process_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_process_steps_steps_parent_id_idx\` ON \`sections_blocks_process_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_process_steps_steps_locales\` (
  	\`title\` text,
  	\`duration\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_process_steps_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_process_steps_steps_locales_locale_parent_id\` ON \`sections_blocks_process_steps_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_process_steps_order_idx\` ON \`sections_blocks_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_process_steps_parent_id_idx\` ON \`sections_blocks_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_process_steps_path_idx\` ON \`sections_blocks_process_steps\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_price_single_features\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_price_single_features_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_price_single\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_price_single_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_plan_features\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_plan_features_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_plan\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_plan_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonial\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonial_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_compare_card_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_compare_card_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_compare_card\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_compare_card_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process_steps_steps_checks\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process_steps_steps_checks_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process_steps_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process_steps\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_price_single_features\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_price_single_features_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_price_single\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_price_single_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_plan_features\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_plan_features_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_plan\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_plan_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_testimonial\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_testimonial_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_compare_card_items\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_compare_card_items_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_compare_card\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_compare_card_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_process_steps_steps_checks\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_process_steps_steps_checks_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_process_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_process_steps_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_process_steps\`;`)
}
