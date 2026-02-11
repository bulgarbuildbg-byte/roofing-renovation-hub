

# CRM System with Admin Panel and Quote Generator

## Overview

Transform the current simple contact form into a full CRM system with authentication, admin dashboard, inquiry management, and automated quote generation. This is a large feature set that will be built in phases.

## Architecture

### Database Schema

**Tables to create:**

1. **profiles** - User profile data linked to auth
   - `id` (uuid, FK to auth.users)
   - `full_name`, `email`, `phone`
   - `created_at`

2. **user_roles** - Role-based access (admin/staff)
   - `id` (uuid)
   - `user_id` (uuid, FK to auth.users)
   - `role` (enum: admin, staff)

3. **inquiries** - All submitted quote requests
   - `id` (uuid)
   - `name`, `phone`, `email` (contact info)
   - `service_type` (enum: repair, replacement, new_construction, waterproofing, tiles, flat_roof, metal_roof, maintenance, leak_repair, other)
   - `area_sqm` (numeric, approximate area)
   - `preferred_material` (enum: tiles, metal, bitumen, pvc_membrane, shingles, other)
   - `roof_complexity` (enum: single_pitch, gable, hip, complex)
   - `description` (text, additional notes)
   - `status` (enum: new, contacted, quote_sent, accepted, rejected)
   - `assigned_to` (uuid, FK to auth.users, nullable)
   - `created_at`, `updated_at`

4. **inquiry_files** - Uploaded photos/documents per inquiry
   - `id` (uuid)
   - `inquiry_id` (FK to inquiries)
   - `file_url` (text)
   - `file_name`, `file_type`
   - `uploaded_at`

5. **quotes** - Generated quotes linked to inquiries
   - `id` (uuid)
   - `inquiry_id` (FK to inquiries)
   - `created_by` (FK to auth.users)
   - `items` (jsonb - array of line items with description, qty, unit_price)
   - `subtotal`, `discount`, `total` (numeric)
   - `terms` (text)
   - `validity_days` (integer, default 30)
   - `sent_at` (timestamp, nullable)
   - `status` (enum: draft, sent, accepted, rejected)
   - `created_at`, `updated_at`

**Storage bucket:**
- `inquiry-attachments` - for client file uploads (public read for admin)

### Security (RLS)

- **inquiries**: Public INSERT (anyone can submit), SELECT/UPDATE only for authenticated users with admin or staff role
- **inquiry_files**: Public INSERT (tied to inquiry submission), SELECT only for admin/staff
- **quotes**: Full CRUD only for admin/staff
- **profiles**: Users can read/update own profile
- **user_roles**: Read-only for authenticated; managed via security definer functions

### Edge Functions

1. **send-inquiry-notification** - Sends email to admin when new inquiry is submitted
2. **send-quote-email** - Sends the finalized quote to the client via email
3. **generate-quote-pdf** - Generates a PDF version of the quote

## Frontend Pages & Components

### New Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/admin/login` | AdminLogin | Public |
| `/admin` | AdminDashboard | Admin/Staff |
| `/admin/inquiries` | InquiryList | Admin/Staff |
| `/admin/inquiries/:id` | InquiryDetail | Admin/Staff |
| `/admin/inquiries/:id/quote` | QuoteEditor | Admin/Staff |
| `/admin/staff` | StaffManagement | Admin only |

### Enhanced Quote Request Form (Public)

Replace `QuickContactForm` with a multi-step form:

- **Step 1**: Contact Info (name, phone, email)
- **Step 2**: Service type selection with radio buttons
- **Step 3**: Technical details (area, material, roof complexity)
- **Step 4**: File uploads (photos, sketches) + additional notes
- **Step 5**: Review and submit

### Admin Dashboard

- **Sidebar navigation**: Inbox, Quotes, Staff (admin only)
- **Inquiry list**: Table with columns for date, name, service, status, assigned to
- **Filters**: By status, date range, service type
- **Status pipeline**: Kanban-style or dropdown status updates (New -> Contacted -> Quote Sent -> Accepted/Rejected)

### Inquiry Detail View

- Full client info display
- Attached files gallery with download
- Status change dropdown
- Assign to staff member
- "Create Quote" button
- Activity timeline (status changes)

### Quote Editor

- Auto-fills client name and email from inquiry
- Company header with logo
- Editable line items table (description, quantity, unit, price)
- Auto-calculated subtotal and total
- Discount field
- Terms and conditions text area
- Validity period
- Preview mode (professional document layout)
- "Send via Email" button
- "Download PDF" button

## Implementation Phases

### Phase 1: Database & Auth
- Create all database tables, enums, RLS policies, and helper functions
- Create storage bucket for file uploads
- Build login page for admin/staff
- Auth context and protected route wrapper
- Seed first admin user

### Phase 2: Enhanced Quote Request Form
- Build multi-step form component
- File upload to storage bucket
- Save inquiry to database
- Trigger email notification edge function

### Phase 3: Admin Dashboard & Inquiry Management
- Admin layout with sidebar
- Inquiry list with filtering and sorting
- Inquiry detail view with status management
- File viewing and download

### Phase 4: Quote Generator
- Quote editor with line items
- Professional quote template/preview
- Send quote via email edge function
- PDF generation
- Quote status tracking

### Phase 5: Staff Management (Admin only)
- Add/remove staff users
- View staff list
- Role management

## Technical Notes

- Authentication uses Lovable Cloud's built-in auth system
- Email sending will use an edge function (will need an email service API key like Resend or similar)
- PDF generation will be done server-side in an edge function
- File uploads use Lovable Cloud storage buckets
- All admin routes are protected with role-based access checks
- The existing public website remains unchanged except for the enhanced contact form

