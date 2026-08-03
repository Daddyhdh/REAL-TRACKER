# REAL TRACKER 2.6 In-App AI Lookup

Adds a real in-app "Find dates in app" button.

How it works:
- Frontend calls `/api/find-dates`
- Netlify redirects that to `/.netlify/functions/find-dates`
- The Netlify Function calls the OpenAI Responses API with web search
- The function returns ISO dates and the app adds them as claim rows

Important setup:
1. Upload all extracted files to GitHub and commit to main.
2. In Netlify, open the site settings.
3. Add environment variable:
   OPENAI_API_KEY = your OpenAI API key
4. Redeploy the site.
5. Try Add Card → AI date helper → Find dates in app.

Optional:
- Set OPENAI_MODEL if you want to use a different OpenAI model.
- Default model is gpt-4.1-mini.

Security:
- Do not put the API key in app.js or index.html.
- The key belongs only in Netlify environment variables.
- This public starter still contains no owner's personal collection data.
