# REAL TRACKER 2.8 Supabase Login + Cloud Sync

Adds:
- Supabase email/password sign up and login
- Log out
- Forgot password
- Private cloud save using the public.user_data table
- Auto-save to cloud after collection/progress/balance changes
- Sync now button
- Local backup still works

Setup already used:
- Supabase URL and publishable key are embedded in app.js.
- The user_data table must exist with RLS policies enabled.

Important:
- This uses only the publishable Supabase key, not service_role.
- Do not add secret/service_role keys to GitHub.
- This version still contains no owner's personal collection data.
