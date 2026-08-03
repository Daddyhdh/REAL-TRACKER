# REAL TRACKER 4.0 Smart Card Engine

This combines the planned 3.2/3.3/3.4/3.5 work into one major update.

Adds:
- Current Season vs OTD card type selector
- Current cards use game/performance rows
- OTD cards use historical claim rows
- Game Date Helper language updated
- Stats review modal for performance rows
- Actual RAX + blank Estimated RAX
- Formula Lab panel in Analytics
- Smart Engine summary on dashboard
- Card type is saved locally and to Supabase cloud sync
- Optional Supabase SQL file for future shared player date and RAX sample tables

Important:
- Estimated RAX still stays blank. No fake predictions.
- Automatic online stats fetching is not enabled yet because that needs a sports stats API.
- Supabase login/cloud saving remains active.
- The package still contains no owner's personal collection data.

Optional:
Run supabase-smart-card-engine.sql in Supabase when you are ready to enable shared player_dates and rax_samples tables.
