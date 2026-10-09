import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_card_icon\` ADD \`v_align\` text DEFAULT 'start';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_number\` ADD \`v_align\` text DEFAULT 'start';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_title\` ADD \`v_align\` text DEFAULT 'start';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_icon_link\` ADD \`v_align\` text DEFAULT 'start';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_number_link\` ADD \`v_align\` text DEFAULT 'start';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_title_link\` ADD \`v_align\` text DEFAULT 'start';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` ADD \`item_gap\` text DEFAULT 'row';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_icon\` ADD \`v_align\` text DEFAULT 'start';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_number\` ADD \`v_align\` text DEFAULT 'start';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_title\` ADD \`v_align\` text DEFAULT 'start';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_icon_link\` ADD \`v_align\` text DEFAULT 'start';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_number_link\` ADD \`v_align\` text DEFAULT 'start';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_title_link\` ADD \`v_align\` text DEFAULT 'start';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` ADD \`item_gap\` text DEFAULT 'row';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_card_icon\` DROP COLUMN \`v_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_number\` DROP COLUMN \`v_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_title\` DROP COLUMN \`v_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_icon_link\` DROP COLUMN \`v_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_number_link\` DROP COLUMN \`v_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_title_link\` DROP COLUMN \`v_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_collection\` DROP COLUMN \`item_gap\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_icon\` DROP COLUMN \`v_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_number\` DROP COLUMN \`v_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_title\` DROP COLUMN \`v_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_icon_link\` DROP COLUMN \`v_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_number_link\` DROP COLUMN \`v_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_card_title_link\` DROP COLUMN \`v_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_collection\` DROP COLUMN \`item_gap\`;`)
}
