
## Fix Tablet Layout and Add Language Switcher to Bottom Bar

### Problems Identified
1. **Tablet (768-1024px)**: The desktop nav is displayed but overflows -- nav links wrap awkwardly, CTA buttons and language switcher get cut off on the right side.
2. **No language switcher on mobile/tablet bottom bar**: Users on phones and tablets cannot easily switch language without opening the hamburger menu.

### Changes

#### 1. Extend the mobile breakpoint to include tablets (`src/components/Header.tsx`)
- Change the desktop nav from `md:flex` (768px) to `lg:flex` (1024px)
- Change mobile controls from `md:hidden` to `lg:hidden`
- Change mobile menu from `md:hidden` to `lg:hidden`
- This means phones AND tablets will get the mobile-style layout (hamburger menu + bottom bar)

#### 2. Update `src/components/MobileBottomBar.tsx`
- Change visibility from `md:hidden` to `lg:hidden` so it shows on tablets too
- Add a compact language switcher button alongside the Call and Free Inspection buttons
- The language button will be a small globe icon that opens the language dropdown
- Layout: three buttons in a row -- Language (small), Call (flex), Free Inspection (flex)

#### 3. Update `src/components/FloatingCallButton.tsx`
- If it uses `md:hidden` or similar breakpoints, update to `lg:hidden` for consistency

### Technical Details

**MobileBottomBar new layout:**
```
[Globe/Lang] [   Call   ] [ Free Inspection ]
```
- The language button is compact (icon + 2-letter code like "BG")
- Uses the same LanguageSwitcher dropdown but triggered from a smaller button
- The bottom bar will be visible below 1024px (phones + tablets)

**Header nav breakpoint changes:**
- `md:hidden` becomes `lg:hidden` (mobile controls)
- `hidden md:flex` becomes `hidden lg:flex` (desktop nav)
- Mobile menu portal `md:hidden` becomes `lg:hidden`

**Files to modify:**
- `src/components/Header.tsx` -- change breakpoints from `md` to `lg`
- `src/components/MobileBottomBar.tsx` -- change breakpoint + add language switcher button
- `src/components/FloatingCallButton.tsx` -- update breakpoint if needed
