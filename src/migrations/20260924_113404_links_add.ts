import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`header_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`case_studies_id\` integer,
  	\`modals_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`modals_id\`) REFERENCES \`modals\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_rels_order_idx\` ON \`header_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_parent_idx\` ON \`header_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_path_idx\` ON \`header_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_pages_id_idx\` ON \`header_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_posts_id_idx\` ON \`header_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_case_studies_id_idx\` ON \`header_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_modals_id_idx\` ON \`header_rels\` (\`modals_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`case_studies_id\` integer,
  	\`modals_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`modals_id\`) REFERENCES \`modals\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_pages_id_idx\` ON \`footer_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_posts_id_idx\` ON \`footer_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_case_studies_id_idx\` ON \`footer_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_modals_id_idx\` ON \`footer_rels\` (\`modals_id\`);`)
  await db.run(sql`CREATE TABLE \`portfolio_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`case_studies_id\` integer,
  	\`modals_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`portfolio\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`modals_id\`) REFERENCES \`modals\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`portfolio_rels_order_idx\` ON \`portfolio_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_rels_parent_idx\` ON \`portfolio_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_rels_path_idx\` ON \`portfolio_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_rels_pages_id_idx\` ON \`portfolio_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_rels_posts_id_idx\` ON \`portfolio_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_rels_case_studies_id_idx\` ON \`portfolio_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_rels_modals_id_idx\` ON \`portfolio_rels\` (\`modals_id\`);`)
  // SQLite recreates the link tables below; inside the migration transaction foreign keys stay on,
  // so dropping a table deletes its translated labels in cascade: they are kept aside, then put back
  await db.run(sql`CREATE TEMP TABLE \`__keep_header_blocks_link_locales\` AS SELECT * FROM \`header_blocks_link_locales\`;`)
  await db.run(sql`CREATE TEMP TABLE \`__keep_header_blocks_menu_items_locales\` AS SELECT * FROM \`header_blocks_menu_items_locales\`;`)
  await db.run(sql`CREATE TEMP TABLE \`__keep_header_blocks_mega_groups_items_locales\` AS SELECT * FROM \`header_blocks_mega_groups_items_locales\`;`)
  await db.run(sql`CREATE TEMP TABLE \`__keep_footer_columns_links_locales\` AS SELECT * FROM \`footer_columns_links_locales\`;`)
  await db.run(sql`CREATE TEMP TABLE \`__keep_footer_legal_links_locales\` AS SELECT * FROM \`footer_legal_links_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_header_blocks_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text DEFAULT 'url',
  	\`href\` text,
  	\`new_tab\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_blocks_link\`("_order", "_parent_id", "_path", "id", "kind", "href", "new_tab", "block_name") SELECT "_order", "_parent_id", "_path", "id", 'url', "href", 0, "block_name" FROM \`header_blocks_link\`;`)
  await db.run(sql`DROP TABLE \`header_blocks_link\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_blocks_link\` RENAME TO \`header_blocks_link\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`header_blocks_link_order_idx\` ON \`header_blocks_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_blocks_link_parent_id_idx\` ON \`header_blocks_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_blocks_link_path_idx\` ON \`header_blocks_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_blocks_menu_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text DEFAULT 'url',
  	\`href\` text,
  	\`new_tab\` integer DEFAULT false,
  	\`icon_key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_blocks_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_blocks_menu_items\`("_order", "_parent_id", "id", "kind", "href", "new_tab", "icon_key") SELECT "_order", "_parent_id", "id", 'url', "href", 0, "icon_key" FROM \`header_blocks_menu_items\`;`)
  await db.run(sql`DROP TABLE \`header_blocks_menu_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_blocks_menu_items\` RENAME TO \`header_blocks_menu_items\`;`)
  await db.run(sql`CREATE INDEX \`header_blocks_menu_items_order_idx\` ON \`header_blocks_menu_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_blocks_menu_items_parent_id_idx\` ON \`header_blocks_menu_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_blocks_mega_groups_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text DEFAULT 'url',
  	\`href\` text,
  	\`new_tab\` integer DEFAULT false,
  	\`icon_key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_blocks_mega_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_blocks_mega_groups_items\`("_order", "_parent_id", "id", "kind", "href", "new_tab", "icon_key") SELECT "_order", "_parent_id", "id", 'url', "href", 0, "icon_key" FROM \`header_blocks_mega_groups_items\`;`)
  await db.run(sql`DROP TABLE \`header_blocks_mega_groups_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_blocks_mega_groups_items\` RENAME TO \`header_blocks_mega_groups_items\`;`)
  await db.run(sql`CREATE INDEX \`header_blocks_mega_groups_items_order_idx\` ON \`header_blocks_mega_groups_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_blocks_mega_groups_items_parent_id_idx\` ON \`header_blocks_mega_groups_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_footer_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text DEFAULT 'url',
  	\`href\` text,
  	\`new_tab\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_footer_columns_links\`("_order", "_parent_id", "id", "kind", "href", "new_tab") SELECT "_order", "_parent_id", "id", 'url', "href", 0 FROM \`footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links\`;`)
  await db.run(sql`ALTER TABLE \`__new_footer_columns_links\` RENAME TO \`footer_columns_links\`;`)
  await db.run(sql`CREATE INDEX \`footer_columns_links_order_idx\` ON \`footer_columns_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_links_parent_id_idx\` ON \`footer_columns_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_footer_legal_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text DEFAULT 'url',
  	\`href\` text,
  	\`new_tab\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_footer_legal_links\`("_order", "_parent_id", "id", "kind", "href", "new_tab") SELECT "_order", "_parent_id", "id", 'url', "href", 0 FROM \`footer_legal_links\`;`)
  await db.run(sql`DROP TABLE \`footer_legal_links\`;`)
  await db.run(sql`ALTER TABLE \`__new_footer_legal_links\` RENAME TO \`footer_legal_links\`;`)
  await db.run(sql`CREATE INDEX \`footer_legal_links_order_idx\` ON \`footer_legal_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_legal_links_parent_id_idx\` ON \`footer_legal_links\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_text_box_buttons\` ADD \`new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_image_link\` ADD \`cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_icon_link\` ADD \`cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_number_link\` ADD \`cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_title_link\` ADD \`cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_price_single\` ADD \`cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_plan\` ADD \`cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_button_group_buttons\` ADD \`new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`button_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` ADD \`more_target_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` ADD \`more_target_href\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` ADD \`more_target_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_primary_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_secondary_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_text_box_buttons\` ADD \`new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_image_link\` ADD \`cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_icon_link\` ADD \`cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_number_link\` ADD \`cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_title_link\` ADD \`cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_price_single\` ADD \`cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_plan\` ADD \`cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_button_group_buttons\` ADD \`new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` ADD \`button_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` ADD \`more_target_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` ADD \`more_target_href\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` ADD \`more_target_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`modals_buttons\` ADD \`new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`sheet_cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`forms_blocks_consent\` ADD \`privacy_target_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`forms_blocks_consent\` ADD \`privacy_target_href\` text;`)
  await db.run(sql`ALTER TABLE \`forms_blocks_consent\` ADD \`privacy_target_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`forms_rels\` ADD \`posts_id\` integer REFERENCES posts(id);`)
  await db.run(sql`ALTER TABLE \`forms_rels\` ADD \`case_studies_id\` integer REFERENCES case_studies(id);`)
  await db.run(sql`ALTER TABLE \`forms_rels\` ADD \`modals_id\` integer REFERENCES modals(id);`)
  await db.run(sql`CREATE INDEX \`forms_rels_posts_id_idx\` ON \`forms_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_rels_case_studies_id_idx\` ON \`forms_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_rels_modals_id_idx\` ON \`forms_rels\` (\`modals_id\`);`)
  await db.run(sql`ALTER TABLE \`settings_socials\` ADD \`new_tab\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`login_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`login_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`articles_all_target_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`articles_all_target_href\` text DEFAULT '/blog';`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`articles_all_target_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`portfolio\` ADD \`cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`portfolio\` ADD \`cta_new_tab\` integer DEFAULT false;`)
  // the translated labels of the recreated link tables, put back
  await db.run(sql`INSERT OR IGNORE INTO \`header_blocks_link_locales\` SELECT * FROM \`__keep_header_blocks_link_locales\`;`)
  await db.run(sql`DROP TABLE \`__keep_header_blocks_link_locales\`;`)
  await db.run(sql`INSERT OR IGNORE INTO \`header_blocks_menu_items_locales\` SELECT * FROM \`__keep_header_blocks_menu_items_locales\`;`)
  await db.run(sql`DROP TABLE \`__keep_header_blocks_menu_items_locales\`;`)
  await db.run(sql`INSERT OR IGNORE INTO \`header_blocks_mega_groups_items_locales\` SELECT * FROM \`__keep_header_blocks_mega_groups_items_locales\`;`)
  await db.run(sql`DROP TABLE \`__keep_header_blocks_mega_groups_items_locales\`;`)
  await db.run(sql`INSERT OR IGNORE INTO \`footer_columns_links_locales\` SELECT * FROM \`__keep_footer_columns_links_locales\`;`)
  await db.run(sql`DROP TABLE \`__keep_footer_columns_links_locales\`;`)
  await db.run(sql`INSERT OR IGNORE INTO \`footer_legal_links_locales\` SELECT * FROM \`__keep_footer_legal_links_locales\`;`)
  await db.run(sql`DROP TABLE \`__keep_footer_legal_links_locales\`;`)
  // the former typed addresses, copied into the new link fields (the old columns go in the next migration)
  await db.run(sql`UPDATE \`pages_blocks_collection\` SET \`more_target_href\` = \`more_href\` WHERE \`more_href\` IS NOT NULL AND \`more_href\` <> '';`)
  await db.run(sql`UPDATE \`sections_blocks_collection\` SET \`more_target_href\` = \`more_href\` WHERE \`more_href\` IS NOT NULL AND \`more_href\` <> '';`)
  await db.run(sql`UPDATE \`forms_blocks_consent\` SET \`privacy_target_href\` = \`privacy_href\` WHERE \`privacy_href\` IS NOT NULL AND \`privacy_href\` <> '';`)
  await db.run(sql`UPDATE \`footer\` SET \`articles_all_target_href\` = \`articles_all_href\` WHERE \`articles_all_href\` IS NOT NULL AND \`articles_all_href\` <> '';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`header_rels\`;`)
  await db.run(sql`DROP TABLE \`footer_rels\`;`)
  await db.run(sql`DROP TABLE \`portfolio_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_forms_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_forms_rels\`("id", "order", "parent_id", "path", "pages_id") SELECT "id", "order", "parent_id", "path", "pages_id" FROM \`forms_rels\`;`)
  await db.run(sql`DROP TABLE \`forms_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_forms_rels\` RENAME TO \`forms_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`forms_rels_order_idx\` ON \`forms_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`forms_rels_parent_idx\` ON \`forms_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_rels_path_idx\` ON \`forms_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`forms_rels_pages_id_idx\` ON \`forms_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_blocks_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_blocks_link\`("_order", "_parent_id", "_path", "id", "href", "block_name") SELECT "_order", "_parent_id", "_path", "id", "href", "block_name" FROM \`header_blocks_link\`;`)
  await db.run(sql`DROP TABLE \`header_blocks_link\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_blocks_link\` RENAME TO \`header_blocks_link\`;`)
  await db.run(sql`CREATE INDEX \`header_blocks_link_order_idx\` ON \`header_blocks_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_blocks_link_parent_id_idx\` ON \`header_blocks_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_blocks_link_path_idx\` ON \`header_blocks_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_blocks_menu_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text NOT NULL,
  	\`icon_key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_blocks_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_blocks_menu_items\`("_order", "_parent_id", "id", "href", "icon_key") SELECT "_order", "_parent_id", "id", "href", "icon_key" FROM \`header_blocks_menu_items\`;`)
  await db.run(sql`DROP TABLE \`header_blocks_menu_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_blocks_menu_items\` RENAME TO \`header_blocks_menu_items\`;`)
  await db.run(sql`CREATE INDEX \`header_blocks_menu_items_order_idx\` ON \`header_blocks_menu_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_blocks_menu_items_parent_id_idx\` ON \`header_blocks_menu_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_blocks_mega_groups_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text NOT NULL,
  	\`icon_key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_blocks_mega_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_blocks_mega_groups_items\`("_order", "_parent_id", "id", "href", "icon_key") SELECT "_order", "_parent_id", "id", "href", "icon_key" FROM \`header_blocks_mega_groups_items\`;`)
  await db.run(sql`DROP TABLE \`header_blocks_mega_groups_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_blocks_mega_groups_items\` RENAME TO \`header_blocks_mega_groups_items\`;`)
  await db.run(sql`CREATE INDEX \`header_blocks_mega_groups_items_order_idx\` ON \`header_blocks_mega_groups_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_blocks_mega_groups_items_parent_id_idx\` ON \`header_blocks_mega_groups_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_footer_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_footer_columns_links\`("_order", "_parent_id", "id", "href") SELECT "_order", "_parent_id", "id", "href" FROM \`footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links\`;`)
  await db.run(sql`ALTER TABLE \`__new_footer_columns_links\` RENAME TO \`footer_columns_links\`;`)
  await db.run(sql`CREATE INDEX \`footer_columns_links_order_idx\` ON \`footer_columns_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_links_parent_id_idx\` ON \`footer_columns_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_footer_legal_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_footer_legal_links\`("_order", "_parent_id", "id", "href") SELECT "_order", "_parent_id", "id", "href" FROM \`footer_legal_links\`;`)
  await db.run(sql`DROP TABLE \`footer_legal_links\`;`)
  await db.run(sql`ALTER TABLE \`__new_footer_legal_links\` RENAME TO \`footer_legal_links\`;`)
  await db.run(sql`CREATE INDEX \`footer_legal_links_order_idx\` ON \`footer_legal_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_legal_links_parent_id_idx\` ON \`footer_legal_links\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_text_box_buttons\` DROP COLUMN \`new_tab\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_image_link\` DROP COLUMN \`cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_icon_link\` DROP COLUMN \`cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_number_link\` DROP COLUMN \`cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_title_link\` DROP COLUMN \`cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_price_single\` DROP COLUMN \`cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_plan\` DROP COLUMN \`cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_button_group_buttons\` DROP COLUMN \`new_tab\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`button_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` DROP COLUMN \`more_target_kind\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` DROP COLUMN \`more_target_href\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` DROP COLUMN \`more_target_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_primary_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_secondary_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_text_box_buttons\` DROP COLUMN \`new_tab\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_image_link\` DROP COLUMN \`cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_icon_link\` DROP COLUMN \`cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_number_link\` DROP COLUMN \`cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_title_link\` DROP COLUMN \`cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_price_single\` DROP COLUMN \`cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_plan\` DROP COLUMN \`cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_button_group_buttons\` DROP COLUMN \`new_tab\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` DROP COLUMN \`button_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` DROP COLUMN \`more_target_kind\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` DROP COLUMN \`more_target_href\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` DROP COLUMN \`more_target_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`modals_buttons\` DROP COLUMN \`new_tab\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`sheet_cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`forms_blocks_consent\` DROP COLUMN \`privacy_target_kind\`;`)
  await db.run(sql`ALTER TABLE \`forms_blocks_consent\` DROP COLUMN \`privacy_target_href\`;`)
  await db.run(sql`ALTER TABLE \`forms_blocks_consent\` DROP COLUMN \`privacy_target_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`settings_socials\` DROP COLUMN \`new_tab\`;`)
  await db.run(sql`ALTER TABLE \`header\` DROP COLUMN \`login_kind\`;`)
  await db.run(sql`ALTER TABLE \`header\` DROP COLUMN \`login_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`header\` DROP COLUMN \`cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`header\` DROP COLUMN \`cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`articles_all_target_kind\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`articles_all_target_href\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`articles_all_target_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`portfolio\` DROP COLUMN \`cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`portfolio\` DROP COLUMN \`cta_new_tab\`;`)
}
