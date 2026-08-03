# REAL TRACKER 5.0 Storage Parse Fix

Fixes:
- Startup crash caused by JSON.parse reading a non-JSON localStorage value like "exports.ha..."
- Recovery scan now ignores anything that does not look like REAL TRACKER JSON.
- Keeps users signed in once Supabase loads normally.
- Keeps Copy Prompt Helper.
- Keeps no in-app date finder.
- Keeps clean Dates & Base RAX section.
- Cache-busts app.js/styles.css to v=50.

Upload all extracted files to GitHub root and commit to main.
Then open your site with ?v=50 once.
