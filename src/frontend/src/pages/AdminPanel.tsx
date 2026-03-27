import { Check, Pencil, Plus, Settings, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Wallpaper } from "../backend.d";
import {
  useAddWallpaper,
  useDeleteWallpaper,
  useUpdateWallpaper,
} from "../hooks/useQueries";

const CATEGORIES = ["Action", "Sad", "Alone", "Couples", "Dark", "Aesthetic"];
const SKELETON_ROWS = ["sr1", "sr2", "sr3", "sr4", "sr5"];
const SKELETON_COLS = ["sc1", "sc2", "sc3", "sc4", "sc5", "sc6"];

interface AdminPanelProps {
  wallpapers: Wallpaper[];
  isLoading: boolean;
}

interface WallpaperForm {
  title: string;
  imageUrl: string;
  category: string;
  tags: string;
  featured: boolean;
  trending: boolean;
}

const emptyForm: WallpaperForm = {
  title: "",
  imageUrl: "",
  category: "Action",
  tags: "",
  featured: false,
  trending: false,
};

export default function AdminPanel({ wallpapers, isLoading }: AdminPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<bigint | null>(null);
  const [form, setForm] = useState<WallpaperForm>(emptyForm);
  const [deleteConfirmId, setDeleteConfirmId] = useState<bigint | null>(null);

  const addMutation = useAddWallpaper();
  const updateMutation = useUpdateWallpaper();
  const deleteMutation = useDeleteWallpaper();

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (w: Wallpaper) => {
    setEditId(w.id);
    setForm({
      title: w.title,
      imageUrl: w.imageUrl,
      category: w.category,
      tags: w.tags.join(", "),
      featured: w.featured,
      trending: w.trending,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.imageUrl.trim()) {
      toast.error("Title and image URL are required.");
      return;
    }
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (editId !== null) {
        await updateMutation.mutateAsync({
          id: editId,
          title: form.title,
          imageUrl: form.imageUrl,
          category: form.category,
          tags,
          featured: form.featured,
          trending: form.trending,
        });
        toast.success("Wallpaper updated!");
      } else {
        await addMutation.mutateAsync({
          title: form.title,
          imageUrl: form.imageUrl,
          category: form.category,
          tags,
          featured: form.featured,
          trending: form.trending,
        });
        toast.success("Wallpaper added!");
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditId(null);
    } catch {
      toast.error("Operation failed. Please try again.");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Wallpaper deleted.");
      setDeleteConfirmId(null);
    } catch {
      toast.error("Failed to delete wallpaper.");
    }
  };

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <main
      className="max-w-6xl mx-auto px-4 sm:px-6 py-8"
      data-ocid="admin.page"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-foreground text-2xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground text-sm">
              {wallpapers.length} wallpapers in library
            </p>
          </div>
        </div>
        <button
          type="button"
          data-ocid="admin.add_button"
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gradient text-white font-semibold text-sm hover:shadow-glow-purple transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Wallpaper
        </button>
      </div>

      {showForm && (
        <div
          className="card-navy rounded-2xl p-6 mb-8 animate-fade-in"
          data-ocid="admin.form.panel"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-foreground font-semibold text-lg">
              {editId !== null ? "Edit Wallpaper" : "Add New Wallpaper"}
            </h2>
            <button
              type="button"
              data-ocid="admin.form.close_button"
              onClick={() => {
                setShowForm(false);
                setEditId(null);
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-1">
              <label
                htmlFor="form-title"
                className="text-muted-foreground text-xs font-medium"
              >
                Title *
              </label>
              <input
                id="form-title"
                data-ocid="admin.form.title.input"
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="e.g. Tanjiro in the Flame District"
                className="w-full px-3 py-2.5 rounded-xl bg-navy-surface border border-navy-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-neon-purple/60 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="form-imageurl"
                className="text-muted-foreground text-xs font-medium"
              >
                Image URL *
              </label>
              <input
                id="form-imageurl"
                data-ocid="admin.form.imageurl.input"
                type="url"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
                placeholder="https://picsum.photos/seed/anime/800/1200"
                className="w-full px-3 py-2.5 rounded-xl bg-navy-surface border border-navy-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-neon-purple/60 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="form-category"
                className="text-muted-foreground text-xs font-medium"
              >
                Category
              </label>
              <select
                id="form-category"
                data-ocid="admin.form.category.select"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className="w-full px-3 py-2.5 rounded-xl bg-navy-surface border border-navy-border text-foreground text-sm focus:outline-none focus:border-neon-purple/60 transition-all"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-navy-card">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="form-tags"
                className="text-muted-foreground text-xs font-medium"
              >
                Tags (comma separated)
              </label>
              <input
                id="form-tags"
                data-ocid="admin.form.tags.input"
                type="text"
                value={form.tags}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tags: e.target.value }))
                }
                placeholder="naruto, shippuden, 4k, epic"
                className="w-full px-3 py-2.5 rounded-xl bg-navy-surface border border-navy-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-neon-purple/60 transition-all"
              />
            </div>
            <div className="flex gap-6 md:col-span-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-ocid="admin.form.featured.toggle"
                  role="switch"
                  aria-checked={form.featured}
                  onClick={() =>
                    setForm((f) => ({ ...f, featured: !f.featured }))
                  }
                  className={`w-10 h-6 rounded-full transition-all duration-200 relative flex-shrink-0 ${
                    form.featured
                      ? "bg-neon-purple"
                      : "bg-navy-surface border border-navy-border"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                      form.featured ? "left-5" : "left-1"
                    }`}
                  />
                </button>
                <span className="text-muted-foreground text-sm">Featured</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-ocid="admin.form.trending.toggle"
                  role="switch"
                  aria-checked={form.trending}
                  onClick={() =>
                    setForm((f) => ({ ...f, trending: !f.trending }))
                  }
                  className={`w-10 h-6 rounded-full transition-all duration-200 relative flex-shrink-0 ${
                    form.trending
                      ? "bg-neon-cyan"
                      : "bg-navy-surface border border-navy-border"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                      form.trending ? "left-5" : "left-1"
                    }`}
                  />
                </button>
                <span className="text-muted-foreground text-sm">Trending</span>
              </div>
            </div>
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button
                data-ocid="admin.form.submit_button"
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl btn-gradient text-white font-semibold text-sm hover:shadow-glow-purple transition-all disabled:opacity-50"
              >
                {isPending ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {editId !== null ? "Save Changes" : "Add Wallpaper"}
              </button>
              <button
                data-ocid="admin.form.cancel_button"
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-navy-surface border border-navy-border text-muted-foreground text-sm hover:text-foreground transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div
        className="card-navy rounded-2xl overflow-hidden"
        data-ocid="admin.table"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                  Preview
                </th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden lg:table-cell">
                  Stats
                </th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">
                  Flags
                </th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                SKELETON_ROWS.map((rowKey) => (
                  <tr key={rowKey} className="border-b border-navy-border/50">
                    {SKELETON_COLS.map((colKey) => (
                      <td key={colKey} className="px-4 py-3">
                        <div className="h-4 w-full rounded shimmer" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : wallpapers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    No wallpapers yet. Add one above!
                  </td>
                </tr>
              ) : (
                wallpapers.map((w, i) => (
                  <tr
                    key={Number(w.id)}
                    data-ocid={`admin.row.${i + 1}`}
                    className="border-b border-navy-border/50 hover:bg-navy-surface/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={w.imageUrl}
                        alt={w.title}
                        className="w-12 h-12 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://picsum.photos/seed/fallback/100/100";
                        }}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-foreground font-medium truncate max-w-48">
                        {w.title}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="px-2 py-0.5 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-xs">
                        {w.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">
                      {Number(w.likes)} ❤️ · {Number(w.downloads)} ⬇️
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex gap-1">
                        {w.featured && (
                          <span className="px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-[10px] font-semibold">
                            F
                          </span>
                        )}
                        {w.trending && (
                          <span className="px-1.5 py-0.5 rounded bg-neon-cyan/20 text-neon-cyan text-[10px] font-semibold">
                            T
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {deleteConfirmId === w.id ? (
                          <>
                            <button
                              type="button"
                              data-ocid={`admin.row.${i + 1}.confirm_button`}
                              onClick={() => handleDelete(w.id)}
                              className="px-2.5 py-1 rounded-lg bg-destructive/20 border border-destructive/40 text-destructive text-xs font-medium hover:bg-destructive/30 transition-all"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              data-ocid={`admin.row.${i + 1}.cancel_button`}
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2.5 py-1 rounded-lg bg-navy-surface border border-navy-border text-muted-foreground text-xs hover:text-foreground transition-all"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              data-ocid={`admin.row.${i + 1}.edit_button`}
                              onClick={() => openEdit(w)}
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-neon-blue hover:bg-neon-blue/10 transition-all"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              data-ocid={`admin.row.${i + 1}.delete_button`}
                              onClick={() => setDeleteConfirmId(w.id)}
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
