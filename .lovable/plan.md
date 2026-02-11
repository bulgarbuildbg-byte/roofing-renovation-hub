
# CRM Upgrade: Branding, PDF, Contracts, Multi-Channel Sharing

## Overview

This plan covers 6 areas: About Us branding update, address field in inquiry form, true PDF generation, contract generation, Terms & Conditions in quotes, and multi-channel sharing (Email/Viber/WhatsApp).

---

## 1. Branding & "About Us" Update

Update `About.tsx` and `AboutPage.tsx` to reflect the parent company relationship:

- Mention that this roofing site is a specialized subsidiary of **"Bulgari Build EOOD" (България Билд ЕООД)** -- [bulgarbuild.com](https://bulgarbuild.com)
- Highlight that the parent company is fully certified and licensed
- Explain this branch was created for focused roofing expertise, higher quality, and better customer service
- Update the structured data (JSON-LD schema) in AboutPage to include the parent organization

---

## 2. Address Field in Inquiry Form

**Database migration:** Add `address` (text, nullable) column to the `inquiries` table.

**Frontend changes:**
- `MultiStepInquiryForm.tsx`: Add a mandatory "Адрес на обекта" (Project Address) field in Step 1 (contact info), making it required alongside name/phone/email
- `InquiryListPage.tsx`: Add an "Адрес" column to the inquiry table
- `InquiryDetailPage.tsx`: Display the address in the contact info section
- The review step (Step 5) will also show the address

---

## 3. True PDF Generation

The current `generate-quote-pdf` edge function returns HTML. This will be upgraded:

- Use the browser's built-in `window.print()` / CSS `@media print` approach on the frontend to generate a proper PDF from the styled HTML preview
- The edge function will continue generating the HTML template, but the frontend download button will use `window.print()` to save as PDF (or use a lightweight library approach via `iframe.contentWindow.print()`)
- The PDF will include: company logo, company stamp placeholder, client details (including address), line items, totals, terms & conditions, and company legal info

**Alternative approach (more reliable):** Render the HTML in a hidden iframe and trigger `print()` with PDF as the destination. This produces a true static PDF without needing external PDF libraries in Deno.

---

## 4. Contract Generation

**Database migration:** Create a `contracts` table:
- `id` (uuid, PK)
- `quote_id` (uuid, FK to quotes)
- `inquiry_id` (uuid, FK to inquiries)
- `created_by` (uuid)
- `client_name`, `client_address`, `client_phone`, `client_email` (text -- auto-populated from inquiry)
- `total_price` (numeric)
- `material_details` (text)
- `custom_clauses` (text -- editable standard terms)
- `status` (enum: draft, signed, completed)
- `created_at`, `updated_at` (timestamps)
- RLS: Admin/staff only

**New pages:**
- `ContractEditorPage.tsx` -- auto-populates from quote/inquiry data, loads standard company terms as default, allows admin to edit clauses before finalizing
- Route: `/admin/inquiries/:id/contract`

**UI additions:**
- Add a "Генерирай договор" (Generate Contract) button in `InquiryDetailPage.tsx` (visible when a quote exists with "accepted" status)
- The contract editor will have a "Download PDF" button using the same print-to-PDF approach

**Edge function:** `generate-contract-pdf` -- renders contract HTML with all legal sections

---

## 5. Terms, Conditions & Company Info in Quotes

Update the `generate-quote-pdf` edge function and the frontend quote preview to include:
- Full company legal info section (България Билд ЕООД, EIK, address, phone, website)
- Standard Terms & Conditions section with warranty clauses, liability terms, payment conditions
- The terms field in the quote editor will be pre-populated with the full legal template

---

## 6. Multi-Channel Distribution (Email, Viber, WhatsApp)

**Email (requires Resend API key):**
- Create `send-quote-email` and `send-contract-email` edge functions
- Add "Send via Email" button next to PDF downloads
- **A Resend API key is required** -- will prompt for this during implementation

**Viber & WhatsApp:**
- Add sharing buttons that open deep links:
  - WhatsApp: `https://wa.me/{phone}?text={message_with_link}`
  - Viber: `viber://chat?number={phone}&text={message}`
- These will share a pre-formatted message with a link to download the document (stored temporarily or as a generated link)
- Since direct file attachment via deep links is limited, the message will include a link to the quote/contract

**UI:** Add a sharing dropdown/button group next to each PDF download button in the quote and contract editors.

---

## 7. Admin Panel UI Updates

- `InquiryListPage.tsx`: Add "Адрес" column to the table
- `QuoteListPage.tsx`: The "Дата" column already exists; ensure it's clearly labeled
- Search filter in InquiryListPage will also search by address

---

## Implementation Sequence

1. **Database migration** -- Add `address` to inquiries, create `contracts` table and enum
2. **Inquiry form** -- Add address field to MultiStepInquiryForm
3. **About Us** -- Update branding text in About.tsx and AboutPage.tsx
4. **PDF upgrade** -- Rewrite generate-quote-pdf to produce printable HTML, update frontend to use print-to-PDF
5. **Terms template** -- Add full legal terms to quote editor defaults and PDF
6. **Contract system** -- ContractEditorPage, generate-contract-pdf edge function
7. **Admin UI** -- Add address column to tables
8. **Prompt for Resend API key** -- Required for email sending
9. **Email edge functions** -- send-quote-email, send-contract-email
10. **Viber/WhatsApp sharing** -- Deep link buttons

## Technical Notes

- No external PDF library needed -- using browser print-to-PDF for true PDF output
- Contracts table has its own status enum (draft/signed/completed)
- Viber and WhatsApp sharing use native deep links, no API keys needed
- Email functionality requires a **Resend API key** -- will ask before implementing
- All new admin routes protected by existing ProtectedRoute wrapper
- The address field is added as nullable in the DB to avoid breaking existing data, but marked as required in the form going forward
