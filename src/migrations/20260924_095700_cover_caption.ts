import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` ADD \`cover_caption_tone\` text DEFAULT 'light';`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`cover_caption_tone\` text DEFAULT 'light';`)
  await db.run(sql`ALTER TABLE \`case_studies_locales\` ADD \`cover_caption\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`cover_caption_tone\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`cover_caption_tone\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_locales\` DROP COLUMN \`cover_caption\`;`)
}
