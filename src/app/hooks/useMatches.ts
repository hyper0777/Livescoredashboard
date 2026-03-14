import { useState, useEffect } from "react";
import { Match, footballMatches, basketballMatches, cricketMatches } from "../data/mockData";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);

  const fetchLiveMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-ed1dd9fb/matches/live`;
      console.log("Fetching from:", url);
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      const transformedMatches = transformApiData(data);
      
      if (transformedMatches.length === 0) {
        console.warn("No matches from API, using mock data");
        setUseMockData(true);
        setMatches([...footballMatches, ...basketballMatches, ...cricketMatches]);
      } else {
        setUseMockData(false);
        setMatches(transformedMatches);
      }
    } catch (err) {
      console.error("Error fetching live matches:", err);
      
      // Fallback to mock data on error
      console.log("Using mock data as fallback");
      setUseMockData(true);
      setMatches([...footballMatches, ...basketballMatches, ...cricketMatches]);
      setError("Unable to fetch live data. Showing demo matches.");
    } finally {
      setLoading(false);
    }
  };

  const transformApiData = (apiData: any): Match[] => {
    if (!apiData || !apiData.events || !Array.isArray(apiData.events)) {
      console.warn("Invalid API data structure:", apiData);
      return [];
    }

    return apiData.events.map((event: any, index: number) => {
      const homeScore = event.homeScore?.current || 0;
      const awayScore = event.awayScore?.current || 0;
      const status = event.status?.type === "inprogress" ? "live" : 
                     event.status?.type === "finished" ? "finished" : "upcoming";

      return {
        id: event.id?.toString() || `match-${index}`,
        sport: determineSport(event.tournament?.category?.sport?.name || "football"),
        homeTeam: event.homeTeam?.name || "Home Team",
        awayTeam: event.awayTeam?.name || "Away Team",
        homeScore,
        awayScore,
        status,
        time: event.startTimestamp 
          ? new Date(event.startTimestamp * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          : "TBD",
        league: event.tournament?.name || event.tournament?.category?.name || "League",
        minute: event.time?.currentPeriodStartTimestamp ? `${Math.floor((Date.now() / 1000 - event.time.currentPeriodStartTimestamp) / 60)}'` : undefined,
      };
    });
  };

  const determineSport = (sportName: string): "football" | "basketball" | "cricket" => {
    const sport = sportName.toLowerCase();
    if (sport.includes("basketball")) return "basketball";
    if (sport.includes("cricket")) return "cricket";
    return "football";
  };

  useEffect(() => {
    fetchLiveMatches();
    
    // Refresh every 30 seconds only if not using mock data
    const interval = setInterval(() => {
      if (!useMockData) {
        fetchLiveMatches();
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [useMockData]);

  // Simulate live score updates for demo data
  useEffect(() => {
    if (!useMockData) return;

    const updateInterval = setInterval(() => {
      setMatches((prevMatches) =>
        prevMatches.map((match) => {
          if (match.status !== "live") return match;

          // Randomly update scores
          if (Math.random() > 0.7) {
            const updateHome = Math.random() > 0.5;
            const points = match.sport === "basketball" 
              ? (Math.random() > 0.5 ? 2 : 3) 
              : 1;
            
            return {
              ...match,
              homeScore: updateHome ? match.homeScore + points : match.homeScore,
              awayScore: !updateHome ? match.awayScore + points : match.awayScore,
            };
          }
          return match;
        })
      );
    }, 5000); // Update every 5 seconds for demo

    return () => clearInterval(updateInterval);
  }, [useMockData]);

  return { matches, loading, error, refetch: fetchLiveMatches, useMockData };
}