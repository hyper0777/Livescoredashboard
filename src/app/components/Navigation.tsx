import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { Trophy, TrendingUp, Radio, Film, Menu, X } from "lucide-react";

export function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Live Scores", icon: null },
    { href: "/streams", label: "Live Streams", icon: Radio },
    { href: "/highlights", label: "Highlights", icon: Film },
    { href: "/standings", label: "Standings", icon: TrendingUp },
  ];

  const isActive = (href: string) => location.pathname === href;

  const navLinkClass = (href: string) =>
    `px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
      isActive(href)
        ? "bg-emerald-600 text-white"
        : "text-slate-300 hover:text-white hover:bg-slate-800"
    }`;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Trophy className="w-8 h-8 text-emerald-500" />
              <h1 className="text-2xl font-bold text-white">LiveScore</h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} to={link.href} className={navLinkClass(link.href)}>
                    {Icon && <Icon className="w-4 h-4" />}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 flex flex-col gap-2 pb-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${navLinkClass(link.href)} w-full justify-start`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 text-center text-slate-400">
          <p>Live Score Dashboard - Real-time sports updates</p>
        </div>
      </footer>
    </div>
  );
}
