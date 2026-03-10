import type { GuestSpot } from "@/data/artists";
import { MapPin, Calendar, Users } from "lucide-react";

interface Props {
  spots: GuestSpot[];
}

const ArtistGuestSpots = ({ spots }: Props) => {
  if (spots.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">Guest Spots</h2>
      <div className="space-y-3">
        {spots.map((spot, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm text-foreground">{spot.city} — {spot.studio}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{spot.dateFrom} → {spot.dateTo}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3 h-3" />
                {spot.slotsAvailable} lugares
              </span>
              <button className="text-xs px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                Agendar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtistGuestSpots;
