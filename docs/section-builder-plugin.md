# The section builder as a plugin: reflections

Written on 5 October 2026, at Nicolas's request. The aim: reuse the section builder and its live
preview (the « Gérer » dialog, `docs/section-manager.md`) on the next Payload sites, each of them
built on Astryx, with rules the theme must follow (at least one silo, the same groups of colours
for every silo when there are several).

This is a direction, not a plan: nothing here is started.

## Three pieces rather than one big plugin

### 1. The plugin, which knows nothing of Astryx

It is `src/fields/sections` today: rows, columns, the « Gérer » dialog, the preview protocol. It
already imports no component and no theme. It should stay neutral: a plugin that knows silos is
useless on a project without silos, and every change in Astryx would break it.

### 2. A written contract, in two parts

- **The site's contract**: what a project must give the plugin. A list of column components with
  their minimum and maximum widths, a preview page that can draw a section, and a converter from
  Payload's data to the components.
- **The theme's contract**: what Astryx must expose. The silos belong here: at least one, and for
  each of them the same groups of colours under the same names.

### 3. A small, separate Astryx adapter

It is the bridge: it reads the theme's silos, gives the dialog its silo switch and the background
shades, and wraps the preview in the right theme. On this project that role is spread over
`src/sections.config.ts`, the `apercu-section` page and `src/theme`.

## A checked contract, not a document

A file that says « Astryx must be built this way » is wrong three months later if nothing checks
it. The contract should be a TypeScript type plus a check at start-up. The builder already does
this for preset rows: it refuses to start when a row does not add up to 12
(`createSectionBuilder` in `src/fields/sections/builder.ts`). The same for the theme: « no silo
declared », « the green silo has no highlight colour » would show at launch, not in production.

« At least one silo » is then one line of that check, and a theme with a single silo simply hides
the switch in the dialog's header.

## What is missing today

- **Dictionaries**: the core reads its texts from `@/i18n/admin`, which belongs to this project.
  The plugin must carry its own.
- **Texts that assume this site**: « Choisis d'abord un fond », the preview's pencil, the widths
  1440 / 990 / 420. To be made neutral or given by the host.
- **The preview page**: the largest piece on the site's side (rendering, the short-lived store,
  editing in place). What the plugin ships and what the site writes has to be decided. Suggested:
  the plugin gives the frame and the protocol, the site gives one function, « draw this section ».
- **The section settings** (background, edge line, textures): described in the site's config,
  which is right, but the Astryx adapter should give them by default so that they are not copied
  into every project.
- **The tech lead's points** (`docs/tech-lead-open-questions.md`): the preview's in-memory store
  and Payload's internal class names matter more in a reused plugin, since every project has its
  own hosting and its own Payload version.

## Suggested order

Not extracting the plugin now: an abstraction drawn from a single project is nearly always wrong
about what is general.

1. Finish the trial here and merge it.
2. Write the two contracts as types in this repository, with the start-up check, and gather the
   Astryx adapter in one folder. The plugin stays in the project, with clear borders.
3. Graft it by hand onto the second Payload project. What resists then tells what really has to
   be an option.
4. Only then make a package of it.

## Questions that decide the rest

- Will every next site use Astryx, or should the tool also fit a Payload site with another design
  system? If it is always Astryx, the adapter can be simpler and stricter.
- Do the column components (cards, FAQ, prices) travel with the tool, or does each site bring its
  own? In the first case it is a second package, far heavier than the builder.
- Who keeps the contract up to date when Astryx changes: Nicolas, or the tech lead?
