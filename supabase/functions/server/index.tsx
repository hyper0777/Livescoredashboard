import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ed1dd9fb/health", (c) => {
  return c.json({ status: "ok" });
});

// Test endpoint to verify API key is set
app.get("/make-server-ed1dd9fb/test-api", (c) => {
  const apiKey = Deno.env.get("RAPIDAPI_KEY");
  return c.json({ 
    apiKeySet: !!apiKey,
    apiKeyPrefix: apiKey ? apiKey.substring(0, 10) + "..." : "not set"
  });
});

// Fetch live matches from AllSportsAPI
app.get("/make-server-ed1dd9fb/matches/live", async (c) => {
  try {
    const apiKey = Deno.env.get("RAPIDAPI_KEY");
    
    if (!apiKey) {
      console.log("Error fetching live matches: RAPIDAPI_KEY environment variable not set");
      return c.json({ error: "API key not configured" }, 500);
    }

    console.log("Fetching from AllSportsAPI...");
    const response = await fetch("https://allsportsapi2.p.rapidapi.com/api/matches/live", {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "allsportsapi2.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    });

    console.log(`AllSportsAPI response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Error fetching live matches from API: ${response.status} - ${errorText}`);
      return c.json({ error: `API request failed: ${response.status}`, details: errorText }, response.status);
    }

    const data = await response.json();
    console.log(`Successfully fetched data:`, JSON.stringify(data).substring(0, 200));
    return c.json(data);
  } catch (error) {
    console.log(`Exception while fetching live matches: ${error}`);
    return c.json({ error: "Failed to fetch live matches", details: String(error) }, 500);
  }
});

// Fetch live stream link for a specific football match
app.get("/make-server-ed1dd9fb/stream/:matchSlug", async (c) => {
  try {
    const apiKey = Deno.env.get("RAPIDAPI_KEY");
    
    if (!apiKey) {
      console.log("Error fetching stream link: RAPIDAPI_KEY environment variable not set");
      return c.json({ error: "API key not configured" }, 500);
    }

    const matchSlug = c.req.param("matchSlug");
    console.log(`Fetching stream link for match: ${matchSlug}`);
    
    const url = `https://football-live-stream-api.p.rapidapi.com/link/${matchSlug}`;
    console.log(`Stream API URL: ${url}`);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "football-live-stream-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    });

    console.log(`Football Live Stream API response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Error fetching stream link from API: ${response.status} - ${errorText}`);
      
      // Return a more detailed error response
      return c.json({ 
        error: `Stream API request failed with status ${response.status}`, 
        details: errorText,
        matchSlug: matchSlug,
        message: "Stream may not be available for this match. The Football Live Stream API might not have coverage for this specific game."
      }, 200); // Return 200 so frontend can handle gracefully
    }

    const data = await response.text();
    console.log(`Successfully fetched stream data (first 200 chars):`, data.substring(0, 200));
    
    return c.json({ 
      success: true,
      streamData: data, 
      matchSlug: matchSlug 
    });
  } catch (error) {
    console.log(`Exception while fetching stream link: ${error}`);
    return c.json({ 
      error: "Failed to fetch stream link", 
      details: String(error),
      message: "An error occurred while trying to fetch the stream. Please try again later."
    }, 200); // Return 200 so frontend can handle gracefully
  }
});

// Fetch all available live football streams
app.get("/make-server-ed1dd9fb/streams/live", async (c) => {
  try {
    const apiKey = Deno.env.get("RAPIDAPI_KEY");
    
    if (!apiKey) {
      console.log("Error fetching live streams: RAPIDAPI_KEY environment variable not set");
      return c.json({ error: "API key not configured" }, 500);
    }

    console.log("Fetching live football streams...");
    
    // First get live matches from AllSportsAPI
    const matchesResponse = await fetch("https://allsportsapi2.p.rapidapi.com/api/matches/live", {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "allsportsapi2.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    });

    if (!matchesResponse.ok) {
      console.log(`Error fetching matches for streams: ${matchesResponse.status}`);
      return c.json({ error: "Failed to fetch live matches" }, matchesResponse.status);
    }

    const matchesData = await matchesResponse.json();
    console.log(`Found live matches data:`, JSON.stringify(matchesData).substring(0, 200));
    
    return c.json({ 
      matches: matchesData,
      note: "Use /stream/:matchSlug endpoint to get specific stream links"
    });
  } catch (error) {
    console.log(`Exception while fetching live streams: ${error}`);
    return c.json({ error: "Failed to fetch live streams", details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);