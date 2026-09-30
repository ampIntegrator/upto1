import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` DROP COLUMN \`more_href\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` DROP COLUMN \`more_href\`;`)
  await db.run(sql`ALTER TABLE \`forms_blocks_consent\` DROP COLUMN \`privacy_href\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`articles_all_href\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` ADD \`more_href\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` ADD \`more_href\` text;`)
  await db.run(sql`ALTER TABLE \`forms_blocks_consent\` ADD \`privacy_href\` text;`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`articles_all_href\` text DEFAULT '/blog';`)
}
