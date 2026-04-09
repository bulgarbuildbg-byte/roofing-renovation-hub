

## Add Starting Prices to Service Cards

### Summary
Add a pricing line and disclaimer note to each service card in `src/components/Services.tsx`. No layout, design, or structural changes — only insert two new text elements per card.

### What changes

**1. Add a `price` field to the `serviceKeys` array**

Each service gets a price string (only 4 services have prices per the request; the remaining 4 — leak repair, tile replacement, flat roof, maintenance — were not listed, so they won't show a price line):

| Service | Price |
|---|---|
| roofRepair | €13 / m² |
| waterproofing | €8 / m² |
| newRoof | €28 / m² |
| metalRoof | €6 / m² |
| leakRepair | *(none)* |
| tileReplacement | *(none)* |
| flatRoof | *(none)* |
| maintenance | *(none)* |

**2. Add i18n keys to all 10 locale files**

New keys under `services`:
- `startingFrom`: "Starting from" (translated per locale, e.g. BG: "От")
- `priceNote`: "Final price is determined after on-site inspection." (translated per locale)

**3. Insert pricing line in card — between title (h3) and problem text**

```
<h3>Roof Repair</h3>
+ <p className="text-primary font-bold text-sm mb-2">От €13 / m²</p>   ← NEW
<p className="text-accent ...">problem text</p>
```

Only rendered when the service has a `price` value.

**4. Insert disclaimer note — below the benefits line, above the button**

```
<p>✓ benefits</p>
+ <p className="text-muted-foreground text-xs mb-3 italic">priceNote</p>  ← NEW
<Button>Free Quote</Button>
```

Only rendered when the service has a `price` value.

### Files

| File | Change |
|---|---|
| `src/components/Services.tsx` | Add `price` to serviceKeys, render price line + note |
| `src/i18n/locales/bg.ts` | Add `startingFrom` + `priceNote` keys |
| `src/i18n/locales/en.ts` | Same |
| `src/i18n/locales/de.ts` | Same |
| `src/i18n/locales/fr.ts` | Same |
| `src/i18n/locales/nl.ts` | Same |
| `src/i18n/locales/sv.ts` | Same |
| `src/i18n/locales/no.ts` | Same |
| `src/i18n/locales/fi.ts` | Same |
| `src/i18n/locales/ru.ts` | Same |
| `src/i18n/locales/ua.ts` | Same |

