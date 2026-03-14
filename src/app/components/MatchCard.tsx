import { Link } from "react-router";
import { Match } from "../data/mockData";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, ChevronRight } from "lucide-react";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
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
      if (isHome && match.homeScore > match.awayScore) return "text-emerald-400";
      if (!isHome && match.awayScore > match.homeScore) return "text-emerald-400";
    }
    return "text-white";
  };

  return (
    <Link to={`/match/${match.id}`}>
      <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant={getBadgeVariant()} className="uppercase text-xs">
                {match.status === "live" ? (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    Live
                  </span>
                ) : (
                  match.status
                )}
              </Badge>
              <span className="text-slate-400 text-sm">{match.league}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{match.time}</span>
            </div>
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4">
            {/* Home Team */}
            <div className="text-right">
              <p className="text-white font-semibold">{match.homeTeam}</p>
            </div>

            {/* Score */}
            <div className="bg-slate-900 rounded-lg px-6 py-3 min-w-[120px]">
              <div className="flex items-center justify-center gap-4">
                <span className={`text-2xl font-bold ${getScoreColor(true)}`}>
                  {match.status === "upcoming" ? "-" : match.homeScore}
                </span>
                <span className="text-slate-600 text-xl">:</span>
                <span className={`text-2xl font-bold ${getScoreColor(false)}`}>
                  {match.status === "upcoming" ? "-" : match.awayScore}
                </span>
              </div>
              {match.minute && match.status === "live" && (
                <div className="text-center mt-1">
                  <span className="text-xs text-emerald-400 font-medium">{match.minute}</span>
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="text-left">
              <p className="text-white font-semibold">{match.awayTeam}</p>
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <span className="text-slate-500 text-sm flex items-center gap-1 hover:text-emerald-400 transition-colors">
              View Details
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
