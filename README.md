# upto1

Marketing website for **Vidomia**, built with **Next.js 16**, **Payload CMS 3** (SQLite) and the **Astryx** design system (React, pre-compiled, with a custom theme).

- Front end: http://localhost:3000
- Admin (Payload): http://localhost:3000/admin
- Design-system catalog: http://localhost:3000/design

The admin interface is available in French and English; site content is edited in French first, then translated. Code, comments, documentation and commit messages are in English.

## Requirements

- Node.js 20.9 or later (developed on Node 22)
- pnpm 9, 10 or 11
- No database server: Payload uses a local SQLite file (`upto1.db`).

The app runs on its own Node server (port 3000). The project happens to live in MAMP's `htdocs` folder, but it does not use Apache or MySQL.

## Getting started

```bash
cd /Applications/MAMP/htdocs
git clone https://github.com/ampIntegrator/upto1.git upto1
cd upto1
cp .env.example .env      # set PAYLOAD_SECRET to a long random string
pnpm install
pnpm migrate              # create or update the SQLite schema
pnpm seed                 # optional: demo content and a first admin user
pnpm dev
```

`pnpm seed` creates an admin user (`admin@vidomia.fr` / `vidomia-2026`). Change the password in the admin right away.

### Environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | SQLite connection string, for example `file:./upto1.db` |
| `PAYLOAD_SECRET` | Secret used by Payload to sign tokens |

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start the development server on port 3000 |
| `pnpm devsafe` | Delete `.next` then start the development server |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm lint` | ESLint |
| `pnpm test` | Integration (Vitest) and end-to-end (Playwright) tests |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` from the Payload config |
| `pnpm generate:importmap` | Regenerate the admin import map after adding a custom admin component |
| `pnpm db:backup` | Copy `upto1.db` to `backups/` with a timestamp |
| `pnpm migrate:create <name>` | Generate a migration from schema changes |
| `pnpm migrate` / `pnpm migrate:status` | Apply migrations / list their status |
| `pnpm seed` | Load demo content (idempotent) |
| `pnpm theme:build` | Compile the Astryx themes (one per silo) into `src/theme/built/` |
| `pnpm icons:build` | Convert the SVGs in `icons/astryx` and `icons/vidomia` into React components |
| `pnpm catalog:build` | Generate the catalog pages under `/design/composants` |
| `pnpm previews:build` | Screenshot content blocks for the admin block picker (`public/apercus/`, needs `pnpm dev`) |

## Database changes

The schema is managed by explicit migrations only (`push: false` in `src/payload.config.ts`). After any change to a collection, global or block field:

```bash
pnpm db:backup
pnpm migrate:create <short_name>
# read the generated file in src/migrations/ before applying it
pnpm migrate
pnpm generate:types
```

Review every migration. When SQLite has to rebuild a table, the generated copy statement can be wrong, and a field that becomes required can add a `NOT NULL` constraint that rejects existing rows. Presentational field wrappers (`row`, `collapsible`, `ui`) never need a migration.

## Branches

| Branch | Used for |
|---|---|
| `main` | Reference branch; receives the other two |
| `astryx` | Design system: components, theme, icons, catalog |
| `payload` | Back office: collections, globals, admin components, section builder |

Work on the branch that matches the change, then merge it into `main` and bring the other branch up to date. From the project terminal:

```bash
git checkout main
git pull
git merge payload        # or astryx
git push origin main
git checkout payload
```

## Project structure

```
src/
  app/(frontend)/        Site routes, catalog (/design), block previews (/apercu)
  app/(payload)/         Payload admin routes and admin styles (custom.scss)
  collections/           Pages, Sections (shared sections), Posts, Categories, Media, Users
  globals/               Settings, Header, Footer
  i18n/admin/            Admin interface languages: dictionaries and header selector
  fields/                Custom fields and admin components
  fields/sections/       Section builder (see docs/section-builder.md)
  components/            Design-system components built on Astryx
  lib/                   Payload data → component props (site.ts, sections.ts)
  theme/                 Astryx theme source, silo palettes, compiled themes, icons
  migrations/            Database migrations
icons/                   Source SVG icons (astryx, vidomia)
Orbita/                  Original design mockup (reference)
docs/                    Project documentation
```

## Design system

Components live in `src/components/` and are built from Astryx components, never by editing Astryx itself. Styling goes through the theme (`src/theme/orbita.ts`) first; CSS modules and `src/app/(frontend)/styles.css` only cover what the theme cannot express. Each project component has a catalog page, generated by `pnpm catalog:build` from its showcase in `src/app/(frontend)/design/_showcases/`.

Six accent colours ("silos") are defined in `src/theme/silos/palettes.ts`. The site default is set in the admin (Settings), and each page can override it.

## Documentation

- [Section builder](docs/section-builder.md): how pages are composed in the admin (sections, rows, columns, content blocks, mobile order, drag and drop).
- [Admin languages](docs/admin-languages.md): the French and English admin interface, dictionaries, and how to add a language.
