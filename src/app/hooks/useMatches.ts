import { useState, useEffect } from "react";
import { Match, mockMatches } from "../data/mockData";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);
    setQuotaExceeded(false);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ed1dd9fb/matches/live`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      
      // Check for rate limit errors (429)
      if (data.error && (data.error.includes("429") || data.details?.includes("exceeded the DAILY quota"))) {
        console.warn("API quota exceeded, using mock data");
        setQuotaExceeded(true);
        setUseMockData(true);
        setMatches(mockMatches);
        setError("API quota exceeded. Showing demo data.");
        setLoading(false);
        return;
      }

      if (data.error) {
        throw new Error(`API error: ${data.error}`);
      }

      // Transform API data to match our Match interface
      const transformedMatches: Match[] = transformApiData(data);

      if (transformedMatches.length === 0) {
        console.log("No live matches from API, using mock data");
        setUseMockData(true);
        setMatches(mockMatches);
      } else {
        setMatches(transformedMatches);
        setUseMockData(false);
      }
    } catch (err) {
      console.error("Error fetching live matches:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch matches");
      setUseMockData(true);
      setMatches(mockMatches);
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

  return { matches, loading, error, useMockData, quotaExceeded, refetch: fetchMatches };
}