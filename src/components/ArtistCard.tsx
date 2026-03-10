import { useNavigate } from "react-router-dom";

interface ArtistCardProps {
  slug: string;
  name: string;
  image: string;
  city: string;
  specialty: string;
  rating: number;
  online?: boolean;
}

const ArtistCard = ({ slug, name, image, city, specialty, rating, online }: ArtistCardProps) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/tatuador/${slug}`)} className="group relative rounded-xl overflow-hidden cursor-pointer block">
      <div className="aspect-[3/4] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      {online && (
        <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-primary border-2 border-background" />
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent p-4 pt-16">
        <h3 className="font-semibold text-foreground text-lg">{name}</h3>
        <p className="text-muted-foreground text-sm">{city}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-primary">{specialty}</span>
          <span className="text-xs text-muted-foreground">⭐ {rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;
