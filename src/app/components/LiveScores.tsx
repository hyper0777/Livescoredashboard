import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MatchCard } from "./MatchCard";
import { Match } from "../data/mockData";
import { Calendar, Clock, AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { useMatches } from "../hooks/useMatches";

export function LiveScores() {
  const { matches, loading, error, useMockData } = useMatches();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const footballMatches = matches.filter(m => m.sport === "football");
  const basketballMatches = matches.filter(m => m.sport === "basketball");
  const cricketMatches = matches.filter(m => m.sport === "cricket");

  const liveMatches = matches.filter((m) => m.status === "live");
  const finishedMatches = matches.filter((m) => m.status === "finished");
  const upcomingMatches = matches.filter((m) => m.status === "upcoming");

  return (
    <div>
      {/* Header with Date and Time */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-white">Live Scores</h2>
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Mode Alert */}
      {useMockData && (
        <Alert className="mb-6 bg-blue-900/20 border-blue-900">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-400">
            Showing demo matches. Live API data will appear once the backend is configured.
          </AlertDescription>
        </Alert>
      )}

      {/* Error Alert */}
      {error && !useMockData && (
        <Alert className="mb-6 bg-red-900/20 border-red-900">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-400">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-600 border-t-emerald-500"></div>
          <p className="text-slate-400 mt-4">Loading live matches...</p>
        </div>
      )}

      {/* Content */}
      {!loading && (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 bg-slate-800 border border-slate-700">
            <TabsTrigger value="all">All Sports ({matches.length})</TabsTrigger>
            <TabsTrigger value="football">Football ({footballMatches.length})</TabsTrigger>
            <TabsTrigger value="basketball">Basketball ({basketballMatches.length})</TabsTrigger>
            <TabsTrigger value="cricket">Cricket ({cricketMatches.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <MatchSection title="Live Now" matches={liveMatches} variant="live" />
            <MatchSection title="Upcoming" matches={upcomingMatches} variant="upcoming" />
            <MatchSection title="Finished" matches={finishedMatches} variant="finished" />
          </TabsContent>

          <TabsContent value="football">
            <MatchSection
              title="Live Now"
              matches={footballMatches.filter((m) => m.status === "live")}
              variant="live"
            />
            <MatchSection
              title="Upcoming"
              matches={footballMatches.filter((m) => m.status === "upcoming")}
              variant="upcoming"
            />
            <MatchSection
              title="Finished"
              matches={footballMatches.filter((m) => m.status === "finished")}
              variant="finished"
            />
          </TabsContent>

          <TabsContent value="basketball">
            <MatchSection
              title="Live Now"
              matches={basketballMatches.filter((m) => m.status === "live")}
              variant="live"
            />
            <MatchSection
              title="Upcoming"
              matches={basketballMatches.filter((m) => m.status === "upcoming")}
              variant="upcoming"
            />
            <MatchSection
              title="Finished"
              matches={basketballMatches.filter((m) => m.status === "finished")}
              variant="finished"
            />
          </TabsContent>

          <TabsContent value="cricket">
            <MatchSection
              title="Live Now"
              matches={cricketMatches.filter((m) => m.status === "live")}
              variant="live"
            />
            <MatchSection
              title="Upcoming"
              matches={cricketMatches.filter((m) => m.status === "upcoming")}
              variant="upcoming"
            />
            <MatchSection
              title="Finished"
              matches={cricketMatches.filter((m) => m.status === "finished")}
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