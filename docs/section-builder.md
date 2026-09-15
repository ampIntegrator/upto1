# Section builder

The **Contenu** tab of a page lets editors build the page body as a stack of sections. The same fields power the **Sections partagées** collection (shared sections reused on several pages).

```
Page
└── Section            background, spacing, anchor, grid gaps
    └── Row            column widths add up to 12
        └── Column     one content block (or none)
```

Code: `src/fields/sections/` (admin), `src/lib/sections.ts` (Payload data → props), `src/components/PageSections.tsx` (rendering).

## Section settings

A section has two collapsible panels: **Réglages de la section** and **Rangées**. The **Rangées** panel appears once a background is chosen.

Settings are asked in order: the background first, then only the options for that background.

| Background | Options |
|---|---|
| Light (`light`) | Tint: page background or light silo highlight. Texture: none, grid, dots, diamonds |
| Dark (`dark`) | Night or night with halo (no texture) |
| Media (`media`) | Image or video, video poster, black overlay (0–1) |

Then, for every background:

- **Top and bottom spacing**: 0 to 160 px in steps of 20 (halved below 640 px).
- **Anchor**: optional id for `#anchor` links.
- **Grid gaps**: column gap, row gap and mobile vertical gap (0 to 60 px in steps of 10). "Réglage du site" inherits the defaults from Settings › Mise en page.
- **Share**: saving with "Enregistrer dans les sections partagées" copies the section into the shared collection and replaces it on the page with a reference.

The light tint field keeps its own `admin.condition`. Without it, Payload marks the column `NOT NULL` and dark or media sections can no longer be saved.

## Rows and layouts

The **Rangées** panel shows 14 layouts as thumbnails, widest column first, with no mirrored duplicates (columns can be reordered inside a row):

`12` · `6 6` · `8 4` · `7 5` · `9 3` · `4 4 4` · `6 3 3` · `6 4 2` · `3 3 3 3` · `6 2 2 2` · `4 4 2 2` · `4 2 2 2 2` · `3 3 2 2 2` · `2 2 2 2 2 2`

Allowed column widths are 2, 3, 4, 5, 6, 7, 8, 9 and 12 (`COLUMN_SPANS` in `src/components/content-specs.ts`).

| Action | Result |
|---|---|
| Double-click a layout | Adds a row with that layout below the selected row (or at the end) |
| Click a row | Selects it (white outline); click again to deselect |
| Click a layout with a row selected | Asks for confirmation, then replaces its layout. Same number of columns: only widths change. Different number: columns are recreated empty. Nothing happens if the row already has that layout |
| Click a column of the selected row | Opens the column drawer |
| Click a column of another row | Only selects that row |
| Row handle, duplicate, delete | Reorder (drag), duplicate, delete (with confirmation) |

The active layout thumbnail lights up whatever the column order (`spansKey`).

## Columns

A column holds **one** content block. The column drawer shows:

- **Vider la colonne**: removes the block (final once the page is saved).
- **Nom affiché dans le constructeur**: optional name shown in the column tile, up to 60 characters. It is the block's native `blockName`, so no extra database column is needed.
- The block and its fields.

The width is not editable in the drawer; it comes from the row layout.

Columns are reordered left or right with their handle (⋮⋮). A tile turns red with "Trop étroit" when its block needs more columns than the column has.

## Content blocks

| Block | Component | Min. columns |
|---|---|---|
| Case vide | none (reserves the slot) | 2 |
| Image | `Media` | 2 |
| Image avec citation | `MediaQuote` | 6 |
| Cartes (8 variants) | `Card` | 3 |
| Texte (temporary) | plain text | 2 |

The block picker only offers blocks whose minimum width fits the column (`filterOptions`), and the server rejects a block that is too wide. Minimum widths come from the span registry, `src/components/content-specs.ts`, which is the single source of truth.

### Image and image with quote

- The image fills the whole column (`next/image` with `fill`, centred crop, lazy loading, responsive `sizes` computed from the column width).
- **Desktop minimum height** only applies when the row has no other content. Next to a card, the image takes the row height.
- **Mobile minimum height** always applies below 768 px.
- Optional black overlay (0–1).
- Image with quote adds a centred sentence, a tag (`h2`–`h6`, `p`, `span`) and an independent size (`display-1`, `display-2`, `display-3`, `heading-1`, `heading-2`), rendered light with `MediaTheme mode="dark"`. The block grows if the sentence is taller than the minimum height.

### Block picker previews

Each block has a thumbnail in the picker (`imageURL`). They are screenshots of `/apercu/<slug>` (blue silo, demo data) made by `pnpm previews:build` while `pnpm dev` is running.

## Mobile order

The phone button of any row opens the section's mobile order. Below 768 px, every column of the section, all rows together, is stacked in that order. Lines are reordered by dragging their handle. Empty columns are listed but hidden on mobile.

- Stored as a hidden `mobileOrder` field on each column (a position within the section).
- The site renders one CSS grid per section, so the CSS `order` can mix columns from different rows (`--mobile-order`, `src/app/(frontend)/styles.css`).
- **Reprendre l’ordre desktop** clears the mobile order.

## Drag and drop

Rows, columns and the mobile order all use one module, `src/fields/sections/sortable.tsx`, built on dnd-kit:

- `SortableList` (axis `x` or `y`) and `SortableItem` (render prop with `attributes`, `listeners`, `setNodeRef`, `transform`, `transition`).
- Mouse starts after 5 px, touch after a 200 ms press, keyboard: Space to pick up, arrow keys to move, Space to drop.
- Axis-specific sorting strategy, which handles items of different sizes, and movement restricted to the axis and to the container.

dnd-kit is a direct dependency pinned to the versions Payload already uses (`@dnd-kit/core` 6.3.1, `@dnd-kit/sortable` 10.0.0, `@dnd-kit/modifiers` 9.0.0, `@dnd-kit/utilities` 3.2.2), so only one copy is installed. Payload's own `DraggableSortable` is not used: it assumes items of equal size and makes columns of different widths jump.

## Adding a new column block

1. **Branch `astryx`**: build the component in `src/components/`, add its showcase to the catalog, and add its minimum width to `src/components/content-specs.ts`.
2. **Branch `payload`**:
   - Define the block in `src/fields/sections/` and add it to `CONTENT_BLOCKS`.
   - Map it to the registry in `contentRef.ts`.
   - Convert its data in `src/lib/sections.ts` and render it in `PageSections.tsx`.
   - Add its preview to `/apercu` and run `pnpm previews:build`.
   - Back up the database, create and review the migration, apply it, regenerate types.

Test on a throwaway page created and deleted by the test script, never on a real page.
