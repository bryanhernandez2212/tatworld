import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { suppliers } from "@/data/suppliers";
import { MapPin, Package, Users } from "lucide-react";

const Proveedores = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">Proveedores</h1>
          <p className="text-muted-foreground">Marcas y distribuidores de insumos profesionales para tatuaje.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {suppliers.map((supplier) => (
            <Link
              key={supplier.slug}
              to={`/proveedor/${supplier.slug}`}
              className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-full aspect-square rounded-lg bg-secondary/50 flex items-center justify-center mb-4 overflow-hidden">
                <img
                  src={supplier.logo}
                  alt={supplier.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">{supplier.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                <MapPin className="w-3.5 h-3.5" />
                {supplier.city}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{supplier.description}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Package className="w-3 h-3" />{supplier.products.length} productos</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{supplier.sponsoredArtistSlugs.length} artistas</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proveedores;
