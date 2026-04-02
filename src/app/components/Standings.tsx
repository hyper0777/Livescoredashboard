import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, TrendingUp, TrendingDown, Minus, Award, Shield, AlertCircle } from "lucide-react";
import { useStandings } from "../hooks/useStandings";

export function Standings() {
  const { standings, loading, error, quotaExceeded } = useStandings("47"); // Premier League ID

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-emerald-500"></div>
        <p className="text-slate-400 mt-4">Loading standings...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Quota Warning Banner */}
      {quotaExceeded && (
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="bg-gradient-to-r from-amber-900/80 to-orange-900/80 backdrop-blur-sm border border-amber-700/50 rounded-xl p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-white font-bold mb-1">API Quota Exceeded - Demo Mode Active</h3>
                <p className="text-amber-200 text-sm">
                  The daily API request limit has been reached. Displaying sample standings data. Real data will be available when the quota resets.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 -mx-4 lg:-mx-0 mb-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-8 h-8 text-white" />
            <span className="text-white/90 text-sm font-semibold uppercase tracking-wide">Season 2025/26</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">League Table</h1>
          <p className="text-purple-100 text-lg">Premier League Standings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
                <tr>
                  <th className="text-left p-4 text-slate-300 font-bold uppercase text-xs tracking-wide">Pos</th>
                  <th className="text-left p-4 text-slate-300 font-bold uppercase text-xs tracking-wide">Club</th>
                  <th className="text-center p-4 text-slate-300 font-bold uppercase text-xs tracking-wide">P</th>
                  <th className="text-center p-4 text-slate-300 font-bold uppercase text-xs tracking-wide">W</th>
                  <th className="text-center p-4 text-slate-300 font-bold uppercase text-xs tracking-wide">D</th>
                  <th className="text-center p-4 text-slate-300 font-bold uppercase text-xs tracking-wide">L</th>
                  <th className="text-center p-4 text-slate-300 font-bold uppercase text-xs tracking-wide">GF</th>
                  <th className="text-center p-4 text-slate-300 font-bold uppercase text-xs tracking-wide">GA</th>
                  <th className="text-center p-4 text-slate-300 font-bold uppercase text-xs tracking-wide">GD</th>
                  <th className="text-center p-4 text-slate-300 font-bold uppercase text-xs tracking-wide">Pts</th>
                  <th className="text-center p-4 text-slate-300 font-bold uppercase text-xs tracking-wide">Form</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team, index) => {
                  const getPositionColor = () => {
                    if (team.position <= 4) return "border-l-4 border-l-emerald-500 bg-emerald-500/5";
                    if (team.position <= 6) return "border-l-4 border-l-blue-500 bg-blue-500/5";
                    if (team.position >= 18) return "border-l-4 border-l-red-500 bg-red-500/5";
                    return "";
                  };

                  const getPositionIcon = () => {
                    if (index === 0) return <Trophy className="w-5 h-5 text-yellow-500" />;
                    if (team.position <= 4) return <Award className="w-5 h-5 text-emerald-400" />;
                    if (team.position >= 18) return <TrendingDown className="w-5 h-5 text-red-400" />;
                    return null;
                  };

                  // Generate random form if not provided by API
                  const generateForm = () => {
                    const results = team.form || ['W', 'W', 'D', 'W', 'L'];
                    return results.slice(0, 5).map((result, i) => (
                      <div
                        key={i}
                        className={`w-7 h-7 text-xs font-bold flex items-center justify-center rounded ${
                          result === 'W'
                            ? 'bg-emerald-600 text-white'
                            : result === 'D'
                            ? 'bg-slate-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {result}
                      </div>
                    ));
                  };

                  return (
                    <tr
                      key={team.team}
                      className={`border-t border-slate-800/50 hover:bg-slate-800/50 transition-all ${getPositionColor()}`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {getPositionIcon()}
                          <span className="font-bold text-white text-lg w-6">
                            {team.position}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-white font-bold text-base">{team.team}</span>
                      </td>
                      <td className="p-4 text-center text-slate-300 font-medium">{team.played}</td>
                      <td className="p-4 text-center text-slate-300 font-medium">{team.won}</td>
                      <td className="p-4 text-center text-slate-300 font-medium">{team.drawn}</td>
                      <td className="p-4 text-center text-slate-300 font-medium">{team.lost}</td>
                      <td className="p-4 text-center text-slate-300 font-medium">{team.goalsFor}</td>
                      <td className="p-4 text-center text-slate-300 font-medium">{team.goalsAgainst}</td>
                      <td className="p-4 text-center">
                        <span
                          className={`font-bold text-base ${
                            team.goalDifference > 0
                              ? "text-emerald-400"
                              : team.goalDifference < 0
                              ? "text-red-400"
                              : "text-slate-300"
                          }`}
                        >
                          {team.goalDifference > 0 ? "+" : ""}
                          {team.goalDifference}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-white font-black text-xl">{team.points}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1 justify-center">{generateForm()}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="bg-slate-900/80 backdrop-blur-sm p-6 border-t border-slate-800/50">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-emerald-500 rounded shadow-sm"></div>
                <span className="text-slate-300 font-medium">Champions League</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded shadow-sm"></div>
                <span className="text-slate-300 font-medium">Europa League</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded shadow-sm"></div>
                <span className="text-slate-300 font-medium">Relegation Zone</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
