import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MapPin, MoreHorizontal } from "lucide-react";

interface GalleryItem {
  image: string;
  style: string;
  description?: string;
  location?: string;
  mentions?: string[];
}

interface Props {
  gallery: GalleryItem[];
  artistName: string;
  artistImage?: string;
}

const ArtistGallery = ({ gallery, artistName, artistImage }: Props) => {
  const styles = ["Todos", ...Array.from(new Set(gallery.map((g) => g.style)))];
  const [activeStyle, setActiveStyle] = useState("Todos");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());

  const filtered = activeStyle === "Todos" ? gallery : gallery.filter((g) => g.style === activeStyle);

  const toggleLike = (i: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const toggleSave = (i: number) => {
    setSavedPosts((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">Galería de Trabajos</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => setActiveStyle(style)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeStyle === style
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary text-foreground border-border hover:border-primary"
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item, i) => {
          const isLiked = likedPosts.has(i);
          const isSaved = savedPosts.has(i);
          const isExpanded = expandedPosts.has(i);
          const descText = item.description || `Trabajo de ${item.style}`;
          const showMore = descText.length > 80;

          return (
            <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  {artistImage ? (
                    <img src={artistImage} alt={artistName} className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/30" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      {artistName.charAt(0)}
                    </div>
                  )}
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-foreground">{artistName}</p>
                    {item.location && (
                      <p className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </p>
                    )}
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.style}
                  className="w-full h-full object-cover"
                  onDoubleClick={() => toggleLike(i)}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
                <div className="flex items-center gap-4">
                  <button onClick={() => toggleLike(i)} className="transition-transform active:scale-125">
                    <Heart className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                  </button>
                  <MessageCircle className="w-6 h-6 text-foreground" />
                  <Send className="w-5 h-5 text-foreground" />
                </div>
                <button onClick={() => toggleSave(i)} className="transition-transform active:scale-110">
                  <Bookmark className={`w-6 h-6 ${isSaved ? "fill-foreground text-foreground" : "text-foreground"}`} />
                </button>
              </div>

              {/* Caption */}
              <div className="px-3 pb-3 pt-1 space-y-1">
                {isLiked && <p className="text-xs font-semibold text-foreground">Te gusta esto</p>}

                <p className="text-sm text-foreground">
                  <span className="font-semibold mr-1">{artistName}</span>
                  {showMore && !isExpanded ? (
                    <>
                      {descText.slice(0, 80)}...
                      <button
                        onClick={() => setExpandedPosts((p) => new Set(p).add(i))}
                        className="text-muted-foreground ml-1"
                      >
                        más
                      </button>
                    </>
                  ) : (
                    descText
                  )}
                </p>

                {item.mentions && item.mentions.length > 0 && (
                  <p className="text-xs text-primary">
                    {item.mentions.map((m) => (m.startsWith("@") ? m : `@${m}`)).join(" ")}
                  </p>
                )}

                <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium mt-1">
                  {item.style}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ArtistGallery;
