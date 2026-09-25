import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`cover_overlay\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`cover_overlay_color\` text DEFAULT 'black';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`cover_overlay\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`cover_overlay_color\`;`)
}
