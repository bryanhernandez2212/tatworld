import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MapPin, MoreHorizontal, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());

  const filtered = activeStyle === "Todos" ? gallery : gallery.filter((g) => g.style === activeStyle);
  const selected = selectedIndex !== null ? filtered[selectedIndex] : null;

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
      <div className="flex flex-wrap gap-2 mb-4">
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

      {/* Grid thumbnails */}
      <div className="grid grid-cols-3 gap-1 md:gap-2">
        {filtered.map((item, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className="relative aspect-square overflow-hidden group rounded-sm"
          >
            <img src={item.image} alt={item.style} className="w-full h-full object-cover transition-opacity group-hover:opacity-80" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </button>
        ))}
      </div>

      {/* Instagram-style modal */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden border-border bg-card gap-0">
          {selected && selectedIndex !== null && (
            <div className="flex flex-col md:flex-row max-h-[90vh]">
              {/* Image side */}
              <div className="md:w-[60%] bg-black flex items-center justify-center shrink-0">
                <img
                  src={selected.image}
                  alt={selected.style}
                  className="w-full h-full object-contain max-h-[50vh] md:max-h-[90vh]"
                  onDoubleClick={() => toggleLike(selectedIndex)}
                />
              </div>

              {/* Info side */}
              <div className="md:w-[40%] flex flex-col min-h-0">
                {/* Header */}
                <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border shrink-0">
                  {artistImage ? (
                    <img src={artistImage} alt={artistName} className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/30" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      {artistName.charAt(0)}
                    </div>
                  )}
                  <div className="leading-tight flex-1">
                    <p className="text-sm font-semibold text-foreground">{artistName}</p>
                    {selected.location && (
                      <p className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                        <MapPin className="w-3 h-3" />
                        {selected.location}
                      </p>
                    )}
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                </div>

                {/* Caption / body */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                  <div className="flex gap-2.5">
                    {artistImage ? (
                      <img src={artistImage} alt="" className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0 mt-0.5">
                        {artistName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-foreground">
                        <span className="font-semibold mr-1">{artistName}</span>
                        {selected.description || `Trabajo de ${selected.style}`}
                      </p>
                      {selected.mentions && selected.mentions.length > 0 && (
                        <p className="text-xs text-primary mt-1">
                          {selected.mentions.map((m) => (m.startsWith("@") ? m : `@${m}`)).join(" ")}
                        </p>
                      )}
                      <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium mt-2">
                        {selected.style}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-border px-4 py-2.5 shrink-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button onClick={() => toggleLike(selectedIndex)} className="transition-transform active:scale-125">
                        <Heart className={`w-6 h-6 ${likedPosts.has(selectedIndex) ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                      </button>
                      <MessageCircle className="w-6 h-6 text-foreground" />
                      <Send className="w-5 h-5 text-foreground" />
                    </div>
                    <button onClick={() => toggleSave(selectedIndex)} className="transition-transform active:scale-110">
                      <Bookmark className={`w-6 h-6 ${savedPosts.has(selectedIndex) ? "fill-foreground text-foreground" : "text-foreground"}`} />
                    </button>
                  </div>
                  {likedPosts.has(selectedIndex) && (
                    <p className="text-xs font-semibold text-foreground">Te gusta esto</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ArtistGallery;
