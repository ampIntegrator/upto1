import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`sheet_custom_defaults\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`sheet_cta_kind\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`sheet_cta_href\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`sheet_cta_new_tab\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_locales\` DROP COLUMN \`sheet_card_result\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_locales\` DROP COLUMN \`sheet_location_label\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_locales\` DROP COLUMN \`sheet_deployment_label\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_locales\` DROP COLUMN \`sheet_modules_label\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_locales\` DROP COLUMN \`sheet_cta_label\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`sheet_custom_defaults\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`sheet_cta_kind\` text DEFAULT 'url';`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`sheet_cta_href\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`sheet_cta_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`case_studies_locales\` ADD \`sheet_card_result\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_locales\` ADD \`sheet_location_label\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_locales\` ADD \`sheet_deployment_label\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_locales\` ADD \`sheet_modules_label\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_locales\` ADD \`sheet_cta_label\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_rels\` ADD \`pages_id\` integer REFERENCES pages(id);`)
  await db.run(sql`ALTER TABLE \`case_studies_rels\` ADD \`posts_id\` integer REFERENCES posts(id);`)
  await db.run(sql`ALTER TABLE \`case_studies_rels\` ADD \`modals_id\` integer REFERENCES modals(id);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_pages_id_idx\` ON \`case_studies_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_posts_id_idx\` ON \`case_studies_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_modals_id_idx\` ON \`case_studies_rels\` (\`modals_id\`);`)
}
