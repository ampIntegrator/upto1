import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fr } from '@payloadcms/translations/languages/fr'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Settings } from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** Langues de contenu : le français est la référence, les autres retombent dessus tant qu'elles ne sont pas traduites. */
export const LOCALES = ['fr', 'en', 'de', 'es'] as const
export type Locale = (typeof LOCALES)[number]

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {titleSuffix: ' · Vidomia'},
  },
  i18n: {supportedLanguages: {fr}, fallbackLanguage: 'fr'},
  localization: {
    locales: [
      {label: 'Français', code: 'fr'},
      {label: 'English', code: 'en'},
      {label: 'Deutsch', code: 'de'},
      {label: 'Español', code: 'es'},
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  collections: [Pages, Posts, Categories, Media, Users],
  globals: [Settings, Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Schéma piloté par migrations explicites, jamais par « push » automatique : un changement de
  // champ ne touche pas aux données. Procédure : pnpm db:backup → pnpm migrate:create <nom> →
  // relire la migration → pnpm migrate.
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
    },
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [],
})
