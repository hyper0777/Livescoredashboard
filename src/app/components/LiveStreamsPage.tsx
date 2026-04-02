import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Radio, Loader2, AlertCircle, Play, TrendingUp, AlertTriangle, Zap } from "lucide-react";
import { useMatches } from "../hooks/useMatches";
import { LiveStreamViewer } from "./LiveStreamViewer";
import { Match } from "../data/mockData";
import { motion } from "motion/react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function LiveStreamsPage() {
  const { matches, loading, error, useMockData, quotaExceeded } = useMatches();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Filter for live football matches
  const liveFootballMatches = matches.filter(
    (m) => m.status === "live" && m.sport === "football"
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-red-500 animate-spin mb-4" />
        <p className="text-slate-400">Loading live streams...</p>
      </div>
    );
  }

  if (selectedMatch) {
    return (
      <div className="mb-8">
        <LiveStreamViewer
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Quota Exceeded Warning */}
      {quotaExceeded && (
        <Alert className="mb-6 bg-amber-900/20 border-amber-600/50 backdrop-blur-sm">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <AlertTitle className="text-amber-400 font-semibold text-lg">
            API Quota Exceeded - Demo Mode Active
          </AlertTitle>
          <AlertDescription className="text-amber-200/90 mt-2">
            <p className="mb-3">
              Your RapidAPI daily quota has been exceeded. The app is now showing demo data to demonstrate functionality.
            </p>
            <div className="bg-amber-950/30 rounded-lg p-4 mb-3 border border-amber-700/30">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                To get live data again:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-6">
                <li>Wait until your quota resets (usually midnight UTC)</li>
                <li>Upgrade your RapidAPI plan at <a href="https://rapidapi.com/fluis.lacasse/api/allsportsapi2" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-300">rapidapi.com</a></li>
                <li>The demo data still shows all features and functionality</li>
              </ul>
            </div>
            <Badge className="bg-amber-600 text-white">
              Current Mode: Demo Data
            </Badge>
          </AlertDescription>
        </Alert>
      )}

      {error && !quotaExceeded && (
        <Alert className="mb-6 bg-blue-900/20 border-blue-600/50">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          <AlertTitle className="text-blue-400">Using Demo Data</AlertTitle>
          <AlertDescription className="text-blue-200">
            {error}. Showing demo streams instead.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {liveFootballMatches.map((match) => (
          <Card key={match.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Badge className="bg-emerald-500 text-white mr-2">
                  Live
                </Badge>
                <p className="text-sm font-semibold">
                  {match.homeTeam} vs {match.awayTeam}
                </p>
              </div>
              <Button
                className="bg-emerald-500 text-white"
                onClick={() => setSelectedMatch(match)}
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Live
              </Button>
            </div>
            <div className="mt-2">
              <p className="text-xs text-slate-500">
                {match.league} - {match.date}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}