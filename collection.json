exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Use POST." }) };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "AI lookup is not connected yet. Add OPENAI_API_KEY in Netlify environment variables, then redeploy."
      })
    };
  }

  let body = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid request body." }) };
  }

  const clean = (value, max = 80) => String(value || "").replace(/[<>]/g, "").trim().slice(0, max);
  const player = clean(body.player);
  const sport = clean(body.sport, 30);
  const season = clean(body.season, 40);
  const team = clean(body.team, 80);

  if (!player || !sport || !season) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Player, sport, and season are required." }) };
  }

  const prompt = `Find every official game/event date that this player appeared in.

Player: ${player}
Sport: ${sport}
Season/year: ${season}
${team ? `Team/context: ${team}` : ""}

Use reliable public sports schedule, game log, box score, or event sources. Return JSON only with this exact shape:
{
  "player": "name",
  "sport": "sport",
  "season": "season",
  "dates": ["YYYY-MM-DD"],
  "note": "short warning if any ambiguity, otherwise 'review dates before saving'"
}

Rules:
- Only include dates where the player actually played/appeared if that can be confirmed.
- Sort dates oldest to newest.
- Do not include opponents, scores, stats, explanations, markdown, or citations in the JSON.
- If you cannot confirm appearances, return the best official schedule dates and put the ambiguity in note.`;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        tools: [{ type: "web_search_preview" }],
        input: [
          {
            role: "system",
            content: "You are a careful sports research assistant. You return strict JSON only. Dates must be ISO YYYY-MM-DD."
          },
          { role: "user", content: prompt }
        ],
        max_output_tokens: 2200
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: data.error?.message || "OpenAI lookup failed." })
      };
    }

    const outputText =
      data.output_text ||
      (data.output || [])
        .flatMap(item => item.content || [])
        .map(part => part.text || part.output_text || "")
        .join("\n");

    let parsed;
    try {
      parsed = JSON.parse(outputText);
    } catch {
      const match = String(outputText).match(/\{[\s\S]*\}/);
      if (!match) throw new Error("AI did not return JSON.");
      parsed = JSON.parse(match[0]);
    }

    const seen = new Set();
    const dates = (Array.isArray(parsed.dates) ? parsed.dates : [])
      .map(d => String(d).trim())
      .filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort()
      .filter(d => {
        if (seen.has(d)) return false;
        seen.add(d);
        return true;
      });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        player,
        sport,
        season,
        dates,
        note: parsed.note || "review dates before saving"
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || "Lookup failed." })
    };
  }
};
