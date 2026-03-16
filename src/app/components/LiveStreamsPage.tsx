import { LiveStreams } from "./LiveStreams";
import { useMatches } from "../hooks/useMatches";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export function LiveStreamsPage() {
  const { matches, loading, error, useMockData } = useMatches();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
        <p className="text-slate-400">Loading live streams...</p>
      </div>
    );
  }

  if (error && !useMockData) {
    return (
      <div className="py-8">
        <Alert className="bg-red-900/20 border-red-900">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-400">{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <LiveStreams matches={matches} />
    </div>
  );
}
