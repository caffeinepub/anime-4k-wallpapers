import { Toaster } from "@/components/ui/sonner";
import { useCallback, useEffect, useState } from "react";
import type { Wallpaper } from "./backend.d";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import WallpaperModal from "./components/WallpaperModal";
import { useWallpapers } from "./hooks/useQueries";
import AIPromptPage from "./pages/AIPromptPage";
import AdminPanel from "./pages/AdminPanel";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import TrendingPage from "./pages/TrendingPage";

export type Page = "home" | "trending" | "favorites" | "admin" | "ai";

const FAVORITES_KEY = "akwp_favorites";

function loadFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (raw) return new Set<string>(JSON.parse(raw));
  } catch {
    // ignore
  }
  return new Set<string>();
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(
    null,
  );
  const [favorites, setFavorites] = useState<Set<string>>(loadFavorites);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: wallpapers = [], isLoading } = useWallpapers();

  // Persist favorites
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleNavigate = useCallback((p: Page) => {
    setPage(p);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const commonProps = {
    wallpapers,
    isLoading,
    favorites,
    onToggleFavorite: toggleFavorite,
    onOpenWallpaper: setSelectedWallpaper,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        page={page}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      <div className="flex-1">
        {page === "home" && (
          <HomePage
            {...commonProps}
            searchQuery={searchQuery}
            onNavigate={handleNavigate}
          />
        )}
        {page === "trending" && <TrendingPage {...commonProps} />}
        {page === "favorites" && (
          <FavoritesPage
            wallpapers={wallpapers}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenWallpaper={setSelectedWallpaper}
          />
        )}
        {page === "admin" && (
          <AdminPanel wallpapers={wallpapers} isLoading={isLoading} />
        )}
        {page === "ai" && <AIPromptPage />}
      </div>

      <Footer />

      {selectedWallpaper && (
        <WallpaperModal
          wallpaper={selectedWallpaper}
          isFavorited={favorites.has(String(Number(selectedWallpaper.id)))}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedWallpaper(null)}
        />
      )}

      <Toaster richColors position="bottom-right" />
    </div>
  );
}
