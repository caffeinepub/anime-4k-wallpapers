# Anime 4K Wallpaper App

## Current State
New project. Empty Motoko backend and blank React frontend scaffolded.

## Requested Changes (Diff)

### Add
- Motoko backend storing wallpaper metadata (id, title, imageUrl, category, tags, likes, downloads, featured, trending, addedDate)
- CRUD API: addWallpaper, getWallpapers, likeWallpaper, incrementDownload, updateWallpaper, deleteWallpaper
- React frontend with dark theme (black + navy blue, neon purple/blue glows)
- Masonry/grid gallery layout showing wallpaper cards
- Category filter tabs: All, Action, Sad, Alone, Couples, Dark, Aesthetic
- Search bar filtering by title/tags
- Full-screen preview modal with blurred background and neon glow
- Download button per wallpaper (browser download trigger)
- Favorites section (heart button, local state)
- Trending section sorted by likes/downloads
- "Daily New" section showing recently added wallpapers
- Admin panel for adding, editing, removing wallpapers
- Mock AI Prompt UI (coming-soon placeholder)
- Smooth animations, hover effects, animated transitions
- Sample wallpaper seed data with popular anime series (Naruto, Demon Slayer, JJK, One Piece, AOT, aesthetic scenes) using public CDN image URLs

### Modify
- Replace empty Motoko main.mo with full wallpaper data store

### Remove
- Nothing

## Implementation Plan
1. Motoko backend: Wallpaper type, stable var array, CRUD functions, like/download increment
2. Frontend: App shell with dark theme, nav bar
3. Gallery page: masonry grid, category tabs, search
4. Wallpaper card component with hover overlay, like, download buttons
5. Full-screen modal with blur + neon glow
6. Trending section and Daily New section on home
7. Favorites view (local state)
8. Admin panel (protected by simple toggle or route)
9. Mock AI Prompt tab
10. Seed ~20 wallpapers with real anime CDN image URLs
