const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  },
  body: JSON.stringify(body),
});

const getPath = (rawPath = "") => {
  const marker = "/.netlify/functions/server";
  const idx = rawPath.indexOf(marker);

  if (idx === -1) {
    return rawPath;
  }

  return rawPath.slice(idx + marker.length) || "/";
};

const fetchFromRapidApi = async (url, host, apiKey) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": host,
      "Content-Type": "application/json",
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  return { ok: response.ok, status: response.status, payload };
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed" });
  }

  const apiKey = process.env.RAPIDAPI_KEY;
  const path = getPath(event.path);

  if (path === "/health") {
    return json(200, { status: "ok", provider: "netlify-function" });
  }

  if (path === "/test-api") {
    return json(200, {
      apiKeySet: Boolean(apiKey),
      apiKeyPrefix: apiKey ? `${apiKey.slice(0, 8)}...` : "not set",
    });
  }

  if (!apiKey) {
    return json(500, { error: "RAPIDAPI_KEY environment variable is not set" });
  }

  try {
    if (path === "/matches/live") {
      const result = await fetchFromRapidApi(
        "https://allsportsapi2.p.rapidapi.com/api/matches/live",
        "allsportsapi2.p.rapidapi.com",
        apiKey,
      );

      if (!result.ok) {
        return json(result.status, { error: "Failed to fetch live matches", details: result.payload });
      }

      return json(200, result.payload);
    }

    if (path === "/streams/live") {
      const result = await fetchFromRapidApi(
        "https://allsportsapi2.p.rapidapi.com/api/matches/live",
        "allsportsapi2.p.rapidapi.com",
        apiKey,
      );

      if (!result.ok) {
        return json(result.status, { error: "Failed to fetch live streams", details: result.payload });
      }

      return json(200, {
        matches: result.payload,
        note: "Use /api/stream/:matchSlug to fetch a specific stream link",
      });
    }

    if (path.startsWith("/stream/")) {
      const matchSlug = path.replace("/stream/", "");
      if (!matchSlug) {
        return json(400, { error: "Missing match slug" });
      }

      const result = await fetchFromRapidApi(
        `https://football-live-stream-api.p.rapidapi.com/link/${encodeURIComponent(matchSlug)}`,
        "football-live-stream-api.p.rapidapi.com",
        apiKey,
      );

      if (!result.ok) {
        return json(200, {
          error: `Stream API request failed with status ${result.status}`,
          details: result.payload,
          matchSlug,
        });
      }

      return json(200, {
        success: true,
        streamData: result.payload,
        matchSlug,
      });
    }

    if (path.startsWith("/highlights/")) {
      const matchId = path.replace("/highlights/", "");
      if (!matchId) {
        return json(400, { error: "Missing match id" });
      }

      const result = await fetchFromRapidApi(
        `https://live-football-streaming-api.p.rapidapi.com/api/v1/match/streamlinks/${encodeURIComponent(matchId)}`,
        "live-football-streaming-api.p.rapidapi.com",
        apiKey,
      );

      if (!result.ok) {
        return json(200, {
          error: `Highlights API request failed with status ${result.status}`,
          details: result.payload,
          matchId,
        });
      }

      return json(200, {
        success: true,
        highlights: result.payload,
        matchId,
      });
    }

    return json(404, { error: "Route not found" });
  } catch (error) {
    return json(500, {
      error: "Unexpected server error",
      details: String(error),
    });
  }
};
