import { Outlet, Link, useLocation } from "react-router";
import { Trophy, TrendingUp, Radio, Film, Menu, Bell, User, Search } from "lucide-react";
import { useState } from "react";

export function Root() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0d1117]/95 backdrop-blur-xl border-b border-white/5">
        {/* Top bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex items-center justify-center shadow-lg shadow-[#00d4ff]/20">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#00ff88] rounded-full animate-pulse border-2 border-[#0d1117]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Score<span className="text-[#00d4ff]">Hub</span>
                </h1>
                <p className="text-[10px] text-gray-500 -mt-0.5 tracking-widest uppercase">Live Sports</p>
              </div>
            </Link>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button className="relative p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`${mobileMenuOpen ? 'flex flex-col gap-1 py-2' : 'hidden lg:flex'} items-start lg:items-center lg:flex-row gap-0 lg:gap-1`}>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap w-full lg:w-auto text-left ${
                location.pathname === "/"
                  ? "text-[#00d4ff] bg-[#00d4ff]/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Live Scores
            </Link>
            <Link
              to="/streams"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap w-full lg:w-auto text-left flex items-center gap-2 ${
                location.pathname === "/streams"
                  ? "text-[#00d4ff] bg-[#00d4ff]/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Radio className="w-4 h-4" />
              Live Streams
            </Link>
            <Link
              to="/highlights"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap w-full lg:w-auto text-left flex items-center gap-2 ${
                location.pathname === "/highlights"
                  ? "text-[#00d4ff] bg-[#00d4ff]/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Film className="w-4 h-4" />
              Highlights
            </Link>
            <Link
              to="/standings"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap w-full lg:w-auto text-left flex items-center gap-2 ${
                location.pathname === "/standings"
                  ? "text-[#00d4ff] bg-[#00d4ff]/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Tables
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#161b22] border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white">ScoreHub</span>
              </div>
              <p className="text-gray-500 text-sm">
                Real-time sports scores, live streaming, and comprehensive match coverage.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Sports</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-[#00d4ff] cursor-pointer transition-colors">Football</li>
                <li className="hover:text-[#00d4ff] cursor-pointer transition-colors">Basketball</li>
                <li className="hover:text-[#00d4ff] cursor-pointer transition-colors">Cricket</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-[#00d4ff] cursor-pointer transition-colors">Live Scores</li>
                <li className="hover:text-[#00d4ff] cursor-pointer transition-colors">Live Streaming</li>
                <li className="hover:text-[#00d4ff] cursor-pointer transition-colors">Match Highlights</li>
                <li className="hover:text-[#00d4ff] cursor-pointer transition-colors">League Tables</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/30 border border-white/5 transition-all cursor-pointer group">
                  <span className="text-xs text-gray-400 group-hover:text-[#00d4ff] font-bold">FB</span>
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/30 border border-white/5 transition-all cursor-pointer group">
                  <span className="text-xs text-gray-400 group-hover:text-[#00d4ff] font-bold">TW</span>
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/30 border border-white/5 transition-all cursor-pointer group">
                  <span className="text-xs text-gray-400 group-hover:text-[#00d4ff] font-bold">IG</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} ScoreHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}