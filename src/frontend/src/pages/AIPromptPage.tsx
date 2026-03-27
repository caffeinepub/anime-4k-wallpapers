import { Lock, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AIPromptPage() {
  const [prompt, setPrompt] = useState("");
  const [attempted, setAttempted] = useState(false);

  const handleGenerate = () => {
    setAttempted(true);
    toast.info("✨ Coming soon! AI generation is not yet available.", {
      description:
        "We're working on integrating an AI wallpaper generator. Stay tuned!",
    });
  };

  const STYLE_PRESETS = [
    "Cinematic",
    "Aesthetic",
    "Dark",
    "Minimalist",
    "Epic Battle",
    "Ethereal",
    "Neon City",
  ];

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16" data-ocid="ai.page">
      <div className="text-center mb-12">
        <div className="w-20 h-20 rounded-2xl btn-gradient glow-purple flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-black gradient-text-hero mb-3">
          AI Wallpaper Generator
        </h1>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-sm font-semibold mb-4">
          <Lock className="w-3.5 h-3.5" />
          Coming Soon
        </div>
        <p className="text-muted-foreground text-base max-w-md mx-auto">
          Describe your perfect anime wallpaper and let AI bring it to life in
          stunning 4K. This feature is currently in development.
        </p>
      </div>

      <div className="card-navy rounded-2xl p-6 space-y-4" data-ocid="ai.panel">
        <label
          htmlFor="ai-prompt"
          className="block text-foreground font-semibold text-sm"
        >
          Your Prompt
        </label>
        <textarea
          id="ai-prompt"
          data-ocid="ai.textarea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Naruto in Sage Mode standing on a mountain at sunset, cinematic, 4K, ultra-detailed..."
          rows={4}
          className="w-full bg-navy-surface border border-navy-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm resize-none focus:outline-none focus:border-neon-purple/60 transition-all"
        />

        <div>
          <p className="text-muted-foreground text-xs mb-2">Style presets:</p>
          <div className="flex flex-wrap gap-2">
            {STYLE_PRESETS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setPrompt((p) => (p ? `${p}, ${s}` : s))}
                className="px-3 py-1.5 rounded-full bg-navy-deep border border-navy-border text-muted-foreground text-xs hover:border-neon-purple/50 hover:text-neon-purple transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          data-ocid="ai.submit_button"
          onClick={handleGenerate}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl btn-gradient text-white font-semibold hover:shadow-glow-purple transition-all duration-300"
        >
          <Wand2 className="w-4 h-4" />
          Generate Wallpaper
        </button>
      </div>

      {attempted && (
        <div
          className="mt-8 rounded-2xl overflow-hidden card-navy animate-fade-in"
          data-ocid="ai.preview.card"
        >
          <div className="aspect-video relative">
            <div className="absolute inset-0 shimmer" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center animate-pulse">
                <Sparkles className="w-8 h-8 text-neon-purple" />
              </div>
              <div className="text-center px-6">
                <p className="text-foreground font-semibold mb-1">
                  AI Generation Coming Soon
                </p>
                <p className="text-muted-foreground text-sm">
                  We're training our model on thousands of anime art styles.
                  Your prompt has been saved — be the first to know when it's
                  ready!
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between border-t border-navy-border">
            <span className="text-muted-foreground text-sm truncate">
              "{prompt || "Your prompt"}"
            </span>
            <span className="text-neon-purple text-xs font-semibold px-2 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20">
              Queued
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        {[
          {
            icon: "🎨",
            title: "Style Transfer",
            desc: "Apply any art style to your prompt",
          },
          {
            icon: "✨",
            title: "4K Upscaling",
            desc: "Auto-upscale to 3840×2160",
          },
          {
            icon: "🎭",
            title: "Character Mode",
            desc: "Faithful character rendering",
          },
        ].map((f) => (
          <div key={f.title} className="card-navy rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">{f.icon}</div>
            <h4 className="text-foreground font-semibold text-sm mb-1">
              {f.title}
            </h4>
            <p className="text-muted-foreground text-xs">{f.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
