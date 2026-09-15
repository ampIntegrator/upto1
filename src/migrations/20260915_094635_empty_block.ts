import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_empty\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_empty_order_idx\` ON \`pages_blocks_empty\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_empty_parent_id_idx\` ON \`pages_blocks_empty\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_empty_path_idx\` ON \`pages_blocks_empty\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_empty\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_empty_order_idx\` ON \`sections_blocks_empty\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_empty_parent_id_idx\` ON \`sections_blocks_empty\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_empty_path_idx\` ON \`sections_blocks_empty\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_empty\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_empty\`;`)
}
