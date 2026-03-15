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

Deno.serve(app.fetch);