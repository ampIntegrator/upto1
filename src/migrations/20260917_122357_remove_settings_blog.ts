import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`silo\` text DEFAULT 'blue' NOT NULL,
  	\`brand_name\` text DEFAULT 'Vidomia' NOT NULL,
  	\`logo_id\` integer,
  	\`phone\` text,
  	\`phone_href\` text,
  	\`email\` text,
  	\`address\` text,
  	\`breadcrumb_enabled\` integer DEFAULT true,
  	\`breadcrumb_home_style\` text DEFAULT 'icon',
  	\`section_grid_gap_x\` text DEFAULT '30' NOT NULL,
  	\`section_grid_gap_y\` text DEFAULT '40' NOT NULL,
  	\`section_grid_gap_y_mobile\` text DEFAULT '40' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_settings\`("id", "silo", "brand_name", "logo_id", "phone", "phone_href", "email", "address", "breadcrumb_enabled", "breadcrumb_home_style", "section_grid_gap_x", "section_grid_gap_y", "section_grid_gap_y_mobile", "updated_at", "created_at") SELECT "id", "silo", "brand_name", "logo_id", "phone", "phone_href", "email", "address", "breadcrumb_enabled", "breadcrumb_home_style", "section_grid_gap_x", "section_grid_gap_y", "section_grid_gap_y_mobile", "updated_at", "created_at" FROM \`settings\`;`)
  await db.run(sql`DROP TABLE \`settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_settings\` RENAME TO \`settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`settings_logo_idx\` ON \`settings\` (\`logo_id\`);`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_title\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_lead\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_all\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_read_more\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_date_label\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_toc\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_category_prefix\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_more\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_related_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`blog_labels_related_title\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`settings\` ADD \`blog_page_id\` integer REFERENCES pages(id);`)
  await db.run(sql`ALTER TABLE \`settings\` ADD \`blog_tone\` text DEFAULT 'light';`)
  await db.run(sql`ALTER TABLE \`settings\` ADD \`blog_per_page\` numeric DEFAULT 12;`)
  await db.run(sql`CREATE INDEX \`settings_blog_blog_page_idx\` ON \`settings\` (\`blog_page_id\`);`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_eyebrow\` text DEFAULT 'Le blog';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_title\` text DEFAULT 'Actualités';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_lead\` text;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_all\` text DEFAULT 'Tous';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_read_more\` text DEFAULT 'Lire l’article';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_date_label\` text DEFAULT 'Publié le';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_toc\` text DEFAULT 'Sommaire';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_category_prefix\` text DEFAULT 'Catégorie';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_more\` text DEFAULT 'Voir le blog';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_related_eyebrow\` text DEFAULT 'Le blog';`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`blog_labels_related_title\` text DEFAULT 'Pour continuer <span>sur le sujet.</span>';`)
}
