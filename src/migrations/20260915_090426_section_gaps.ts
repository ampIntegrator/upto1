import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_section\` ADD \`gap_x\` text DEFAULT 'site';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_section\` ADD \`gap_y\` text DEFAULT 'site';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_section\` ADD \`gap_y_mobile\` text DEFAULT 'site';`)
  await db.run(sql`ALTER TABLE \`sections\` ADD \`gap_x\` text DEFAULT 'site';`)
  await db.run(sql`ALTER TABLE \`sections\` ADD \`gap_y\` text DEFAULT 'site';`)
  await db.run(sql`ALTER TABLE \`sections\` ADD \`gap_y_mobile\` text DEFAULT 'site';`)
  await db.run(sql`ALTER TABLE \`settings\` ADD \`section_grid_gap_x\` text DEFAULT '30' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`settings\` ADD \`section_grid_gap_y\` text DEFAULT '40' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`settings\` ADD \`section_grid_gap_y_mobile\` text DEFAULT '40' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_section\` DROP COLUMN \`gap_x\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_section\` DROP COLUMN \`gap_y\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_section\` DROP COLUMN \`gap_y_mobile\`;`)
  await db.run(sql`ALTER TABLE \`sections\` DROP COLUMN \`gap_x\`;`)
  await db.run(sql`ALTER TABLE \`sections\` DROP COLUMN \`gap_y\`;`)
  await db.run(sql`ALTER TABLE \`sections\` DROP COLUMN \`gap_y_mobile\`;`)
  await db.run(sql`ALTER TABLE \`settings\` DROP COLUMN \`section_grid_gap_x\`;`)
  await db.run(sql`ALTER TABLE \`settings\` DROP COLUMN \`section_grid_gap_y\`;`)
  await db.run(sql`ALTER TABLE \`settings\` DROP COLUMN \`section_grid_gap_y_mobile\`;`)
}
