import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`forms\` ADD \`eyebrow_style\` text DEFAULT 'eyebrow';`)
  await db.run(sql`ALTER TABLE \`forms_locales\` ADD \`list_title\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`forms\` DROP COLUMN \`eyebrow_style\`;`)
  await db.run(sql`ALTER TABLE \`forms_locales\` DROP COLUMN \`list_title\`;`)
}
