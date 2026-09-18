import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` ADD \`more_link\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` ADD \`more_href\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection_locales\` ADD \`more_label\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` ADD \`more_link\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` ADD \`more_href\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection_locales\` ADD \`more_label\` text;`)
  await db.run(sql`ALTER TABLE \`posts_blocks_collection\` ADD \`more_link\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`posts_blocks_collection\` ADD \`more_href\` text;`)
  await db.run(sql`ALTER TABLE \`posts_blocks_collection_locales\` ADD \`more_label\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_collection\` ADD \`more_link\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_collection\` ADD \`more_href\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_collection_locales\` ADD \`more_label\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` DROP COLUMN \`more_link\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` DROP COLUMN \`more_href\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection_locales\` DROP COLUMN \`more_label\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` DROP COLUMN \`more_link\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` DROP COLUMN \`more_href\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection_locales\` DROP COLUMN \`more_label\`;`)
  await db.run(sql`ALTER TABLE \`posts_blocks_collection\` DROP COLUMN \`more_link\`;`)
  await db.run(sql`ALTER TABLE \`posts_blocks_collection\` DROP COLUMN \`more_href\`;`)
  await db.run(sql`ALTER TABLE \`posts_blocks_collection_locales\` DROP COLUMN \`more_label\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_collection\` DROP COLUMN \`more_link\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_collection\` DROP COLUMN \`more_href\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_collection_locales\` DROP COLUMN \`more_label\`;`)
}
