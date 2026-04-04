import { Link } from "react-router";
import { Match } from "../data/mockData";
import { Clock, ChevronRight, Radio, Film, Star } from "lucide-react";
import { useState } from "react";
import { LiveStreamViewer } from "./LiveStreamViewer";
import { HighlightViewer } from "./HighlightViewer";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const [showStream, setShowStream] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const statusBadge = () => {
    switch (match.status) {
      case "live":
        return (
          <span className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-[10px] font-bold uppercase">Live</span>
          </span>
        );
      case "finished":
        return (
          <span className="px-2 py-0.5 bg-gray-500/20 rounded-full text-gray-400 text-[10px] font-bold uppercase">
            Final
          </span>
        );
      case "upcoming":
        return (
          <span className="px-2 py-0.5 bg-[#00d4ff]/20 rounded-full text-[#00d4ff] text-[10px] font-bold uppercase">
            Scheduled
          </span>
        );
    }
  };

  return (
    <div className="group relative bg-[#161b22] border border-white/5 rounded-2xl p-5 hover:border-[#00d4ff]/20 hover:bg-[#1c2333] transition-all cursor-pointer">
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{match.league}</span>
          <span className="text-gray-700">|</span>
          <span className="text-[10px] text-gray-500 capitalize">{match.sport}</span>
        </div>
        <div className="flex items-center gap-2">
          {statusBadge()}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Star
              className={`w-4 h-4 transition-colors ${
                isFavorite ? "text-yellow-400 fill-yellow-400" : "text-gray-600 hover:text-gray-400"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Teams and scores */}
      <div className="space-y-3">
        {/* Home team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff]/20 to-[#0066ff]/20 flex items-center justify-center text-[#00d4ff] text-[10px] font-black">
              {match.homeTeam.substring(0, 3).toUpperCase()}
            </div>
            <span className="text-white font-medium text-sm">{match.homeTeam}</span>
          </div>
          <span
            className={`text-2xl font-black tabular-nums ${
              match.status !== "upcoming" && match.homeScore > match.awayScore
                ? "text-white"
                : "text-gray-500"
            }`}
          >
            {match.status === "upcoming" ? "-" : match.homeScore}
          </span>
        </div>

        {/* Away team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center text-orange-400 text-[10px] font-black">
              {match.awayTeam.substring(0, 3).toUpperCase()}
            </div>
            <span className="text-white font-medium text-sm">{match.awayTeam}</span>
          </div>
          <span
            className={`text-2xl font-black tabular-nums ${
              match.status !== "upcoming" && match.awayScore > match.homeScore
                ? "text-white"
                : "text-gray-500"
            }`}
          >
            {match.status === "upcoming" ? "-" : match.awayScore}
          </span>
        </div>
      </div>

      {/* Time and actions bar */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-gray-600" />
          <span className="text-[#00d4ff] text-xs font-mono font-semibold">{match.time}</span>
          {match.minute && match.status === "live" && (
            <span className="text-[#00ff88] text-xs font-bold ml-1">{match.minute}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Watch Live Button - Only for live football matches */}
          {match.status === "live" && match.sport === "football" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowStream(true);
              }}
              className="px-2 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 text-xs font-bold transition-all flex items-center gap-1"
            >
              <Radio className="w-3 h-3 animate-pulse" />
              Live
            </button>
          )}

          {/* View Highlights Button - Only for finished football matches */}
          {match.status === "finished" && match.sport === "football" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowHighlights(true);
              }}
              className="px-2 py-1 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-400 text-xs font-bold transition-all flex items-center gap-1"
            >
              <Film className="w-3 h-3" />
              Recap
            </button>
          )}

          <Link to={`/match/${match.id}`}>
            <span className="text-gray-600 text-xs group-hover:text-[#00d4ff] transition-colors flex items-center gap-1">
              Details
              <ChevronRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </div>

      {/* Glow effect on hover */}
      {match.status === "live" && (
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(0,212,255,0.1)]" />
        </div>
      )}
    </div>
  );
}
