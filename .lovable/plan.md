

# Advanced PDF Engine & Modular Document Generator

## Overview

Complete redesign of the Quote (Offer) and Contract PDF system to match the professional multi-page document sample provided. The system will feature modular, editable text blocks in the admin panel, a sophisticated print-to-PDF layout with sidebars, headers/footers, and page numbering, plus photo gallery support.

---

## 1. Database Changes

Add new columns to the `quotes` table to store the modular content sections:

- `work_description` (text) -- "Work Project" description
- `work_phases` (text) -- "First Step / Implementation Priorities" narrative
- `invoicing_schedule` (text) -- payment stages (30%, 50%, 80%, 100%)
- `warranty_text` (text) -- warranty clause (default 10 years)
- `force_majeure` (text) -- force majeure clause
- `technical_notes` (text) -- technical logic descriptions
- `manual_additions` (text) -- free-form additional notes
- `photo_urls` (text array) -- URLs of uploaded project photos for the gallery section

These are all nullable with sensible defaults so existing quotes remain valid.

---

## 2. Admin Panel: Modular Quote Editor (QuoteEditorPage.tsx)

Redesign the editor form to have collapsible/accordion sections for each "block":

| Section | Field Type | Default Content |
|---------|-----------|----------------|
| Client Info | Auto-populated inputs | From inquiry |
| Work Project | Textarea | Project description from inquiry |
| Work Phases / Priorities | Textarea | Default construction sequence text |
| Line Items Table | Current table editor | Existing functionality |
| Invoicing Schedule | Textarea | 30% advance, 50%, 80%, 100% stages |
| Warranty | Textarea | 10-year installation warranty |
| Force Majeure | Textarea | Weather/external delays clause |
| Technical Notes | Textarea | Why certain steps come first |
| Terms & Conditions | Textarea (existing) | Current terms |
| Manual Additions | Textarea | Empty -- for one-off notes |
| Photo Gallery | File upload area | Upload project photos |

Each section is collapsible using the existing Accordion component. All text blocks come pre-populated with professional Bulgarian default text but are fully editable per quote.

---

## 3. PDF Visual Design (Matching the Sample)

The `generatePrintableHtml()` function will be completely rewritten to produce a multi-page professional document:

**Page 1 -- Cover / Summary:**
- Header: "Булгар Билд" left, date right, orange underline
- Large "OFFER" title with company logo
- "for construction and installation works" subtitle
- Sidebar-labeled sections: Client, Contractor, Work Project, Work Activities
- Footer: company name + page number

**Page 2+ -- Work Description & Phases:**
- "First Step" section with the editable narrative text
- Implementation priorities and technical logic
- Styled with the cyan/teal sidebar labels from the sample

**Itemized Table Page:**
- Professional table with Description, Price EUR, Notes columns
- Currency displayed in EUR (per project standard)
- Subtotal, discount, total clearly shown
- "Total amount: XXX EUR excluding VAT" statement

**Invoicing & Warranty Pages:**
- Invoicing schedule (30% / 50% / 80% / 100%)
- 10-year warranty clause
- Force majeure section
- Each with colored sidebar labels

**Photo Gallery (Last Page):**
- Grid layout of uploaded project photos
- Captions if provided

**Every Page:**
- Consistent header with "Булгар Билд" branding
- Page number in footer
- Professional gray/cyan sidebars for section titles (CSS `@media print` with `@page` rules)

---

## 4. Offer-to-Contract Conversion

Update `ContractEditorPage.tsx`:

- Add a modular editor matching the quote structure
- Auto-populate ALL fields from the source quote (including work phases, invoicing, warranty, etc.)
- Add a "General Terms" section (legal supplement)
- Add a "Manual Addition" free-text section for one-off agreements
- The contract PDF follows the same professional styling as the offer

---

## 5. Photo Upload for Documents

- Use the existing `inquiry-attachments` storage bucket (or create a `document-photos` bucket) to store project photos
- Add a drag-and-drop upload area in the quote editor
- Store photo URLs in the `photo_urls` array column
- Render photos in a grid in the final PDF

---

## 6. Currency: EUR

All prices in the PDF will display in EUR (per project-wide standard), with "excluding VAT" disclaimer. The line items table header will show "Price EUR" and "Notes" columns.

---

## 7. Sharing (Already Implemented)

The existing Email, WhatsApp, and Viber sharing buttons remain. No changes needed -- they already work on both quotes and contracts.

---

## Implementation Sequence

1. **Database migration** -- Add modular text columns and `photo_urls` to `quotes` table
2. **Quote Editor redesign** -- Accordion-based modular sections with defaults, photo upload
3. **PDF engine rewrite** -- Multi-page professional HTML with sidebars, headers/footers, page numbers
4. **Contract editor update** -- Mirror the modular structure, auto-populate from quote
5. **Contract PDF** -- Same professional styling for contract documents
6. **Testing** -- Verify PDF output matches the sample design

---

## Technical Details

- PDF generation continues using the `iframe.contentWindow.print()` approach (no external libraries needed)
- Multi-page layout achieved with CSS `page-break-before` / `break-before: page` rules
- Sidebar labels implemented with CSS `position: relative` blocks with left-border styling in the accent color
- Page headers/footers use CSS `@page` with `@top-left` / `@bottom-right` or fixed-position elements
- Photo uploads use the Supabase storage client to upload to a public bucket
- All new columns are nullable so existing data is unaffected
- Default text constants defined at the top of the file for easy maintenance

