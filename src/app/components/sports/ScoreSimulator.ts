import { useState, useEffect, useCallback, useRef } from 'react';
import { LiveMatch, liveMatches as fallbackMatches } from '@/data/sportsData';

const POLL_INTERVAL = 30000; // Poll every 30 seconds

export function useScoreSimulator() {
  const [matches, setMatches] = useState<LiveMatch[]>(fallbackMatches);
  const [source, setSource] = useState<string>('local');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchLiveScores = useCallback(async () => {
    try {
      // Simulate random score updates for demo purposes
      setMatches(prev => prev.map(match => {
        if (match.status === 'live' && Math.random() > 0.7) {
          return {
            ...match,
            homeScore: Math.random() > 0.5 ? match.homeScore + 1 : match.homeScore,
            awayScore: Math.random() > 0.5 ? match.awayScore + 1 : match.awayScore,
          };
        }
        return match;
      }));
      setSource('simulated');
      setError(null);
    } catch (err: any) {
      console.warn('Failed to fetch live scores:', err.message);
      setError(err.message);
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
