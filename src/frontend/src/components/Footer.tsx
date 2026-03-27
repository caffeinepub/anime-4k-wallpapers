import { Zap } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="border-t border-navy-border bg-navy-card mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl btn-gradient flex items-center justify-center">
                <span className="text-white font-black text-xs">AK</span>
              </div>
              <span className="gradient-text font-black text-lg">AKWP</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The ultimate destination for 4K anime wallpapers. Curated
              collections from your favorite series.
            </p>
          </div>
          {/* Categories */}
          <div>
            <h4 className="text-foreground font-semibold mb-3">Categories</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {["Action", "Aesthetic", "Dark", "Sad", "Alone", "Couples"].map(
                (c) => (
                  <li
                    key={c}
                    className="hover:text-neon-purple cursor-pointer transition-colors"
                  >
                    {c}
                  </li>
                ),
              )}
            </ul>
          </div>
          {/* Popular Series */}
          <div>
            <h4 className="text-foreground font-semibold mb-3">
              Popular Series
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {[
                "Naruto",
                "Demon Slayer",
                "Jujutsu Kaisen",
                "One Piece",
                "Attack on Titan",
              ].map((s) => (
                <li
                  key={s}
                  className="hover:text-neon-purple cursor-pointer transition-colors"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-navy-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-sm">
            © {year} AKWP. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Built with <Zap className="w-3.5 h-3.5 text-neon-purple" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-purple hover:text-neon-cyan transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
