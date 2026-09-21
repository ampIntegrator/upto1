import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`forms_blocks_select\` ADD \`multiple\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`forms_blocks_select\` ADD \`search\` text DEFAULT 'auto';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`forms_blocks_select\` DROP COLUMN \`multiple\`;`)
  await db.run(sql`ALTER TABLE \`forms_blocks_select\` DROP COLUMN \`search\`;`)
}
