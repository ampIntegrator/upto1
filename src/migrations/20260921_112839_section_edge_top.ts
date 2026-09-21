import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_section\` ADD \`edge_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections\` ADD \`edge_top\` text DEFAULT 'auto';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_section\` DROP COLUMN \`edge_top\`;`)
  await db.run(sql`ALTER TABLE \`sections\` DROP COLUMN \`edge_top\`;`)
}
