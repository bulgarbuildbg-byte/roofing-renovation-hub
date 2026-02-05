

# Fix: ChatBot Not Visible on Mobile

## Problem

The ChatBot floating button is hidden behind the `MobileBottomBar` on mobile devices.

**Current positioning:**
- ChatBot button: `bottom-6` (24px from bottom) on all screen sizes
- MobileBottomBar: Covers ~80px at bottom on mobile (h-14 buttons + p-3 padding)

The chat button is rendered but sits behind the MobileBottomBar, making it invisible.

## Solution

Adjust the ChatBot button positioning to account for the MobileBottomBar on mobile:

**Change in `src/components/ChatBot.tsx` (line 57):**

| Current | Fixed |
|---------|-------|
| `bottom-6 left-6 md:bottom-6 md:left-6` | `bottom-24 left-4 md:bottom-6 md:left-6` |

This positions the chat button:
- **Mobile**: 96px from bottom (above the MobileBottomBar)
- **Desktop**: 24px from bottom (no change)

## File to Modify

| File | Change |
|------|--------|
| `src/components/ChatBot.tsx` | Update button positioning from `bottom-6` to `bottom-24` on mobile |

## Code Change

```tsx
// Line 56-58: Change positioning classes
className={cn(
  "fixed z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105",
  "bottom-24 left-4 md:bottom-6 md:left-6",  // <-- Updated
  isOpen && "hidden"
)}
```

