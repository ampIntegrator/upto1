/* @generated par scripts/gen-catalog.mjs — ne pas éditer. */
export type CatalogItem = {name: string; label: string; slug: string; href: string; dressed: boolean; parent: string | null; doc: string};
export type CatalogCategory = {slug: string; label: string; lead: string; href: string; items: CatalogItem[]};
export const CATALOG: CatalogCategory[] = [
  {
    "slug": "actions",
    "label": "Actions",
    "lead": "Boutons, menus et contrôles qui déclenchent une action.",
    "href": "/design/composants#actions",
    "items": [
      {
        "name": "Button",
        "label": "Button",
        "slug": "button",
        "href": "/design/composants/button",
        "dressed": true,
        "parent": null,
        "doc": "button"
      },
      {
        "name": "ButtonGroup",
        "label": "Button Group",
        "slug": "button-group",
        "href": "/design/composants/button-group",
        "dressed": false,
        "parent": null,
        "doc": "button-group"
      },
      {
        "name": "DropdownMenu",
        "label": "Dropdown Menu",
        "slug": "dropdown-menu",
        "href": "/design/composants/dropdown-menu",
        "dressed": false,
        "parent": null,
        "doc": "dropdown-menu"
      },
      {
        "name": "DropdownMenuItem",
        "label": "Dropdown Menu Item",
        "slug": "dropdown-menu-item",
        "href": "/design/composants/dropdown-menu-item",
        "dressed": false,
        "parent": "DropdownMenu",
        "doc": "dropdown-menu"
      },
      {
        "name": "IconButton",
        "label": "Icon Button",
        "slug": "icon-button",
        "href": "/design/composants/icon-button",
        "dressed": false,
        "parent": null,
        "doc": "icon-button"
      },
      {
        "name": "Link",
        "label": "Link",
        "slug": "link",
        "href": "/design/composants/link",
        "dressed": false,
        "parent": null,
        "doc": "link"
      },
      {
        "name": "MoreMenu",
        "label": "More Menu",
        "slug": "more-menu",
        "href": "/design/composants/more-menu",
        "dressed": false,
        "parent": null,
        "doc": "more-menu"
      },
      {
        "name": "SegmentedControl",
        "label": "Segmented Control",
        "slug": "segmented-control",
        "href": "/design/composants/segmented-control",
        "dressed": false,
        "parent": null,
        "doc": "segmented-control"
      },
      {
        "name": "SegmentedControlItem",
        "label": "Segmented Control Item",
        "slug": "segmented-control-item",
        "href": "/design/composants/segmented-control-item",
        "dressed": false,
        "parent": "SegmentedControl",
        "doc": "segmented-control"
      },
      {
        "name": "ToggleButton",
        "label": "Toggle Button",
        "slug": "toggle-button",
        "href": "/design/composants/toggle-button",
        "dressed": false,
        "parent": null,
        "doc": "toggle-button"
      },
      {
        "name": "ToggleButtonGroup",
        "label": "Toggle Button Group",
        "slug": "toggle-button-group",
        "href": "/design/composants/toggle-button-group",
        "dressed": false,
        "parent": null,
        "doc": "toggle-button-group"
      }
    ]
  },
  {
    "slug": "conteneurs",
    "label": "Conteneurs",
    "lead": "Cartes et surfaces qui regroupent du contenu.",
    "href": "/design/composants#conteneurs",
    "items": [
      {
        "name": "Card",
        "label": "Card",
        "slug": "card",
        "href": "/design/composants/card",
        "dressed": true,
        "parent": null,
        "doc": "card"
      },
      {
        "name": "Carousel",
        "label": "Carousel",
        "slug": "carousel",
        "href": "/design/composants/carousel",
        "dressed": false,
        "parent": null,
        "doc": "carousel"
      },
      {
        "name": "ClickableCard",
        "label": "Clickable Card",
        "slug": "clickable-card",
        "href": "/design/composants/clickable-card",
        "dressed": true,
        "parent": null,
        "doc": "clickable-card"
      },
      {
        "name": "Collapsible",
        "label": "Collapsible",
        "slug": "collapsible",
        "href": "/design/composants/collapsible",
        "dressed": true,
        "parent": null,
        "doc": "collapsible"
      },
      {
        "name": "CollapsibleGroup",
        "label": "Collapsible Group",
        "slug": "collapsible-group",
        "href": "/design/composants/collapsible-group",
        "dressed": true,
        "parent": "Collapsible",
        "doc": "collapsible"
      },
      {
        "name": "SelectableCard",
        "label": "Selectable Card",
        "slug": "selectable-card",
        "href": "/design/composants/selectable-card",
        "dressed": false,
        "parent": null,
        "doc": "selectable-card"
      }
    ]
  },
  {
    "slug": "contenu",
    "label": "Contenu",
    "lead": "Texte, titres, médias et éléments éditoriaux.",
    "href": "/design/composants#contenu",
    "items": [
      {
        "name": "Avatar",
        "label": "Avatar",
        "slug": "avatar",
        "href": "/design/composants/avatar",
        "dressed": false,
        "parent": null,
        "doc": "avatar"
      },
      {
        "name": "AvatarGroup",
        "label": "Avatar Group",
        "slug": "avatar-group",
        "href": "/design/composants/avatar-group",
        "dressed": false,
        "parent": null,
        "doc": "avatar-group"
      },
      {
        "name": "AvatarGroupOverflow",
        "label": "Avatar Group Overflow",
        "slug": "avatar-group-overflow",
        "href": "/design/composants/avatar-group-overflow",
        "dressed": false,
        "parent": "AvatarGroup",
        "doc": "avatar-group"
      },
      {
        "name": "AvatarStatusDot",
        "label": "Avatar Status Dot",
        "slug": "avatar-status-dot",
        "href": "/design/composants/avatar-status-dot",
        "dressed": false,
        "parent": "Avatar",
        "doc": "avatar"
      },
      {
        "name": "Blockquote",
        "label": "Blockquote",
        "slug": "blockquote",
        "href": "/design/composants/blockquote",
        "dressed": false,
        "parent": null,
        "doc": "blockquote"
      },
      {
        "name": "Citation",
        "label": "Citation",
        "slug": "citation",
        "href": "/design/composants/citation",
        "dressed": false,
        "parent": null,
        "doc": "citation"
      },
      {
        "name": "Code",
        "label": "Code",
        "slug": "code",
        "href": "/design/composants/code",
        "dressed": false,
        "parent": null,
        "doc": "code"
      },
      {
        "name": "CodeBlock",
        "label": "Code Block",
        "slug": "code-block",
        "href": "/design/composants/code-block",
        "dressed": false,
        "parent": null,
        "doc": "code-block"
      },
      {
        "name": "EmptyState",
        "label": "Empty State",
        "slug": "empty-state",
        "href": "/design/composants/empty-state",
        "dressed": false,
        "parent": null,
        "doc": "empty-state"
      },
      {
        "name": "Heading",
        "label": "Heading",
        "slug": "heading",
        "href": "/design/composants/heading",
        "dressed": false,
        "parent": null,
        "doc": "heading"
      },
      {
        "name": "Icon",
        "label": "Icon",
        "slug": "icon",
        "href": "/design/composants/icon",
        "dressed": false,
        "parent": null,
        "doc": "icon"
      },
      {
        "name": "Kbd",
        "label": "Kbd",
        "slug": "kbd",
        "href": "/design/composants/kbd",
        "dressed": false,
        "parent": null,
        "doc": "kbd"
      },
      {
        "name": "Markdown",
        "label": "Markdown",
        "slug": "markdown",
        "href": "/design/composants/markdown",
        "dressed": false,
        "parent": null,
        "doc": "markdown"
      },
      {
        "name": "Text",
        "label": "Text",
        "slug": "text",
        "href": "/design/composants/text",
        "dressed": false,
        "parent": null,
        "doc": "text"
      },
      {
        "name": "Thumbnail",
        "label": "Thumbnail",
        "slug": "thumbnail",
        "href": "/design/composants/thumbnail",
        "dressed": false,
        "parent": null,
        "doc": "thumbnail"
      },
      {
        "name": "Timestamp",
        "label": "Timestamp",
        "slug": "timestamp",
        "href": "/design/composants/timestamp",
        "dressed": false,
        "parent": null,
        "doc": "timestamp"
      },
      {
        "name": "Token",
        "label": "Token",
        "slug": "token",
        "href": "/design/composants/token",
        "dressed": false,
        "parent": null,
        "doc": "token"
      }
    ]
  },
  {
    "slug": "retours",
    "label": "Retours & statuts",
    "lead": "Signaler un état, un progrès ou une information.",
    "href": "/design/composants#retours",
    "items": [
      {
        "name": "Badge",
        "label": "Badge",
        "slug": "badge",
        "href": "/design/composants/badge",
        "dressed": true,
        "parent": null,
        "doc": "badge"
      },
      {
        "name": "Banner",
        "label": "Banner",
        "slug": "banner",
        "href": "/design/composants/banner",
        "dressed": false,
        "parent": null,
        "doc": "banner"
      },
      {
        "name": "ProgressBar",
        "label": "Progress Bar",
        "slug": "progress-bar",
        "href": "/design/composants/progress-bar",
        "dressed": false,
        "parent": null,
        "doc": "progress-bar"
      },
      {
        "name": "Skeleton",
        "label": "Skeleton",
        "slug": "skeleton",
        "href": "/design/composants/skeleton",
        "dressed": false,
        "parent": null,
        "doc": "skeleton"
      },
      {
        "name": "Spinner",
        "label": "Spinner",
        "slug": "spinner",
        "href": "/design/composants/spinner",
        "dressed": false,
        "parent": null,
        "doc": "spinner"
      },
      {
        "name": "StatusDot",
        "label": "Status Dot",
        "slug": "status-dot",
        "href": "/design/composants/status-dot",
        "dressed": false,
        "parent": null,
        "doc": "status-dot"
      },
      {
        "name": "Toast",
        "label": "Toast",
        "slug": "toast",
        "href": "/design/composants/toast",
        "dressed": false,
        "parent": null,
        "doc": "toast"
      }
    ]
  },
  {
    "slug": "formulaires",
    "label": "Formulaires",
    "lead": "Champs, sélecteurs et contrôles de saisie.",
    "href": "/design/composants#formulaires",
    "items": [
      {
        "name": "Calendar",
        "label": "Calendar",
        "slug": "calendar",
        "href": "/design/composants/calendar",
        "dressed": false,
        "parent": null,
        "doc": "calendar"
      },
      {
        "name": "CheckboxInput",
        "label": "Checkbox Input",
        "slug": "checkbox-input",
        "href": "/design/composants/checkbox-input",
        "dressed": true,
        "parent": null,
        "doc": "checkbox-input"
      },
      {
        "name": "CheckboxList",
        "label": "Checkbox List",
        "slug": "checkbox-list",
        "href": "/design/composants/checkbox-list",
        "dressed": false,
        "parent": null,
        "doc": "checkbox-list"
      },
      {
        "name": "CheckboxListItem",
        "label": "Checkbox List Item",
        "slug": "checkbox-list-item",
        "href": "/design/composants/checkbox-list-item",
        "dressed": false,
        "parent": "CheckboxList",
        "doc": "checkbox-list"
      },
      {
        "name": "DateInput",
        "label": "Date Input",
        "slug": "date-input",
        "href": "/design/composants/date-input",
        "dressed": true,
        "parent": null,
        "doc": "date-input"
      },
      {
        "name": "DateRangeInput",
        "label": "Date Range Input",
        "slug": "date-range-input",
        "href": "/design/composants/date-range-input",
        "dressed": true,
        "parent": null,
        "doc": "date-range-input"
      },
      {
        "name": "DateTimeInput",
        "label": "Date Time Input",
        "slug": "date-time-input",
        "href": "/design/composants/date-time-input",
        "dressed": true,
        "parent": null,
        "doc": "date-time-input"
      },
      {
        "name": "Field",
        "label": "Field",
        "slug": "field",
        "href": "/design/composants/field",
        "dressed": false,
        "parent": null,
        "doc": "field"
      },
      {
        "name": "FieldLabel",
        "label": "Field Label",
        "slug": "field-label",
        "href": "/design/composants/field-label",
        "dressed": false,
        "parent": "Field",
        "doc": "field"
      },
      {
        "name": "FieldStatus",
        "label": "Field Status",
        "slug": "field-status",
        "href": "/design/composants/field-status",
        "dressed": false,
        "parent": "Field",
        "doc": "field"
      },
      {
        "name": "FileInput",
        "label": "File Input",
        "slug": "file-input",
        "href": "/design/composants/file-input",
        "dressed": true,
        "parent": null,
        "doc": "file-input"
      },
      {
        "name": "FormLayout",
        "label": "Form Layout",
        "slug": "form-layout",
        "href": "/design/composants/form-layout",
        "dressed": true,
        "parent": null,
        "doc": "form-layout"
      },
      {
        "name": "InputGroup",
        "label": "Input Group",
        "slug": "input-group",
        "href": "/design/composants/input-group",
        "dressed": true,
        "parent": null,
        "doc": "input-group"
      },
      {
        "name": "NumberInput",
        "label": "Number Input",
        "slug": "number-input",
        "href": "/design/composants/number-input",
        "dressed": true,
        "parent": null,
        "doc": "number-input"
      },
      {
        "name": "PowerSearch",
        "label": "Power Search",
        "slug": "power-search",
        "href": "/design/composants/power-search",
        "dressed": true,
        "parent": null,
        "doc": "power-search"
      },
      {
        "name": "RadioList",
        "label": "Radio List",
        "slug": "radio-list",
        "href": "/design/composants/radio-list",
        "dressed": true,
        "parent": null,
        "doc": "radio-list"
      },
      {
        "name": "RadioListItem",
        "label": "Radio List Item",
        "slug": "radio-list-item",
        "href": "/design/composants/radio-list-item",
        "dressed": false,
        "parent": "RadioList",
        "doc": "radio-list"
      },
      {
        "name": "Select",
        "label": "Select",
        "slug": "select",
        "href": "/design/composants/select",
        "dressed": true,
        "parent": null,
        "doc": "selector"
      },
      {
        "name": "Slider",
        "label": "Slider",
        "slug": "slider",
        "href": "/design/composants/slider",
        "dressed": true,
        "parent": null,
        "doc": "slider"
      },
      {
        "name": "Switch",
        "label": "Switch",
        "slug": "switch",
        "href": "/design/composants/switch",
        "dressed": true,
        "parent": null,
        "doc": "switch"
      },
      {
        "name": "TextArea",
        "label": "Text Area",
        "slug": "text-area",
        "href": "/design/composants/text-area",
        "dressed": true,
        "parent": null,
        "doc": "text-area"
      },
      {
        "name": "TextInput",
        "label": "Text Input",
        "slug": "text-input",
        "href": "/design/composants/text-input",
        "dressed": true,
        "parent": null,
        "doc": "text-input"
      },
      {
        "name": "TimeInput",
        "label": "Time Input",
        "slug": "time-input",
        "href": "/design/composants/time-input",
        "dressed": true,
        "parent": null,
        "doc": "time-input"
      }
    ]
  },
  {
    "slug": "mise-en-page",
    "label": "Mise en page",
    "lead": "Coquille d'application, grilles, piles et sections.",
    "href": "/design/composants#mise-en-page",
    "items": [
      {
        "name": "AppShell",
        "label": "App Shell",
        "slug": "app-shell",
        "href": "/design/composants/app-shell",
        "dressed": false,
        "parent": null,
        "doc": "app-shell"
      },
      {
        "name": "AspectRatio",
        "label": "Aspect Ratio",
        "slug": "aspect-ratio",
        "href": "/design/composants/aspect-ratio",
        "dressed": false,
        "parent": null,
        "doc": "aspect-ratio"
      },
      {
        "name": "Center",
        "label": "Center",
        "slug": "center",
        "href": "/design/composants/center",
        "dressed": false,
        "parent": null,
        "doc": "center"
      },
      {
        "name": "Divider",
        "label": "Divider",
        "slug": "divider",
        "href": "/design/composants/divider",
        "dressed": false,
        "parent": null,
        "doc": "divider"
      },
      {
        "name": "Grid",
        "label": "Grid",
        "slug": "grid",
        "href": "/design/composants/grid",
        "dressed": false,
        "parent": null,
        "doc": "grid"
      },
      {
        "name": "GridSpan",
        "label": "Grid Span",
        "slug": "grid-span",
        "href": "/design/composants/grid-span",
        "dressed": false,
        "parent": "Grid",
        "doc": "grid"
      },
      {
        "name": "HStack",
        "label": "HStack",
        "slug": "hstack",
        "href": "/design/composants/hstack",
        "dressed": false,
        "parent": "Stack",
        "doc": "stack"
      },
      {
        "name": "Layout",
        "label": "Layout",
        "slug": "layout",
        "href": "/design/composants/layout",
        "dressed": false,
        "parent": null,
        "doc": "layout"
      },
      {
        "name": "LayoutContent",
        "label": "Layout Content",
        "slug": "layout-content",
        "href": "/design/composants/layout-content",
        "dressed": false,
        "parent": "Layout",
        "doc": "layout"
      },
      {
        "name": "LayoutFooter",
        "label": "Layout Footer",
        "slug": "layout-footer",
        "href": "/design/composants/layout-footer",
        "dressed": false,
        "parent": "Layout",
        "doc": "layout"
      },
      {
        "name": "LayoutHeader",
        "label": "Layout Header",
        "slug": "layout-header",
        "href": "/design/composants/layout-header",
        "dressed": false,
        "parent": "Layout",
        "doc": "layout"
      },
      {
        "name": "LayoutPanel",
        "label": "Layout Panel",
        "slug": "layout-panel",
        "href": "/design/composants/layout-panel",
        "dressed": false,
        "parent": "Layout",
        "doc": "layout"
      },
      {
        "name": "Resizable",
        "label": "Resizable",
        "slug": "resizable",
        "href": "/design/composants/resizable",
        "dressed": false,
        "parent": null,
        "doc": "resizable"
      },
      {
        "name": "StackItem",
        "label": "Stack Item",
        "slug": "stack-item",
        "href": "/design/composants/stack-item",
        "dressed": false,
        "parent": "Stack",
        "doc": "stack"
      },
      {
        "name": "VStack",
        "label": "VStack",
        "slug": "vstack",
        "href": "/design/composants/vstack",
        "dressed": false,
        "parent": "Stack",
        "doc": "stack"
      }
    ]
  },
  {
    "slug": "navigation",
    "label": "Navigation",
    "lead": "Se déplacer dans le site ou dans la page.",
    "href": "/design/composants#navigation",
    "items": [
      {
        "name": "Breadcrumbs",
        "label": "Breadcrumbs",
        "slug": "breadcrumbs",
        "href": "/design/composants/breadcrumbs",
        "dressed": false,
        "parent": null,
        "doc": "breadcrumbs"
      },
      {
        "name": "BreadcrumbItem",
        "label": "Breadcrumb Item",
        "slug": "breadcrumb-item",
        "href": "/design/composants/breadcrumb-item",
        "dressed": false,
        "parent": "Breadcrumbs",
        "doc": "breadcrumbs"
      },
      {
        "name": "MobileNav",
        "label": "Mobile Nav",
        "slug": "mobile-nav",
        "href": "/design/composants/mobile-nav",
        "dressed": false,
        "parent": null,
        "doc": "mobile-nav"
      },
      {
        "name": "MobileNavToggle",
        "label": "Mobile Nav Toggle",
        "slug": "mobile-nav-toggle",
        "href": "/design/composants/mobile-nav-toggle",
        "dressed": false,
        "parent": "MobileNav",
        "doc": "mobile-nav"
      },
      {
        "name": "NavHeadingMenu",
        "label": "Nav Heading Menu",
        "slug": "nav-heading-menu",
        "href": "/design/composants/nav-heading-menu",
        "dressed": false,
        "parent": "SideNav",
        "doc": "side-nav"
      },
      {
        "name": "NavIcon",
        "label": "Nav Icon",
        "slug": "nav-icon",
        "href": "/design/composants/nav-icon",
        "dressed": false,
        "parent": null,
        "doc": "nav-icon"
      },
      {
        "name": "Outline",
        "label": "Outline",
        "slug": "outline",
        "href": "/design/composants/outline",
        "dressed": false,
        "parent": null,
        "doc": "outline"
      },
      {
        "name": "SideNav",
        "label": "Side Nav",
        "slug": "side-nav",
        "href": "/design/composants/side-nav",
        "dressed": false,
        "parent": null,
        "doc": "side-nav"
      },
      {
        "name": "SideNavCollapseButton",
        "label": "Side Nav Collapse Button",
        "slug": "side-nav-collapse-button",
        "href": "/design/composants/side-nav-collapse-button",
        "dressed": false,
        "parent": "SideNav",
        "doc": "side-nav"
      },
      {
        "name": "SideNavHeading",
        "label": "Side Nav Heading",
        "slug": "side-nav-heading",
        "href": "/design/composants/side-nav-heading",
        "dressed": false,
        "parent": "SideNav",
        "doc": "side-nav"
      },
      {
        "name": "SideNavItem",
        "label": "Side Nav Item",
        "slug": "side-nav-item",
        "href": "/design/composants/side-nav-item",
        "dressed": false,
        "parent": "SideNav",
        "doc": "side-nav"
      },
      {
        "name": "SideNavSection",
        "label": "Side Nav Section",
        "slug": "side-nav-section",
        "href": "/design/composants/side-nav-section",
        "dressed": false,
        "parent": "SideNav",
        "doc": "side-nav"
      },
      {
        "name": "Step",
        "label": "Step",
        "slug": "step",
        "href": "/design/composants/step",
        "dressed": false,
        "parent": "Stepper",
        "doc": "stepper"
      },
      {
        "name": "Stepper",
        "label": "Stepper",
        "slug": "stepper",
        "href": "/design/composants/stepper",
        "dressed": false,
        "parent": null,
        "doc": "stepper"
      },
      {
        "name": "Tab",
        "label": "Tab",
        "slug": "tab",
        "href": "/design/composants/tab",
        "dressed": false,
        "parent": "TabList",
        "doc": "tab-list"
      },
      {
        "name": "TabList",
        "label": "Tab List",
        "slug": "tab-list",
        "href": "/design/composants/tab-list",
        "dressed": false,
        "parent": null,
        "doc": "tab-list"
      },
      {
        "name": "TabMenu",
        "label": "Tab Menu",
        "slug": "tab-menu",
        "href": "/design/composants/tab-menu",
        "dressed": false,
        "parent": "TabList",
        "doc": "tab-list"
      },
      {
        "name": "TopNav",
        "label": "Top Nav",
        "slug": "top-nav",
        "href": "/design/composants/top-nav",
        "dressed": false,
        "parent": null,
        "doc": "top-nav"
      },
      {
        "name": "TopNavHeading",
        "label": "Top Nav Heading",
        "slug": "top-nav-heading",
        "href": "/design/composants/top-nav-heading",
        "dressed": false,
        "parent": "TopNav",
        "doc": "top-nav"
      },
      {
        "name": "TopNavItem",
        "label": "Top Nav Item",
        "slug": "top-nav-item",
        "href": "/design/composants/top-nav-item",
        "dressed": false,
        "parent": "TopNav",
        "doc": "top-nav"
      },
      {
        "name": "TopNavMegaMenu",
        "label": "Top Nav Mega Menu",
        "slug": "top-nav-mega-menu",
        "href": "/design/composants/top-nav-mega-menu",
        "dressed": false,
        "parent": "TopNav",
        "doc": "top-nav"
      },
      {
        "name": "TopNavMegaMenuFeaturedCard",
        "label": "Top Nav Mega Menu Featured Card",
        "slug": "top-nav-mega-menu-featured-card",
        "href": "/design/composants/top-nav-mega-menu-featured-card",
        "dressed": false,
        "parent": "TopNavMegaMenu",
        "doc": "top-nav-mega-menu"
      },
      {
        "name": "TopNavMegaMenuItem",
        "label": "Top Nav Mega Menu Item",
        "slug": "top-nav-mega-menu-item",
        "href": "/design/composants/top-nav-mega-menu-item",
        "dressed": false,
        "parent": "TopNavMegaMenu",
        "doc": "top-nav-mega-menu"
      },
      {
        "name": "TopNavMenu",
        "label": "Top Nav Menu",
        "slug": "top-nav-menu",
        "href": "/design/composants/top-nav-menu",
        "dressed": false,
        "parent": "TopNav",
        "doc": "top-nav"
      }
    ]
  },
  {
    "slug": "surcouches",
    "label": "Surcouches",
    "lead": "Dialogues, popovers, infobulles et panneaux flottants.",
    "href": "/design/composants#surcouches",
    "items": [
      {
        "name": "BottomSheet",
        "label": "Bottom Sheet",
        "slug": "bottom-sheet",
        "href": "/design/composants/bottom-sheet",
        "dressed": false,
        "parent": null,
        "doc": "bottom-sheet"
      },
      {
        "name": "BottomSheetSwitcher",
        "label": "Bottom Sheet Switcher",
        "slug": "bottom-sheet-switcher",
        "href": "/design/composants/bottom-sheet-switcher",
        "dressed": false,
        "parent": null,
        "doc": "bottom-sheet-switcher"
      },
      {
        "name": "CommandPalette",
        "label": "Command Palette",
        "slug": "command-palette",
        "href": "/design/composants/command-palette",
        "dressed": false,
        "parent": null,
        "doc": "command-palette"
      },
      {
        "name": "CommandPaletteEmpty",
        "label": "Command Palette Empty",
        "slug": "command-palette-empty",
        "href": "/design/composants/command-palette-empty",
        "dressed": false,
        "parent": "CommandPalette",
        "doc": "command-palette"
      },
      {
        "name": "CommandPaletteFooter",
        "label": "Command Palette Footer",
        "slug": "command-palette-footer",
        "href": "/design/composants/command-palette-footer",
        "dressed": false,
        "parent": "CommandPalette",
        "doc": "command-palette"
      },
      {
        "name": "CommandPaletteGroup",
        "label": "Command Palette Group",
        "slug": "command-palette-group",
        "href": "/design/composants/command-palette-group",
        "dressed": false,
        "parent": "CommandPalette",
        "doc": "command-palette"
      },
      {
        "name": "CommandPaletteInput",
        "label": "Command Palette Input",
        "slug": "command-palette-input",
        "href": "/design/composants/command-palette-input",
        "dressed": false,
        "parent": "CommandPalette",
        "doc": "command-palette"
      },
      {
        "name": "CommandPaletteItem",
        "label": "Command Palette Item",
        "slug": "command-palette-item",
        "href": "/design/composants/command-palette-item",
        "dressed": false,
        "parent": "CommandPalette",
        "doc": "command-palette"
      },
      {
        "name": "CommandPaletteList",
        "label": "Command Palette List",
        "slug": "command-palette-list",
        "href": "/design/composants/command-palette-list",
        "dressed": false,
        "parent": "CommandPalette",
        "doc": "command-palette"
      },
      {
        "name": "ContextMenu",
        "label": "Context Menu",
        "slug": "context-menu",
        "href": "/design/composants/context-menu",
        "dressed": false,
        "parent": null,
        "doc": "context-menu"
      },
      {
        "name": "ContextMenuItem",
        "label": "Context Menu Item",
        "slug": "context-menu-item",
        "href": "/design/composants/context-menu-item",
        "dressed": false,
        "parent": "ContextMenu",
        "doc": "context-menu"
      },
      {
        "name": "Dialog",
        "label": "Dialog",
        "slug": "dialog",
        "href": "/design/composants/dialog",
        "dressed": true,
        "parent": null,
        "doc": "dialog"
      },
      {
        "name": "DialogHeader",
        "label": "Dialog Header",
        "slug": "dialog-header",
        "href": "/design/composants/dialog-header",
        "dressed": false,
        "parent": "Dialog",
        "doc": "dialog"
      },
      {
        "name": "HoverCard",
        "label": "Hover Card",
        "slug": "hover-card",
        "href": "/design/composants/hover-card",
        "dressed": false,
        "parent": null,
        "doc": "hover-card"
      },
      {
        "name": "Lightbox",
        "label": "Lightbox",
        "slug": "lightbox",
        "href": "/design/composants/lightbox",
        "dressed": false,
        "parent": null,
        "doc": "lightbox"
      },
      {
        "name": "Overlay",
        "label": "Overlay",
        "slug": "overlay",
        "href": "/design/composants/overlay",
        "dressed": false,
        "parent": null,
        "doc": "overlay"
      },
      {
        "name": "Popover",
        "label": "Popover",
        "slug": "popover",
        "href": "/design/composants/popover",
        "dressed": false,
        "parent": null,
        "doc": "popover"
      },
      {
        "name": "Tooltip",
        "label": "Tooltip",
        "slug": "tooltip",
        "href": "/design/composants/tooltip",
        "dressed": false,
        "parent": null,
        "doc": "tooltip"
      }
    ]
  },
  {
    "slug": "tables-listes",
    "label": "Tables & listes",
    "lead": "Données en lignes : tables, listes, arborescences.",
    "href": "/design/composants#tables-listes",
    "items": [
      {
        "name": "Item",
        "label": "Item",
        "slug": "item",
        "href": "/design/composants/item",
        "dressed": false,
        "parent": null,
        "doc": "item"
      },
      {
        "name": "List",
        "label": "List",
        "slug": "list",
        "href": "/design/composants/list",
        "dressed": false,
        "parent": null,
        "doc": "list"
      },
      {
        "name": "ListItem",
        "label": "List Item",
        "slug": "list-item",
        "href": "/design/composants/list-item",
        "dressed": false,
        "parent": "List",
        "doc": "list"
      },
      {
        "name": "MetadataList",
        "label": "Metadata List",
        "slug": "metadata-list",
        "href": "/design/composants/metadata-list",
        "dressed": false,
        "parent": null,
        "doc": "metadata-list"
      },
      {
        "name": "MetadataListItem",
        "label": "Metadata List Item",
        "slug": "metadata-list-item",
        "href": "/design/composants/metadata-list-item",
        "dressed": false,
        "parent": "MetadataList",
        "doc": "metadata-list"
      },
      {
        "name": "OverflowList",
        "label": "Overflow List",
        "slug": "overflow-list",
        "href": "/design/composants/overflow-list",
        "dressed": false,
        "parent": null,
        "doc": "overflow-list"
      },
      {
        "name": "Table",
        "label": "Table",
        "slug": "table",
        "href": "/design/composants/table",
        "dressed": false,
        "parent": null,
        "doc": "table"
      },
      {
        "name": "TreeList",
        "label": "Tree List",
        "slug": "tree-list",
        "href": "/design/composants/tree-list",
        "dressed": false,
        "parent": null,
        "doc": "tree-list"
      }
    ]
  },
  {
    "slug": "utilitaires",
    "label": "Utilitaires",
    "lead": "Thème, accessibilité et aides de rendu.",
    "href": "/design/composants#utilitaires",
    "items": [
      {
        "name": "Theme",
        "label": "Theme",
        "slug": "theme",
        "href": "/design/composants/theme",
        "dressed": false,
        "parent": null,
        "doc": "theme"
      },
      {
        "name": "MediaTheme",
        "label": "Media Theme",
        "slug": "media-theme",
        "href": "/design/composants/media-theme",
        "dressed": false,
        "parent": null,
        "doc": "media-theme"
      },
      {
        "name": "SyntaxTheme",
        "label": "Syntax Theme",
        "slug": "syntax-theme",
        "href": "/design/composants/syntax-theme",
        "dressed": false,
        "parent": null,
        "doc": "syntax-theme"
      },
      {
        "name": "VisuallyHidden",
        "label": "Visually Hidden",
        "slug": "visually-hidden",
        "href": "/design/composants/visually-hidden",
        "dressed": false,
        "parent": null,
        "doc": "visually-hidden"
      }
    ]
  },
  {
    "slug": "chat",
    "label": "Chat",
    "lead": "Composants conversationnels (assistant IA). Hors périmètre du site vitrine, listés pour référence.",
    "href": "/design/composants#chat",
    "items": [
      {
        "name": "ChatLayout",
        "label": "Chat Layout",
        "slug": "chat-layout",
        "href": "/design/composants/chat-layout",
        "dressed": false,
        "parent": null,
        "doc": "chat-layout"
      },
      {
        "name": "ChatComposer",
        "label": "Chat Composer",
        "slug": "chat-composer",
        "href": "/design/composants/chat-composer",
        "dressed": false,
        "parent": null,
        "doc": "chat-composer"
      },
      {
        "name": "ChatComposerDrawer",
        "label": "Chat Composer Drawer",
        "slug": "chat-composer-drawer",
        "href": "/design/composants/chat-composer-drawer",
        "dressed": false,
        "parent": "ChatComposer",
        "doc": "chat-composer"
      },
      {
        "name": "ChatComposerInput",
        "label": "Chat Composer Input",
        "slug": "chat-composer-input",
        "href": "/design/composants/chat-composer-input",
        "dressed": false,
        "parent": "ChatComposer",
        "doc": "chat-composer"
      },
      {
        "name": "ChatDictationButton",
        "label": "Chat Dictation Button",
        "slug": "chat-dictation-button",
        "href": "/design/composants/chat-dictation-button",
        "dressed": false,
        "parent": "ChatComposer",
        "doc": "chat-composer"
      },
      {
        "name": "ChatMessage",
        "label": "Chat Message",
        "slug": "chat-message",
        "href": "/design/composants/chat-message",
        "dressed": false,
        "parent": null,
        "doc": "chat-message"
      },
      {
        "name": "ChatMessageBubble",
        "label": "Chat Message Bubble",
        "slug": "chat-message-bubble",
        "href": "/design/composants/chat-message-bubble",
        "dressed": false,
        "parent": "ChatMessage",
        "doc": "chat-message"
      },
      {
        "name": "ChatMessageList",
        "label": "Chat Message List",
        "slug": "chat-message-list",
        "href": "/design/composants/chat-message-list",
        "dressed": false,
        "parent": null,
        "doc": "chat-message-list"
      },
      {
        "name": "ChatMessageMetadata",
        "label": "Chat Message Metadata",
        "slug": "chat-message-metadata",
        "href": "/design/composants/chat-message-metadata",
        "dressed": false,
        "parent": "ChatMessage",
        "doc": "chat-message"
      },
      {
        "name": "ChatSendButton",
        "label": "Chat Send Button",
        "slug": "chat-send-button",
        "href": "/design/composants/chat-send-button",
        "dressed": false,
        "parent": "ChatComposer",
        "doc": "chat-composer"
      },
      {
        "name": "ChatSystemMessage",
        "label": "Chat System Message",
        "slug": "chat-system-message",
        "href": "/design/composants/chat-system-message",
        "dressed": false,
        "parent": null,
        "doc": "chat-system-message"
      },
      {
        "name": "ChatTokenizedText",
        "label": "Chat Tokenized Text",
        "slug": "chat-tokenized-text",
        "href": "/design/composants/chat-tokenized-text",
        "dressed": false,
        "parent": "ChatMessage",
        "doc": "chat-message"
      },
      {
        "name": "ChatToolCalls",
        "label": "Chat Tool Calls",
        "slug": "chat-tool-calls",
        "href": "/design/composants/chat-tool-calls",
        "dressed": false,
        "parent": null,
        "doc": "chat-tool-calls"
      }
    ]
  }
];
