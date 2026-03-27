import {
  Heart,
  Menu,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

interface NavbarProps {
  page: Page;
  onNavigate: (page: Page) => void;
  searchQuery: string;
  onSearch: (q: string) => void;
}

const navLinks: { label: string; page: Page; icon: React.ReactNode }[] = [
  { label: "Home", page: "home", icon: <Zap className="w-4 h-4" /> },
  {
    label: "Trending",
    page: "trending",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    label: "Favorites",
    page: "favorites",
    icon: <Heart className="w-4 h-4" />,
  },
  { label: "AI Prompt", page: "ai", icon: <Sparkles className="w-4 h-4" /> },
  { label: "Admin", page: "admin", icon: <Settings className="w-4 h-4" /> },
];

export default function Navbar({
  page,
  onNavigate,
  searchQuery,
  onSearch,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-navy-border bg-navy-deep/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 h-16">
          <button
            type="button"
            data-ocid="nav.home.link"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center glow-purple">
              <span className="text-white font-black text-sm">AK</span>
            </div>
            <div className="hidden sm:block">
              <div className="gradient-text font-black text-lg leading-none">
                AKWP
              </div>
              <div className="text-muted-foreground text-[10px] leading-none">
                4K Wallpapers
              </div>
            </div>
          </button>

          <nav
            className="hidden lg:flex items-center gap-1 flex-1"
            data-ocid="nav.section"
          >
            {navLinks.map(({ label, page: p, icon }) => (
              <button
                key={p}
                type="button"
                data-ocid={`nav.${p}.link`}
                onClick={() => onNavigate(p)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  page === p
                    ? "bg-neon-purple/20 text-neon-purple glow-purple"
                    : "text-muted-foreground hover:text-foreground hover:bg-navy-surface"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </nav>

          <div className="flex-1 lg:flex-none lg:w-64 xl:w-80 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              data-ocid="nav.search_input"
              type="text"
              placeholder="Search wallpapers..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-navy-surface border border-navy-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-neon-purple/60 focus:shadow-glow-purple transition-all duration-200"
            />
          </div>

          <button
            type="button"
            data-ocid="nav.menu.toggle"
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-navy-border py-3 flex flex-col gap-1 animate-fade-in">
            {navLinks.map(({ label, page: p, icon }) => (
              <button
                key={p}
                type="button"
                data-ocid={`nav.mobile.${p}.link`}
                onClick={() => {
                  onNavigate(p);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  page === p
                    ? "bg-neon-purple/20 text-neon-purple"
                    : "text-muted-foreground hover:text-foreground hover:bg-navy-surface"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
