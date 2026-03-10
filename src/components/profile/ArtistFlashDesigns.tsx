import type { FlashDesign } from "@/data/artists";

interface Props {
  designs: FlashDesign[];
}

const ArtistFlashDesigns = ({ designs }: Props) => {
  if (designs.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">Flash Designs / Wanna-dos</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {designs.map((design, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-border bg-secondary/30">
            <div className="aspect-square overflow-hidden relative">
              <img src={design.image} alt={design.title} className="w-full h-full object-cover" />
              {!design.available && (
                <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                  <span className="text-sm font-bold text-destructive">RESERVADO</span>
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-foreground">{design.title}</h3>
              <p className="text-xs text-muted-foreground">{design.size}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-primary">${design.price.toLocaleString()} MXN</span>
                {design.available && (
                  <button className="text-xs px-3 py-1 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                    Reservar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtistFlashDesigns;
