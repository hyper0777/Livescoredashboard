import { useState } from "react";
import { MatchCard } from "./MatchCard";
import { useMatches } from "../hooks/useMatches";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Loader2, AlertCircle, TrendingUp, RefreshCw, AlertTriangle, Zap, Calendar, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Match } from "../data/mockData";

export function LiveScores() {
  const { matches, loading, error, useMockData, quotaExceeded, refetch } = useMatches();
  const [selectedSport, setSelectedSport] = useState<string>("all");

  const sports = ["all", "football", "basketball", "cricket"];

  const filteredMatches =
    selectedSport === "all"
      ? matches
      : matches.filter((m) => m.sport === selectedSport);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
        <p className="text-slate-400">Loading live matches...</p>
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

      {/* Regular Error Alert (non-quota errors) */}
      {error && !quotaExceeded && useMockData && (
        <Alert className="mb-6 bg-blue-900/20 border-blue-600/50">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          <AlertTitle className="text-blue-400">Using Demo Data</AlertTitle>
          <AlertDescription className="text-blue-200">
            {error}. Showing demo matches instead.
          </AlertDescription>
        </Alert>
      )}

      {/* Regular Error Alert (non-quota errors) */}
      {error && !quotaExceeded && !useMockData && (
        <Alert className="mb-6 bg-red-900/20 border-red-600/50">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertTitle className="text-red-400">Error Fetching Data</AlertTitle>
          <AlertDescription className="text-red-200">
            {error}. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {/* Header with Date and Time */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-white">Live Scores</h2>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => refetch()}
              className="text-sm px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="hidden md:inline">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-mono">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {!loading && (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 bg-slate-800 border border-slate-700">
            <TabsTrigger value="all">All Sports ({matches.length})</TabsTrigger>
            <TabsTrigger value="football">Football ({matches.filter(m => m.sport === "football").length})</TabsTrigger>
            <TabsTrigger value="basketball">Basketball ({matches.filter(m => m.sport === "basketball").length})</TabsTrigger>
            <TabsTrigger value="cricket">Cricket ({matches.filter(m => m.sport === "cricket").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <MatchSection title="Live Now" matches={filteredMatches.filter((m) => m.status === "live")} variant="live" />
            <MatchSection title="Upcoming" matches={filteredMatches.filter((m) => m.status === "upcoming")} variant="upcoming" />
            <MatchSection title="Finished" matches={filteredMatches.filter((m) => m.status === "finished")} variant="finished" />
          </TabsContent>

          <TabsContent value="football">
            <MatchSection
              title="Live Now"
              matches={filteredMatches.filter((m) => m.status === "live")}
              variant="live"
            />
            <MatchSection
              title="Upcoming"
              matches={filteredMatches.filter((m) => m.status === "upcoming")}
              variant="upcoming"
            />
            <MatchSection
              title="Finished"
              matches={filteredMatches.filter((m) => m.status === "finished")}
              variant="finished"
            />
          </TabsContent>

          <TabsContent value="basketball">
            <MatchSection
              title="Live Now"
              matches={filteredMatches.filter((m) => m.status === "live")}
              variant="live"
            />
            <MatchSection
              title="Upcoming"
              matches={filteredMatches.filter((m) => m.status === "upcoming")}
              variant="upcoming"
            />
            <MatchSection
              title="Finished"
              matches={filteredMatches.filter((m) => m.status === "finished")}
              variant="finished"
            />
          </TabsContent>

          <TabsContent value="cricket">
            <MatchSection
              title="Live Now"
              matches={filteredMatches.filter((m) => m.status === "live")}
              variant="live"
            />
            <MatchSection
              title="Upcoming"
              matches={filteredMatches.filter((m) => m.status === "upcoming")}
              variant="upcoming"
            />
            <MatchSection
              title="Finished"
              matches={filteredMatches.filter((m) => m.status === "finished")}
              variant="finished"
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

interface MatchSectionProps {
  title: string;
  matches: Match[];
  variant: "live" | "upcoming" | "finished";
}

function MatchSection({ title, matches, variant }: MatchSectionProps) {
  if (matches.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
        <div className="text-center py-8 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-slate-400">No {title.toLowerCase()} matches available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        {title}
        {variant === "live" && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-red-500">({matches.length})</span>
          </span>
        )}
      </h3>
      <div className="grid gap-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}