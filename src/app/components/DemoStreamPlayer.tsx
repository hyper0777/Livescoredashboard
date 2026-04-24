import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Play, Pause, Maximize2, Volume2, VolumeX, Radio, Info } from "lucide-react";
import { Match } from "@/app/data/mockData";

interface DemoStreamPlayerProps {
  match: Match;
  onClose?: () => void;
}

export function DemoStreamPlayer({ match, onClose }: DemoStreamPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);

  return (
    <Card className="bg-slate-800/95 border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-white animate-pulse" />
              <span className="text-white font-semibold">Live Stream</span>
            </div>
            <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
            <Badge className="bg-blue-500/80 text-white">DEMO MODE</Badge>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          )}
        </div>
        <div className="mt-2 text-white">
          <div className="text-lg font-bold">
            {match.homeTeam} vs {match.awayTeam}
          </div>
          <div className="text-sm text-emerald-100">{match.league}</div>
        </div>
      </div>

      {/* Demo Stream Container */}
      <div className="relative aspect-video bg-black">
        {/* Simulated Video Feed */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-slate-900 to-blue-900/40">
          {/* Field Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMCAwIEwgMTAwIDAgTCAxMDAgMTAwIEwgMCAxMDAgWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          
          {/* Animated Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Pulsing Circle */}
              <div className={`w-32 h-32 rounded-full border-4 border-white/30 flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
                <div className="w-20 h-20 rounded-full border-4 border-emerald-400/50 flex items-center justify-center">
                  {isPlaying ? (
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">
                        {match.homeScore} - {match.awayScore}
                      </div>
                      <div className="text-xs text-emerald-400 mt-1">{match.time}</div>
                    </div>
                  ) : (
                    <Play className="w-10 h-10 text-white/80" />
                  )}
                </div>
              </div>
              
              {/* Live Indicator */}
              {isPlaying && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-500 text-white animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                    STREAMING
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Top Info Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="font-semibold">HD 1080p</span>
              </div>
            </div>
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>Demo Stream</span>
              </div>
            </div>
          </div>

          {/* Bottom Score Bar */}
          {isPlaying && (
            <div className="absolute bottom-20 left-4 right-4">
              <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="text-right">
                    <div className="text-white font-bold">{match.homeTeam}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-400">
                      {match.homeScore} - {match.awayScore}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{match.minute}</div>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold">{match.awayTeam}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  if (Number(e.target.value) > 0) setIsMuted(false);
                }}
                className="w-24 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${isMuted ? 0 : volume}%, #475569 ${isMuted ? 0 : volume}%, #475569 100%)`
                }}
              />
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <Maximize2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="p-4 bg-blue-900/20 border-t border-blue-700/30">
        <div className="flex items-center gap-2 text-sm text-blue-300">
          <Info className="w-4 h-4" />
          <span>
            This is a demo stream player. To watch actual live streams, the Football Live Stream API needs valid stream data for this specific match.
          </span>
        </div>
      </div>
    </Card>
  );
}
