# REAL TRACKER 5.4 Collection JSON Startup Fix

Fix:
- App no longer depends on collection.json during startup.
- This prevents the crash where collection.json was served as cached script text starting with "exports.ha..."
- Startup now begins with local saved data or an empty public starter collection.
- Old service-worker caches are cleared/unregistered once the app loads, then a fresh service worker is registered.

Keeps:
- Login gate.
- Fixed login/create account modal.
- Prompt regular season only/no preseason.
- Copy Prompt Helper.
- Clean Dates & Base RAX.
