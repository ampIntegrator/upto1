import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // the title becomes translatable: a default for the existing rows, then each form's title copied into
  // its rows (a form without any row gets a French one), the list title without the <span> tags
  await db.run(sql`ALTER TABLE \`forms_locales\` ADD \`title\` text NOT NULL DEFAULT '';`)
  await db.run(sql`INSERT INTO \`forms_locales\` (\`_locale\`, \`_parent_id\`, \`title\`) SELECT 'fr', \`id\`, \`title\` FROM \`forms\` WHERE NOT EXISTS (SELECT 1 FROM \`forms_locales\` WHERE \`_parent_id\` = \`forms\`.\`id\`);`)
  await db.run(sql`UPDATE \`forms_locales\` SET \`title\` = (SELECT \`title\` FROM \`forms\` WHERE \`forms\`.\`id\` = \`forms_locales\`.\`_parent_id\`);`)
  await db.run(sql`UPDATE \`forms_locales\` SET \`list_title\` = trim(replace(replace(\`title\`, '<span>', ''), '</span>', ''));`)
  await db.run(sql`ALTER TABLE \`forms\` DROP COLUMN \`title\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`forms\` ADD \`title\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`forms_locales\` DROP COLUMN \`title\`;`)
}
