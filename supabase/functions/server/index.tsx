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

// Fetch live matches from AllSportsAPI
app.get("/make-server-ed1dd9fb/matches/live", async (c) => {
  try {
    const apiKey = Deno.env.get("RAPIDAPI_KEY");
    
    if (!apiKey) {
      console.log("Error fetching live matches: RAPIDAPI_KEY environment variable not set");
      return c.json({ error: "API key not configured" }, 500);
    }

    const response = await fetch("https://allsportsapi2.p.rapidapi.com/api/matches/live", {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "allsportsapi2.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Error fetching live matches from API: ${response.status} - ${errorText}`);
      return c.json({ error: `API request failed: ${response.status}` }, response.status);
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data?.events?.length || 0} live matches`);
    return c.json(data);
  } catch (error) {
    console.log(`Exception while fetching live matches: ${error}`);
    return c.json({ error: "Failed to fetch live matches", details: String(error) }, 500);
  }
});

// Fetch matches by sport
app.get("/make-server-ed1dd9fb/matches/:sport", async (c) => {
  try {
    const sport = c.req.param("sport");
    const apiKey = Deno.env.get("RAPIDAPI_KEY");
    
    if (!apiKey) {
      console.log(`Error fetching ${sport} matches: RAPIDAPI_KEY environment variable not set`);
      return c.json({ error: "API key not configured" }, 500);
    }

    // Map sport names to API endpoints if needed
    const sportMap: Record<string, string> = {
      football: "football",
      basketball: "basketball",
      cricket: "cricket",
      tennis: "tennis",
    };

    const apiSport = sportMap[sport.toLowerCase()] || sport;

    const response = await fetch(`https://allsportsapi2.p.rapidapi.com/api/${apiSport}/matches/live`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "allsportsapi2.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Error fetching ${sport} matches from API: ${response.status} - ${errorText}`);
      return c.json({ error: `API request failed: ${response.status}` }, response.status);
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data?.events?.length || 0} ${sport} matches`);
    return c.json(data);
  } catch (error) {
    console.log(`Exception while fetching ${c.req.param("sport")} matches: ${error}`);
    return c.json({ error: "Failed to fetch matches", details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);