import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`blog\` ADD \`related_tag\` text DEFAULT 'h2';`)
  await db.run(sql`ALTER TABLE \`blog_locales\` ADD \`faq_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`blog_locales\` ADD \`related_eyebrow\` text DEFAULT 'Le blog';`)
  await db.run(sql`ALTER TABLE \`blog_locales\` ADD \`related_title\` text DEFAULT 'Pour continuer <span>sur le sujet.</span>';`)
  await db.run(sql`ALTER TABLE \`portfolio\` ADD \`related_tag\` text DEFAULT 'h2';`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` ADD \`faq_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` ADD \`related_eyebrow\` text DEFAULT 'Nos réalisations';`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` ADD \`related_title\` text DEFAULT 'D’autres chantiers <span>chiffrés juste.</span>';`)
  // the related headings move from the Labels tab to « Sous les articles / réalisations »: keep what was typed
  await db.run(sql`UPDATE \`blog_locales\` SET \`related_eyebrow\` = COALESCE(\`labels_related_eyebrow\`, \`related_eyebrow\`), \`related_title\` = COALESCE(\`labels_related_title\`, \`related_title\`);`)
  await db.run(sql`UPDATE \`portfolio_locales\` SET \`related_eyebrow\` = COALESCE(\`labels_related_eyebrow\`, \`related_eyebrow\`), \`related_title\` = COALESCE(\`labels_related_title\`, \`related_title\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`blog\` DROP COLUMN \`related_tag\`;`)
  await db.run(sql`ALTER TABLE \`blog_locales\` DROP COLUMN \`faq_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`blog_locales\` DROP COLUMN \`related_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`blog_locales\` DROP COLUMN \`related_title\`;`)
  await db.run(sql`ALTER TABLE \`portfolio\` DROP COLUMN \`related_tag\`;`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` DROP COLUMN \`faq_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` DROP COLUMN \`related_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`portfolio_locales\` DROP COLUMN \`related_title\`;`)
}
