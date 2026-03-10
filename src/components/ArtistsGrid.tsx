import ArtistCard from "./ArtistCard";
import { artists } from "@/data/artists";

const ArtistsGrid = () => {
  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-8">
        {artists.length} Tatuadores
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <ArtistCard key={artist.slug} {...artist} />
        ))}
      </div>
    </section>
  );
};

export default ArtistsGrid;
