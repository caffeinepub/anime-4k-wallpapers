import { Flame, TrendingUp } from "lucide-react";
import type { Wallpaper } from "../backend.d";
import SkeletonCard from "../components/SkeletonCard";
import WallpaperCard from "../components/WallpaperCard";

const SKELETON_KEYS = [
  "sk1",
  "sk2",
  "sk3",
  "sk4",
  "sk5",
  "sk6",
  "sk7",
  "sk8",
  "sk9",
];

interface TrendingPageProps {
  wallpapers: Wallpaper[];
  isLoading: boolean;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onOpenWallpaper: (w: Wallpaper) => void;
}

export default function TrendingPage({
  wallpapers,
  isLoading,
  favorites,
  onToggleFavorite,
  onOpenWallpaper,
}: TrendingPageProps) {
  const sorted = [...wallpapers].sort(
    (a, b) =>
      Number(b.likes) +
      Number(b.downloads) -
      (Number(a.likes) + Number(a.downloads)),
  );

  return (
    <main
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
      data-ocid="trending.page"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
          <Flame className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h1 className="text-foreground text-2xl font-bold flex items-center gap-2">
            Trending Now
            <TrendingUp className="w-5 h-5 text-neon-cyan" />
          </h1>
          <p className="text-muted-foreground text-sm">
            Sorted by most liked + downloaded
          </p>
        </div>
      </div>

      {!isLoading && sorted.length >= 3 && (
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          data-ocid="trending.top.section"
        >
          {sorted.slice(0, 3).map((w, i) => (
            <button
              key={Number(w.id)}
              type="button"
              data-ocid={`trending.top.item.${i + 1}`}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.02] ${
                i === 0 ? "ring-2 ring-yellow-500/60" : ""
              }`}
              style={
                i === 0
                  ? { boxShadow: "0 0 30px oklch(0.79 0.13 214 / 0.3)" }
                  : {}
              }
              onClick={() => onOpenWallpaper(w)}
            >
              <img
                src={w.imageUrl}
                alt={w.title}
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 to-transparent" />
              <div className="absolute top-2 left-2">
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-black ${
                    i === 0
                      ? "bg-yellow-500 text-black"
                      : i === 1
                        ? "bg-gray-300 text-black"
                        : "bg-orange-600 text-white"
                  }`}
                >
                  #{i + 1}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <h3 className="text-white font-semibold text-sm truncate">
                  {w.title}
                </h3>
                <p className="text-muted-foreground text-xs">
                  {Number(w.likes)} ❤️ · {Number(w.downloads)} ⬇️
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="masonry-grid">
          {SKELETON_KEYS.map((key, i) => (
            <SkeletonCard key={key} index={i} />
          ))}
        </div>
      ) : (
        <div className="masonry-grid">
          {sorted.map((w, i) => (
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
    </main>
  );
}
