import ArtistCard from "./ArtistCard";
import artist1 from "@/assets/artist1.jpg";
import artist2 from "@/assets/artist2.jpg";
import artist3 from "@/assets/artist3.jpg";
import artist4 from "@/assets/artist4.jpg";
import artist5 from "@/assets/artist5.jpg";
import artist6 from "@/assets/artist6.jpg";
import artist7 from "@/assets/artist7.jpg";
import artist8 from "@/assets/artist8.jpg";

const artists = [
  { name: "Valentina Reyes", image: artist1, city: "CDMX", specialty: "Realismo", rating: 4.9, online: true },
  { name: "Camila Orozco", image: artist2, city: "Guadalajara", specialty: "Neotradicional", rating: 4.8, online: true },
  { name: "Sofía Mendoza", image: artist3, city: "Monterrey", specialty: "Blackwork", rating: 4.7, online: true },
  { name: "Diego Hernández", image: artist4, city: "CDMX", specialty: "Old School", rating: 4.9, online: true },
  { name: "Carlos Ramírez", image: artist5, city: "Puebla", specialty: "Dotwork", rating: 4.6, online: false },
  { name: "Andrea López", image: artist6, city: "Guadalajara", specialty: "Acuarela", rating: 4.8, online: false },
  { name: "Mateo García", image: artist7, city: "CDMX", specialty: "Geométrico", rating: 4.5, online: false },
  { name: "Luna Cervantes", image: artist8, city: "Monterrey", specialty: "Neotradicional", rating: 4.7, online: true },
];

const ArtistsGrid = () => {
  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-8">
        {artists.length} Tatuadores
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <ArtistCard key={artist.name} {...artist} />
        ))}
      </div>
    </section>
  );
};

export default ArtistsGrid;
