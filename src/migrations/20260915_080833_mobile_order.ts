import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_section_rows_columns\` ADD \`mobile_order\` numeric;`)
  await db.run(sql`ALTER TABLE \`sections_rows_columns\` ADD \`mobile_order\` numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_section_rows_columns\` DROP COLUMN \`mobile_order\`;`)
  await db.run(sql`ALTER TABLE \`sections_rows_columns\` DROP COLUMN \`mobile_order\`;`)
}
