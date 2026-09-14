import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_locales\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`pages_locales\` ADD \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`pages_locales\` ADD \`meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`ALTER TABLE \`posts_locales\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`posts_locales\` ADD \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`posts_locales\` ADD \`meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`posts_meta_meta_image_idx\` ON \`posts_locales\` (\`meta_image_id\`,\`_locale\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_locales\` (
  	\`title\` text NOT NULL,
  	\`hero_eyebrow\` text,
  	\`hero_title\` text NOT NULL,
  	\`hero_lead\` text,
  	\`hero_primary_label\` text,
  	\`hero_secondary_label\` text,
  	\`hero_scroll_hint\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_locales\`("title", "hero_eyebrow", "hero_title", "hero_lead", "hero_primary_label", "hero_secondary_label", "hero_scroll_hint", "id", "_locale", "_parent_id") SELECT "title", "hero_eyebrow", "hero_title", "hero_lead", "hero_primary_label", "hero_secondary_label", "hero_scroll_hint", "id", "_locale", "_parent_id" FROM \`pages_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_locales\` RENAME TO \`pages_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_posts_locales\` (
  	\`title\` text NOT NULL,
  	\`excerpt\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_posts_locales\`("title", "excerpt", "content", "id", "_locale", "_parent_id") SELECT "title", "excerpt", "content", "id", "_locale", "_parent_id" FROM \`posts_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_posts_locales\` RENAME TO \`posts_locales\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`)
}
