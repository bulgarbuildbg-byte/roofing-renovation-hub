
# Plan: Move ChatBot to Bottom-Right Corner

## Problem
The chatbot button is currently in the **bottom-LEFT** corner, which is less visible and unconventional. Most chat widgets appear in the bottom-right corner where users expect them.

## Solution
Move the chatbot button to the **bottom-RIGHT** corner of the screen.

### Positioning Strategy

| Device | Current Position | New Position |
|--------|-----------------|--------------|
| Mobile | bottom-24 left-4 | bottom-24 right-4 |
| Desktop | bottom-6 left-6 | bottom-24 right-6 |

On desktop, the chatbot will sit above the FloatingCallButton (which is at bottom-6 right-6).

## File to Modify

| File | Change |
|------|--------|
| `src/components/ChatBot.tsx` | Change `left-4`/`left-6` to `right-4`/`right-6` |

## Code Change

```tsx
// Line 56-58: Change from left to right positioning
className={cn(
  "fixed z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105",
  "bottom-24 right-4 md:bottom-24 md:right-6",  // Changed left → right
  isOpen && "hidden"
)}
```

## Result
- Chat button appears in bottom-right corner (standard UX pattern)
- Mobile: 96px from bottom, 16px from right (above MobileBottomBar)
- Desktop: 96px from bottom, 24px from right (above FloatingCallButton)
