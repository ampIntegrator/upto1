import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`case_studies_id\` integer,
  	\`modals_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`modals_id\`) REFERENCES \`modals\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_posts_id_idx\` ON \`pages_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_case_studies_id_idx\` ON \`pages_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_modals_id_idx\` ON \`pages_rels\` (\`modals_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`case_studies_id\` integer,
  	\`modals_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`modals_id\`) REFERENCES \`modals\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_rels_order_idx\` ON \`sections_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`sections_rels_parent_idx\` ON \`sections_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_rels_path_idx\` ON \`sections_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`sections_rels_pages_id_idx\` ON \`sections_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_rels_posts_id_idx\` ON \`sections_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_rels_case_studies_id_idx\` ON \`sections_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_rels_modals_id_idx\` ON \`sections_rels\` (\`modals_id\`);`)
  await db.run(sql`CREATE TABLE \`modals_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`case_studies_id\` integer,
  	\`modals_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`modals\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`modals_id\`) REFERENCES \`modals\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`modals_rels_order_idx\` ON \`modals_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`modals_rels_parent_idx\` ON \`modals_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`modals_rels_path_idx\` ON \`modals_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`modals_rels_pages_id_idx\` ON \`modals_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`modals_rels_posts_id_idx\` ON \`modals_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`modals_rels_case_studies_id_idx\` ON \`modals_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`modals_rels_modals_id_idx\` ON \`modals_rels\` (\`modals_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_text_box_buttons\` ADD \`kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_image_link\` ADD \`cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_icon_link\` ADD \`cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_number_link\` ADD \`cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_title_link\` ADD \`cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_price_single\` ADD \`cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_plan\` ADD \`cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_button_group_buttons\` ADD \`kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`button_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_primary_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_secondary_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_text_box_buttons\` ADD \`kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_image_link\` ADD \`cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_icon_link\` ADD \`cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_number_link\` ADD \`cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_title_link\` ADD \`cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_price_single\` ADD \`cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_plan\` ADD \`cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_button_group_buttons\` ADD \`kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` ADD \`button_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`modals_buttons\` ADD \`kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`sheet_cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`case_studies_rels\` ADD \`pages_id\` integer REFERENCES pages(id);`)
  await db.run(sql`ALTER TABLE \`case_studies_rels\` ADD \`posts_id\` integer REFERENCES posts(id);`)
  await db.run(sql`ALTER TABLE \`case_studies_rels\` ADD \`modals_id\` integer REFERENCES modals(id);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_pages_id_idx\` ON \`case_studies_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_posts_id_idx\` ON \`case_studies_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_modals_id_idx\` ON \`case_studies_rels\` (\`modals_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`sections_rels\`;`)
  await db.run(sql`DROP TABLE \`modals_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_case_studies_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`case_studies_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_case_studies_rels\`("id", "order", "parent_id", "path", "case_studies_id") SELECT "id", "order", "parent_id", "path", "case_studies_id" FROM \`case_studies_rels\`;`)
  await db.run(sql`DROP TABLE \`case_studies_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_case_studies_rels\` RENAME TO \`case_studies_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_order_idx\` ON \`case_studies_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_parent_idx\` ON \`case_studies_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_path_idx\` ON \`case_studies_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_case_studies_id_idx\` ON \`case_studies_rels\` (\`case_studies_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_text_box_buttons\` DROP COLUMN \`kind\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_image_link\` DROP COLUMN \`cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_icon_link\` DROP COLUMN \`cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_number_link\` DROP COLUMN \`cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_title_link\` DROP COLUMN \`cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_price_single\` DROP COLUMN \`cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_plan\` DROP COLUMN \`cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_button_group_buttons\` DROP COLUMN \`kind\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`button_kind\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_primary_kind\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_secondary_kind\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_text_box_buttons\` DROP COLUMN \`kind\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_image_link\` DROP COLUMN \`cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_icon_link\` DROP COLUMN \`cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_number_link\` DROP COLUMN \`cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_title_link\` DROP COLUMN \`cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_price_single\` DROP COLUMN \`cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_plan\` DROP COLUMN \`cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_button_group_buttons\` DROP COLUMN \`kind\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` DROP COLUMN \`button_kind\`;`)
  await db.run(sql`ALTER TABLE \`modals_buttons\` DROP COLUMN \`kind\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`sheet_cta_kind\`;`)
}
