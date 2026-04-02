import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Play, Loader2, X, Maximize2, Volume2, VolumeX, Radio, AlertCircle } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { Match } from "../data/mockData";
import { DemoStreamPlayer } from "./DemoStreamPlayer";

interface LiveStreamViewerProps {
  match: Match;
  onClose?: () => void;
}

export function LiveStreamViewer({ match, onClose }: LiveStreamViewerProps) {
  const [loading, setLoading] = useState(false);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [useDemoMode, setUseDemoMode] = useState(false);

  const generateMatchSlug = (match: Match) => {
    // Generate slug in format: team1-vs-team2-league-id
    // Example: brentford-vs-wolverhamptonwanderers-englishpremierleague-927775
    const team1 = match.homeTeam.toLowerCase().replace(/\s+/g, '');
    const team2 = match.awayTeam.toLowerCase().replace(/\s+/g, '');
    const league = match.league.toLowerCase().replace(/\s+/g, '');
    
    return `${team1}-vs-${team2}-${league}-${match.id}`;
  };

  const fetchStreamLink = async () => {
    setLoading(true);
    setError(null);

    try {
      const matchSlug = generateMatchSlug(match);
      console.log("Fetching stream for slug:", matchSlug);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ed1dd9fb/stream/${matchSlug}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      // First, get the response as text to check if it's valid JSON
      const responseText = await response.text();
      console.log("Raw stream response (first 200 chars):", responseText.substring(0, 200));

      let data;
      try {
        // Try to parse as JSON
        data = JSON.parse(responseText);
        console.log("Parsed stream response:", data);
      } catch (parseError) {
        console.error("Failed to parse stream response as JSON:", parseError);
        console.error("Response text:", responseText);
        throw new Error("The server returned an invalid response. The stream API may be experiencing issues.");
      }

      // Check if there's an error in the response
      if (data.error) {
        throw new Error(data.message || data.error);
      }

      // Check if stream was successful
      if (data.success && data.streamData) {
        setStreamUrl(data.streamData);
      } else {
        throw new Error(data.message || "No stream data available for this match");
      }
    } catch (err) {
      console.error("Error fetching stream:", err);
      setError(err instanceof Error ? err.message : "Failed to load stream");
    } finally {
      setLoading(false);
    }
  };

  // Show demo player if user chooses demo mode
  if (useDemoMode) {
    return <DemoStreamPlayer match={match} onClose={onClose} />;
  }

  return (
    <Card className="bg-slate-800/95 border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-white animate-pulse" />
              <span className="text-white font-semibold">Live Stream</span>
            </div>
            <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
        <div className="mt-2 text-white">
          <div className="text-lg font-bold">
            {match.homeTeam} vs {match.awayTeam}
          </div>
          <div className="text-sm text-emerald-100">{match.league}</div>
        </div>
      </div>

      {/* Stream Container */}
      <div className="relative bg-slate-900">
        {!streamUrl && !loading && !error && (
          <div className="flex flex-col items-center justify-center p-12 gap-4">
            <div className="w-20 h-20 rounded-full bg-emerald-600/20 flex items-center justify-center">
              <Play className="w-10 h-10 text-emerald-500" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                Ready to Watch Live
              </h3>
              <p className="text-slate-400 mb-4">
                Click below to load the live stream
              </p>
            </div>
            <Button
              onClick={fetchStreamLink}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Load Stream
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center p-12 gap-4">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
            <p className="text-slate-400">Loading live stream...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center p-12 gap-4">
            <div className="w-20 h-20 rounded-full bg-red-600/20 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <div className="text-center max-w-md">
              <h3 className="text-xl font-semibold text-white mb-2">
                Stream Unavailable
              </h3>
              <p className="text-slate-400 mb-4">{error}</p>
              <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3 mb-4">
                <p className="text-sm text-amber-300">
                  The Football Live Stream API may not have coverage for this match yet. You can try the demo player to see how the stream interface works.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={fetchStreamLink}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Try Again
              </Button>
              <Button
                onClick={() => setUseDemoMode(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Use Demo Stream
              </Button>
            </div>
          </div>
        )}

        {streamUrl && (
          <div className="relative aspect-video bg-black">
            {/* Stream iframe or video player */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-white mb-4">Stream content would be displayed here</p>
                <div className="bg-slate-800 rounded-lg p-4 max-w-2xl overflow-auto max-h-96">
                  <p className="text-xs text-slate-400 mb-2">Stream Data (Raw API Response):</p>
                  <pre className="text-xs text-left text-emerald-400">
                    {typeof streamUrl === 'string' ? streamUrl.substring(0, 500) : JSON.stringify(streamUrl, null, 2).substring(0, 500)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Maximize2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Match Info Footer */}
      <div className="p-4 bg-slate-800/50 border-t border-slate-700">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="text-slate-400">Score</div>
            <div className="text-2xl font-bold text-white">
              {match.homeScore} - {match.awayScore}
            </div>
          </div>
          <div className="text-slate-400">
            {match.time}
          </div>
        </div>
      </div>
    </Card>
  );
}