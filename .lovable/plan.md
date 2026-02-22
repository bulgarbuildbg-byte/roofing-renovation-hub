

## Integrate Language Switcher and Multilingual Routing

The multilingual infrastructure (i18n config, translation files, LanguageSwitcher, LanguageLayout, LanguageRedirect, HreflangTags) was created but never wired into the actual app. Two things are missing:

1. **The routing in App.tsx still uses old hard-coded Bulgarian paths** -- no `/:lang/*` wrapper exists
2. **The Header doesn't include the LanguageSwitcher component**

### Changes Required

#### 1. Update `src/App.tsx` -- Add language-prefixed routing

- Add a `/:lang/*` route that wraps all public pages inside `LanguageLayout`
- Keep `/` as root, rendering `LanguageRedirect` (auto-detects language and redirects to `/:lang`)
- Keep old Bulgarian paths as redirects to `/bg/...` for backward compatibility
- Admin routes stay unchanged (no language prefix)
- Each public page maps to its localized slug under `/:lang/`

#### 2. Update `src/components/Header.tsx` -- Add LanguageSwitcher

- Import and render `LanguageSwitcher` in the desktop nav (next to the phone button / login icon)
- Add `LanguageSwitcher` in the mobile menu as well
- Update all nav links to use localized paths (via `useLocalizedPath` hook) so they adapt to the current language
- Update the services dropdown links to use localized slugs

#### 3. Update page components to use translations

- Update `Header.tsx` nav labels to use `useTranslation()` (`t('nav.services')`, `t('nav.about')`, etc.)
- This ensures the navigation text matches the selected language

### Technical Details

**Routing structure after changes:**

```text
/                          --> LanguageRedirect (detect + redirect to /:lang)
/:lang                     --> LanguageLayout > Index
/:lang/roof-repair-varna   --> LanguageLayout > RoofRepairPage (English)
/:lang/dachreparatur-varna --> LanguageLayout > RoofRepairPage (German)
/:lang/*slug               --> LanguageLayout > matched page per slug lookup
/admin/*                   --> unchanged (no language prefix)
```

**Slug matching approach:** Instead of hard-coding every slug for every language as separate routes, use a single wildcard `/:lang/*` route inside LanguageLayout that resolves the slug to the correct page component using `localizedSlugs` from `src/i18n/routes.ts`.

**Files to modify:**
- `src/App.tsx` -- restructure routing with `LanguageLayout` wrapper
- `src/components/Header.tsx` -- add LanguageSwitcher, use translated labels and localized links

**Files already created (no changes needed):**
- `src/components/LanguageSwitcher.tsx`
- `src/components/LanguageLayout.tsx`
- `src/components/LanguageRedirect.tsx`
- `src/components/HreflangTags.tsx`
- `src/hooks/useLocalizedPath.ts`
- `src/i18n/config.ts`, `src/i18n/routes.ts`, all locale files

