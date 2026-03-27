import { ArrowRight, Clock, Flame, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { Page } from "../App";
import type { Wallpaper } from "../backend.d";
import SkeletonCard from "../components/SkeletonCard";
import WallpaperCard from "../components/WallpaperCard";

const CATEGORIES = [
  "All",
  "Action",
  "Sad",
  "Alone",
  "Couples",
  "Dark",
  "Aesthetic",
];
const TOP_TAGS = [
  "naruto",
  "demonslayer",
  "4k",
  "aesthetic",
  "dark",
  "anime",
  "epic",
  "wallpaper",
  "jjk",
  "onepiece",
  "aot",
];
const POPULAR_SERIES = [
  { name: "Naruto", count: 48, color: "text-orange-400" },
  { name: "Demon Slayer", count: 36, color: "text-red-400" },
  { name: "Jujutsu Kaisen", count: 31, color: "text-purple-400" },
  { name: "One Piece", count: 27, color: "text-blue-400" },
  { name: "Attack on Titan", count: 22, color: "text-green-400" },
];
const SKELETON_DAILY = ["sk-d1", "sk-d2", "sk-d3", "sk-d4", "sk-d5"];
const SKELETON_GALLERY = [
  "sg1",
  "sg2",
  "sg3",
  "sg4",
  "sg5",
  "sg6",
  "sg7",
  "sg8",
  "sg9",
];
const SKELETON_SIDEBAR = ["ss1", "ss2", "ss3"];

interface HomePageProps {
  wallpapers: Wallpaper[];
  isLoading: boolean;
  searchQuery: string;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onOpenWallpaper: (w: Wallpaper) => void;
  onNavigate: (page: Page) => void;
}

export default function HomePage({
  wallpapers,
  isLoading,
  searchQuery,
  favorites,
  onToggleFavorite,
  onOpenWallpaper,
  onNavigate,
}: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredWallpapers = useMemo(() => {
    let result = wallpapers;
    if (activeCategory !== "All") {
      result = result.filter(
        (w) => w.category.toLowerCase() === activeCategory.toLowerCase(),
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q)) ||
          w.category.toLowerCase().includes(q),
      );
    }
    return result;
  }, [wallpapers, activeCategory, searchQuery]);

  const featuredWallpaper = wallpapers.find((w) => w.featured) ?? wallpapers[0];
  const dailyNew = useMemo(
    () =>
      [...wallpapers]
        .sort((a, b) => Number(b.addedDate) - Number(a.addedDate))
        .slice(0, 8),
    [wallpapers],
  );
  const trendingTop = useMemo(
    () =>
      [...wallpapers]
        .sort((a, b) => Number(b.likes) - Number(a.likes))
        .slice(0, 3),
    [wallpapers],
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Hero */}
      <section
        data-ocid="hero.section"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
      >
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-xs font-semibold">
            <Sparkles className="w-3 h-3" />
            4K Ultra HD Quality
          </div>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black uppercase tracking-tight leading-none">
            <span className="gradient-text-hero">ULTIMATE 4K</span>
            <br />
            <span className="text-foreground">ANIME</span>
            <br />
            <span className="gradient-text">WALLPAPERS</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md">
            Discover thousands of breathtaking 4K anime wallpapers from your
            favorite series. Download, save, and share stunning artwork for
            every mood.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={() => onNavigate("trending")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl btn-gradient text-white font-semibold hover:shadow-glow-purple transition-all duration-300"
            >
              Explore Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              data-ocid="hero.secondary_button"
              onClick={() => onNavigate("ai")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-navy-border text-foreground font-semibold hover:border-neon-purple/50 hover:text-neon-purple transition-all duration-300"
            >
              <Sparkles className="w-4 h-4" />
              AI Generate
            </button>
          </div>
        </div>

        <div className="relative">
          {isLoading || !featuredWallpaper ? (
            <div className="w-full aspect-video rounded-2xl shimmer" />
          ) : (
            <button
              type="button"
              className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => onOpenWallpaper(featuredWallpaper)}
              style={{ boxShadow: "0 0 60px oklch(0.58 0.27 307 / 0.25)" }}
            >
              <img
                src={featuredWallpaper.imageUrl}
                alt={featuredWallpaper.title}
                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-neon-purple/90 text-white text-[10px] font-black">
                    4K
                  </span>
                  <span className="px-2 py-0.5 rounded bg-yellow-500/90 text-black text-[10px] font-black">
                    FEATURED
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg">
                  {featuredWallpaper.title}
                </h3>
                <p className="text-muted-foreground text-sm capitalize">
                  {featuredWallpaper.category}
                </p>
              </div>
            </button>
          )}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-neon-purple/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-neon-blue/20 blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* Daily New */}
      <section data-ocid="daily.section">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-neon-cyan" />
          <h2 className="text-foreground text-xl font-bold">Daily New</h2>
          <span className="px-2 py-0.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs font-semibold">
            Fresh Today
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {isLoading
            ? SKELETON_DAILY.map((key) => (
                <div
                  key={key}
                  className="flex-shrink-0 w-48 h-72 rounded-xl shimmer"
                />
              ))
            : dailyNew.map((w, i) => (
                <button
                  key={Number(w.id)}
                  type="button"
                  data-ocid={`daily.item.${i + 1}`}
                  className="flex-shrink-0 w-48 rounded-xl overflow-hidden card-navy cursor-pointer group hover:scale-105 hover:shadow-card-hover transition-all duration-300 text-left"
                  onClick={() => onOpenWallpaper(w)}
                >
                  <div className="relative">
                    <img
                      src={w.imageUrl}
                      alt={w.title}
                      className="w-48 h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent" />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-neon-purple/90 text-white text-[9px] font-black">
                      4K
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-foreground text-xs font-semibold truncate">
                      {w.title}
                    </p>
                    <p className="text-muted-foreground text-[10px] capitalize">
                      {w.category}
                    </p>
                  </div>
                </button>
              ))}
        </div>
      </section>

      {/* Trending + Sidebar */}
      <section className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-8">
        <div data-ocid="gallery.section">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-orange-400" />
            <h2 className="text-foreground text-xl font-bold">Trending Now</h2>
          </div>

          <div
            className="flex gap-2 flex-wrap mb-6"
            data-ocid="gallery.filter.tab"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`gallery.${cat.toLowerCase()}.tab`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "btn-gradient text-white shadow-glow-purple"
                    : "bg-navy-surface border border-navy-border text-muted-foreground hover:text-foreground hover:border-neon-purple/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="masonry-grid">
              {SKELETON_GALLERY.map((key, i) => (
                <SkeletonCard key={key} index={i} />
              ))}
            </div>
          ) : filteredWallpapers.length === 0 ? (
            <div data-ocid="gallery.empty_state" className="py-20 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-foreground font-semibold mb-2">
                No wallpapers found
              </h3>
              <p className="text-muted-foreground text-sm">
                Try a different search or category
              </p>
            </div>
          ) : (
            <div className="masonry-grid">
              {filteredWallpapers.map((w, i) => (
                <WallpaperCard
                  key={Number(w.id)}
                  wallpaper={w}
                  isFavorited={favorites.has(String(Number(w.id)))}
                  onToggleFavorite={onToggleFavorite}
                  onOpen={onOpenWallpaper}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-6" data-ocid="sidebar.section">
          <div className="card-navy rounded-2xl p-4">
            <h3 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-purple" />
              Top Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {TOP_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="px-3 py-1 rounded-full bg-navy-surface border border-navy-border text-muted-foreground text-xs font-medium hover:border-neon-purple/50 hover:text-neon-purple transition-all"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          <div className="card-navy rounded-2xl p-4">
            <h3 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-cyan" />
              Popular Series
            </h3>
            <div className="space-y-3">
              {POPULAR_SERIES.map((s, i) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs w-4">
                      {i + 1}.
                    </span>
                    <span className={`text-sm font-medium ${s.color}`}>
                      {s.name}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    {s.count} walls
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-navy rounded-2xl p-4">
            <h3 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              Hot Right Now
            </h3>
            {isLoading ? (
              <div className="space-y-3">
                {SKELETON_SIDEBAR.map((key) => (
                  <div key={key} className="flex gap-2">
                    <div className="w-16 h-12 rounded-lg shimmer" />
                    <div className="flex-1 space-y-1">
                      <div className="h-3 w-full rounded shimmer" />
                      <div className="h-3 w-2/3 rounded shimmer" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {trendingTop.map((w, i) => (
                  <button
                    key={Number(w.id)}
                    type="button"
                    className="w-full flex gap-2 cursor-pointer group text-left"
                    onClick={() => onOpenWallpaper(w)}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={w.imageUrl}
                        alt={w.title}
                        className="w-16 h-12 object-cover rounded-lg transition-all group-hover:shadow-glow-purple"
                      />
                      <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full btn-gradient flex items-center justify-center text-white text-[9px] font-black">
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground text-xs font-semibold truncate group-hover:text-neon-purple transition-colors">
                        {w.title}
                      </p>
                      <p className="text-muted-foreground text-[10px]">
                        {Number(w.likes)} ❤️
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
