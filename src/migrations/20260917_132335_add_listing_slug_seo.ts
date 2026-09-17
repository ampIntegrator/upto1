import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`blog\` ADD \`slug\` text DEFAULT 'blog' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`blog_locales\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`blog_locales\` ADD \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`blog_locales\` ADD \`meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`blog_meta_meta_image_idx\` ON \`blog_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`ALTER TABLE \`portfolio\` ADD \`slug\` text DEFAULT 'realisations' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` ADD \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` ADD \`meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`portfolio_meta_meta_image_idx\` ON \`portfolio_locales\` (\`meta_image_id\`,\`_locale\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_blog_locales\` (
  	\`eyebrow\` text DEFAULT 'Le blog',
  	\`title\` text DEFAULT 'Actualités',
  	\`lead\` text,
  	\`labels_all\` text DEFAULT 'Tous',
  	\`labels_read_more\` text DEFAULT 'Lire l’article',
  	\`labels_date_label\` text DEFAULT 'Publié le',
  	\`labels_toc\` text DEFAULT 'Sommaire',
  	\`labels_category_prefix\` text DEFAULT 'Catégorie',
  	\`labels_more\` text DEFAULT 'Voir le blog',
  	\`labels_related_eyebrow\` text DEFAULT 'Le blog',
  	\`labels_related_title\` text DEFAULT 'Pour continuer <span>sur le sujet.</span>',
  	\`labels_empty\` text DEFAULT 'Aucun article pour le moment.',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_blog_locales\`("eyebrow", "title", "lead", "labels_all", "labels_read_more", "labels_date_label", "labels_toc", "labels_category_prefix", "labels_more", "labels_related_eyebrow", "labels_related_title", "labels_empty", "id", "_locale", "_parent_id") SELECT "eyebrow", "title", "lead", "labels_all", "labels_read_more", "labels_date_label", "labels_toc", "labels_category_prefix", "labels_more", "labels_related_eyebrow", "labels_related_title", "labels_empty", "id", "_locale", "_parent_id" FROM \`blog_locales\`;`)
  await db.run(sql`DROP TABLE \`blog_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_blog_locales\` RENAME TO \`blog_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_locales_locale_parent_id_unique\` ON \`blog_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_portfolio_locales\` (
  	\`eyebrow\` text DEFAULT 'Nos réalisations',
  	\`title\` text DEFAULT 'Des chantiers <span>chiffrés juste.</span>',
  	\`lead\` text,
  	\`labels_all\` text DEFAULT 'Toutes',
  	\`labels_read_more\` text DEFAULT 'Voir l’étude',
  	\`labels_badge\` text DEFAULT 'Étude de cas',
  	\`labels_category_prefix\` text DEFAULT 'Catégorie',
  	\`labels_more\` text DEFAULT 'Voir toutes les réalisations',
  	\`labels_related_eyebrow\` text DEFAULT 'Nos réalisations',
  	\`labels_related_title\` text DEFAULT 'D’autres chantiers <span>chiffrés juste.</span>',
  	\`labels_empty\` text DEFAULT 'Aucune réalisation pour le moment.',
  	\`sheet_client\` text DEFAULT 'Client',
  	\`sheet_category\` text DEFAULT 'Catégorie',
  	\`sheet_location\` text DEFAULT 'Localisation',
  	\`sheet_deployment\` text DEFAULT 'Déploiement',
  	\`sheet_modules\` text DEFAULT 'Modules Orbita',
  	\`sheet_client_link\` text DEFAULT 'Site du client',
  	\`cta_label\` text DEFAULT 'Réserver une démo',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`portfolio\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_portfolio_locales\`("eyebrow", "title", "lead", "labels_all", "labels_read_more", "labels_badge", "labels_category_prefix", "labels_more", "labels_related_eyebrow", "labels_related_title", "labels_empty", "sheet_client", "sheet_category", "sheet_location", "sheet_deployment", "sheet_modules", "sheet_client_link", "cta_label", "id", "_locale", "_parent_id") SELECT "eyebrow", "title", "lead", "labels_all", "labels_read_more", "labels_badge", "labels_category_prefix", "labels_more", "labels_related_eyebrow", "labels_related_title", "labels_empty", "sheet_client", "sheet_category", "sheet_location", "sheet_deployment", "sheet_modules", "sheet_client_link", "cta_label", "id", "_locale", "_parent_id" FROM \`portfolio_locales\`;`)
  await db.run(sql`DROP TABLE \`portfolio_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_portfolio_locales\` RENAME TO \`portfolio_locales\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`portfolio_locales_locale_parent_id_unique\` ON \`portfolio_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`blog\` DROP COLUMN \`slug\`;`)
  await db.run(sql`ALTER TABLE \`portfolio\` DROP COLUMN \`slug\`;`)
}
