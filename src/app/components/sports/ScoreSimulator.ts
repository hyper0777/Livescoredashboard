import { useState, useEffect, useCallback, useRef } from 'react';
import { LiveMatch, liveMatches as fallbackMatches } from '@/data/sportsData';
import { supabase } from '@/lib/supabase';

const POLL_INTERVAL = 30000; // Poll every 30 seconds

// Map Supabase row to LiveMatch format
function mapSupabaseMatchToLiveMatch(dbMatch: any): LiveMatch | null {
  try {
    // Determine sport
    let sport: 'football' | 'basketball' | 'soccer' | 'baseball' | 'tennis' = 'soccer';
    const league = dbMatch.league?.toLowerCase() || '';

    if (league.includes('nfl')) sport = 'football';
    else if (league.includes('nba') || league.includes('basketball')) sport = 'basketball';
    else if (league.includes('mlb') || league.includes('baseball')) sport = 'baseball';
    else if (league.includes('atp') || league.includes('tennis')) sport = 'tennis';
    else sport = 'soccer';

    // Get team colors and abbreviations
    const homeAbbr = (dbMatch.home_team || dbMatch.homeTeam)?.slice(0, 3).toUpperCase() || 'HOME';
    const awayAbbr = (dbMatch.away_team || dbMatch.awayTeam)?.slice(0, 3).toUpperCase() || 'AWAY';

    // Map status
    const status = (dbMatch.status || dbMatch.match_status)?.toLowerCase() || 'live';
    let mappedStatus: 'live' | 'halftime' | 'final' = 'live';
    if (status === 'finished' || status === 'final') mappedStatus = 'final';
    else if (status === 'halftime' || status === 'ht') mappedStatus = 'halftime';
    else mappedStatus = 'live';

    const homeTeam = dbMatch.home_team || dbMatch.homeTeam || 'Home Team';
    const awayTeam = dbMatch.away_team || dbMatch.awayTeam || 'Away Team';

    return {
      id: dbMatch.id || Math.random(),
      sport,
      league: dbMatch.league || 'Unknown League',
      homeTeam,
      awayTeam,
      homeScore: parseInt(dbMatch.home_score || dbMatch.homeScore) || 0,
      awayScore: parseInt(dbMatch.away_score || dbMatch.awayScore) || 0,
      time: dbMatch.time || dbMatch.match_time || 'TBD',
      status: mappedStatus,
      homeColor: dbMatch.home_color || dbMatch.homeColor || generateColorForTeam(homeTeam),
      awayColor: dbMatch.away_color || dbMatch.awayColor || generateColorForTeam(awayTeam),
      homeAbbr,
      awayAbbr,
    };
  } catch (err) {
    console.error('Error mapping Supabase match:', err);
    return null;
  }
}

// Generate consistent colors for teams
function generateColorForTeam(teamName: string): string {
  const colors = [
    '#E31837', '#00338D', '#003594', '#004687', '#AA0000', '#203731',
    '#552583', '#007A33', '#98002E', '#1D428A', '#0E2240', '#1D1160',
    '#C60C30', '#0851BA', '#6CABDE', '#EF0107', '#C8102E', '#0051BA',
    '#0C2C56', '#BD3039', '#005A9C', '#FD5000', '#001F3F', '#FF4136',
  ];

  // Use team name to generate consistent color
  let hash = 0;
  for (let i = 0; i < teamName.length; i++) {
    hash = teamName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
}

export function useScoreSimulator() {
  const [matches, setMatches] = useState<LiveMatch[]>(fallbackMatches);
  const [source, setSource] = useState<string>('local');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchLiveScores = useCallback(async () => {
    try {
      // Fetch from Netlify function that proxies to Supabase Edge Function
      console.log('Fetching live matches from API...');

      const response = await fetch('/api/matches/live', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();

      // Handle different API response formats
      let apiMatches = [];

      if (Array.isArray(data)) {
        apiMatches = data;
      } else if (data.matches && Array.isArray(data.matches)) {
        apiMatches = data.matches;
      } else if (data.data && Array.isArray(data.data)) {
        apiMatches = data.data;
      } else if (data.result && Array.isArray(data.result)) {
        apiMatches = data.result;
      } else if (data.error || data.message) {
        // API returned an error response
        throw new Error(data.message || data.error);
      }

      if (apiMatches.length > 0) {
        console.log(`Found ${apiMatches.length} live matches from API`);

        // Map API matches to our format
        const mappedMatches = apiMatches
          .map(mapSupabaseMatchToLiveMatch)
          .filter((m): m is LiveMatch => m !== null)
          .slice(0, 15);

        if (mappedMatches.length > 0) {
          setMatches(mappedMatches);
          setSource('api-live');
          setError(null);
        } else {
          // Fallback to demo data if no matches could be mapped
          console.log('No matches could be mapped from API response, using demo data');
          setMatches(fallbackMatches);
          setSource('fallback-demo');
        }
      } else {
        // No matches in response, use fallback
        console.log('No live matches in API response, using demo data');
        setMatches(fallbackMatches);
        setSource('fallback-demo');
      }
    } catch (err: any) {
      console.error('Failed to fetch from API:', err.message);
      console.log('Using demo data as fallback');
      setMatches(fallbackMatches);
      setError(err.message);
      setSource('fallback-demo');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchLiveScores();

    // Set up polling
    intervalRef.current = setInterval(fetchLiveScores, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchLiveScores]);

  return { matches, source, loading, error };
}
