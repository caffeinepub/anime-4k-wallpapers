import { Download, Eye, Heart } from "lucide-react";
import type { Wallpaper } from "../backend.d";

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  onOpen: (wallpaper: Wallpaper) => void;
  index?: number;
}

export default function WallpaperCard({
  wallpaper,
  isFavorited,
  onToggleFavorite,
  onOpen,
  index = 0,
}: WallpaperCardProps) {
  const id = String(Number(wallpaper.id));

  return (
    <button
      type="button"
      data-ocid={`gallery.item.${index + 1}`}
      className="masonry-item group relative rounded-2xl overflow-hidden card-navy cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-card-hover text-left w-full"
      onClick={() => onOpen(wallpaper)}
    >
      <div className="relative overflow-hidden">
        <img
          src={wallpaper.imageUrl}
          alt={wallpaper.title}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{
            aspectRatio:
              index % 3 === 0 ? "3/4" : index % 3 === 1 ? "4/3" : "1/1",
          }}
          loading="lazy"
        />
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-neon-purple/90 text-white text-[10px] font-black tracking-wider">
          4K
        </div>
        {wallpaper.trending && (
          <div className="absolute top-2 right-10 px-2 py-0.5 rounded-md bg-neon-cyan/90 text-navy-deep text-[10px] font-black tracking-wider">
            🔥 HOT
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-3 flex gap-2">
            <div className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-xs font-medium">
              <Eye className="w-3.5 h-3.5" />
              Preview
            </div>
          </div>
        </div>
        <button
          type="button"
          data-ocid={`gallery.item.${index + 1}.toggle`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(id);
          }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isFavorited
              ? "bg-red-500/90 text-white glow-purple"
              : "bg-navy-deep/70 text-muted-foreground hover:text-red-400 hover:bg-navy-deep/90"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-3">
        <h3 className="text-foreground text-sm font-semibold truncate mb-1">
          {wallpaper.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-neon-purple text-xs font-medium capitalize px-2 py-0.5 rounded-full bg-neon-purple/10 border border-neon-purple/20">
            {wallpaper.category}
          </span>
          <div className="flex items-center gap-3 text-muted-foreground text-xs">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {Number(wallpaper.likes)}
            </span>
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {Number(wallpaper.downloads)}
            </span>
          </div>
        </div>
        {wallpaper.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {wallpaper.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-muted-foreground bg-navy-surface px-1.5 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
