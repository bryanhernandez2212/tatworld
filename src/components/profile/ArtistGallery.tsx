import { useState } from "react";

interface Props {
  gallery: { image: string; style: string }[];
}

const ArtistGallery = ({ gallery }: Props) => {
  const styles = ["Todos", ...Array.from(new Set(gallery.map((g) => g.style)))];
  const [activeStyle, setActiveStyle] = useState("Todos");

  const filtered = activeStyle === "Todos" ? gallery : gallery.filter((g) => g.style === activeStyle);

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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.map((item, i) => (
          <div key={i} className="relative rounded-xl overflow-hidden aspect-square group">
            <img src={item.image} alt={item.style} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/80 to-transparent p-3">
              <span className="text-xs text-primary font-medium">{item.style}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtistGallery;
