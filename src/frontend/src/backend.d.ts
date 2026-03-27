import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Wallpaper {
    id: bigint;
    title: string;
    featured: boolean;
    tags: Array<string>;
    trending: boolean;
    likes: bigint;
    imageUrl: string;
    addedDate: bigint;
    category: string;
    downloads: bigint;
}
export interface backendInterface {
    addWallpaper(title: string, imageUrl: string, category: string, tags: Array<string>, featured: boolean, trending: boolean): Promise<bigint>;
    deleteWallpaper(id: bigint): Promise<boolean>;
    getByCategory(category: string): Promise<Array<Wallpaper>>;
    getFeatured(): Promise<Array<Wallpaper>>;
    getPopular(limit: bigint): Promise<Array<Wallpaper>>;
    getRandom(): Promise<Wallpaper>;
    getTrending(): Promise<Array<Wallpaper>>;
    getWallpaper(id: bigint): Promise<Wallpaper | null>;
    getWallpaperCount(): Promise<bigint>;
    getWallpapers(): Promise<Array<Wallpaper>>;
    incrementDownload(id: bigint): Promise<boolean>;
    likeWallpaper(id: bigint): Promise<boolean>;
    searchWallpapers(searchTerm: string, category: string | null, minLikes: bigint | null, featuredOnly: boolean | null, trendingOnly: boolean | null): Promise<Array<Wallpaper>>;
    updateWallpaper(id: bigint, title: string, imageUrl: string, category: string, tags: Array<string>, featured: boolean, trending: boolean): Promise<boolean>;
}
