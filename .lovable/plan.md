

## Fix Language Switcher on Mobile

### Problem
The `LanguageSwitcher` component uses a Radix `DropdownMenu`. Radix renders the dropdown content in a **portal** at the document body level with `z-[70]`. However, the mobile menu is also a portal with:
- Backdrop: `z-[100]`
- Menu panel: `z-[110]`

When you tap the language globe icon on mobile, the language options dropdown appears **behind** the mobile menu overlay and is invisible. This is why language switching appears broken on mobile but works on desktop.

### Solution
Update the `LanguageSwitcher` component's `DropdownMenuContent` to use a higher z-index (`z-[130]`) so it always appears above the mobile menu.

### File to modify
**`src/components/LanguageSwitcher.tsx`** (line 43)
- Change `className="w-48 z-[70]"` to `className="w-48 z-[130]"` on `DropdownMenuContent`

This single line change ensures the language dropdown renders above all other layers (mobile menu backdrop at z-100, panel at z-110, hamburger button at z-120).

