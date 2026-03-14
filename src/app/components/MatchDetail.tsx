import { useParams, Link } from "react-router";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Clock, MapPin, Users } from "lucide-react";
import { useMatches } from "../hooks/useMatches";

export function MatchDetail() {
  const { id } = useParams();
  const { matches, loading } = useMatches();
  
  const match = matches.find((m) => m.id === id);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-600 border-t-emerald-500"></div>
        <p className="text-slate-400 mt-4">Loading match details...</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="text-center">
        <h2 className="text-2xl text-white mb-4">Match not found</h2>
        <Link to="/" className="text-emerald-400 hover:underline">
          Back to Live Scores
        </Link>
      </div>
    );
  }

  const getScoreColor = (isHome: boolean) => {
    if (match.status === "upcoming") return "text-slate-500";
    if (match.status === "finished") {
      if (isHome && match.homeScore > match.awayScore) return "text-emerald-400";
      if (!isHome && match.awayScore > match.homeScore) return "text-emerald-400";
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
    <div>
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Live Scores
      </Link>

      {/* Match Header */}
      <Card className="bg-slate-800 border-slate-700 mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Badge
                variant={match.status === "live" ? "destructive" : "secondary"}
                className="uppercase"
              >
                {match.status === "live" ? (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    Live
                  </span>
                ) : (
                  match.status
                )}
              </Badge>
              <span className="text-slate-400">{match.league}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4" />
              <span>{match.time}</span>
            </div>
          </div>

          {/* Score Display */}
          <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-8 mb-6">
            {/* Home Team */}
            <div className="text-right">
              <h2 className="text-3xl font-bold text-white mb-2">{match.homeTeam}</h2>
              <div className="flex justify-end items-center gap-2 text-slate-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">Home</span>
              </div>
            </div>

            {/* Score */}
            <div className="bg-slate-900 rounded-xl px-12 py-6">
              <div className="flex items-center justify-center gap-6">
                <span className={`text-5xl font-bold ${getScoreColor(true)}`}>
                  {match.status === "upcoming" ? "-" : match.homeScore}
                </span>
                <span className="text-slate-600 text-4xl">:</span>
                <span className={`text-5xl font-bold ${getScoreColor(false)}`}>
                  {match.status === "upcoming" ? "-" : match.awayScore}
                </span>
              </div>
              {match.minute && match.status === "live" && (
                <div className="text-center mt-3">
                  <span className="text-sm text-emerald-400 font-semibold">{match.minute}</span>
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="text-left">
              <h2 className="text-3xl font-bold text-white mb-2">{match.awayTeam}</h2>
              <div className="flex items-center gap-2 text-slate-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">Away</span>
              </div>
            </div>
          </div>

          {/* Stadium Info */}
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Stadium: {match.homeTeam} Arena</span>
          </div>
        </div>
      </Card>

      {/* Match Statistics */}
      {match.status !== "upcoming" && (
        <Card className="bg-slate-800 border-slate-700">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Match Statistics</h3>
            <div className="space-y-6">
              {Object.entries(stats).map(([stat, values]) => (
                <div key={stat}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-emerald-400 font-semibold">{values[0]}</span>
                    <span className="text-slate-400">{stat}</span>
                    <span className="text-blue-400 font-semibold">{values[1]}</span>
                  </div>
                  <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full"
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
        <Card className="bg-slate-800 border-slate-700">
          <div className="p-12 text-center">
            <Clock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">Match Upcoming</h3>
            <p className="text-slate-400">Statistics will be available once the match starts</p>
          </div>
        </Card>
      )}
    </div>
  );
}