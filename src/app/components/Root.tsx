import { Outlet, Link, useLocation } from "react-router";
import { useEffect } from "react";
import { Trophy, TrendingUp, Radio, Film } from "lucide-react";

const seoByPath: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Live Scores | LiveScore Dashboard",
    description: "Follow real-time football, basketball, and cricket scores with fast match updates.",
  },
  "/streams": {
    title: "Live Streams | LiveScore Dashboard",
    description: "Watch available live sports streams and track ongoing matches in one place.",
  },
  "/highlights": {
    title: "Highlights | LiveScore Dashboard",
    description: "Catch recent match highlights, key moments, and top sports clips.",
  },
  "/standings": {
    title: "Standings | LiveScore Dashboard",
    description: "View up-to-date league standings, team positions, and season performance.",
  },
};

export function Root() {
  const location = useLocation();

  useEffect(() => {
    const matchDetailPattern = /^\/match\//;
    const seo = matchDetailPattern.test(location.pathname)
      ? {
          title: "Match Details | LiveScore Dashboard",
          description: "See lineups, scoreline context, and live match information.",
        }
      : seoByPath[location.pathname] ?? {
          title: "LiveScore Dashboard",
          description: "Real-time sports updates for scores, streams, highlights, and standings.",
        };

    document.title = seo.title;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", seo.description);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Trophy className="w-8 h-8 text-emerald-500" />
              <h1 className="text-2xl font-bold text-white">LiveScore</h1>
            </Link>
            <nav className="flex gap-6">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === "/"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                Live Scores
              </Link>
              <Link
                to="/streams"
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  location.pathname === "/streams"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Radio className="w-4 h-4" />
                Live Streams
              </Link>
              <Link
                to="/highlights"
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  location.pathname === "/highlights"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Film className="w-4 h-4" />
                Highlights
              </Link>
              <Link
                to="/standings"
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  location.pathname === "/standings"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Standings
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-slate-400">
          <p>Live Score Dashboard - Real-time sports updates</p>
        </div>
      </footer>
    </div>
  );
}
