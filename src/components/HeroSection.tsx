import { Search, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/60" />

      <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
          Encuentra tu{" "}
          <span className="text-primary">Tatuador Ideal</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-10">
          Conecta con los mejores artistas de México
        </p>

        <div className="flex flex-col sm:flex-row items-stretch gap-3 p-4 rounded-xl bg-secondary/60 backdrop-blur-md border border-border">
          <div className="relative flex-shrink-0">
            <select className="appearance-none w-full sm:w-48 px-4 py-3 pr-10 rounded-lg bg-secondary text-foreground text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary">
              <option>Todas las ciudades</option>
              <option>CDMX</option>
              <option>Guadalajara</option>
              <option>Monterrey</option>
              <option>Puebla</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="w-full px-4 py-3 pl-10 rounded-lg bg-secondary text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
            Buscar
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
