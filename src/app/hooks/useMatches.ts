import { useState, useEffect } from "react";
import { Match } from "../data/mockData";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ed1dd9fb/matches/live`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();
      const transformedMatches = transformApiData(data);
      setMatches(transformedMatches);
    } catch (err) {
      console.error("Error fetching live matches:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch live matches");
    } finally {
      setLoading(false);
    }
  };

  const transformApiData = (apiData: any): Match[] => {
    if (!apiData || !apiData.events) {
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
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchLiveMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  return { matches, loading, error, refetch: fetchLiveMatches };
}
