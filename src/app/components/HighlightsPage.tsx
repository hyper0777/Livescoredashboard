import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Film, TrendingUp, Clock, Eye, Play, AlertTriangle, Zap } from "lucide-react";
import { useMatches } from "../hooks/useMatches";
import { HighlightViewer } from "./HighlightViewer";
import { Match } from "../data/mockData";
import { motion } from "motion/react";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function HighlightsPage() {
  const { matches, loading, error, useMockData, quotaExceeded } = useMatches();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Filter for finished football matches
  const finishedFootballMatches = matches.filter(
    (m) => m.status === "finished" && m.sport === "football"
  );

  // Also show recently live matches that might have highlights
  const recentMatches = matches.filter(
    (m) => m.sport === "football" && (m.status === "finished" || m.status === "live")
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
        <p className="text-slate-400">Loading highlights...</p>
      </div>
    );
  }

  if (selectedMatch) {
    return (
      <div className="mb-8">
        <HighlightViewer
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
            {error}. Showing demo highlights instead.
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Film className="w-8 h-8 text-purple-500" />
          <h1 className="text-3xl font-bold text-white">Football Highlights</h1>
        </div>
        <p className="text-slate-400 text-lg">
          Watch the best moments, goals, and key plays from recent matches
        </p>
      </div>

      {/* Featured Highlight Section */}
      {finishedFootballMatches.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            Featured Highlights
          </h2>
          <FeaturedHighlight 
            match={finishedFootballMatches[0]} 
            onWatch={() => setSelectedMatch(finishedFootballMatches[0])}
          />
        </div>
      )}

      {/* Recent Highlights Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Matches</h2>
        
        {recentMatches.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-700 p-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                <Film className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Highlights Available
              </h3>
              <p className="text-slate-400">
                Check back after matches have finished
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <HighlightCard 
                  match={match} 
                  onWatch={() => setSelectedMatch(match)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Info Banner */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border-purple-700/30 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
            <Film className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              About Match Highlights
            </h3>
            <p className="text-slate-300 text-sm">
              Highlights are typically available shortly after matches end. They include the best goals, 
              saves, and key moments from the game. Click on any match to view available highlight reels.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

interface FeaturedHighlightProps {
  match: Match;
  onWatch: () => void;
}

function FeaturedHighlight({ match, onWatch }: FeaturedHighlightProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 overflow-hidden hover:border-purple-500/50 transition-all group">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Left: Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={onWatch}
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white group-hover:scale-110 transition-transform"
            >
              <Play className="w-6 h-6 mr-2" />
              Watch Highlights
            </Button>
          </div>

          <Badge className="absolute top-3 left-3 bg-purple-600 text-white">
            FEATURED
          </Badge>

          <Badge className="absolute top-3 right-3 bg-black/60 text-white backdrop-blur-sm">
            Full Highlights • 8:45
          </Badge>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-center">
          <Badge className="w-fit mb-3 bg-slate-700 text-slate-300">{match.league}</Badge>
          
          <h3 className="text-2xl font-bold text-white mb-3">
            {match.homeTeam} vs {match.awayTeam}
          </h3>

          <div className="flex items-center gap-6 mb-4">
            <div className="text-4xl font-bold text-purple-400">
              {match.homeScore} - {match.awayScore}
            </div>
            <Badge variant="secondary">Final</Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              125K views
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {match.time}
            </span>
          </div>

          <p className="text-slate-300 mb-4">
            Watch all the goals, best saves, and key moments from this exciting match.
          </p>

          <Button
            onClick={onWatch}
            className="w-fit bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Film className="w-4 h-4 mr-2" />
            View All Highlights
          </Button>
        </div>
      </div>
    </Card>
  );
}

interface HighlightCardProps {
  match: Match;
  onWatch: () => void;
}

function HighlightCard({ match, onWatch }: HighlightCardProps) {
  const isFinished = match.status === "finished";
  
  return (
    <Card className="bg-slate-800/50 border-slate-700 overflow-hidden hover:border-purple-500/50 transition-all group">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="text-center mb-3">
            <div className="text-sm text-purple-400 mb-1">{match.league}</div>
            <div className="text-white font-semibold text-sm">
              {match.homeTeam} vs {match.awayTeam}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl font-bold text-purple-400">
              {match.homeScore}
            </div>
            <div className="text-slate-500">-</div>
            <div className="text-2xl font-bold text-purple-400">
              {match.awayScore}
            </div>
          </div>

          <Button
            onClick={onWatch}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white group-hover:scale-110 transition-transform"
          >
            <Film className="w-4 h-4 mr-2" />
            View Highlights
          </Button>
        </div>

        {/* Badges */}
        <Badge className={`absolute top-3 left-3 ${isFinished ? 'bg-green-600' : 'bg-amber-600'} text-white`}>
          {isFinished ? 'Available' : 'Soon'}
        </Badge>

        {isFinished && (
          <Badge className="absolute top-3 right-3 bg-black/60 text-white backdrop-blur-sm text-xs">
            HD • 5:30
          </Badge>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {match.time}
          </span>
          {isFinished && (
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {Math.floor(Math.random() * 50 + 20)}K views
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}