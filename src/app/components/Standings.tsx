import { premierLeagueStandings } from "../data/mockData";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

export function Standings() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">League Standings</h2>
        <p className="text-slate-400">Premier League 2025/26</p>
      </div>

      <Card className="bg-slate-800 border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="text-left p-4 text-slate-400 font-semibold">Pos</th>
                <th className="text-left p-4 text-slate-400 font-semibold">Team</th>
                <th className="text-center p-4 text-slate-400 font-semibold">P</th>
                <th className="text-center p-4 text-slate-400 font-semibold">W</th>
                <th className="text-center p-4 text-slate-400 font-semibold">D</th>
                <th className="text-center p-4 text-slate-400 font-semibold">L</th>
                <th className="text-center p-4 text-slate-400 font-semibold">GF</th>
                <th className="text-center p-4 text-slate-400 font-semibold">GA</th>
                <th className="text-center p-4 text-slate-400 font-semibold">GD</th>
                <th className="text-center p-4 text-slate-400 font-semibold">Pts</th>
                <th className="text-center p-4 text-slate-400 font-semibold">Form</th>
              </tr>
            </thead>
            <tbody>
              {premierLeagueStandings.map((team, index) => {
                const getPositionColor = () => {
                  if (team.position <= 4) return "text-emerald-400";
                  if (team.position <= 6) return "text-blue-400";
                  if (team.position >= 18) return "text-red-400";
                  return "text-white";
                };

                const getPositionIcon = () => {
                  if (index === 0) return <Trophy className="w-4 h-4 text-yellow-500" />;
                  if (team.position <= 4) return <TrendingUp className="w-4 h-4 text-emerald-400" />;
                  if (team.position >= 18) return <TrendingDown className="w-4 h-4 text-red-400" />;
                  return <Minus className="w-4 h-4 text-slate-500" />;
                };

                // Generate random form
                const generateForm = () => {
                  const results = ['W', 'W', 'D', 'W', 'L'];
                  return results.map((result, i) => (
                    <Badge
                      key={i}
                      className={`w-6 h-6 text-xs flex items-center justify-center p-0 ${
                        result === 'W'
                          ? 'bg-emerald-600 hover:bg-emerald-600'
                          : result === 'D'
                          ? 'bg-slate-600 hover:bg-slate-600'
                          : 'bg-red-600 hover:bg-red-600'
                      }`}
                    >
                      {result}
                    </Badge>
                  ));
                };

                return (
                  <tr
                    key={team.team}
                    className="border-t border-slate-700 hover:bg-slate-750 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getPositionIcon()}
                        <span className={`font-semibold ${getPositionColor()}`}>
                          {team.position}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-white font-semibold">{team.team}</span>
                    </td>
                    <td className="p-4 text-center text-slate-300">{team.played}</td>
                    <td className="p-4 text-center text-slate-300">{team.won}</td>
                    <td className="p-4 text-center text-slate-300">{team.drawn}</td>
                    <td className="p-4 text-center text-slate-300">{team.lost}</td>
                    <td className="p-4 text-center text-slate-300">{team.goalsFor}</td>
                    <td className="p-4 text-center text-slate-300">{team.goalsAgainst}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`font-semibold ${
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
                      <span className="text-white font-bold text-lg">{team.points}</span>
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
        <div className="bg-slate-900 p-4 border-t border-slate-700">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-400 rounded"></div>
              <span className="text-slate-400">Champions League</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded"></div>
              <span className="text-slate-400">Europa League</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded"></div>
              <span className="text-slate-400">Relegation</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
