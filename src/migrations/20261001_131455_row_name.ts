import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_section_rows\` ADD \`name\` text;`)
  await db.run(sql`ALTER TABLE \`sections_rows\` ADD \`name\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_section_rows\` DROP COLUMN \`name\`;`)
  await db.run(sql`ALTER TABLE \`sections_rows\` DROP COLUMN \`name\`;`)
}
