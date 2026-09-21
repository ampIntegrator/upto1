import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // the displayed title becomes the title (French first, the default locale): keep it before dropping
  await db.run(sql`UPDATE \`forms\` SET \`title\` = (SELECT \`heading\` FROM \`forms_locales\` WHERE \`_parent_id\` = \`forms\`.\`id\` AND \`heading\` IS NOT NULL AND \`heading\` <> '' ORDER BY \`_locale\` = 'fr' DESC LIMIT 1) WHERE EXISTS (SELECT 1 FROM \`forms_locales\` WHERE \`_parent_id\` = \`forms\`.\`id\` AND \`heading\` IS NOT NULL AND \`heading\` <> '');`)
  await db.run(sql`ALTER TABLE \`forms_locales\` DROP COLUMN \`heading\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`forms_locales\` ADD \`heading\` text;`)
}
