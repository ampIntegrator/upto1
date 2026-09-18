import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`blog_locales\` DROP COLUMN \`labels_related_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`blog_locales\` DROP COLUMN \`labels_related_title\`;`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` DROP COLUMN \`labels_related_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` DROP COLUMN \`labels_related_title\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`blog_locales\` ADD \`labels_related_eyebrow\` text DEFAULT 'Le blog';`)
  await db.run(sql`ALTER TABLE \`blog_locales\` ADD \`labels_related_title\` text DEFAULT 'Pour continuer <span>sur le sujet.</span>';`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` ADD \`labels_related_eyebrow\` text DEFAULT 'Nos réalisations';`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` ADD \`labels_related_title\` text DEFAULT 'D’autres chantiers <span>chiffrés juste.</span>';`)
}
