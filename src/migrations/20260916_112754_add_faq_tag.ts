import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`tag\` text DEFAULT 'h3';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` ADD \`tag\` text DEFAULT 'h3';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`tag\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` DROP COLUMN \`tag\`;`)
}
