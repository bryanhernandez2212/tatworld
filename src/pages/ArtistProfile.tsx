import { useParams, Link } from "react-router-dom";
import { getArtistBySlug } from "@/data/artists";
import Navbar from "@/components/Navbar";
import ArtistProfileHeader from "@/components/profile/ArtistProfileHeader";
import ArtistGallery from "@/components/profile/ArtistGallery";
import ArtistReviews from "@/components/profile/ArtistReviews";
import ArtistFlashDesigns from "@/components/profile/ArtistFlashDesigns";
import ArtistGuestSpots from "@/components/profile/ArtistGuestSpots";
import ArtistSidebar from "@/components/profile/ArtistSidebar";
import { ArrowLeft } from "lucide-react";

const ArtistProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const artist = getArtistBySlug(slug || "");

  if (!artist) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 text-center">
          <h1 className="text-2xl font-bold text-foreground">Tatuador no encontrado</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4 md:px-6 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Volver a tatuadores
        </Link>

        <ArtistProfileHeader artist={artist} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <ArtistGallery gallery={artist.gallery} />
            <ArtistFlashDesigns designs={artist.flashDesigns} />
            <ArtistGuestSpots spots={artist.guestSpots} />
            <ArtistReviews reviews={artist.reviews} rating={artist.rating} />
          </div>
          <div>
            <ArtistSidebar artist={artist} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
