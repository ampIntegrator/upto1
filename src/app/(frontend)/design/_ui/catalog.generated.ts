/* @generated par scripts/gen-catalog.mjs — ne pas éditer. */
export type CatalogItem = {name: string; label: string; slug: string; href: string; dressed: boolean; parent: string | null; doc: string};
export type CatalogCategory = {slug: string; label: string; lead: string; href: string; items: CatalogItem[]};
export const CATALOG: CatalogCategory[] = [
  {
    "slug": "actions",
    "label": "Actions",
    "lead": "Boutons, menus et contrôles qui déclenchent une action.",
    "href": "/design/composants/actions",
    "items": [
      {
        "name": "Button",
        "label": "Button",
        "slug": "button",
        "href": "/design/composants/actions/button",
        "dressed": true,
        "parent": null,
        "doc": "button"
      },
      {
        "name": "ButtonGroup",
        "label": "Button Group",
        "slug": "button-group",
        "href": "/design/composants/actions/button-group",
        "dressed": false,
        "parent": null,
        "doc": "button-group"
      },
      {
        "name": "DropdownMenu",
        "label": "Dropdown Menu",
        "slug": "dropdown-menu",
        "href": "/design/composants/actions/dropdown-menu",
        "dressed": false,
        "parent": null,
        "doc": "dropdown-menu"
      },
      {
        "name": "DropdownMenuItem",
        "label": "Dropdown Menu Item",
        "slug": "dropdown-menu-item",
        "href": "/design/composants/actions/dropdown-menu-item",
        "dressed": false,
        "parent": "DropdownMenu",
        "doc": "dropdown-menu"
      },
      {
        "name": "IconButton",
        "label": "Icon Button",
        "slug": "icon-button",
        "href": "/design/composants/actions/icon-button",
        "dressed": false,
        "parent": null,
        "doc": "icon-button"
      },
      {
        "name": "Link",
        "label": "Link",
        "slug": "link",
        "href": "/design/composants/actions/link",
        "dressed": false,
        "parent": null,
        "doc": "link"
      },
      {
        "name": "MoreMenu",
        "label": "More Menu",
        "slug": "more-menu",
        "href": "/design/composants/actions/more-menu",
        "dressed": false,
        "parent": null,
        "doc": "more-menu"
      },
      {
        "name": "SegmentedControl",
        "label": "Segmented Control",
        "slug": "segmented-control",
        "href": "/design/composants/actions/segmented-control",
        "dressed": false,
        "parent": null,
        "doc": "segmented-control"
      },
      {
        "name": "SegmentedControlItem",
        "label": "Segmented Control Item",
        "slug": "segmented-control-item",
        "href": "/design/composants/actions/segmented-control-item",
        "dressed": false,
        "parent": "SegmentedControl",
        "doc": "segmented-control"
      },
      {
        "name": "ToggleButton",
        "label": "Toggle Button",
        "slug": "toggle-button",
        "href": "/design/composants/actions/toggle-button",
        "dressed": false,
        "parent": null,
        "doc": "toggle-button"
      },
      {
        "name": "ToggleButtonGroup",
        "label": "Toggle Button Group",
        "slug": "toggle-button-group",
        "href": "/design/composants/actions/toggle-button-group",
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
    "href": "/design/composants/conteneurs",
    "items": [
      {
        "name": "Card",
        "label": "Card",
        "slug": "card",
        "href": "/design/composants/conteneurs/card",
        "dressed": false,
        "parent": null,
        "doc": "card"
      },
      {
        "name": "Carousel",
        "label": "Carousel",
        "slug": "carousel",
        "href": "/design/composants/conteneurs/carousel",
        "dressed": false,
        "parent": null,
        "doc": "carousel"
      },
      {
        "name": "ClickableCard",
        "label": "Clickable Card",
        "slug": "clickable-card",
        "href": "/design/composants/conteneurs/clickable-card",
        "dressed": false,
        "parent": null,
        "doc": "clickable-card"
      },
      {
        "name": "Collapsible",
        "label": "Collapsible",
        "slug": "collapsible",
        "href": "/design/composants/conteneurs/collapsible",
        "dressed": false,
        "parent": null,
        "doc": "collapsible"
      },
      {
        "name": "CollapsibleGroup",
        "label": "Collapsible Group",
        "slug": "collapsible-group",
        "href": "/design/composants/conteneurs/collapsible-group",
        "dressed": false,
        "parent": "Collapsible",
        "doc": "collapsible"
      },
      {
        "name": "SelectableCard",
        "label": "Selectable Card",
        "slug": "selectable-card",
        "href": "/design/composants/conteneurs/selectable-card",
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
    "href": "/design/composants/contenu",
    "items": [
      {
        "name": "Avatar",
        "label": "Avatar",
        "slug": "avatar",
        "href": "/design/composants/contenu/avatar",
        "dressed": false,
        "parent": null,
        "doc": "avatar"
      },
      {
        "name": "AvatarGroup",
        "label": "Avatar Group",
        "slug": "avatar-group",
        "href": "/design/composants/contenu/avatar-group",
        "dressed": false,
        "parent": null,
        "doc": "avatar-group"
      },
      {
        "name": "AvatarGroupOverflow",
        "label": "Avatar Group Overflow",
        "slug": "avatar-group-overflow",
        "href": "/design/composants/contenu/avatar-group-overflow",
        "dressed": false,
        "parent": "AvatarGroup",
        "doc": "avatar-group"
      },
      {
        "name": "AvatarStatusDot",
        "label": "Avatar Status Dot",
        "slug": "avatar-status-dot",
        "href": "/design/composants/contenu/avatar-status-dot",
        "dressed": false,
        "parent": "Avatar",
        "doc": "avatar"
      },
      {
        "name": "Blockquote",
        "label": "Blockquote",
        "slug": "blockquote",
        "href": "/design/composants/contenu/blockquote",
        "dressed": false,
        "parent": null,
        "doc": "blockquote"
      },
      {
        "name": "Citation",
        "label": "Citation",
        "slug": "citation",
        "href": "/design/composants/contenu/citation",
        "dressed": false,
        "parent": null,
        "doc": "citation"
      },
      {
        "name": "Code",
        "label": "Code",
        "slug": "code",
        "href": "/design/composants/contenu/code",
        "dressed": false,
        "parent": null,
        "doc": "code"
      },
      {
        "name": "CodeBlock",
        "label": "Code Block",
        "slug": "code-block",
        "href": "/design/composants/contenu/code-block",
        "dressed": false,
        "parent": null,
        "doc": "code-block"
      },
      {
        "name": "EmptyState",
        "label": "Empty State",
        "slug": "empty-state",
        "href": "/design/composants/contenu/empty-state",
        "dressed": false,
        "parent": null,
        "doc": "empty-state"
      },
      {
        "name": "Heading",
        "label": "Heading",
        "slug": "heading",
        "href": "/design/composants/contenu/heading",
        "dressed": false,
        "parent": null,
        "doc": "heading"
      },
      {
        "name": "Icon",
        "label": "Icon",
        "slug": "icon",
        "href": "/design/composants/contenu/icon",
        "dressed": false,
        "parent": null,
        "doc": "icon"
      },
      {
        "name": "Kbd",
        "label": "Kbd",
        "slug": "kbd",
        "href": "/design/composants/contenu/kbd",
        "dressed": false,
        "parent": null,
        "doc": "kbd"
      },
      {
        "name": "Markdown",
        "label": "Markdown",
        "slug": "markdown",
        "href": "/design/composants/contenu/markdown",
        "dressed": false,
        "parent": null,
        "doc": "markdown"
      },
      {
        "name": "Text",
        "label": "Text",
        "slug": "text",
        "href": "/design/composants/contenu/text",
        "dressed": false,
        "parent": null,
        "doc": "text"
      },
      {
        "name": "Thumbnail",
        "label": "Thumbnail",
        "slug": "thumbnail",
        "href": "/design/composants/contenu/thumbnail",
        "dressed": false,
        "parent": null,
        "doc": "thumbnail"
      },
      {
        "name": "Timestamp",
        "label": "Timestamp",
        "slug": "timestamp",
        "href": "/design/composants/contenu/timestamp",
        "dressed": false,
        "parent": null,
        "doc": "timestamp"
      },
      {
        "name": "Token",
        "label": "Token",
        "slug": "token",
        "href": "/design/composants/contenu/token",
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
    "href": "/design/composants/retours",
    "items": [
      {
        "name": "Badge",
        "label": "Badge",
        "slug": "badge",
        "href": "/design/composants/retours/badge",
        "dressed": false,
        "parent": null,
        "doc": "badge"
      },
      {
        "name": "Banner",
        "label": "Banner",
        "slug": "banner",
        "href": "/design/composants/retours/banner",
        "dressed": false,
        "parent": null,
        "doc": "banner"
      },
      {
        "name": "ProgressBar",
        "label": "Progress Bar",
        "slug": "progress-bar",
        "href": "/design/composants/retours/progress-bar",
        "dressed": false,
        "parent": null,
        "doc": "progress-bar"
      },
      {
        "name": "Skeleton",
        "label": "Skeleton",
        "slug": "skeleton",
        "href": "/design/composants/retours/skeleton",
        "dressed": false,
        "parent": null,
        "doc": "skeleton"
      },
      {
        "name": "Spinner",
        "label": "Spinner",
        "slug": "spinner",
        "href": "/design/composants/retours/spinner",
        "dressed": false,
        "parent": null,
        "doc": "spinner"
      },
      {
        "name": "StatusDot",
        "label": "Status Dot",
        "slug": "status-dot",
        "href": "/design/composants/retours/status-dot",
        "dressed": false,
        "parent": null,
        "doc": "status-dot"
      },
      {
        "name": "Toast",
        "label": "Toast",
        "slug": "toast",
        "href": "/design/composants/retours/toast",
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
    "href": "/design/composants/formulaires",
    "items": [
      {
        "name": "Calendar",
        "label": "Calendar",
        "slug": "calendar",
        "href": "/design/composants/formulaires/calendar",
        "dressed": false,
        "parent": null,
        "doc": "calendar"
      },
      {
        "name": "CheckboxInput",
        "label": "Checkbox Input",
        "slug": "checkbox-input",
        "href": "/design/composants/formulaires/checkbox-input",
        "dressed": true,
        "parent": null,
        "doc": "checkbox-input"
      },
      {
        "name": "CheckboxList",
        "label": "Checkbox List",
        "slug": "checkbox-list",
        "href": "/design/composants/formulaires/checkbox-list",
        "dressed": false,
        "parent": null,
        "doc": "checkbox-list"
      },
      {
        "name": "CheckboxListItem",
        "label": "Checkbox List Item",
        "slug": "checkbox-list-item",
        "href": "/design/composants/formulaires/checkbox-list-item",
        "dressed": false,
        "parent": "CheckboxList",
        "doc": "checkbox-list"
      },
      {
        "name": "DateInput",
        "label": "Date Input",
        "slug": "date-input",
        "href": "/design/composants/formulaires/date-input",
        "dressed": true,
        "parent": null,
        "doc": "date-input"
      },
      {
        "name": "DateRangeInput",
        "label": "Date Range Input",
        "slug": "date-range-input",
        "href": "/design/composants/formulaires/date-range-input",
        "dressed": true,
        "parent": null,
        "doc": "date-range-input"
      },
      {
        "name": "DateTimeInput",
        "label": "Date Time Input",
        "slug": "date-time-input",
        "href": "/design/composants/formulaires/date-time-input",
        "dressed": true,
        "parent": null,
        "doc": "date-time-input"
      },
      {
        "name": "Field",
        "label": "Field",
        "slug": "field",
        "href": "/design/composants/formulaires/field",
        "dressed": false,
        "parent": null,
        "doc": "field"
      },
      {
        "name": "FieldLabel",
        "label": "Field Label",
        "slug": "field-label",
        "href": "/design/composants/formulaires/field-label",
        "dressed": false,
        "parent": "Field",
        "doc": "field"
      },
      {
        "name": "FieldStatus",
        "label": "Field Status",
        "slug": "field-status",
        "href": "/design/composants/formulaires/field-status",
        "dressed": false,
        "parent": "Field",
        "doc": "field"
      },
      {
        "name": "FileInput",
        "label": "File Input",
        "slug": "file-input",
        "href": "/design/composants/formulaires/file-input",
        "dressed": true,
        "parent": null,
        "doc": "file-input"
      },
      {
        "name": "FormLayout",
        "label": "Form Layout",
        "slug": "form-layout",
        "href": "/design/composants/formulaires/form-layout",
        "dressed": true,
        "parent": null,
        "doc": "form-layout"
      },
      {
        "name": "InputGroup",
        "label": "Input Group",
        "slug": "input-group",
        "href": "/design/composants/formulaires/input-group",
        "dressed": true,
        "parent": null,
        "doc": "input-group"
      },
      {
        "name": "NumberInput",
        "label": "Number Input",
        "slug": "number-input",
        "href": "/design/composants/formulaires/number-input",
        "dressed": true,
        "parent": null,
        "doc": "number-input"
      },
      {
        "name": "PowerSearch",
        "label": "Power Search",
        "slug": "power-search",
        "href": "/design/composants/formulaires/power-search",
        "dressed": true,
        "parent": null,
        "doc": "power-search"
      },
      {
        "name": "RadioList",
        "label": "Radio List",
        "slug": "radio-list",
        "href": "/design/composants/formulaires/radio-list",
        "dressed": true,
        "parent": null,
        "doc": "radio-list"
      },
      {
        "name": "RadioListItem",
        "label": "Radio List Item",
        "slug": "radio-list-item",
        "href": "/design/composants/formulaires/radio-list-item",
        "dressed": false,
        "parent": "RadioList",
        "doc": "radio-list"
      },
      {
        "name": "Select",
        "label": "Select",
        "slug": "select",
        "href": "/design/composants/formulaires/select",
        "dressed": true,
        "parent": null,
        "doc": "selector"
      },
      {
        "name": "Slider",
        "label": "Slider",
        "slug": "slider",
        "href": "/design/composants/formulaires/slider",
        "dressed": true,
        "parent": null,
        "doc": "slider"
      },
      {
        "name": "Switch",
        "label": "Switch",
        "slug": "switch",
        "href": "/design/composants/formulaires/switch",
        "dressed": true,
        "parent": null,
        "doc": "switch"
      },
      {
        "name": "TextArea",
        "label": "Text Area",
        "slug": "text-area",
        "href": "/design/composants/formulaires/text-area",
        "dressed": true,
        "parent": null,
        "doc": "text-area"
      },
      {
        "name": "TextInput",
        "label": "Text Input",
        "slug": "text-input",
        "href": "/design/composants/formulaires/text-input",
        "dressed": true,
        "parent": null,
        "doc": "text-input"
      },
      {
        "name": "TimeInput",
        "label": "Time Input",
        "slug": "time-input",
        "href": "/design/composants/formulaires/time-input",
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
    "href": "/design/composants/mise-en-page",
    "items": [
      {
        "name": "AppShell",
        "label": "App Shell",
        "slug": "app-shell",
        "href": "/design/composants/mise-en-page/app-shell",
        "dressed": false,
        "parent": null,
        "doc": "app-shell"
      },
      {
        "name": "AspectRatio",
        "label": "Aspect Ratio",
        "slug": "aspect-ratio",
        "href": "/design/composants/mise-en-page/aspect-ratio",
        "dressed": false,
        "parent": null,
        "doc": "aspect-ratio"
      },
      {
        "name": "Center",
        "label": "Center",
        "slug": "center",
        "href": "/design/composants/mise-en-page/center",
        "dressed": false,
        "parent": null,
        "doc": "center"
      },
      {
        "name": "Divider",
        "label": "Divider",
        "slug": "divider",
        "href": "/design/composants/mise-en-page/divider",
        "dressed": false,
        "parent": null,
        "doc": "divider"
      },
      {
        "name": "Grid",
        "label": "Grid",
        "slug": "grid",
        "href": "/design/composants/mise-en-page/grid",
        "dressed": false,
        "parent": null,
        "doc": "grid"
      },
      {
        "name": "GridSpan",
        "label": "Grid Span",
        "slug": "grid-span",
        "href": "/design/composants/mise-en-page/grid-span",
        "dressed": false,
        "parent": "Grid",
        "doc": "grid"
      },
      {
        "name": "HStack",
        "label": "HStack",
        "slug": "hstack",
        "href": "/design/composants/mise-en-page/hstack",
        "dressed": false,
        "parent": "Stack",
        "doc": "stack"
      },
      {
        "name": "Layout",
        "label": "Layout",
        "slug": "layout",
        "href": "/design/composants/mise-en-page/layout",
        "dressed": false,
        "parent": null,
        "doc": "layout"
      },
      {
        "name": "LayoutContent",
        "label": "Layout Content",
        "slug": "layout-content",
        "href": "/design/composants/mise-en-page/layout-content",
        "dressed": false,
        "parent": "Layout",
        "doc": "layout"
      },
      {
        "name": "LayoutFooter",
        "label": "Layout Footer",
        "slug": "layout-footer",
        "href": "/design/composants/mise-en-page/layout-footer",
        "dressed": false,
        "parent": "Layout",
        "doc": "layout"
      },
      {
        "name": "LayoutHeader",
        "label": "Layout Header",
        "slug": "layout-header",
        "href": "/design/composants/mise-en-page/layout-header",
        "dressed": false,
        "parent": "Layout",
        "doc": "layout"
      },
      {
        "name": "LayoutPanel",
        "label": "Layout Panel",
        "slug": "layout-panel",
        "href": "/design/composants/mise-en-page/layout-panel",
        "dressed": false,
        "parent": "Layout",
        "doc": "layout"
      },
      {
        "name": "Resizable",
        "label": "Resizable",
        "slug": "resizable",
        "href": "/design/composants/mise-en-page/resizable",
        "dressed": false,
        "parent": null,
        "doc": "resizable"
      },
      {
        "name": "StackItem",
        "label": "Stack Item",
        "slug": "stack-item",
        "href": "/design/composants/mise-en-page/stack-item",
        "dressed": false,
        "parent": "Stack",
        "doc": "stack"
      },
      {
        "name": "VStack",
        "label": "VStack",
        "slug": "vstack",
        "href": "/design/composants/mise-en-page/vstack",
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
    "href": "/design/composants/navigation",
    "items": [
      {
        "name": "Breadcrumbs",
        "label": "Breadcrumbs",
        "slug": "breadcrumbs",
        "href": "/design/composants/navigation/breadcrumbs",
        "dressed": false,
        "parent": null,
        "doc": "breadcrumbs"
      },
      {
        "name": "BreadcrumbItem",
        "label": "Breadcrumb Item",
        "slug": "breadcrumb-item",
        "href": "/design/composants/navigation/breadcrumb-item",
        "dressed": false,
        "parent": "Breadcrumbs",
        "doc": "breadcrumbs"
      },
      {
        "name": "MobileNav",
        "label": "Mobile Nav",
        "slug": "mobile-nav",
        "href": "/design/composants/navigation/mobile-nav",
        "dressed": false,
        "parent": null,
        "doc": "mobile-nav"
      },
      {
        "name": "MobileNavToggle",
        "label": "Mobile Nav Toggle",
        "slug": "mobile-nav-toggle",
        "href": "/design/composants/navigation/mobile-nav-toggle",
        "dressed": false,
        "parent": "MobileNav",
        "doc": "mobile-nav"
      },
      {
        "name": "NavHeadingMenu",
        "label": "Nav Heading Menu",
        "slug": "nav-heading-menu",
        "href": "/design/composants/navigation/nav-heading-menu",
        "dressed": false,
        "parent": "SideNav",
        "doc": "side-nav"
      },
      {
        "name": "NavIcon",
        "label": "Nav Icon",
        "slug": "nav-icon",
        "href": "/design/composants/navigation/nav-icon",
        "dressed": false,
        "parent": null,
        "doc": "nav-icon"
      },
      {
        "name": "Outline",
        "label": "Outline",
        "slug": "outline",
        "href": "/design/composants/navigation/outline",
        "dressed": false,
        "parent": null,
        "doc": "outline"
      },
      {
        "name": "SideNav",
        "label": "Side Nav",
        "slug": "side-nav",
        "href": "/design/composants/navigation/side-nav",
        "dressed": false,
        "parent": null,
        "doc": "side-nav"
      },
      {
        "name": "SideNavCollapseButton",
        "label": "Side Nav Collapse Button",
        "slug": "side-nav-collapse-button",
        "href": "/design/composants/navigation/side-nav-collapse-button",
        "dressed": false,
        "parent": "SideNav",
        "doc": "side-nav"
      },
      {
        "name": "SideNavHeading",
        "label": "Side Nav Heading",
        "slug": "side-nav-heading",
        "href": "/design/composants/navigation/side-nav-heading",
        "dressed": false,
        "parent": "SideNav",
        "doc": "side-nav"
      },
      {
        "name": "SideNavItem",
        "label": "Side Nav Item",
        "slug": "side-nav-item",
        "href": "/design/composants/navigation/side-nav-item",
        "dressed": false,
        "parent": "SideNav",
        "doc": "side-nav"
      },
      {
        "name": "SideNavSection",
        "label": "Side Nav Section",
        "slug": "side-nav-section",
        "href": "/design/composants/navigation/side-nav-section",
        "dressed": false,
        "parent": "SideNav",
        "doc": "side-nav"
      },
      {
        "name": "Step",
        "label": "Step",
        "slug": "step",
        "href": "/design/composants/navigation/step",
        "dressed": false,
        "parent": "Stepper",
        "doc": "stepper"
      },
      {
        "name": "Stepper",
        "label": "Stepper",
        "slug": "stepper",
        "href": "/design/composants/navigation/stepper",
        "dressed": false,
        "parent": null,
        "doc": "stepper"
      },
      {
        "name": "Tab",
        "label": "Tab",
        "slug": "tab",
        "href": "/design/composants/navigation/tab",
        "dressed": false,
        "parent": "TabList",
        "doc": "tab-list"
      },
      {
        "name": "TabList",
        "label": "Tab List",
        "slug": "tab-list",
        "href": "/design/composants/navigation/tab-list",
        "dressed": false,
        "parent": null,
        "doc": "tab-list"
      },
      {
        "name": "TabMenu",
        "label": "Tab Menu",
        "slug": "tab-menu",
        "href": "/design/composants/navigation/tab-menu",
        "dressed": false,
        "parent": "TabList",
        "doc": "tab-list"
      },
      {
        "name": "TopNav",
        "label": "Top Nav",
        "slug": "top-nav",
        "href": "/design/composants/navigation/top-nav",
        "dressed": false,
        "parent": null,
        "doc": "top-nav"
      },
      {
        "name": "TopNavHeading",
        "label": "Top Nav Heading",
        "slug": "top-nav-heading",
        "href": "/design/composants/navigation/top-nav-heading",
        "dressed": false,
        "parent": "TopNav",
        "doc": "top-nav"
      },
      {
        "name": "TopNavItem",
        "label": "Top Nav Item",
        "slug": "top-nav-item",
        "href": "/design/composants/navigation/top-nav-item",
        "dressed": false,
        "parent": "TopNav",
        "doc": "top-nav"
      },
      {
        "name": "TopNavMegaMenu",
        "label": "Top Nav Mega Menu",
        "slug": "top-nav-mega-menu",
        "href": "/design/composants/navigation/top-nav-mega-menu",
        "dressed": false,
        "parent": "TopNav",
        "doc": "top-nav"
      },
      {
        "name": "TopNavMegaMenuFeaturedCard",
        "label": "Top Nav Mega Menu Featured Card",
        "slug": "top-nav-mega-menu-featured-card",
        "href": "/design/composants/navigation/top-nav-mega-menu-featured-card",
        "dressed": false,
        "parent": "TopNavMegaMenu",
        "doc": "top-nav-mega-menu"
      },
      {
        "name": "TopNavMegaMenuItem",
        "label": "Top Nav Mega Menu Item",
        "slug": "top-nav-mega-menu-item",
        "href": "/design/composants/navigation/top-nav-mega-menu-item",
        "dressed": false,
        "parent": "TopNavMegaMenu",
        "doc": "top-nav-mega-menu"
      },
      {
        "name": "TopNavMenu",
        "label": "Top Nav Menu",
        "slug": "top-nav-menu",
        "href": "/design/composants/navigation/top-nav-menu",
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
    "href": "/design/composants/surcouches",
    "items": [
      {
        "name": "BottomSheet",
        "label": "Bottom Sheet",
        "slug": "bottom-sheet",
        "href": "/design/composants/surcouches/bottom-sheet",
        "dressed": false,
        "parent": null,
        "doc": "bottom-sheet"
      },
      {
        "name": "BottomSheetSwitcher",
        "label": "Bottom Sheet Switcher",
        "slug": "bottom-sheet-switcher",
        "href": "/design/composants/surcouches/bottom-sheet-switcher",
        "dressed": false,
        "parent": null,
        "doc": "bottom-sheet-switcher"
      },
      {
        "name": "CommandPalette",
        "label": "Command Palette",
        "slug": "command-palette",
        "href": "/design/composants/surcouches/command-palette",
        "dressed": false,
        "parent": null,
        "doc": "command-palette"
      },
      {
        "name": "CommandPaletteEmpty",
        "label": "Command Palette Empty",
        "slug": "command-palette-empty",
        "href": "/design/composants/surcouches/command-palette-empty",
        "dressed": false,
        "parent": "CommandPalette",
        "doc": "command-palette"
      },
      {
        "name": "CommandPaletteFooter",
        "label": "Command Palette Footer",
        "slug": "command-palette-footer",
        "href": "/design/composants/surcouches/command-palette-footer",
        "dressed": false,
        "parent": "CommandPalette",
        "doc": "command-palette"
      },
      {
        "name": "CommandPaletteGroup",
        "label": "Command Palette Group",
        "slug": "command-palette-group",
        "href": "/design/composants/surcouches/command-palette-group",
        "dressed": false,
        "parent": "CommandPalette",
        "doc": "command-palette"
      },
      {
        "name": "CommandPaletteInput",
        "label": "Command Palette Input",
        "slug": "command-palette-input",
        "href": "/design/composants/surcouches/command-palette-input",
        "dressed": false,
        "parent": "CommandPalette",
        "doc": "command-palette"
      },
      {
        "name": "CommandPaletteItem",
        "label": "Command Palette Item",
        "slug": "command-palette-item",
        "href": "/design/composants/surcouches/command-palette-item",
        "dressed": false,
        "parent": "CommandPalette",
        "doc": "command-palette"
      },
      {
        "name": "CommandPaletteList",
        "label": "Command Palette List",
        "slug": "command-palette-list",
        "href": "/design/composants/surcouches/command-palette-list",
        "dressed": false,
        "parent": "CommandPalette",
        "doc": "command-palette"
      },
      {
        "name": "ContextMenu",
        "label": "Context Menu",
        "slug": "context-menu",
        "href": "/design/composants/surcouches/context-menu",
        "dressed": false,
        "parent": null,
        "doc": "context-menu"
      },
      {
        "name": "ContextMenuItem",
        "label": "Context Menu Item",
        "slug": "context-menu-item",
        "href": "/design/composants/surcouches/context-menu-item",
        "dressed": false,
        "parent": "ContextMenu",
        "doc": "context-menu"
      },
      {
        "name": "Dialog",
        "label": "Dialog",
        "slug": "dialog",
        "href": "/design/composants/surcouches/dialog",
        "dressed": true,
        "parent": null,
        "doc": "dialog"
      },
      {
        "name": "DialogHeader",
        "label": "Dialog Header",
        "slug": "dialog-header",
        "href": "/design/composants/surcouches/dialog-header",
        "dressed": false,
        "parent": "Dialog",
        "doc": "dialog"
      },
      {
        "name": "HoverCard",
        "label": "Hover Card",
        "slug": "hover-card",
        "href": "/design/composants/surcouches/hover-card",
        "dressed": false,
        "parent": null,
        "doc": "hover-card"
      },
      {
        "name": "Lightbox",
        "label": "Lightbox",
        "slug": "lightbox",
        "href": "/design/composants/surcouches/lightbox",
        "dressed": false,
        "parent": null,
        "doc": "lightbox"
      },
      {
        "name": "Overlay",
        "label": "Overlay",
        "slug": "overlay",
        "href": "/design/composants/surcouches/overlay",
        "dressed": false,
        "parent": null,
        "doc": "overlay"
      },
      {
        "name": "Popover",
        "label": "Popover",
        "slug": "popover",
        "href": "/design/composants/surcouches/popover",
        "dressed": false,
        "parent": null,
        "doc": "popover"
      },
      {
        "name": "Tooltip",
        "label": "Tooltip",
        "slug": "tooltip",
        "href": "/design/composants/surcouches/tooltip",
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
    "href": "/design/composants/tables-listes",
    "items": [
      {
        "name": "Item",
        "label": "Item",
        "slug": "item",
        "href": "/design/composants/tables-listes/item",
        "dressed": false,
        "parent": null,
        "doc": "item"
      },
      {
        "name": "List",
        "label": "List",
        "slug": "list",
        "href": "/design/composants/tables-listes/list",
        "dressed": false,
        "parent": null,
        "doc": "list"
      },
      {
        "name": "ListItem",
        "label": "List Item",
        "slug": "list-item",
        "href": "/design/composants/tables-listes/list-item",
        "dressed": false,
        "parent": "List",
        "doc": "list"
      },
      {
        "name": "MetadataList",
        "label": "Metadata List",
        "slug": "metadata-list",
        "href": "/design/composants/tables-listes/metadata-list",
        "dressed": false,
        "parent": null,
        "doc": "metadata-list"
      },
      {
        "name": "MetadataListItem",
        "label": "Metadata List Item",
        "slug": "metadata-list-item",
        "href": "/design/composants/tables-listes/metadata-list-item",
        "dressed": false,
        "parent": "MetadataList",
        "doc": "metadata-list"
      },
      {
        "name": "OverflowList",
        "label": "Overflow List",
        "slug": "overflow-list",
        "href": "/design/composants/tables-listes/overflow-list",
        "dressed": false,
        "parent": null,
        "doc": "overflow-list"
      },
      {
        "name": "Table",
        "label": "Table",
        "slug": "table",
        "href": "/design/composants/tables-listes/table",
        "dressed": false,
        "parent": null,
        "doc": "table"
      },
      {
        "name": "TreeList",
        "label": "Tree List",
        "slug": "tree-list",
        "href": "/design/composants/tables-listes/tree-list",
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
    "href": "/design/composants/utilitaires",
    "items": [
      {
        "name": "Theme",
        "label": "Theme",
        "slug": "theme",
        "href": "/design/composants/utilitaires/theme",
        "dressed": false,
        "parent": null,
        "doc": "theme"
      },
      {
        "name": "MediaTheme",
        "label": "Media Theme",
        "slug": "media-theme",
        "href": "/design/composants/utilitaires/media-theme",
        "dressed": false,
        "parent": null,
        "doc": "media-theme"
      },
      {
        "name": "SyntaxTheme",
        "label": "Syntax Theme",
        "slug": "syntax-theme",
        "href": "/design/composants/utilitaires/syntax-theme",
        "dressed": false,
        "parent": null,
        "doc": "syntax-theme"
      },
      {
        "name": "VisuallyHidden",
        "label": "Visually Hidden",
        "slug": "visually-hidden",
        "href": "/design/composants/utilitaires/visually-hidden",
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
    "href": "/design/composants/chat",
    "items": [
      {
        "name": "ChatLayout",
        "label": "Chat Layout",
        "slug": "chat-layout",
        "href": "/design/composants/chat/chat-layout",
        "dressed": false,
        "parent": null,
        "doc": "chat-layout"
      },
      {
        "name": "ChatComposer",
        "label": "Chat Composer",
        "slug": "chat-composer",
        "href": "/design/composants/chat/chat-composer",
        "dressed": false,
        "parent": null,
        "doc": "chat-composer"
      },
      {
        "name": "ChatComposerDrawer",
        "label": "Chat Composer Drawer",
        "slug": "chat-composer-drawer",
        "href": "/design/composants/chat/chat-composer-drawer",
        "dressed": false,
        "parent": "ChatComposer",
        "doc": "chat-composer"
      },
      {
        "name": "ChatComposerInput",
        "label": "Chat Composer Input",
        "slug": "chat-composer-input",
        "href": "/design/composants/chat/chat-composer-input",
        "dressed": false,
        "parent": "ChatComposer",
        "doc": "chat-composer"
      },
      {
        "name": "ChatDictationButton",
        "label": "Chat Dictation Button",
        "slug": "chat-dictation-button",
        "href": "/design/composants/chat/chat-dictation-button",
        "dressed": false,
        "parent": "ChatComposer",
        "doc": "chat-composer"
      },
      {
        "name": "ChatMessage",
        "label": "Chat Message",
        "slug": "chat-message",
        "href": "/design/composants/chat/chat-message",
        "dressed": false,
        "parent": null,
        "doc": "chat-message"
      },
      {
        "name": "ChatMessageBubble",
        "label": "Chat Message Bubble",
        "slug": "chat-message-bubble",
        "href": "/design/composants/chat/chat-message-bubble",
        "dressed": false,
        "parent": "ChatMessage",
        "doc": "chat-message"
      },
      {
        "name": "ChatMessageList",
        "label": "Chat Message List",
        "slug": "chat-message-list",
        "href": "/design/composants/chat/chat-message-list",
        "dressed": false,
        "parent": null,
        "doc": "chat-message-list"
      },
      {
        "name": "ChatMessageMetadata",
        "label": "Chat Message Metadata",
        "slug": "chat-message-metadata",
        "href": "/design/composants/chat/chat-message-metadata",
        "dressed": false,
        "parent": "ChatMessage",
        "doc": "chat-message"
      },
      {
        "name": "ChatSendButton",
        "label": "Chat Send Button",
        "slug": "chat-send-button",
        "href": "/design/composants/chat/chat-send-button",
        "dressed": false,
        "parent": "ChatComposer",
        "doc": "chat-composer"
      },
      {
        "name": "ChatSystemMessage",
        "label": "Chat System Message",
        "slug": "chat-system-message",
        "href": "/design/composants/chat/chat-system-message",
        "dressed": false,
        "parent": null,
        "doc": "chat-system-message"
      },
      {
        "name": "ChatTokenizedText",
        "label": "Chat Tokenized Text",
        "slug": "chat-tokenized-text",
        "href": "/design/composants/chat/chat-tokenized-text",
        "dressed": false,
        "parent": "ChatMessage",
        "doc": "chat-message"
      },
      {
        "name": "ChatToolCalls",
        "label": "Chat Tool Calls",
        "slug": "chat-tool-calls",
        "href": "/design/composants/chat/chat-tool-calls",
        "dressed": false,
        "parent": null,
        "doc": "chat-tool-calls"
      }
    ]
  }
];
