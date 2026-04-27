import { useState } from "react";
import { MatchCard } from "@/app/components/MatchCard";
import { useMatches } from "@/app/hooks/useMatches";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Loader2, AlertCircle, TrendingUp, RefreshCw, AlertTriangle, Zap, Calendar, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Match } from "@/app/data/mockData";

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

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 -mx-4 lg:-mx-0 mb-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
                <span className="text-white/90 text-sm font-semibold uppercase tracking-wide">Live Coverage</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">Live Scores</h1>
              <p className="text-emerald-100 text-lg">Follow every goal, every point, every moment</p>
            </div>
            <button
              onClick={() => refetch()}
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl transition-all font-semibold border border-white/30 hover:scale-105"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="max-w-7xl mx-auto px-4">

      {/* Content */}
      {!loading && (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-1.5 w-full justify-start overflow-x-auto">
            <TabsTrigger value="all" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white px-6 py-2.5 rounded-lg font-semibold">
              All Sports ({matches.length})
            </TabsTrigger>
            <TabsTrigger value="football" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white px-6 py-2.5 rounded-lg font-semibold">
              ⚽ Football ({matches.filter(m => m.sport === "football").length})
            </TabsTrigger>
            <TabsTrigger value="basketball" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white px-6 py-2.5 rounded-lg font-semibold">
              🏀 Basketball ({matches.filter(m => m.sport === "basketball").length})
            </TabsTrigger>
            <TabsTrigger value="cricket" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white px-6 py-2.5 rounded-lg font-semibold">
              🏏 Cricket ({matches.filter(m => m.sport === "cricket").length})
            </TabsTrigger>
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
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-1 w-1 bg-emerald-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{title}</h3>
        </div>
        <div className="text-center py-12 bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800/50">
          <p className="text-slate-500">No {title.toLowerCase()} matches available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        {variant === "live" && (
          <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1.5 rounded-full border border-red-500/30">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-red-400 uppercase">Live</span>
          </div>
        )}
        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{title}</h3>
        <div className="bg-slate-800/50 px-3 py-1 rounded-full">
          <span className="text-sm font-bold text-slate-400">{matches.length}</span>
        </div>
      </div>
      <div className="grid gap-3">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}