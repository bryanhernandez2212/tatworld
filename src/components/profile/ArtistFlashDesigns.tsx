import { Heart, MessageCircle, Send, Bookmark, MapPin, MoreHorizontal, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { FlashDesign } from "@/data/artists";

interface Props {
  designs: FlashDesign[];
  artistName: string;
  artistImage?: string;
}

const ArtistFlashDesigns = ({ designs, artistName, artistImage }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());

  if (designs.length === 0) return null;

  const selected = selectedIndex !== null ? designs[selectedIndex] : null;

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

      {/* Grid thumbnails */}
      <div className="grid grid-cols-3 gap-1 md:gap-2">
        {designs.map((design, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className="relative aspect-square overflow-hidden group rounded-sm"
          >
            <img src={design.image} alt={design.title} className="w-full h-full object-cover transition-opacity group-hover:opacity-80" />
            {!design.available && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <span className="text-xs font-bold text-destructive">RESERVADO</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Heart className="w-6 h-6 text-white" />
            </div>
            {/* Price badge */}
            <div className="absolute bottom-1 right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
              ${design.price.toLocaleString()}
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
              <div className="md:w-[60%] bg-black flex items-center justify-center shrink-0 relative">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-contain max-h-[50vh] md:max-h-[90vh]"
                  onDoubleClick={() => toggleLike(selectedIndex)}
                />
                {!selected.available && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-lg font-bold text-destructive bg-background/80 px-6 py-3 rounded-lg">RESERVADO</span>
                  </div>
                )}
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
                    <p className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                      <ShoppingBag className="w-3 h-3" />
                      Flash Design
                    </p>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                </div>

                {/* Caption / body */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
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
                        {selected.title}
                      </p>
                    </div>
                  </div>

                  {/* Details card */}
                  <div className="rounded-lg border border-border bg-secondary/30 p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Precio</span>
                      <span className="text-sm font-bold text-primary">${selected.price.toLocaleString()} MXN</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Tamaño</span>
                      <span className="text-sm font-medium text-foreground">{selected.size}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Disponible</span>
                      <span className={`text-sm font-medium ${selected.available ? "text-green-500" : "text-destructive"}`}>
                        {selected.available ? "Sí" : "Reservado"}
                      </span>
                    </div>
                  </div>

                  {selected.available && (
                    <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                      Reservar este diseño
                    </button>
                  )}
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

export default ArtistFlashDesigns;
