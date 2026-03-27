export default function SkeletonCard({ index = 0 }: { index?: number }) {
  const heights = ["aspect-[3/4]", "aspect-[4/3]", "aspect-square"];
  const h = heights[index % 3];
  return (
    <div
      className="masonry-item rounded-2xl overflow-hidden card-navy"
      data-ocid="gallery.loading_state"
    >
      <div className={`w-full ${h} shimmer`} />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 rounded shimmer" />
        <div className="h-3 w-1/2 rounded shimmer" />
      </div>
    </div>
  );
}
