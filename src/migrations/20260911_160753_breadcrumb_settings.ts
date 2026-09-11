import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`silo\` text DEFAULT 'inherit',
  	\`hero_variant\` text DEFAULT 'page-image' NOT NULL,
  	\`hero_primary_href\` text,
  	\`hero_primary_icon_key\` text,
  	\`hero_secondary_href\` text,
  	\`hero_secondary_icon_key\` text,
  	\`hero_image_id\` integer,
  	\`hero_video_id\` integer,
  	\`hero_poster_id\` integer,
  	\`hero_overlay\` numeric DEFAULT 0.3,
  	\`hero_media_id\` integer,
  	\`hero_breadcrumb\` integer,
  	\`hero_breadcrumb_mode\` text DEFAULT 'inherit',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages\`("id", "slug", "silo", "hero_variant", "hero_primary_href", "hero_primary_icon_key", "hero_secondary_href", "hero_secondary_icon_key", "hero_image_id", "hero_video_id", "hero_poster_id", "hero_overlay", "hero_media_id", "hero_breadcrumb", "updated_at", "created_at") SELECT "id", "slug", "silo", "hero_variant", "hero_primary_href", "hero_primary_icon_key", "hero_secondary_href", "hero_secondary_icon_key", "hero_image_id", "hero_video_id", "hero_poster_id", "hero_overlay", "hero_media_id", "hero_breadcrumb", "updated_at", "created_at" FROM \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_image_idx\` ON \`pages\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_video_idx\` ON \`pages\` (\`hero_video_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_poster_idx\` ON \`pages\` (\`hero_poster_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_media_idx\` ON \`pages\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`settings\` ADD \`breadcrumb_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` ADD \`breadcrumb_home_label\` text DEFAULT 'Accueil';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`silo\` text DEFAULT 'inherit',
  	\`hero_variant\` text DEFAULT 'page-image' NOT NULL,
  	\`hero_primary_href\` text,
  	\`hero_primary_icon_key\` text,
  	\`hero_secondary_href\` text,
  	\`hero_secondary_icon_key\` text,
  	\`hero_image_id\` integer,
  	\`hero_video_id\` integer,
  	\`hero_poster_id\` integer,
  	\`hero_overlay\` numeric DEFAULT 0.3,
  	\`hero_media_id\` integer,
  	\`hero_breadcrumb\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages\`("id", "slug", "silo", "hero_variant", "hero_primary_href", "hero_primary_icon_key", "hero_secondary_href", "hero_secondary_icon_key", "hero_image_id", "hero_video_id", "hero_poster_id", "hero_overlay", "hero_media_id", "hero_breadcrumb", "updated_at", "created_at") SELECT "id", "slug", "silo", "hero_variant", "hero_primary_href", "hero_primary_icon_key", "hero_secondary_href", "hero_secondary_icon_key", "hero_image_id", "hero_video_id", "hero_poster_id", "hero_overlay", "hero_media_id", "hero_breadcrumb", "updated_at", "created_at" FROM \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_image_idx\` ON \`pages\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_video_idx\` ON \`pages\` (\`hero_video_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_poster_idx\` ON \`pages\` (\`hero_poster_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_media_idx\` ON \`pages\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`settings\` DROP COLUMN \`breadcrumb_enabled\`;`)
  await db.run(sql`ALTER TABLE \`settings_locales\` DROP COLUMN \`breadcrumb_home_label\`;`)
}
