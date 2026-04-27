import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Play, Loader2, X, Film, AlertCircle, Clock, Eye } from "lucide-react";
import { projectId, publicAnonKey } from "@utils/supabase/info";
import { Match } from "@/app/data/mockData";

interface HighlightViewerProps {
  match: Match;
  onClose?: () => void;
}

interface HighlightLink {
  title: string;
  url: string;
  quality?: string;
  duration?: string;
}

export function HighlightViewer({ match, onClose }: HighlightViewerProps) {
  const [loading, setLoading] = useState(false);
  const [highlights, setHighlights] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedHighlight, setSelectedHighlight] = useState<HighlightLink | null>(null);

  const fetchHighlights = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ed1dd9fb/highlights/${match.id}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      console.log("Highlights response:", data);
      
      if (data.error) {
        throw new Error(data.message || data.error);
      }

      if (data.success && data.highlights) {
        setHighlights(data.highlights);
      } else {
        throw new Error(data.message || "No highlights available for this match");
      }
    } catch (err) {
      console.error("Error fetching highlights:", err);
      setError(err instanceof Error ? err.message : "Failed to load highlights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-slate-800/95 border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Match Highlights</span>
            </div>
            <Badge className="bg-white/20 text-white backdrop-blur-sm">
              {match.status === "finished" ? "Full Highlights" : "Available Soon"}
            </Badge>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
        <div className="mt-2 text-white">
          <div className="text-lg font-bold">
            {match.homeTeam} vs {match.awayTeam}
          </div>
          <div className="text-sm text-purple-100">{match.league}</div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative bg-slate-900">
        {!highlights && !loading && !error && (
          <div className="flex flex-col items-center justify-center p-12 gap-4">
            <div className="w-20 h-20 rounded-full bg-purple-600/20 flex items-center justify-center">
              <Film className="w-10 h-10 text-purple-500" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                Ready to Watch Highlights
              </h3>
              <p className="text-slate-400 mb-4">
                Click below to load match highlights and key moments
              </p>
            </div>
            <Button
              onClick={fetchHighlights}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Load Highlights
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center p-12 gap-4">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
            <p className="text-slate-400">Loading highlights...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center p-12 gap-4">
            <div className="w-20 h-20 rounded-full bg-red-600/20 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <div className="text-center max-w-md">
              <h3 className="text-xl font-semibold text-white mb-2">
                Highlights Unavailable
              </h3>
              <p className="text-slate-400 mb-4">{error}</p>
              <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3 mb-4">
                <p className="text-sm text-amber-300">
                  Highlights may not be available yet. They're usually published shortly after the match ends.
                </p>
              </div>
            </div>
            <Button
              onClick={fetchHighlights}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Try Again
            </Button>
          </div>
        )}

        {highlights && !selectedHighlight && (
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">Available Highlights</h3>
              <p className="text-sm text-slate-400">Select a highlight to watch</p>
            </div>

            {/* Display highlights data */}
            <div className="space-y-3">
              {/* Demo Highlights since we don't know the exact API response structure */}
              <HighlightCard
                title="Full Match Highlights"
                duration="8:45"
                views="125K"
                thumbnail="featured"
                onClick={() => setSelectedHighlight({ title: "Full Match Highlights", url: "#" })}
              />
              <HighlightCard
                title="Best Goals"
                duration="3:20"
                views="89K"
                thumbnail="goals"
                onClick={() => setSelectedHighlight({ title: "Best Goals", url: "#" })}
              />
              <HighlightCard
                title="Key Moments"
                duration="5:15"
                views="67K"
                thumbnail="moments"
                onClick={() => setSelectedHighlight({ title: "Key Moments", url: "#" })}
              />
            </div>

            {/* Show raw API response for debugging */}
            <div className="mt-6 bg-slate-800 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-2">API Response:</p>
              <pre className="text-xs text-emerald-400 overflow-auto max-h-40">
                {JSON.stringify(highlights, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {selectedHighlight && (
          <div className="p-6">
            <Button
              onClick={() => setSelectedHighlight(null)}
              variant="ghost"
              size="sm"
              className="mb-4 text-slate-400 hover:text-white"
            >
              ← Back to list
            </Button>
            
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Film className="w-16 h-16 text-white/60 mb-4 mx-auto" />
                  <p className="text-white mb-2">Video Player</p>
                  <p className="text-sm text-slate-400">{selectedHighlight.title}</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-white">{selectedHighlight.title}</h3>
          </div>
        )}
      </div>

      {/* Match Info Footer */}
      <div className="p-4 bg-slate-800/50 border-t border-slate-700">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="text-slate-400">Final Score</div>
            <div className="text-2xl font-bold text-white">
              {match.homeScore} - {match.awayScore}
            </div>
          </div>
          <div className="text-slate-400">
            {match.time}
          </div>
        </div>
      </div>
    </Card>
  );
}

interface HighlightCardProps {
  title: string;
  duration: string;
  views: string;
  thumbnail: string;
  onClick: () => void;
}

function HighlightCard({ title, duration, views, thumbnail, onClick }: HighlightCardProps) {
  const gradients = {
    featured: "from-purple-600 to-pink-600",
    goals: "from-orange-600 to-red-600",
    moments: "from-blue-600 to-cyan-600",
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-purple-500/50 rounded-lg p-4 transition-all group"
    >
      <div className="flex items-center gap-4">
        {/* Thumbnail */}
        <div className={`w-32 h-20 rounded-lg bg-gradient-to-br ${gradients[thumbnail as keyof typeof gradients] || gradients.featured} flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/30"></div>
          <Play className="w-8 h-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {duration}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-left">
          <h4 className="text-white font-semibold mb-1 group-hover:text-purple-400 transition-colors">
            {title}
          </h4>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {views} views
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {duration}
            </span>
          </div>
        </div>

        {/* Play Icon */}
        <div className="text-slate-500 group-hover:text-purple-500 transition-colors">
          <Play className="w-6 h-6" />
        </div>
      </div>
    </button>
  );
}
