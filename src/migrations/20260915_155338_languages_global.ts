import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`languages_languages\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`languages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`languages_languages_order_idx\` ON \`languages_languages\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`languages_languages_parent_idx\` ON \`languages_languages\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`languages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  // Data: copy the site switcher languages from the Site settings global (old table dropped in the next migration).
  await db.run(sql`INSERT INTO \`languages\` (\`id\`, \`updated_at\`, \`created_at\`) SELECT \`id\`, \`updated_at\`, \`created_at\` FROM \`settings\`;`)
  await db.run(sql`INSERT INTO \`languages_languages\` (\`order\`, \`parent_id\`, \`value\`, \`id\`) SELECT \`order\`, \`parent_id\`, \`value\`, \`id\` FROM \`settings_languages\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`languages_languages\`;`)
  await db.run(sql`DROP TABLE \`languages\`;`)
}
