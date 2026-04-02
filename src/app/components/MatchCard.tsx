import { Link } from "react-router";
import { Match } from "../data/mockData";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, ChevronRight, Radio, Film, MapPin } from "lucide-react";
import { useState } from "react";
import { LiveStreamViewer } from "./LiveStreamViewer";
import { HighlightViewer } from "./HighlightViewer";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const [showStream, setShowStream] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false);

  const getBadgeVariant = () => {
    switch (match.status) {
      case "live":
        return "destructive";
      case "finished":
        return "secondary";
      case "upcoming":
        return "outline";
      default:
        return "default";
    }
  };

  const getScoreColor = (isHome: boolean) => {
    if (match.status === "upcoming") return "text-slate-500";
    if (match.status === "finished") {
      if (isHome && match.homeScore > match.awayScore) return "text-white";
      if (!isHome && match.awayScore > match.homeScore) return "text-white";
      return "text-slate-400";
    }
    return "text-white";
  };

  // Show stream viewer if requested
  if (showStream) {
    return (
      <div className="mb-4">
        <LiveStreamViewer match={match} onClose={() => setShowStream(false)} />
      </div>
    );
  }

  // Show highlights viewer if requested
  if (showHighlights) {
    return (
      <div className="mb-4">
        <HighlightViewer match={match} onClose={() => setShowHighlights(false)} />
      </div>
    );
  }

  return (
    <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 hover:bg-slate-900/80 transition-all hover:border-emerald-500/30 group overflow-hidden">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {match.status === "live" && (
              <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-red-400 uppercase tracking-wide">Live</span>
              </div>
            )}
            {match.status === "finished" && (
              <Badge className="bg-slate-700/50 text-slate-300 border-slate-600/50 uppercase text-xs font-bold">
                FT
              </Badge>
            )}
            {match.status === "upcoming" && (
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 uppercase text-xs font-bold">
                Scheduled
              </Badge>
            )}
            <div className="h-4 w-px bg-slate-700"></div>
            <span className="text-slate-400 text-sm font-medium">{match.league}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{match.time}</span>
          </div>
        </div>

        {/* Match Score Section */}
        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-6 mb-4">
          {/* Home Team */}
          <div className="text-right">
            <p className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors">{match.homeTeam}</p>
          </div>

          {/* Score Display */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl px-8 py-4 min-w-[140px] border border-slate-700/50 shadow-lg">
              <div className="flex items-center justify-center gap-5">
                <span className={`text-3xl font-black ${getScoreColor(true)} ${match.status !== 'upcoming' && match.homeScore > match.awayScore ? 'scale-110' : ''} transition-transform`}>
                  {match.status === "upcoming" ? "-" : match.homeScore}
                </span>
                <span className="text-slate-600 text-2xl font-bold">:</span>
                <span className={`text-3xl font-black ${getScoreColor(false)} ${match.status !== 'upcoming' && match.awayScore > match.homeScore ? 'scale-110' : ''} transition-transform`}>
                  {match.status === "upcoming" ? "-" : match.awayScore}
                </span>
              </div>
              {match.minute && match.status === "live" && (
                <div className="text-center mt-2">
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">{match.minute}</span>
                </div>
              )}
            </div>
          </div>

          {/* Away Team */}
          <div className="text-left">
            <p className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors">{match.awayTeam}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-800/50">
          <div className="flex gap-2">
            {/* Watch Live Button - Only show for live football matches */}
            {match.status === "live" && match.sport === "football" && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setShowStream(true);
                }}
                size="sm"
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold shadow-lg shadow-red-500/20 border-0"
              >
                <Radio className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
                Watch Live
              </Button>
            )}

            {/* View Highlights Button - Only show for finished football matches */}
            {match.status === "finished" && match.sport === "football" && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setShowHighlights(true);
                }}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/20 border-0"
              >
                <Film className="w-3.5 h-3.5 mr-1.5" />
                Highlights
              </Button>
            )}
          </div>

          <Link to={`/match/${match.id}`}>
            <span className="text-slate-500 text-sm flex items-center gap-1 hover:text-emerald-400 transition-colors font-medium group/link">
              Match Centre
              <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </Card>
  );
}