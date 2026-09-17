/**
 * Generates the component catalog (src/app/(frontend)/design/composants/…)
 * from the showcases in _showcases/:
 *   - one page per component: composants/<component>/page.tsx
 *   - the overview: composants/page.tsx (grid by category, anchors)
 *   - the navigation table: _ui/catalog.generated.ts (flat menu by category)
 * Same approach as astryx.atmeta.com/components: flat menu under non-clickable
 * category headings, everything visible, one URL per component.
 * A single list: a component already dressed by the theme (DRESSED) replaces the
 * original Astryx demo under the same name.
 *
 *   pnpm catalog:build
 */
import {existsSync, mkdirSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/app/(frontend)/design');
const SHOW = `${ROOT}/_showcases`;

// Categories (astryx.atmeta.com/components site) + attached subcomponents.
const CATS = {
  actions:      {label:'Actions', lead:"Boutons, menus et contrôles qui déclenchent une action.", comps:['Button','ButtonGroup','DropdownMenu','DropdownMenuItem','IconButton','Link','MoreMenu','SegmentedControl','SegmentedControlItem','ToggleButton','ToggleButtonGroup','Toolbar']},
  conteneurs:   {label:'Conteneurs', lead:"Cartes et surfaces qui regroupent du contenu.", comps:['Card','CardGrid','Collection','Tabs','CompareCard','Carousel','TestimonialCarousel','TestimonialCard','ClickableCard','Collapsible','CollapsibleGroup','SelectableCard']},
  contenu:      {label:'Contenu', lead:"Texte, titres, médias et éléments éditoriaux.", comps:['TextBox','RichText','Stat','PriceList','PlanCard','Media','MediaQuote','Avatar','AvatarGroup','AvatarGroupOverflow','AvatarStatusDot','Blockquote','Citation','Code','CodeBlock','EmptyState','Heading','Icon','Kbd','Markdown','Text','Thumbnail','Timestamp','Token']},
  retours:      {label:'Retours & statuts', lead:"Signaler un état, un progrès ou une information.", comps:['Badge','Banner','Callout','ProgressBar','Skeleton','Spinner','StatusDot','Toast']},
  formulaires:  {label:'Formulaires', lead:"Champs, sélecteurs et contrôles de saisie.", comps:['Calendar','CheckboxInput','CheckboxList','CheckboxListItem','DateInput','DateRangeInput','DateTimeInput','Field','FieldLabel','FieldStatus','FileInput','FormLayout','InputGroup','NumberInput','PowerSearch','RadioList','RadioListItem','Select','Slider','Switch','TextArea','TextInput','TimeInput']},
  'mise-en-page': {label:'Mise en page', lead:"Coquille d'application, grilles, piles et sections.", comps:['Hero','SectionHeading','ProcessSteps','SectionNote','AppShell','AspectRatio','Center','Divider','Grid','GridSpan','HStack','Layout','LayoutContent','LayoutFooter','LayoutHeader','LayoutPanel','Resizable','Section','StackItem','VStack']},
  navigation:   {label:'Navigation', lead:"Se déplacer dans le site ou dans la page.", comps:['SiteHeader','SiteFooter','Breadcrumbs','BreadcrumbItem','MobileNav','MobileNavToggle','NavHeadingMenu','NavIcon','Outline','Pagination','SideNav','SideNavCollapseButton','SideNavHeading','SideNavItem','SideNavSection','Step','Stepper','Tab','TabList','TabMenu','TopNav','TopNavHeading','TopNavItem','TopNavMegaMenu','TopNavMegaMenuFeaturedCard','TopNavMegaMenuItem','TopNavMenu']},
  surcouches:   {label:'Surcouches', lead:"Dialogues, popovers, infobulles et panneaux flottants.", comps:['BottomSheet','BottomSheetSwitcher','CommandPalette','CommandPaletteEmpty','CommandPaletteFooter','CommandPaletteGroup','CommandPaletteInput','CommandPaletteItem','CommandPaletteList','ContextMenu','ContextMenuItem','Dialog','DialogHeader','HoverCard','Lightbox','Overlay','Popover','Tooltip']},
  'tables-listes': {label:'Tables & listes', lead:"Données en lignes : tables, listes, arborescences.", comps:['CheckList','Item','List','ListItem','MetadataList','MetadataListItem','OverflowList','Table','TreeList']},
  utilitaires:  {label:'Utilitaires', lead:"Thème, accessibilité et aides de rendu.", comps:['Theme','MediaTheme','SyntaxTheme','VisuallyHidden']},
  chat:         {label:'Chat', lead:"Composants conversationnels (assistant IA). Hors périmètre du site vitrine, listés pour référence.", comps:['ChatLayout','ChatComposer','ChatComposerDrawer','ChatComposerInput','ChatDictationButton','ChatMessage','ChatMessageBubble','ChatMessageList','ChatMessageMetadata','ChatSendButton','ChatSystemMessage','ChatTokenizedText','ChatToolCalls']},
};

const DOC = {Select: 'selector'};
/* Design-system-specific components (no Astryx docs) */
const OWN = new Set(['Media', 'MediaQuote', 'Stat', 'SiteHeader', 'SiteFooter', 'Hero', 'SectionHeading', 'SectionNote', 'CheckList', 'ProcessSteps', 'CompareCard', 'TestimonialCarousel', 'TestimonialCard', 'PriceList', 'PlanCard', 'Collection', 'TextBox', 'RichText', 'Tabs', 'ButtonGroup', 'Callout', 'CardGrid']);
/** Components dressed by the theme (in-house demo instead of the original one). */
const DRESSED = new Set(['Media', 'MediaQuote', 'Button', 'Dialog', 'Select', 'TextInput', 'TextArea', 'RadioList', 'CheckboxInput', 'Switch', 'Slider', 'FileInput', 'DateInput', 'DateTimeInput', 'TimeInput', 'DateRangeInput', 'FormLayout', 'InputGroup', 'NumberInput', 'PowerSearch', 'Card', 'ClickableCard', 'Badge', 'Collapsible', 'CollapsibleGroup', 'Tab', 'TabList', 'TabMenu', 'Section', 'Stat', 'SiteHeader', 'TopNav', 'TopNavHeading', 'TopNavItem', 'TopNavMenu', 'TopNavMegaMenu', 'TopNavMegaMenuItem', 'TopNavMegaMenuFeaturedCard', 'MobileNav', 'Breadcrumbs', 'BreadcrumbItem', 'Hero', 'SiteFooter', 'SectionHeading', 'SectionNote', 'CheckList', 'ProcessSteps', 'CompareCard', 'TestimonialCarousel', 'TestimonialCard', 'PriceList', 'PlanCard', 'Collection', 'TextBox', 'RichText', 'Tabs', 'ButtonGroup', 'Callout', 'CardGrid']);
const PARENTS = {TestimonialCard:'TestimonialCarousel',DropdownMenuItem:'DropdownMenu',SegmentedControlItem:'SegmentedControl',CollapsibleGroup:'Collapsible',AvatarGroupOverflow:'AvatarGroup',AvatarStatusDot:'Avatar',CheckboxListItem:'CheckboxList',FieldLabel:'Field',FieldStatus:'Field',RadioListItem:'RadioList',GridSpan:'Grid',LayoutContent:'Layout',LayoutFooter:'Layout',LayoutHeader:'Layout',LayoutPanel:'Layout',StackItem:'Stack',HStack:'Stack',VStack:'Stack',BreadcrumbItem:'Breadcrumbs',MobileNavToggle:'MobileNav',SideNavCollapseButton:'SideNav',SideNavHeading:'SideNav',SideNavItem:'SideNav',SideNavSection:'SideNav',Step:'Stepper',Tab:'TabList',TabMenu:'TabList',TopNavHeading:'TopNav',TopNavItem:'TopNav',TopNavMegaMenu:'TopNav',TopNavMegaMenuFeaturedCard:'TopNavMegaMenu',TopNavMegaMenuItem:'TopNavMegaMenu',TopNavMenu:'TopNav',CommandPaletteEmpty:'CommandPalette',CommandPaletteFooter:'CommandPalette',CommandPaletteGroup:'CommandPalette',CommandPaletteInput:'CommandPalette',CommandPaletteItem:'CommandPalette',CommandPaletteList:'CommandPalette',ContextMenuItem:'ContextMenu',DialogHeader:'Dialog',ListItem:'List',MetadataListItem:'MetadataList',ChatComposerDrawer:'ChatComposer',ChatComposerInput:'ChatComposer',ChatDictationButton:'ChatComposer',ChatSendButton:'ChatComposer',ChatMessageBubble:'ChatMessage',ChatMessageMetadata:'ChatMessage',ChatTokenizedText:'ChatMessage',NavHeadingMenu:'SideNav'};

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
/** Readable name: « TopNavMegaMenu » → « Top Nav Mega Menu » (like the Astryx site). */
const spaced = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
const files = new Set(readdirSync(SHOW).filter(f => f.endsWith('.tsx')).map(f => f.replace('.tsx','')));
const used = new Set();
const catalog = [];

// start from a clean folder (including pages from older structures)
if (existsSync(`${ROOT}/composants`)) rmSync(`${ROOT}/composants`, {recursive: true});

for (const [slug, cat] of Object.entries(CATS)) {
  const comps = cat.comps.filter(c => { const ok = files.has(c + 'Showcase'); if (!ok) console.warn(`(pas de showcase) ${c}`); return ok; });
  comps.forEach(c => used.add(c + 'Showcase'));
  const items = comps.map(c => ({name: c, label: spaced(c), slug: kebab(c), href: `/design/composants/${kebab(c)}`, dressed: DRESSED.has(c), parent: PARENTS[c] ?? null, doc: OWN.has(c) ? null : (DOC[c] ?? kebab(PARENTS[c] ?? c))}));
  catalog.push({slug, label: cat.label, lead: cat.lead, href: `/design/composants#${slug}`, items});

  // one page per component
  for (const it of items) {
    const dir = `${ROOT}/composants/${it.slug}`;
    mkdirSync(dir, {recursive: true});
    writeFileSync(`${dir}/page.tsx`, `/* Generated by scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import ${it.name}Showcase from '../../_showcases/${it.name}Showcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: '${it.label} — Design system Vidomia'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="${it.name}" id="${it.slug}" doc={${JSON.stringify(it.doc)}}${it.parent ? ` parent="${it.parent}"` : ''}${it.dressed ? ' dressed' : ''} category="${cat.label}">
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

// overview
writeFileSync(`${ROOT}/composants/page.tsx`, `/* Generated by scripts/gen-catalog.mjs (pnpm catalog:build). */
import React from 'react';

import {LibraryOverview} from '../_ui/LibraryOverview';

export const metadata = {title: 'Composants — Design system Vidomia'};

export default function Page() {
  return <LibraryOverview />;
}
`);

writeFileSync(`${ROOT}/_ui/catalog.generated.ts`, `/* @generated by scripts/gen-catalog.mjs — do not edit. */
export type CatalogItem = {name: string; label: string; slug: string; href: string; dressed: boolean; parent: string | null; doc: string | null};
export type CatalogCategory = {slug: string; label: string; lead: string; href: string; items: CatalogItem[]};
export const CATALOG: CatalogCategory[] = ${JSON.stringify(catalog, null, 2)};
`);
const orphans = [...files].filter(f => !used.has(f));
console.log('orphelins:', orphans.join(', ') || 'aucun');
