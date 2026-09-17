import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_blog\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text DEFAULT 'blog' NOT NULL,
  	\`tone\` text DEFAULT 'light',
  	\`per_page\` numeric DEFAULT 12,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_blog\`("id", "slug", "tone", "per_page", "updated_at", "created_at") SELECT "id", "slug", "tone", "per_page", "updated_at", "created_at" FROM \`blog\`;`)
  await db.run(sql`DROP TABLE \`blog\`;`)
  await db.run(sql`ALTER TABLE \`__new_blog\` RENAME TO \`blog\`;`)
  await db.run(sql`CREATE TABLE \`__new_portfolio\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text DEFAULT 'realisations' NOT NULL,
  	\`tone\` text DEFAULT 'light',
  	\`per_page\` numeric DEFAULT 12,
  	\`cta_href\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_portfolio\`("id", "slug", "tone", "per_page", "cta_href", "updated_at", "created_at") SELECT "id", "slug", "tone", "per_page", "cta_href", "updated_at", "created_at" FROM \`portfolio\`;`)
  await db.run(sql`DROP TABLE \`portfolio\`;`)
  await db.run(sql`ALTER TABLE \`__new_portfolio\` RENAME TO \`portfolio\`;`)
  // foreign keys back on after both rebuilds (not between them: dropping portfolio would cascade to its locales)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`blog\` ADD \`page_id\` integer REFERENCES pages(id);`)
  await db.run(sql`CREATE INDEX \`blog_page_idx\` ON \`blog\` (\`page_id\`);`)
  await db.run(sql`ALTER TABLE \`portfolio\` ADD \`page_id\` integer REFERENCES pages(id);`)
  await db.run(sql`CREATE INDEX \`portfolio_page_idx\` ON \`portfolio\` (\`page_id\`);`)
}
