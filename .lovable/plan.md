

# Technical Upgrade: PDF Generation, Email Notifications, CMS & Navigation

## Overview

Four major features to implement: PDF quote generation with email sending, new inquiry notification emails, a CMS for blog articles in the Admin Panel, and a "Back to Website" navigation button.

## 1. PDF Generation & Email Sending

### Approach
Create a `generate-quote-pdf` edge function that renders the quote data into a PDF using a lightweight HTML-to-PDF approach (jsPDF or similar via Deno-compatible libraries). Add a `send-quote-email` edge function that uses the Resend email API to send the PDF to clients.

### What needs to happen
- **Edge function `generate-quote-pdf`**: Accepts quote ID, fetches quote + inquiry data server-side, generates a professional PDF with company logo, client details, line items, totals, terms. Returns the PDF as a downloadable blob.
- **Edge function `send-quote-email`**: Accepts quote ID, generates/fetches the PDF, sends it as an email attachment to the client. Updates the quote status to "sent" and sets `sent_at`.
- **QuoteEditorPage.tsx**: Add two new buttons in the preview mode -- "Download PDF" and "Send to Client via Email".
- **API key requirement**: An email service API key (Resend) will be needed. Will prompt for this secret before implementing the email function.

### PDF Content
- Company logo and contact info (header)
- Quote number and date
- Client name, email, phone
- Line items table (description, qty, unit, unit price, total)
- Subtotal, discount, grand total
- Terms and conditions
- Validity period

## 2. New Inquiry Notification (Edge Function)

### Approach
Create a `send-inquiry-notification` edge function that is called from the frontend after a successful inquiry submission.

### What needs to happen
- **Edge function `send-inquiry-notification`**: Triggered after inquiry insert. Sends an email to the administrator with the client's name, service type, phone, and email.
- **MultiStepInquiryForm.tsx**: After successful insert, call this edge function.
- Uses the same Resend API key as the quote email function.

## 3. Content Management System (CMS)

### Database Changes
- Create new `articles` table:
  - `id` (uuid)
  - `title` (text)
  - `slug` (text, unique) -- for SEO-friendly URLs
  - `content` (text) -- Markdown/HTML content from rich text editor
  - `excerpt` (text) -- short description
  - `cover_image_url` (text, nullable) -- stored in a new `article-images` storage bucket
  - `category` (text)
  - `tags` (text array)
  - `published` (boolean, default false)
  - `author_id` (uuid, FK to auth.users)
  - `created_at`, `updated_at`, `published_at`
- RLS: Admin/staff can CRUD, public can SELECT where `published = true`
- Storage bucket `article-images` for image uploads within articles

### Admin Panel Changes
- **New sidebar nav item**: "Статии" (Articles) with a `Newspaper` icon
- **ArticleListPage**: Table of all articles with title, status (draft/published), date, edit/delete actions
- **ArticleEditorPage**: Rich text editor with:
  - Title input
  - Cover image upload
  - Category and tags
  - Rich text body using `react-markdown` for rendering and a textarea with Markdown support (or a simple toolbar for bold, italic, links, images)
  - Hyperlink insertion (for SEO link-building)
  - Publish/unpublish toggle
  - SEO preview (slug, meta description)

### Public Blog Page Changes
- **BlogPage.tsx**: Fetch articles from the `articles` table (where `published = true`) instead of hardcoded data. Keep the existing hardcoded articles as fallback alongside dynamic ones.
- **Dynamic article route**: `/blog/:slug` renders content from the database with proper SEO meta tags, schema markup, and styling consistent with existing blog articles.

### Routes
| Route | Component | Access |
|-------|-----------|--------|
| `/admin/articles` | ArticleListPage | Admin/Staff |
| `/admin/articles/new` | ArticleEditorPage | Admin/Staff |
| `/admin/articles/:id/edit` | ArticleEditorPage | Admin/Staff |

## 4. "Back to Website" Button

### What needs to happen
- **AdminDashboardPage.tsx**: Add an `ExternalLink` icon-link in the sidebar (below the logo area or above the sign-out section) that links to `/` (the public homepage). Also add it to the mobile header.

## Implementation Sequence

1. **Database migration**: Create `articles` table, `article-images` storage bucket, and RLS policies
2. **Admin navigation**: Add "Back to Website" link and "Статии" nav item to sidebar
3. **CMS pages**: ArticleListPage and ArticleEditorPage with image uploads and Markdown editor
4. **Public blog update**: Fetch dynamic articles alongside hardcoded ones
5. **Prompt for Resend API key**: Required for email features
6. **Edge functions**: `generate-quote-pdf`, `send-quote-email`, `send-inquiry-notification`
7. **Quote page updates**: Add PDF download and email send buttons

## Technical Notes

- PDF generation will use HTML string rendering converted to PDF in the edge function
- Email sending requires a **Resend API key** -- will ask for this during implementation
- The rich text editor will use Markdown with a preview, leveraging the already-installed `react-markdown` package
- Image uploads for articles will use a dedicated storage bucket with public read access
- All new admin routes are protected by the existing `ProtectedRoute` wrapper
- SEO: Dynamic articles will include proper `Helmet` meta tags, Open Graph data, and JSON-LD schema markup

