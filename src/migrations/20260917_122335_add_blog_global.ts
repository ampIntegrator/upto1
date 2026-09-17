import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`blog\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`page_id\` integer,
  	\`tone\` text DEFAULT 'light',
  	\`per_page\` numeric DEFAULT 12,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_page_idx\` ON \`blog\` (\`page_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_locales\` (
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
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_locales_locale_parent_id_unique\` ON \`blog_locales\` (\`_locale\`,\`_parent_id\`);`)
  // move the values of Site settings › Blog into the new global (their columns are dropped by the next migration)
  await db.run(sql`INSERT INTO \`blog\` (\`id\`, \`page_id\`, \`tone\`, \`per_page\`, \`updated_at\`, \`created_at\`)
    SELECT \`id\`, \`blog_page_id\`, COALESCE(\`blog_tone\`, 'light'), COALESCE(\`blog_per_page\`, 12), \`updated_at\`, \`created_at\` FROM \`settings\`;`)
  await db.run(sql`INSERT INTO \`blog_locales\` (\`eyebrow\`, \`title\`, \`lead\`, \`labels_all\`, \`labels_read_more\`, \`labels_date_label\`, \`labels_toc\`, \`labels_category_prefix\`, \`labels_more\`, \`labels_related_eyebrow\`, \`labels_related_title\`, \`_locale\`, \`_parent_id\`)
    SELECT \`blog_eyebrow\`, \`blog_title\`, \`blog_lead\`, \`blog_labels_all\`, \`blog_labels_read_more\`, \`blog_labels_date_label\`, \`blog_labels_toc\`, \`blog_labels_category_prefix\`, \`blog_labels_more\`, \`blog_labels_related_eyebrow\`, \`blog_labels_related_title\`, \`_locale\`, \`_parent_id\` FROM \`settings_locales\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`blog\`;`)
  await db.run(sql`DROP TABLE \`blog_locales\`;`)
}
