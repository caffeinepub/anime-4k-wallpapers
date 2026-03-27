import { Calendar, Download, Heart, Tag, TrendingUp, X } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import type { Wallpaper } from "../backend.d";
import { useIncrementDownload, useLikeWallpaper } from "../hooks/useQueries";

interface WallpaperModalProps {
  wallpaper: Wallpaper;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

export default function WallpaperModal({
  wallpaper,
  isFavorited,
  onToggleFavorite,
  onClose,
}: WallpaperModalProps) {
  const id = String(Number(wallpaper.id));
  const likeMutation = useLikeWallpaper();
  const downloadMutation = useIncrementDownload();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleDownload = () => {
    downloadMutation.mutate(wallpaper.id);
    const a = document.createElement("a");
    a.href = wallpaper.imageUrl;
    a.download = `${wallpaper.title.replace(/\s+/g, "_")}_4K.jpg`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Download started!");
  };

  const handleLike = () => {
    likeMutation.mutate(wallpaper.id);
    toast.success("Liked! ❤️");
  };

  const addedDate = new Date(
    Number(wallpaper.addedDate) / 1_000_000,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      data-ocid="wallpaper.modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={onClose}
        style={{
          backgroundImage: `url(${wallpaper.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px) brightness(0.2)",
        }}
      />
      <div className="absolute inset-0 bg-navy-deep/70 pointer-events-none" />

      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl card-navy animate-scale-in scrollbar-hide"
        style={{
          boxShadow:
            "0 0 0 1px oklch(0.58 0.27 307 / 0.5), 0 0 60px oklch(0.58 0.27 307 / 0.2)",
        }}
      >
        <button
          type="button"
          data-ocid="wallpaper.modal.close_button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-navy-surface/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-navy-border transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={wallpaper.imageUrl}
            alt={wallpaper.title}
            className="w-full object-cover max-h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-card/80 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-neon-purple/90 text-white text-xs font-black tracking-wider">
              4K
            </span>
            {wallpaper.trending && (
              <span className="px-2.5 py-1 rounded-lg bg-neon-cyan/90 text-navy-deep text-xs font-bold">
                🔥 Trending
              </span>
            )}
            {wallpaper.featured && (
              <span className="px-2.5 py-1 rounded-lg bg-yellow-500/90 text-navy-deep text-xs font-bold">
                ⭐ Featured
              </span>
            )}
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-foreground text-2xl font-bold mb-1">
              {wallpaper.title}
            </h2>
            <p className="text-muted-foreground text-sm capitalize">
              {wallpaper.category} • Added {addedDate}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-foreground font-semibold">
                {Number(wallpaper.likes)}
              </span>
              <span className="text-muted-foreground">likes</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Download className="w-4 h-4 text-neon-blue" />
              <span className="text-foreground font-semibold">
                {Number(wallpaper.downloads)}
              </span>
              <span className="text-muted-foreground">downloads</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-neon-cyan" />
              <span className="text-muted-foreground">{addedDate}</span>
            </div>
          </div>

          {wallpaper.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Tag className="w-4 h-4 text-muted-foreground mt-0.5" />
              {wallpaper.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              data-ocid="wallpaper.modal.primary_button"
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl btn-gradient text-white font-semibold text-sm hover:glow-purple transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Download 4K
            </button>
            <button
              type="button"
              data-ocid="wallpaper.modal.toggle"
              onClick={handleLike}
              className="px-4 py-3 rounded-xl bg-navy-surface border border-navy-border text-muted-foreground hover:text-red-400 hover:border-red-400/40 transition-all duration-200"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              type="button"
              data-ocid="wallpaper.modal.secondary_button"
              onClick={() => onToggleFavorite(id)}
              className={`px-4 py-3 rounded-xl border transition-all duration-200 ${
                isFavorited
                  ? "bg-neon-purple/20 border-neon-purple/50 text-neon-purple"
                  : "bg-navy-surface border-navy-border text-muted-foreground hover:text-neon-purple hover:border-neon-purple/40"
              }`}
            >
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4 py-3 px-4 rounded-xl bg-navy-surface border border-navy-border text-sm text-muted-foreground">
            <span>📁 Resolution: 3840 × 2160</span>
            <span>•</span>
            <span>🗜 ~12.8 MB</span>
            <span>•</span>
            <span>JPG / PNG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
