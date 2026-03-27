import { Heart } from "lucide-react";
import type { Wallpaper } from "../backend.d";
import WallpaperCard from "../components/WallpaperCard";

interface FavoritesPageProps {
  wallpapers: Wallpaper[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onOpenWallpaper: (w: Wallpaper) => void;
}

export default function FavoritesPage({
  wallpapers,
  favorites,
  onToggleFavorite,
  onOpenWallpaper,
}: FavoritesPageProps) {
  const favorited = wallpapers.filter((w) =>
    favorites.has(String(Number(w.id))),
  );

  return (
    <main
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
      data-ocid="favorites.page"
    >
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-6 h-6 text-red-400 fill-current" />
        <div>
          <h1 className="text-foreground text-2xl font-bold">My Favorites</h1>
          <p className="text-muted-foreground text-sm">
            {favorited.length} saved wallpapers
          </p>
        </div>
      </div>

      {favorited.length === 0 ? (
        <div data-ocid="favorites.empty_state" className="py-24 text-center">
          <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-red-400" />
          </div>
          <h3 className="text-foreground text-xl font-semibold mb-2">
            No favorites yet
          </h3>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto">
            Start exploring wallpapers and tap the ❤️ to save your favorites
            here.
          </p>
        </div>
      ) : (
        <div className="masonry-grid">
          {favorited.map((w, i) => (
            <WallpaperCard
              key={Number(w.id)}
              wallpaper={w}
              isFavorited
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
