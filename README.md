# REAL TRACKER 5.5 Shared Autofill

Adds:
- Shared card template autofill across accounts.
- When a signed-in user saves a card, the player/team/season/card type/dates are added to a shared Supabase table.
- When another signed-in user types the same player name, the app shows an Autofill suggestion.
- Autofill fills player, sport, team, season, card type, rarity/multiplier, and saved date rows.

Required:
- Run `supabase-shared-autofill.sql` in Supabase SQL Editor.
- Without that SQL, the app still works, but shared autofill will silently skip.

Keeps:
- Login gate.
- Storage parse fix.
- Prompt helper with regular season only / no preseason.
- Clean Dates & Base RAX.
