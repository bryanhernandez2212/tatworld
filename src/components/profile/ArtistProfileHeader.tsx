import { useState } from "react";
import type { Artist } from "@/data/artists";
import { MapPin, Star, Award, Users, CheckCircle, Clock, Share2, Instagram, Mail, Phone, Copy, Check, X, Facebook, Twitter, Link2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Props {
  artist: Artist;
}

const ArtistProfileHeader = ({ artist }: Props) => {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const profileUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast.success("Enlace copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${artist.name} - TattsNearby`,
        text: `Mira el perfil de ${artist.name}, tatuador en ${artist.city}`,
        url: profileUrl,
      });
    } else {
      setShareOpen(true);
    }
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: "📱",
      url: `https://wa.me/?text=${encodeURIComponent(`Mira el perfil de ${artist.name} en TattsNearby: ${profileUrl}`)}`,
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
    },
    {
      name: "Twitter / X",
      icon: <Twitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Mira el perfil de ${artist.name} en TattsNearby`)}&url=${encodeURIComponent(profileUrl)}`,
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:?subject=${encodeURIComponent(`${artist.name} - TattsNearby`)}&body=${encodeURIComponent(`Mira el perfil de ${artist.name}: ${profileUrl}`)}`,
    },
  ];

  return (
    <>
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
            <button onClick={handleNativeShare} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              <Share2 className="w-4 h-4" />Compartir
            </button>
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="max-w-sm p-0 overflow-hidden border-border bg-card gap-0">
          <div className="px-5 py-4 border-b border-border text-center">
            <h3 className="text-lg font-bold text-foreground">Compartir perfil</h3>
          </div>

          <div className="px-5 py-4 space-y-2">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary transition-colors text-foreground"
              >
                <span className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                  {link.icon}
                </span>
                <span className="text-sm font-medium">{link.name}</span>
              </a>
            ))}
          </div>

          <div className="px-5 pb-5">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2">
              <Link2 className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground truncate flex-1">{profileUrl}</span>
              <button
                onClick={handleCopyLink}
                className="shrink-0 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1"
              >
                {copied ? <><Check className="w-3 h-3" />Copiado</> : <><Copy className="w-3 h-3" />Copiar</>}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArtistProfileHeader;
