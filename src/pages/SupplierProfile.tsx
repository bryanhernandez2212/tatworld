import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { getSupplierBySlug } from "@/data/suppliers";
import { artists } from "@/data/artists";
import { MapPin, Phone, Mail, Globe, Instagram, Calendar, Package, Star, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SupplierProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const supplier = getSupplierBySlug(slug || "");

  if (!supplier) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <p className="text-muted-foreground">Proveedor no encontrado.</p>
      </div>
    );
  }

  const sponsoredArtists = artists.filter((a) =>
    supplier.sponsoredArtistSlugs.includes(a.slug)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start mb-10">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-secondary/50 flex-shrink-0">
            <img src={supplier.logo} alt={supplier.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">{supplier.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{supplier.city} — {supplier.address}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Desde {supplier.founded}</span>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed mb-4 max-w-2xl">{supplier.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {supplier.categories.map((cat) => (
                <Badge key={cat} variant="secondary" className="bg-secondary text-foreground border border-border">{cat}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`https://instagram.com/${supplier.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm hover:text-primary transition-colors border border-border">
                <Instagram className="w-4 h-4" />{supplier.instagram}
              </a>
              <a href={`mailto:${supplier.email}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm hover:text-primary transition-colors border border-border">
                <Mail className="w-4 h-4" />Email
              </a>
              <a href={`tel:${supplier.phone}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm hover:text-primary transition-colors border border-border">
                <Phone className="w-4 h-4" />Llamar
              </a>
              <a href={`https://${supplier.website}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm hover:text-primary transition-colors border border-border">
                <Globe className="w-4 h-4" />Web
              </a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="catalogo" className="w-full">
          <TabsList className="w-full justify-start bg-secondary/50 border border-border rounded-xl p-1 mb-6">
            <TabsTrigger value="catalogo" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Package className="w-4 h-4 mr-1.5" />Catálogo
            </TabsTrigger>
            <TabsTrigger value="promos" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Star className="w-4 h-4 mr-1.5" />Promociones
            </TabsTrigger>
            <TabsTrigger value="artistas" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ExternalLink className="w-4 h-4 mr-1.5" />Artistas Patrocinados
            </TabsTrigger>
          </TabsList>

          {/* Catalog */}
          <TabsContent value="catalogo">
            {supplier.products.length === 0 ? (
              <p className="text-muted-foreground text-sm">No hay productos disponibles.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {supplier.products.map((product) => (
                  <Card key={product.id} className="bg-card border-border overflow-hidden group">
                    <div className="aspect-square overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-bold text-foreground text-sm">{product.name}</h4>
                        {!product.inStock && (
                          <Badge variant="secondary" className="bg-destructive/15 text-destructive text-[10px] shrink-0">Agotado</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-bold">${product.price.toLocaleString()} {product.currency}</span>
                        <Badge variant="outline" className="text-[10px]">{product.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Promos */}
          <TabsContent value="promos">
            {supplier.promos.length === 0 ? (
              <p className="text-muted-foreground text-sm">No hay promociones activas.</p>
            ) : (
              <div className="space-y-6">
                {supplier.promos.map((promo) => (
                  <Card key={promo.id} className="bg-card border-border overflow-hidden">
                    <div className="aspect-[21/9] overflow-hidden">
                      <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-foreground text-lg">{promo.title}</h4>
                        {promo.discount && (
                          <Badge className="bg-primary text-primary-foreground">{promo.discount} OFF</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{promo.description}</p>
                      <p className="text-xs text-muted-foreground">Válido hasta: {new Date(promo.validUntil).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Sponsored Artists */}
          <TabsContent value="artistas">
            {sponsoredArtists.length === 0 ? (
              <p className="text-muted-foreground text-sm">No hay artistas patrocinados.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {sponsoredArtists.map((artist) => (
                  <Link
                    key={artist.slug}
                    to={`/tatuador/${artist.slug}`}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
                  >
                    <img src={artist.image} alt={artist.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{artist.name}</h4>
                      <p className="text-sm text-muted-foreground">{artist.specialty} · {artist.city}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Star className="w-3 h-3 text-yellow-500" />{artist.rating}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupplierProfile;
