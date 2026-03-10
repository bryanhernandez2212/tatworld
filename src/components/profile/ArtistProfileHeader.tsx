import type { Artist } from "@/data/artists";
import { MapPin, Star, Award, Users, CheckCircle, Clock, Share2, Instagram, Mail, Phone, Globe } from "lucide-react";

interface Props {
  artist: Artist;
}

const ArtistProfileHeader = ({ artist }: Props) => {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="relative flex-shrink-0">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover"
        />
        {artist.online && (
          <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-background" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">{artist.name}</h1>
          {artist.sponsors.length > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/15 text-primary text-xs font-medium">
              <Award className="w-3 h-3" />
              Patrocinado
            </div>
          )}
          {artist.walkIns && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/15 text-green-400 text-xs font-medium">
              <CheckCircle className="w-3 h-3" />
              Walk-ins
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{artist.city}</span>
          <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" />{artist.rating} ({artist.reviews.length} reseñas)</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{artist.yearsExperience} años exp.</span>
          <span className="flex items-center gap-1"><Users className="w-4 h-4" />{artist.totalTattoos}+ tatuajes</span>
        </div>

        <p className="text-foreground/80 text-sm leading-relaxed mb-4 max-w-2xl">{artist.bio}</p>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {artist.styles.map((style) => (
            <span key={style} className="px-3 py-1 rounded-full bg-secondary text-foreground text-xs font-medium border border-border">
              {style}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a href={`https://instagram.com/${artist.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm hover:text-primary transition-colors border border-border">
            <Instagram className="w-4 h-4" />{artist.instagram}
          </a>
          <a href={`mailto:${artist.email}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm hover:text-primary transition-colors border border-border">
            <Mail className="w-4 h-4" />Email
          </a>
          <a href={`tel:${artist.phone}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm hover:text-primary transition-colors border border-border">
            <Phone className="w-4 h-4" />Llamar
          </a>
          {artist.website && (
            <a href={`https://${artist.website}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm hover:text-primary transition-colors border border-border">
              <Globe className="w-4 h-4" />Web
            </a>
          )}
          <button onClick={handleShare} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Share2 className="w-4 h-4" />Compartir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfileHeader;
