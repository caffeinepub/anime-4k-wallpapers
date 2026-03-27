import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Option "mo:core/Option";

actor {
  type Wallpaper = {
    id : Nat;
    title : Text;
    imageUrl : Text;
    category : Text;
    tags : [Text];
    likes : Nat;
    downloads : Nat;
    featured : Bool;
    trending : Bool;
    addedDate : Int;
  };

  module Wallpaper {
    func toText(wallpaper : Wallpaper) : Text {
      wallpaper.title.concat(" ").concat(wallpaper.category);
    };

    public func compare(wallpaper1 : Wallpaper, wallpaper2 : Wallpaper) : Order.Order {
      switch (Int.compare(wallpaper2.addedDate, wallpaper1.addedDate)) {
        case (#equal) { Nat.compare(wallpaper1.id, wallpaper2.id) };
        case (order) { order };
      };
    };
  };

  let wallpapers = Map.empty<Nat, Wallpaper>();

  var nextId = 1;

  func getWallpaperInternal(id : Nat) : Wallpaper {
    switch (wallpapers.get(id)) {
      case (null) { Runtime.trap("Wallpaper not found") };
      case (?wallpaper) { wallpaper };
    };
  };

  public query ({ caller }) func getWallpapers() : async [Wallpaper] {
    wallpapers.values().toArray().sort();
  };

  public query ({ caller }) func getWallpaper(id : Nat) : async ?Wallpaper {
    wallpapers.get(id);
  };

  public shared ({ caller }) func addWallpaper(title : Text, imageUrl : Text, category : Text, tags : [Text], featured : Bool, trending : Bool) : async Nat {
    let id = nextId;
    nextId += 1;

    let newWallpaper : Wallpaper = {
      id;
      title;
      imageUrl;
      category;
      tags;
      likes = 0;
      downloads = 0;
      featured;
      trending;
      addedDate = Time.now();
    };

    wallpapers.add(id, newWallpaper);
    id;
  };

  public shared ({ caller }) func updateWallpaper(id : Nat, title : Text, imageUrl : Text, category : Text, tags : [Text], featured : Bool, trending : Bool) : async Bool {
    let existing = getWallpaperInternal(id);
    let updated : Wallpaper = {
      existing with
      title;
      imageUrl;
      category;
      tags;
      featured;
      trending;
    };

    wallpapers.add(id, updated);
    true;
  };

  public shared ({ caller }) func deleteWallpaper(id : Nat) : async Bool {
    let _ = getWallpaperInternal(id);
    wallpapers.remove(id);
    true;
  };

  public shared ({ caller }) func likeWallpaper(id : Nat) : async Bool {
    let existing = getWallpaperInternal(id);
    let updated : Wallpaper = {
      existing with
      likes = existing.likes + 1;
    };
    wallpapers.add(id, updated);
    true;
  };

  public shared ({ caller }) func incrementDownload(id : Nat) : async Bool {
    let existing = getWallpaperInternal(id);
    let updated : Wallpaper = {
      existing with
      downloads = existing.downloads + 1;
    };
    wallpapers.add(id, updated);
    true;
  };

  public query ({ caller }) func searchWallpapers(searchTerm : Text, category : ?Text, minLikes : ?Nat, featuredOnly : ?Bool, trendingOnly : ?Bool) : async [Wallpaper] {
    let filtered = wallpapers.values().filter(
      func(w) {
        let searchMatch = w.title.toLower().contains(#text(searchTerm.toLower())) or w.category.toLower().contains(#text(searchTerm.toLower()));
        let categoryMatch = switch (category) {
          case (null) { true };
          case (?cat) { w.category == cat };
        };
        let minLikesMatch = switch (minLikes) {
          case (null) { true };
          case (?likes) { w.likes >= likes };
        };
        let featuredMatch = switch (featuredOnly) {
          case (null) { true };
          case (?true) { w.featured };
          case (?false) { true };
        };
        let trendingMatch = switch (trendingOnly) {
          case (null) { true };
          case (?true) { w.trending };
          case (?false) { true };
        };

        searchMatch and categoryMatch and minLikesMatch and featuredMatch and trendingMatch;
      }
    );
    filtered.toArray().sort();
  };

  public query ({ caller }) func getWallpaperCount() : async Nat {
    wallpapers.size();
  };

  public query ({ caller }) func getByCategory(category : Text) : async [Wallpaper] {
    wallpapers.values().toArray().filter(func(w) { w.category == category });
  };

  public query ({ caller }) func getFeatured() : async [Wallpaper] {
    wallpapers.values().toArray().filter(func(w) { w.featured });
  };

  public query ({ caller }) func getTrending() : async [Wallpaper] {
    wallpapers.values().toArray().filter(func(w) { w.trending });
  };

  public shared ({ caller }) func getRandom() : async Wallpaper {
    let wpArray = wallpapers.values().toArray();
    if (wpArray.size() == 0) { Runtime.trap("No wallpapers found") };
    let index = (Time.now() % wpArray.size().toInt()).toNat();
    wpArray[index];
  };

  public query ({ caller }) func getPopular(limit : Nat) : async [Wallpaper] {
    let resultSize = if (limit > wallpapers.size()) { wallpapers.size() } else { limit };

    if (resultSize == 0 or wallpapers.isEmpty()) {
      return [];
    };

    wallpapers.values().toArray().sort(
      func(w1, w2) {
        switch (Nat.compare(w2.likes, w1.likes)) {
          case (#equal) { switch (Nat.compare(w2.downloads, w1.downloads)) {
            case (#equal) { Int.compare(w2.addedDate, w1.addedDate) };
            case (order) { order };
          } };
          case (order) { order };
        };
      }
    ).sliceToArray(0, resultSize);
  };

  let initialSeed : [Wallpaper] = [
    {
      id = 1;
      title = "Naruto Action Pose";
      imageUrl = "https://picsum.photos/seed/anime1/800/1200";
      category = "Action";
      tags = ["Naruto", "action", "anime"];
      likes = 0;
      downloads = 0;
      featured = true;
      trending = true;
      addedDate = Time.now();
    },
    {
      id = 2;
      title = "Sad Ghibli Scene";
      imageUrl = "https://picsum.photos/seed/anime2/800/1200";
      category = "Sad";
      tags = ["Ghibli", "sad", "anime"];
      likes = 0;
      downloads = 0;
      featured = false;
      trending = true;
      addedDate = Time.now();
    },
    {
      id = 3;
      title = "Alone Warrior";
      imageUrl = "https://picsum.photos/seed/anime3/800/1200";
      category = "Alone";
      tags = ["warrior", "alone", "anime"];
      likes = 0;
      downloads = 0;
      featured = true;
      trending = false;
      addedDate = Time.now();
    },
    {
      id = 4;
      title = "Couple Under Stars";
      imageUrl = "https://picsum.photos/seed/anime4/800/1200";
      category = "Couples";
      tags = ["couple", "stars", "romance"];
      likes = 0;
      downloads = 0;
      featured = false;
      trending = false;
      addedDate = Time.now();
    },
    {
      id = 5;
      title = "Dark Demon Slayer";
      imageUrl = "https://picsum.photos/seed/anime5/800/1200";
      category = "Dark";
      tags = ["Demon Slayer", "dark", "anime"];
      likes = 0;
      downloads = 0;
      featured = true;
      trending = true;
      addedDate = Time.now();
    },
    {
      id = 6;
      title = "Aesthetic Sakura";
      imageUrl = "https://picsum.photos/seed/anime6/800/1200";
      category = "Aesthetic";
      tags = ["sakura", "aesthetic", "anime"];
      likes = 0;
      downloads = 0;
      featured = false;
      trending = true;
      addedDate = Time.now();
    },
    {
      id = 7;
      title = "Bleach Sword Fight";
      imageUrl = "https://picsum.photos/seed/anime7/800/1200";
      category = "Action";
      tags = ["Bleach", "sword", "fight"];
      likes = 0;
      downloads = 0;
      featured = true;
      trending = false;
      addedDate = Time.now();
    },
    {
      id = 8;
      title = "Your Name Sky View";
      imageUrl = "https://picsum.photos/seed/anime8/800/1200";
      category = "Aesthetic";
      tags = ["Your Name", "sky", "view"];
      likes = 0;
      downloads = 0;
      featured = true;
      trending = true;
      addedDate = Time.now();
    },
    {
      id = 9;
      title = "Alone Samurai";
      imageUrl = "https://picsum.photos/seed/anime9/800/1200";
      category = "Alone";
      tags = ["samurai", "alone", "anime"];
      likes = 0;
      downloads = 0;
      featured = false;
      trending = true;
      addedDate = Time.now();
    },
    {
      id = 10;
      title = "Romantic Rain Scene";
      imageUrl = "https://picsum.photos/seed/anime10/800/1200";
      category = "Couples";
      tags = ["romantic", "rain", "scene"];
      likes = 0;
      downloads = 0;
      featured = true;
      trending = false;
      addedDate = Time.now();
    },
  ];

  var seeded = false;
  system func preupgrade() {};
  system func postupgrade() {
    if (not seeded) {
      for (wp in initialSeed.values()) {
        wallpapers.add(wp.id, wp);
      };
      nextId := initialSeed.size() + 1;
      seeded := true;
    };
  };
};
