import { useParams, Link } from "react-router";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Clock, MapPin, Users, Calendar } from "lucide-react";
import { useMatches } from "../hooks/useMatches";

export function MatchDetail() {
  const { id } = useParams();
  const { matches, loading } = useMatches();

  const match = matches.find((m) => m.id === id);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-emerald-500"></div>
        <p className="text-slate-400 mt-4">Loading match details...</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Match not found</h2>
        <Link to="/" className="text-emerald-400 hover:text-emerald-300 font-semibold">
          Back to Live Scores
        </Link>
      </div>
    );
  }

  const getScoreColor = (isHome: boolean) => {
    if (match.status === "upcoming") return "text-slate-500";
    if (match.status === "finished") {
      if (isHome && match.homeScore > match.awayScore) return "text-white";
      if (!isHome && match.awayScore > match.homeScore) return "text-white";
      return "text-slate-400";
    }
    return "text-white";
  };

  // Mock stats based on sport
  const generateStats = () => {
    if (match.sport === "football") {
      return {
        "Possession": ["52%", "48%"],
        "Shots": ["12", "8"],
        "Shots on Target": ["7", "4"],
        "Corners": ["6", "3"],
        "Fouls": ["8", "11"],
      };
    } else if (match.sport === "basketball") {
      return {
        "Field Goals": ["38/82", "35/78"],
        "3-Pointers": ["12/30", "10/28"],
        "Free Throws": ["22/28", "20/24"],
        "Rebounds": ["42", "38"],
        "Assists": ["24", "22"],
      };
    } else {
      return {
        "Runs": [match.homeScore.toString(), match.awayScore.toString()],
        "Wickets": ["4", "7"],
        "Overs": ["45.3", "38.2"],
        "Run Rate": ["6.32", "5.84"],
        "Extras": ["12", "8"],
      };
    }
  };

  const stats = generateStats();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-8 transition-colors font-semibold group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Live Scores
      </Link>

      {/* Match Header Card */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 mb-8 overflow-hidden shadow-2xl">
        <div className="p-8">
          {/* Match Info Bar */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700/50">
            <div className="flex items-center gap-4">
              {match.status === "live" && (
                <div className="flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-full border border-red-500/30">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-bold text-red-400 uppercase tracking-wide">Live</span>
                </div>
              )}
              {match.status === "finished" && (
                <Badge className="bg-slate-700/50 text-slate-300 border-slate-600/50 uppercase text-sm font-bold px-4 py-2">
                  Full Time
                </Badge>
              )}
              {match.status === "upcoming" && (
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 uppercase text-sm font-bold px-4 py-2">
                  Scheduled
                </Badge>
              )}
              <div className="h-6 w-px bg-slate-700"></div>
              <span className="text-slate-300 font-semibold text-lg">{match.league}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">{match.time}</span>
            </div>
          </div>

          {/* Score Display */}
          <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-12 mb-8">
            {/* Home Team */}
            <div className="text-right">
              <h2 className="text-4xl font-black text-white mb-3">{match.homeTeam}</h2>
              <div className="flex justify-end items-center gap-2 text-slate-400">
                <Users className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </div>
            </div>

            {/* Score */}
            <div className="relative">
              <div className="bg-slate-950 rounded-2xl px-16 py-8 shadow-2xl border border-slate-700/30">
                <div className="flex items-center justify-center gap-8">
                  <span className={`text-6xl font-black ${getScoreColor(true)} ${match.status !== 'upcoming' && match.homeScore > match.awayScore ? 'scale-110' : ''} transition-transform`}>
                    {match.status === "upcoming" ? "-" : match.homeScore}
                  </span>
                  <span className="text-slate-600 text-5xl font-bold">:</span>
                  <span className={`text-6xl font-black ${getScoreColor(false)} ${match.status !== 'upcoming' && match.awayScore > match.homeScore ? 'scale-110' : ''} transition-transform`}>
                    {match.status === "upcoming" ? "-" : match.awayScore}
                  </span>
                </div>
                {match.minute && match.status === "live" && (
                  <div className="text-center mt-4">
                    <span className="text-base text-emerald-400 font-bold bg-emerald-500/10 px-4 py-1 rounded-full">{match.minute}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Away Team */}
            <div className="text-left">
              <h2 className="text-4xl font-black text-white mb-3">{match.awayTeam}</h2>
              <div className="flex items-center gap-2 text-slate-400">
                <Users className="w-5 h-5" />
                <span className="font-medium">Away</span>
              </div>
            </div>
          </div>

          {/* Stadium Info */}
          <div className="flex items-center justify-center gap-3 text-slate-400 pt-6 border-t border-slate-700/50">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">{match.homeTeam} Stadium</span>
          </div>
        </div>
      </Card>

      {/* Match Statistics */}
      {match.status !== "upcoming" && (
        <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 shadow-xl">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-1 bg-emerald-500 rounded-full"></div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight">Match Statistics</h3>
            </div>
            <div className="space-y-8">
              {Object.entries(stats).map(([stat, values]) => (
                <div key={stat}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-emerald-400 font-bold text-lg">{values[0]}</span>
                    <span className="text-slate-300 font-semibold uppercase text-sm tracking-wide">{stat}</span>
                    <span className="text-blue-400 font-bold text-lg">{values[1]}</span>
                  </div>
                  <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-lg"
                      style={{
                        width: `${
                          (parseInt(values[0]) /
                            (parseInt(values[0]) + parseInt(values[1]))) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {match.status === "upcoming" && (
        <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 shadow-xl">
          <div className="p-16 text-center">
            <Clock className="w-20 h-20 text-slate-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">Match Upcoming</h3>
            <p className="text-slate-400 text-lg">Statistics will be available once the match starts</p>
          </div>
        </Card>
      )}
    </div>
  );
}