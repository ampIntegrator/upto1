/**
 * Génère le catalogue de composants (src/app/(frontend)/design/composants/…)
 * à partir des showcases présents dans _showcases/ :
 *   - une page par composant : composants/<composant>/page.tsx
 *   - la vue d'ensemble : composants/page.tsx (grille par catégorie, ancres)
 *   - la table de navigation : _ui/catalog.generated.ts (menu plat par catégorie)
 * Même logique que astryx.atmeta.com/components : menu plat sous des titres de
 * catégorie non cliquables, tout visible, une URL par composant.
 * Une seule liste : un composant habillé Orbita (DRESSED) remplace la démo
 * Astryx d'origine sous le même nom.
 *
 *   pnpm catalog:build
 */
import {existsSync, mkdirSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/app/(frontend)/design');
const SHOW = `${ROOT}/_showcases`;

// Catégories (site astryx.atmeta.com/components) + sous-composants rattachés.
const CATS = {
  actions:      {label:'Actions', lead:"Boutons, menus et contrôles qui déclenchent une action.", comps:['Button','ButtonGroup','DropdownMenu','DropdownMenuItem','IconButton','Link','MoreMenu','SegmentedControl','SegmentedControlItem','ToggleButton','ToggleButtonGroup','Toolbar']},
  conteneurs:   {label:'Conteneurs', lead:"Cartes et surfaces qui regroupent du contenu.", comps:['Card','Carousel','ClickableCard','Collapsible','CollapsibleGroup','SelectableCard']},
  contenu:      {label:'Contenu', lead:"Texte, titres, médias et éléments éditoriaux.", comps:['Avatar','AvatarGroup','AvatarGroupOverflow','AvatarStatusDot','Blockquote','Citation','Code','CodeBlock','EmptyState','Heading','Icon','Kbd','Markdown','Text','Thumbnail','Timestamp','Token']},
  retours:      {label:'Retours & statuts', lead:"Signaler un état, un progrès ou une information.", comps:['Badge','Banner','ProgressBar','Skeleton','Spinner','StatusDot','Toast']},
  formulaires:  {label:'Formulaires', lead:"Champs, sélecteurs et contrôles de saisie.", comps:['Calendar','CheckboxInput','CheckboxList','CheckboxListItem','DateInput','DateRangeInput','DateTimeInput','Field','FieldLabel','FieldStatus','FileInput','FormLayout','InputGroup','NumberInput','PowerSearch','RadioList','RadioListItem','Select','Slider','Switch','TextArea','TextInput','TimeInput']},
  'mise-en-page': {label:'Mise en page', lead:"Coquille d'application, grilles, piles et sections.", comps:['AppShell','AspectRatio','Center','Divider','Grid','GridSpan','HStack','Layout','LayoutContent','LayoutFooter','LayoutHeader','LayoutPanel','Resizable','Section','StackItem','VStack']},
  navigation:   {label:'Navigation', lead:"Se déplacer dans le site ou dans la page.", comps:['Breadcrumbs','BreadcrumbItem','MobileNav','MobileNavToggle','NavHeadingMenu','NavIcon','Outline','Pagination','SideNav','SideNavCollapseButton','SideNavHeading','SideNavItem','SideNavSection','Step','Stepper','Tab','TabList','TabMenu','TopNav','TopNavHeading','TopNavItem','TopNavMegaMenu','TopNavMegaMenuFeaturedCard','TopNavMegaMenuItem','TopNavMenu']},
  surcouches:   {label:'Surcouches', lead:"Dialogues, popovers, infobulles et panneaux flottants.", comps:['BottomSheet','BottomSheetSwitcher','CommandPalette','CommandPaletteEmpty','CommandPaletteFooter','CommandPaletteGroup','CommandPaletteInput','CommandPaletteItem','CommandPaletteList','ContextMenu','ContextMenuItem','Dialog','DialogHeader','HoverCard','Lightbox','Overlay','Popover','Tooltip']},
  'tables-listes': {label:'Tables & listes', lead:"Données en lignes : tables, listes, arborescences.", comps:['Item','List','ListItem','MetadataList','MetadataListItem','OverflowList','Table','TreeList']},
  utilitaires:  {label:'Utilitaires', lead:"Thème, accessibilité et aides de rendu.", comps:['Theme','MediaTheme','SyntaxTheme','VisuallyHidden']},
  chat:         {label:'Chat', lead:"Composants conversationnels (assistant IA). Hors périmètre du site vitrine, listés pour référence.", comps:['ChatLayout','ChatComposer','ChatComposerDrawer','ChatComposerInput','ChatDictationButton','ChatMessage','ChatMessageBubble','ChatMessageList','ChatMessageMetadata','ChatSendButton','ChatSystemMessage','ChatTokenizedText','ChatToolCalls']},
};

const DOC = {Select: 'selector'};
/** Composants habillés Orbita (démo maison à la place de celle d'Astryx). */
const DRESSED = new Set(['Button', 'Dialog', 'Select', 'TextInput', 'TextArea', 'RadioList', 'CheckboxInput', 'Switch', 'Slider', 'FileInput', 'DateInput', 'DateTimeInput', 'TimeInput', 'DateRangeInput', 'FormLayout', 'InputGroup', 'NumberInput', 'PowerSearch', 'Card', 'Badge']);
const PARENTS = {DropdownMenuItem:'DropdownMenu',SegmentedControlItem:'SegmentedControl',CollapsibleGroup:'Collapsible',AvatarGroupOverflow:'AvatarGroup',AvatarStatusDot:'Avatar',CheckboxListItem:'CheckboxList',FieldLabel:'Field',FieldStatus:'Field',RadioListItem:'RadioList',GridSpan:'Grid',LayoutContent:'Layout',LayoutFooter:'Layout',LayoutHeader:'Layout',LayoutPanel:'Layout',StackItem:'Stack',HStack:'Stack',VStack:'Stack',BreadcrumbItem:'Breadcrumbs',MobileNavToggle:'MobileNav',SideNavCollapseButton:'SideNav',SideNavHeading:'SideNav',SideNavItem:'SideNav',SideNavSection:'SideNav',Step:'Stepper',Tab:'TabList',TabMenu:'TabList',TopNavHeading:'TopNav',TopNavItem:'TopNav',TopNavMegaMenu:'TopNav',TopNavMegaMenuFeaturedCard:'TopNavMegaMenu',TopNavMegaMenuItem:'TopNavMegaMenu',TopNavMenu:'TopNav',CommandPaletteEmpty:'CommandPalette',CommandPaletteFooter:'CommandPalette',CommandPaletteGroup:'CommandPalette',CommandPaletteInput:'CommandPalette',CommandPaletteItem:'CommandPalette',CommandPaletteList:'CommandPalette',ContextMenuItem:'ContextMenu',DialogHeader:'Dialog',ListItem:'List',MetadataListItem:'MetadataList',ChatComposerDrawer:'ChatComposer',ChatComposerInput:'ChatComposer',ChatDictationButton:'ChatComposer',ChatSendButton:'ChatComposer',ChatMessageBubble:'ChatMessage',ChatMessageMetadata:'ChatMessage',ChatTokenizedText:'ChatMessage',NavHeadingMenu:'SideNav'};

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
/** Nom lisible : « TopNavMegaMenu » → « Top Nav Mega Menu » (comme le site Astryx). */
const spaced = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
const files = new Set(readdirSync(SHOW).filter(f => f.endsWith('.tsx')).map(f => f.replace('.tsx','')));
const used = new Set();
const catalog = [];

// on repart d'un dossier propre (pages d'anciennes structures comprises)
if (existsSync(`${ROOT}/composants`)) rmSync(`${ROOT}/composants`, {recursive: true});

for (const [slug, cat] of Object.entries(CATS)) {
  const comps = cat.comps.filter(c => { const ok = files.has(c + 'Showcase'); if (!ok) console.warn(`(pas de showcase) ${c}`); return ok; });
  comps.forEach(c => used.add(c + 'Showcase'));
  const items = comps.map(c => ({name: c, label: spaced(c), slug: kebab(c), href: `/design/composants/${kebab(c)}`, dressed: DRESSED.has(c), parent: PARENTS[c] ?? null, doc: DOC[c] ?? kebab(PARENTS[c] ?? c)}));
  catalog.push({slug, label: cat.label, lead: cat.lead, href: `/design/composants#${slug}`, items});

  // page par composant
  for (const it of items) {
    const dir = `${ROOT}/composants/${it.slug}`;
    mkdirSync(dir, {recursive: true});
    writeFileSync(`${dir}/page.tsx`, `/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ${it.name}Showcase from '../../_showcases/${it.name}Showcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: '${it.label} — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="${it.name}" id="${it.slug}" doc="${it.doc}"${it.parent ? ` parent="${it.parent}"` : ''}${it.dressed ? ' dressed' : ''} category="${cat.label}">
        <${it.name}Showcase />
      </ShowcaseBlock>
      <ComponentNav category="${slug}" current="${it.slug}" />
    </VStack>
  );
}
`);
  }

  console.log(`${slug}: ${comps.length}`);
}

// vue d'ensemble
writeFileSync(`${ROOT}/composants/page.tsx`, `/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import React from 'react';

import {LibraryOverview} from '../_ui/LibraryOverview';

export const metadata = {title: 'Composants — Orbita × Astryx'};

export default function Page() {
  return <LibraryOverview />;
}
`);

writeFileSync(`${ROOT}/_ui/catalog.generated.ts`, `/* @generated par scripts/gen-catalog.mjs — ne pas éditer. */
export type CatalogItem = {name: string; label: string; slug: string; href: string; dressed: boolean; parent: string | null; doc: string};
export type CatalogCategory = {slug: string; label: string; lead: string; href: string; items: CatalogItem[]};
export const CATALOG: CatalogCategory[] = ${JSON.stringify(catalog, null, 2)};
`);
const orphans = [...files].filter(f => !used.has(f));
console.log('orphelins:', orphans.join(', ') || 'aucun');
