import { useState } from "react";
import type { Artist } from "@/data/artists";
import { MapPin, DollarSign, Award, Building2, Users, CheckCircle, XCircle } from "lucide-react";
import BookingRequestDialog from "@/components/booking/BookingRequestDialog";
interface Props {
  artist: Artist;
}

const ArtistSidebar = ({ artist }: Props) => {
  const [bookingOpen, setBookingOpen] = useState(false);
  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      {/* Rango de Costos */}
      <div className="p-5 rounded-xl bg-secondary/50 border border-border">
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" />
          Rango de Costos
        </h3>
        <p className="text-2xl font-extrabold text-foreground">
          ${artist.priceRange.min.toLocaleString()} — ${artist.priceRange.max.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{artist.priceRange.currency} • Depende del tamaño y complejidad</p>
      </div>

      {/* Walk-ins */}
      <div className="p-5 rounded-xl bg-secondary/50 border border-border">
        <h3 className="text-sm font-bold text-foreground mb-2">Disponibilidad Walk-in</h3>
        {artist.walkIns ? (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            Acepta clientes sin cita
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <XCircle className="w-4 h-4" />
            Solo con cita previa
          </div>
        )}
      </div>

      {/* Estudio */}
      <div className="p-5 rounded-xl bg-secondary/50 border border-border">
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          Estudio
        </h3>
        <p className="text-sm font-semibold text-foreground">{artist.studio.name}</p>
        {artist.studio.collective && (
          <p className="text-xs text-primary mt-1 flex items-center gap-1">
            <Users className="w-3 h-3" />
            {artist.studio.collective}
          </p>
        )}
        {artist.studio.showLocation && (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground flex items-start gap-1">
              <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
              {artist.studio.address}, {artist.studio.city}
            </p>
          </div>
        )}
      </div>

      {/* Patrocinios */}
      {artist.sponsors.length > 0 && (
        <div className="p-5 rounded-xl bg-secondary/50 border border-border">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            Patrocinios
          </h3>
          <div className="space-y-2">
            {artist.sponsors.map((sponsor, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-foreground font-medium">{sponsor.name}</span>
                <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-background border border-border">{sponsor.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => setBookingOpen(true)}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity"
      >
        Agendar Cita
      </button>

      <BookingFlow artist={artist} open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
};

export default ArtistSidebar;
