import { useParams, Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { MapPin, CalendarDays, Globe, Instagram, ArrowLeft, Ticket, Check, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getConventionBySlug } from "@/data/conventions";
import { artists } from "@/data/artists";
import ConventionGallery from "@/components/conventions/ConventionGallery";

const ConventionDetail = () => {
  const { slug } = useParams();
  const convention = getConventionBySlug(slug || "");

  if (!convention) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Convención no encontrada</h1>
          <Link to="/convenciones">
            <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Volver a convenciones</Button>
          </Link>
        </div>
      </div>
    );
  }

  const participatingArtists = artists.filter((a) => convention.artistSlugs.includes(a.slug));
  const artistDetailsMap = new Map(convention.artistDetails.map((d) => [d.slug, d]));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[45vh] min-h-[320px]">
        <img src={convention.image} alt={convention.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-5xl mx-auto">
          <Link to="/convenciones" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Convenciones
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{convention.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{convention.venue}, {convention.city}</span>
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              {format(parseISO(convention.dateFrom), "d MMM", { locale: es })} – {format(parseISO(convention.dateTo), "d MMM yyyy", { locale: es })}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 max-w-5xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Sobre el evento</h2>
            <p className="text-muted-foreground leading-relaxed">{convention.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Estilos presentes</h3>
            <div className="flex flex-wrap gap-2">
              {convention.styles.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Gallery */}
          <ConventionGallery images={convention.gallery} name={convention.name} />

          <Separator />

          {/* Artists with availability */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">
              Tatuadores Participantes ({participatingArtists.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {participatingArtists.map((artist) => {
                const details = artistDetailsMap.get(artist.slug);
                const isAvailable = details?.available ?? true;
                const booked = details?.bookedClients ?? 0;

                return (
                  <Link key={artist.slug} to={`/tatuador/${artist.slug}`}>
                    <Card className="flex items-center gap-4 p-4 hover:border-primary/50 transition-colors bg-card border-border">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-14 h-14 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">{artist.name}</p>
                        <p className="text-sm text-muted-foreground">{artist.specialty} · {artist.city}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <Badge
                            variant={isAvailable ? "default" : "secondary"}
                            className={`text-[10px] px-1.5 py-0 ${isAvailable ? "" : "opacity-70"}`}
                          >
                            {isAvailable ? "Disponible" : "No disponible"}
                          </Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            {booked} {booked === 1 ? "cliente agendado" : "clientes agendados"}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
            {participatingArtists.length === 0 && (
              <p className="text-muted-foreground text-sm">Próximamente se anunciarán los artistas.</p>
            )}
          </div>

          <Separator />
          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Ubicación</h2>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="font-semibold text-foreground">{convention.venue}</p>
              <p className="text-sm text-muted-foreground mt-1">{convention.address}, {convention.city}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="bg-card border-border sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Ticket className="w-5 h-5 text-primary" />
                Boletos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {convention.tickets.map((ticket) => (
                <div
                  key={ticket.name}
                  className={`border rounded-lg p-4 ${ticket.available ? "border-border" : "border-border opacity-60"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">{ticket.name}</span>
                    <span className="text-primary font-bold">${ticket.price} {ticket.currency}</span>
                  </div>
                  <ul className="space-y-1 mb-3">
                    {ticket.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Check className="w-3 h-3 text-primary" /> {perk}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    size="sm"
                    disabled={!ticket.available}
                    variant={ticket.available ? "default" : "secondary"}
                  >
                    {ticket.available ? "Comprar" : "Agotado"}
                  </Button>
                </div>
              ))}

              <Separator />

              <div className="flex flex-col gap-2">
                {convention.website && (
                  <a
                    href={`https://${convention.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Globe className="w-4 h-4" /> {convention.website}
                  </a>
                )}
                {convention.instagram && (
                  <a
                    href={`https://instagram.com/${convention.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Instagram className="w-4 h-4" /> {convention.instagram}
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConventionDetail;
