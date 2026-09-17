import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Authors } from './collections/Authors'
import { CaseCategories } from './collections/CaseCategories'
import { CaseStudies } from './collections/CaseStudies'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Sections } from './collections/Sections'
import { Users } from './collections/Users'
import { adminI18n } from './i18n/admin/payload'
import { Blog } from './globals/Blog'
import { Portfolio } from './globals/Portfolio'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Languages } from './globals/Languages'
import { Settings } from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export { LOCALES, type Locale } from './locales'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {titleSuffix: ' · Vidomia'},
    components: {
      // interface language selector, next to the content language selector
      actions: ['@/i18n/admin/LanguageSwitcher#LanguageSwitcher'],
    },
  },
  i18n: adminI18n,
  localization: {
    locales: [
      {label: 'Français', code: 'fr'},
      {label: 'English', code: 'en'},
      {label: 'Deutsch', code: 'de'},
      {label: 'Español', code: 'es'},
      {label: 'Italiano', code: 'it'},
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  collections: [Pages, Sections, Posts, Categories, Authors, CaseStudies, CaseCategories, Media, Users],
  globals: [Settings, Languages, Header, Footer, Blog, Portfolio],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Schema driven by explicit migrations, never by automatic « push »: a field
  // change does not touch the data. Procedure: pnpm db:backup → pnpm migrate:create <name> →
  // review the migration → pnpm migrate.
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
    },
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    // Basic SEO (title, description, share image, preview): « SEO » tab of pages, posts and case studies.
    seoPlugin({
      collections: ['pages', 'posts', 'case-studies'],
      uploadsCollection: 'media',
      tabbedUI: true,
      // translatable title and description, like the rest of the content
      fields: ({ defaultFields }) =>
        defaultFields.map((f) => ('name' in f && (f.name === 'title' || f.name === 'description') ? { ...f, localized: true } : f)),
      generateTitle: ({ doc }) => (doc?.title ? `${doc.title} · Vidomia` : 'Vidomia'),
      generateDescription: ({ doc }) => doc?.excerpt ?? doc?.hero?.lead ?? '',
      // posts and case studies live under the page chosen in their settings global
      generateURL: async ({ doc, collectionSlug, req }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
        const listing = collectionSlug === 'posts' ? 'blog' : collectionSlug === 'case-studies' ? 'portfolio' : null
        if (listing) {
          const settings = await req.payload.findGlobal({ slug: listing, depth: 1, req })
          const page = settings.page && typeof settings.page === 'object' ? settings.page.slug : null
          return `${base}/${page ?? (listing === 'blog' ? 'blog' : 'realisations')}/${doc?.slug ?? ''}`
        }
        return doc?.slug && doc.slug !== 'accueil' ? `${base}/${doc.slug}` : base
      },
    }),
  ],
})
