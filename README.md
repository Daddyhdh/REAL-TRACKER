# REAL TRACKER 4.1 Base RAX + Boosters

Adds:
- Claim/performance rows now use Base RAX.
- The app calculates Total RAX from Base RAX × card multiplier.
- Booster section added to each card.
- Booster multiplier input.
- Sport-specific booster rate inputs for NFL, CFB, NBA, WNBA, CBB, MLB, FC, Golf, UFC, and NHL.
- Stats modal now has sport-specific stat fields instead of only JSON notes.
- Current season completed performances require stats before saving when base RAX is entered.
- Booster estimate uses stats × RAX-per-stat rates × booster multiplier.
- Formula Lab samples now use confirmed stats + base RAX.

Important:
- Automatic online stats fetching is still not enabled. Users manually enter stats until a sports API is added.
- Estimated RAX remains blank until enough confirmed samples exist.
- Supabase login/cloud save remains unchanged.
