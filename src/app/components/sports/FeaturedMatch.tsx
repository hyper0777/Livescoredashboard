import React from 'react';
import { X } from 'lucide-react';
import { LiveMatch } from '@/data/sportsData';

interface FeaturedMatchProps {
  match: LiveMatch | null;
  onClose: () => void;
}

const FeaturedMatch: React.FC<FeaturedMatchProps> = ({ match, onClose }) => {
  if (!match) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#161b22] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">{match.league}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Teams and Score */}
          <div className="mb-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              {/* Home Team */}
              <div className="flex-1 text-center">
                <div
                  className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-3 shadow-lg"
                  style={{ backgroundColor: match.homeColor }}
                >
                  {match.homeAbbr}
                </div>
                <p className="text-white font-semibold">{match.homeTeam}</p>
              </div>

              {/* Score */}
              <div className="text-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-5xl font-black text-white tabular-nums">{match.homeScore}</span>
                  <span className="text-3xl text-gray-600 font-light">-</span>
                  <span className="text-5xl font-black text-white tabular-nums">{match.awayScore}</span>
                </div>
                {match.status === 'live' && (
                  <span className="flex items-center justify-center gap-1.5 px-3 py-1 bg-red-500/20 rounded-full w-fit mx-auto">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-400 text-xs font-bold">LIVE - {match.time}</span>
                  </span>
                )}
              </div>

              {/* Away Team */}
              <div className="flex-1 text-center">
                <div
                  className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-3 shadow-lg"
                  style={{ backgroundColor: match.awayColor }}
                >
                  {match.awayAbbr}
                </div>
                <p className="text-white font-semibold">{match.awayTeam}</p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="text-center py-4 px-3 bg-white/5 rounded-lg">
              <p className="text-gray-400 text-sm capitalize">Sport: {match.sport}</p>
              <p className="text-gray-500 text-xs mt-1">League: {match.league}</p>
            </div>
          </div>

          {/* Match Info */}
          <div className="space-y-3 p-4 bg-white/5 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Match Time</span>
              <span className="text-white font-semibold">{match.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Status</span>
              <span className="text-white font-semibold capitalize">{match.status}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Sport</span>
              <span className="text-white font-semibold capitalize">{match.sport}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button className="flex-1 px-4 py-3 bg-[#00d4ff]/20 border border-[#00d4ff]/30 text-[#00d4ff] font-semibold rounded-lg hover:bg-[#00d4ff]/30 transition-all">
              Watch Live
            </button>
            <button className="flex-1 px-4 py-3 bg-white/10 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all">
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMatch;
