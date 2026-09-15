# Admin languages

The Payload admin is available in **French** and **English**. A selector in the header, next to the content language selector, switches the interface language. The choice is stored per browser in Payload's language cookie.

Two languages must not be confused:

| Selector | What it changes | Configured in |
|---|---|---|
| **Interface** | Buttons, menus, field labels, help texts, validation messages | `src/i18n/admin/` |
| **Langue du contenu** / **Content language** | Which translation of a page is edited (fr, en, de, es) | `localization` in `src/payload.config.ts` |

They are independent: an editor can edit the German version of a page with the admin in English.

## How it works

- `src/i18n/admin/languages.ts` lists the admin languages and defines two types:
  - `Text`: one string per language, for example `{fr: 'Nom', en: 'Name'}`.
  - `Message<P>`: one function per language, for texts built from values. Each language keeps its own grammar (French agreement, English plurals).
- Dictionaries live next to it, one file per area: `collections.ts`, `fields.ts`, `globals.ts`, `blocks.ts`, `sections.ts`. They are declared with `texts()`, which checks that every entry has every language.
- `src/i18n/admin/payload.ts` gives Payload its own translations for each language (buttons, list views, account) and renames its content selector.
- `src/i18n/admin/LanguageSwitcher.tsx` is the header selector.

## Writing admin texts

Payload accepts a `Text` object wherever it accepts a label:

```ts
import {categoriesText} from '@/i18n/admin/collections';

{name: 'title', type: 'text', label: categoriesText.fields.title}
```

This covers `label`, `labels`, `admin.description`, `admin.group`, option labels, tabs and collapsibles.

Validation messages and hook errors use the request language:

```ts
import {tr} from '@/i18n/admin/languages';

validate: (value, {req}) => isValid(value) || tr(sectionsText.validation.anchor, req.i18n?.language)
```

Custom client components use the hook:

```tsx
const {t} = useAdminText();
t(sectionsText.builder.cellEmptyTitle);
t(sectionsText.confirm.removeBody, {columns: 3, filled: 1});
```

A label read from the Payload config inside a component (`field.label`, an option label) can be an object. Resolve it with `getTranslation(label, i18n)` from `@payloadcms/translations`.

Rules:

- Never put a French or English string directly in admin code: add an entry to the dictionary.
- Site content (default texts, seeds) is not part of the admin and is not translated here.
- Labels are not stored in the database, so adding or changing a text never needs a migration.

## Adding a language

1. Add its code and native name to `ADMIN_LANGUAGES` in `src/i18n/admin/languages.ts`.
2. Import Payload's translation for it in `src/i18n/admin/payload.ts` (`@payloadcms/translations/languages/<code>`) and add it to `supportedLanguages` and `translations`.
3. Run `pnpm exec tsc --noEmit`. Every dictionary entry missing the new language is reported. Translate them all.
4. Run `pnpm generate:importmap` if admin components changed, then check the admin in the new language.
