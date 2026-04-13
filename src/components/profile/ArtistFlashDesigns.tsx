import { Heart, MessageCircle, Send, Bookmark, MapPin, MoreHorizontal, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { FlashDesign } from "@/data/artists";

interface Props {
  designs: FlashDesign[];
  artistName: string;
  artistImage?: string;
}

const ArtistFlashDesigns = ({ designs, artistName, artistImage }: Props) => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());

  if (designs.length === 0) return null;

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
      <h2 className="text-xl font-bold text-foreground mb-4">Flash Designs / Wanna-dos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {designs.map((design, i) => {
          const isLiked = likedPosts.has(i);
          const isSaved = savedPosts.has(i);

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
                    <p className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                      <ShoppingBag className="w-3 h-3" />
                      Flash Design
                    </p>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Image */}
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover"
                  onDoubleClick={() => toggleLike(i)}
                />
                {!design.available && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-sm font-bold text-destructive bg-background/80 px-4 py-2 rounded-lg">RESERVADO</span>
                  </div>
                )}
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
              <div className="px-3 pb-3 pt-1 space-y-1.5">
                {isLiked && <p className="text-xs font-semibold text-foreground">Te gusta esto</p>}

                <p className="text-sm text-foreground">
                  <span className="font-semibold mr-1">{artistName}</span>
                  {design.title}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">${design.price.toLocaleString()} MXN</span>
                    <span className="text-[11px] text-muted-foreground">• {design.size}</span>
                  </div>
                  {design.available && (
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                      Reservar
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ArtistFlashDesigns;
