import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Play, Radio, TrendingUp, Users } from "lucide-react";
import { LiveStreamViewer } from "./LiveStreamViewer";
import { Match } from "../data/mockData";
import { motion } from "motion/react";

interface LiveStreamsProps {
  matches: Match[];
}

export function LiveStreams({ matches }: LiveStreamsProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const liveFootballMatches = matches.filter(
    (m) => m.status === "live" && m.sport === "football"
  );

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
    <div className="mb-8">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Radio className="w-6 h-6 text-emerald-500 animate-pulse" />
          <h2 className="text-2xl font-bold text-white">Live Football Streams</h2>
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
            {liveFootballMatches.length} LIVE NOW
          </Badge>
        </div>
        <p className="text-slate-400">
          Watch live football matches from around the world in real-time
        </p>
      </div>

      {liveFootballMatches.length === 0 ? (
        <Card className="bg-slate-800/50 border-slate-700 p-12">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
              <Radio className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Live Streams Available
            </h3>
            <p className="text-slate-400">
              Check back when there are live football matches
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveFootballMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <StreamCard match={match} onWatch={() => setSelectedMatch(match)} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

interface StreamCardProps {
  match: Match;
  onWatch: () => void;
}

function StreamCard({ match, onWatch }: StreamCardProps) {
  // Generate random viewer count for demo
  const viewers = Math.floor(Math.random() * 50000) + 5000;

  return (
    <Card className="bg-slate-800/50 border-slate-700 overflow-hidden hover:border-emerald-500/50 transition-all group">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          {/* Live Badge */}
          <Badge className="absolute top-3 left-3 bg-red-500 text-white animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            LIVE
          </Badge>

          {/* Viewer Count */}
          <Badge className="absolute top-3 right-3 bg-slate-900/80 text-white backdrop-blur-sm">
            <Users className="w-3 h-3 mr-1" />
            {(viewers / 1000).toFixed(1)}K
          </Badge>

          {/* Teams */}
          <div className="text-center mb-4">
            <div className="text-sm font-medium text-emerald-400 mb-2">
              {match.league}
            </div>
            <div className="text-lg font-bold text-white">
              {match.homeTeam}
            </div>
            <div className="text-sm text-slate-400 my-1">vs</div>
            <div className="text-lg font-bold text-white">
              {match.awayTeam}
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl font-bold text-emerald-400">
              {match.homeScore}
            </div>
            <div className="text-slate-500">-</div>
            <div className="text-3xl font-bold text-emerald-400">
              {match.awayScore}
            </div>
          </div>

          {/* Time */}
          <div className="text-sm text-slate-400 mb-4">{match.time}</div>

          {/* Play Button */}
          <Button
            onClick={onWatch}
            className="bg-emerald-600 hover:bg-emerald-700 text-white group-hover:scale-110 transition-transform"
          >
            <Play className="w-4 h-4 mr-2" />
            Watch Live
          </Button>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Card Footer */}
      <div className="p-4 bg-slate-900/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <TrendingUp className="w-4 h-4" />
            <span>Trending</span>
          </div>
          <div className="text-emerald-400 font-semibold">HD Quality</div>
        </div>
      </div>
    </Card>
  );
}
