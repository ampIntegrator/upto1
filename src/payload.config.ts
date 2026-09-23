import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
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
import { Modals } from './collections/Modals'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Sections } from './collections/Sections'
import { Users } from './collections/Users'
import { formsPlugin } from './fields/forms/plugin'
import { withoutCollapseMemory } from './fields/noCollapseMemory'
import { adminI18n } from './i18n/admin/payload'
import { collectionsText } from './i18n/admin/collections'
import { pageTreeText } from './i18n/admin/pageTree'
import { pagePath } from './lib/page-paths'
import { livePreview } from './livePreview'
import { Blog } from './globals/Blog'
import { Portfolio } from './globals/Portfolio'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Languages } from './globals/Languages'
import { Settings } from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export { LOCALES, type Locale } from './locales'

const withoutCollapseMemoryAsync = async (config: ReturnType<typeof buildConfig>) => withoutCollapseMemory(await config)

// pages always open with their sections folded: no memory of folded accordions (src/fields/noCollapseMemory.ts)
export default withoutCollapseMemoryAsync(buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {titleSuffix: ' · Vidomia'},
    // « Aperçu en direct » tab: the site page next to the form, refreshed on save (src/livePreview.ts)
    livePreview,
    components: {
      // interface language selector, next to the content language selector
      actions: ['@/i18n/admin/LanguageSwitcher#LanguageSwitcher'],
      // « Nouveau formulaire » right under the Formulaires group (the last one of the menu)
      afterNavLinks: ['@/fields/forms/NewFormNavLink#NewFormNavLink'],
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
  collections: [Pages, Sections, Modals, Posts, Categories, Authors, CaseStudies, CaseCategories, Media, Users],
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
    // Nested pages: parent page and breadcrumb (the address lives in the page's `path`, src/fields/pageTree.ts)
    nestedDocsPlugin({
      collections: ['pages'],
      generateLabel: (_docs, doc) => String(doc.title ?? ''),
      generateURL: (docs) => docs.reduce((url, d) => `${url}/${String(d.slug ?? '')}`, ''),
    }),
    // Redirects: created when a page's address changes, or by hand; followed by the site's routes
    redirectsPlugin({
      collections: ['pages', 'posts', 'case-studies'],
      overrides: {
        labels: pageTreeText.redirects,
        admin: { group: collectionsText.groups.site, description: pageTreeText.redirectsDescription },
        // the site reads them through the local API
        access: { read: ({ req }) => Boolean(req.user) },
      },
    }),
    // Forms: « Formulaires » group (forms, submissions), shaped for the site's SiteForm (docs/forms.md)
    formsPlugin(),
    // Basic SEO (title, description, share image, preview): « SEO » tab of pages, posts and case studies.
    seoPlugin({
      collections: ['pages', 'posts', 'case-studies'],
      // the listing pages (blog, case studies) are not pages: their SEO lives in their settings global
      globals: ['blog', 'portfolio'],
      uploadsCollection: 'media',
      tabbedUI: true,
      // translatable title and description, like the rest of the content
      fields: ({ defaultFields }) =>
        defaultFields.map((f) => ('name' in f && (f.name === 'title' || f.name === 'description') ? { ...f, localized: true } : f)),
      generateTitle: ({ doc }) => (doc?.title ? `${String(doc.title).replace(/<\/?span>/g, '')} · Vidomia` : 'Vidomia'),
      generateDescription: ({ doc }) => doc?.excerpt ?? doc?.lead ?? doc?.hero?.lead ?? '',
      // the listings (blog, case studies) live at the address typed in their settings global,
      // their entries under it
      generateURL: async ({ doc, collectionSlug, globalSlug, req }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
        if (globalSlug === 'blog' || globalSlug === 'portfolio') return `${base}/${doc?.slug ?? ''}`
        const listing = collectionSlug === 'posts' ? 'blog' : collectionSlug === 'case-studies' ? 'portfolio' : null
        if (listing) {
          const settings = await req.payload.findGlobal({ slug: listing, depth: 0, req })
          return `${base}/${settings.slug}/${doc?.slug ?? ''}`
        }
        return `${base}${pagePath(doc as { slug?: string; path?: string })}`.replace(/\/$/, '') || base
      },
    }),
  ],
}))
