import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`min_height\` text DEFAULT '320',
  	\`min_height_mobile\` text DEFAULT '240',
  	\`overlay\` numeric DEFAULT 0,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_order_idx\` ON \`pages_blocks_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_parent_id_idx\` ON \`pages_blocks_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_path_idx\` ON \`pages_blocks_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_image_idx\` ON \`pages_blocks_media\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`min_height\` text DEFAULT '320',
  	\`min_height_mobile\` text DEFAULT '240',
  	\`overlay\` numeric DEFAULT 0,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_media_order_idx\` ON \`sections_blocks_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_media_parent_id_idx\` ON \`sections_blocks_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_media_path_idx\` ON \`sections_blocks_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_media_image_idx\` ON \`sections_blocks_media\` (\`image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_media\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_media\`;`)
}
