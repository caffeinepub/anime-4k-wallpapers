import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useWallpapers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["wallpapers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWallpapers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTrendingWallpapers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTrending();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedWallpapers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeatured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLikeWallpaper() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.likeWallpaper(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wallpapers"] });
      qc.invalidateQueries({ queryKey: ["trending"] });
    },
  });
}

export function useIncrementDownload() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.incrementDownload(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wallpapers"] });
    },
  });
}

export function useAddWallpaper() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      imageUrl: string;
      category: string;
      tags: string[];
      featured: boolean;
      trending: boolean;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addWallpaper(
        params.title,
        params.imageUrl,
        params.category,
        params.tags,
        params.featured,
        params.trending,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wallpapers"] });
      qc.invalidateQueries({ queryKey: ["trending"] });
      qc.invalidateQueries({ queryKey: ["featured"] });
    },
  });
}

export function useUpdateWallpaper() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      title: string;
      imageUrl: string;
      category: string;
      tags: string[];
      featured: boolean;
      trending: boolean;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateWallpaper(
        params.id,
        params.title,
        params.imageUrl,
        params.category,
        params.tags,
        params.featured,
        params.trending,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wallpapers"] });
      qc.invalidateQueries({ queryKey: ["trending"] });
      qc.invalidateQueries({ queryKey: ["featured"] });
    },
  });
}

export function useDeleteWallpaper() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteWallpaper(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wallpapers"] });
      qc.invalidateQueries({ queryKey: ["trending"] });
      qc.invalidateQueries({ queryKey: ["featured"] });
    },
  });
}
