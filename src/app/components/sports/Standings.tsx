import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Standing } from '@/data/sportsData';

interface StandingsProps {
  standings: Standing[];
}

const Standings: React.FC<StandingsProps> = ({ standings }) => {
  // Group standings by league
  const leagues = standings.reduce((acc, standing) => {
    if (!acc[standing.league]) {
      acc[standing.league] = [];
    }
    acc[standing.league].push(standing);
    return acc;
  }, {} as Record<string, Standing[]>);

  return (
    <section id="standings" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
            <BarChart3 className="w-6 h-6 text-[#00d4ff]" />
            Standings
          </h2>
          <p className="text-gray-500 text-sm">League tables and rankings</p>
        </div>

        {/* Standings by league */}
        <div className="space-y-8">
          {Object.entries(leagues).map(([league, leagueStandings]) => (
            <div key={league} className="bg-[#161b22] border border-white/5 rounded-xl overflow-hidden">
              {/* League header */}
              <div className="px-6 py-4 bg-white/5 border-b border-white/5">
                <h3 className="text-white font-bold text-lg">{league}</h3>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[2%]">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Pos</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Team</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">P</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">W</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">D</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">L</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">GF</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">GA</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">GD</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leagueStandings.map((standing) => (
                      <tr key={standing.position} className="border-b border-white/5 hover:bg-white/5 transition-all">
                        <td className="px-6 py-3">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#00d4ff]/20 text-[#00d4ff] font-bold text-xs">
                            {standing.position}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <p className="text-white font-semibold text-sm">{standing.team}</p>
                        </td>
                        <td className="px-6 py-3 text-center text-gray-400 text-sm">{standing.played}</td>
                        <td className="px-6 py-3 text-center text-gray-400 text-sm">{standing.won}</td>
                        <td className="px-6 py-3 text-center text-gray-400 text-sm">{standing.drawn}</td>
                        <td className="px-6 py-3 text-center text-gray-400 text-sm">{standing.lost}</td>
                        <td className="px-6 py-3 text-center text-gray-400 text-sm">{standing.goalsFor}</td>
                        <td className="px-6 py-3 text-center text-gray-400 text-sm">{standing.goalsAgainst}</td>
                        <td className="px-6 py-3 text-center text-sm font-semibold">
                          <span className={standing.goalDifference > 0 ? 'text-green-400' : standing.goalDifference < 0 ? 'text-red-400' : 'text-gray-400'}>
                            {standing.goalDifference > 0 ? '+' : ''}{standing.goalDifference}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-center">
                          <span className="inline-flex items-center justify-center px-2.5 py-0.5 bg-[#00d4ff]/20 text-[#00d4ff] font-bold rounded text-sm">
                            {standing.points}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Standings;
