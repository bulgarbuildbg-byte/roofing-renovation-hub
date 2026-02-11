

# Plan: Add Login Button to Navigation and Create Admin Account

## What will be done

1. **Add a "Вход за екип" (Staff Login) link to the navigation menu** -- both desktop and mobile versions in `Header.tsx`. It will use a subtle style (like a `LogIn` icon) so it doesn't distract regular customers but is accessible to staff.

2. **Create the first Administrator account** via a database migration that:
   - Creates the user in Supabase Auth with email `zhekoviliya@gmail.com` and password `Zhekov01`
   - Inserts their profile into the `profiles` table
   - Assigns them the `admin` role in the `user_roles` table

3. **Enable auto-confirm for this signup** so the admin account is immediately usable without email verification (then disable it again after).

## Changes

### 1. Header.tsx -- Add login link

**Desktop navigation:** Add a small `LogIn` icon-button linking to `/admin/login` after the phone button.

**Mobile menu:** Add a "Вход за екип" link at the bottom of the menu items list.

### 2. Database migration -- Create admin user

A migration will use `supabase.auth.admin` API via an edge function to create the user, since SQL migrations cannot directly create auth users. Instead, we will:

- Create a **one-time edge function** `create-admin` that:
  1. Signs up the user with the provided credentials
  2. Inserts the profile
  3. Assigns the admin role
- Call it once to seed the account, then it can be removed

**Alternative (simpler):** Use the Supabase Auth admin API to create the user directly via the existing auth system, and a SQL migration to insert the role.

### 3. Auth config

Temporarily enable auto-confirm so the admin account can be created and used immediately.

## Technical Details

**Files to modify:**
- `src/components/Header.tsx` -- Add `LogIn` icon import and login link in both desktop nav and mobile menu

**Backend actions:**
- Configure auth to auto-confirm email (temporarily)
- Create the admin user via signup API
- Insert admin role via SQL migration
- Optionally disable auto-confirm after

**No structural changes** to existing auth flow -- the `AdminLoginPage`, `AuthContext`, and `ProtectedRoute` are already fully functional.

