import { Outlet, Link, useLocation } from "react-router";
import { Trophy, TrendingUp, Radio, Film, Menu, Bell, User } from "lucide-react";

export function Root() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-950 to-emerald-950 border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Live Updates
            </span>
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-emerald-400 transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <button className="hover:text-emerald-400 transition-colors">
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">LIVESCORE</h1>
                <p className="text-[10px] text-emerald-400 font-medium tracking-wider">PRO</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                to="/"
                className={`px-5 py-2.5 font-semibold text-sm transition-all relative group ${
                  location.pathname === "/"
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Live Scores
                {location.pathname === "/" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400"></div>
                )}
              </Link>
              <Link
                to="/streams"
                className={`px-5 py-2.5 font-semibold text-sm transition-all relative group ${
                  location.pathname === "/streams"
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4" />
                  Live TV
                </div>
                {location.pathname === "/streams" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400"></div>
                )}
              </Link>
              <Link
                to="/highlights"
                className={`px-5 py-2.5 font-semibold text-sm transition-all relative group ${
                  location.pathname === "/highlights"
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4" />
                  Highlights
                </div>
                {location.pathname === "/highlights" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400"></div>
                )}
              </Link>
              <Link
                to="/standings"
                className={`px-5 py-2.5 font-semibold text-sm transition-all relative group ${
                  location.pathname === "/standings"
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Tables
                </div>
                {location.pathname === "/standings" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400"></div>
                )}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-emerald-500" />
                <span className="font-bold text-white">LIVESCORE PRO</span>
              </div>
              <p className="text-slate-400 text-sm">
                Real-time sports scores, live streaming, and comprehensive match coverage.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Sports</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Football</li>
                <li>Basketball</li>
                <li>Cricket</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Live Scores</li>
                <li>Live Streaming</li>
                <li>Match Highlights</li>
                <li>League Tables</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-xs text-white">FB</span>
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-xs text-white">TW</span>
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-xs text-white">IG</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} LiveScore Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}