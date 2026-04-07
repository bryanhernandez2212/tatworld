import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ConventionGalleryProps {
  images: string[];
  name: string;
}

const ConventionGallery = ({ images, name }: ConventionGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const open = selectedIndex !== null;

  const navigate = (dir: 1 | -1) => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + dir + images.length) % images.length);
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-foreground mb-3">Galería</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
            >
              <img
                src={img}
                alt={`${name} - foto ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black/95 border-none [&>button]:hidden">
          <div className="relative flex items-center justify-center min-h-[50vh]">
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={() => navigate(-1)}
                  className="absolute left-3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="absolute right-3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {selectedIndex !== null && (
              <img
                src={images[selectedIndex]}
                alt={`${name} - foto ${selectedIndex + 1}`}
                className="max-h-[80vh] max-w-full object-contain rounded"
              />
            )}

            {images.length > 1 && selectedIndex !== null && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === selectedIndex ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConventionGallery;
