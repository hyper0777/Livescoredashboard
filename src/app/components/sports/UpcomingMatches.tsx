import React from 'react';
import { Clock } from 'lucide-react';
import { UpcomingMatch, Sport } from '@/data/sportsData';

interface UpcomingMatchesProps {
  matches: UpcomingMatch[];
  activeSport: Sport;
}

const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ matches, activeSport }) => {
  const filteredMatches = activeSport === 'all' 
    ? matches 
    : matches.filter(m => m.sport === activeSport);

  return (
    <section id="upcoming" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-[#00d4ff]" />
            Upcoming Matches
          </h2>
          <p className="text-gray-500 text-sm">{filteredMatches.length} matches scheduled</p>
        </div>

        {/* Matches list */}
        {filteredMatches.length > 0 ? (
          <div className="space-y-3">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#161b22] border border-white/5 rounded-xl hover:border-white/20 hover:bg-[#1c2333] transition-all"
              >
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{match.league} • {match.sport}</p>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-white font-semibold text-sm">{match.homeTeam}</p>
                      <p className="text-gray-500 text-xs">{match.homeAbbr}</p>
                    </div>
                    <span className="text-gray-600 text-xs">vs</span>
                    <div className="text-center">
                      <p className="text-white font-semibold text-sm">{match.awayTeam}</p>
                      <p className="text-gray-500 text-xs">{match.awayAbbr}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#00d4ff] font-mono font-semibold text-sm">{match.scheduledTime}</p>
                  <button className="mt-2 px-3 py-1.5 text-xs font-semibold bg-white/5 text-gray-400 rounded-lg hover:bg-white/10 transition-all">
                    Set Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">No upcoming matches</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingMatches;
