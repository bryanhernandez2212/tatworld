import type { Review } from "@/data/artists";
import { Star } from "lucide-react";

interface Props {
  reviews: Review[];
  rating: number;
}

const ArtistReviews = ({ reviews, rating }: Props) => {
  if (reviews.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">Reseñas</h2>
        <p className="text-muted-foreground text-sm">Aún no hay reseñas para este tatuador.</p>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-foreground">Reseñas</h2>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold text-foreground">{rating}</span>
          <span>({reviews.length})</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review, i) => (
          <div key={i} className="p-4 rounded-xl bg-secondary/50 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-foreground">{review.author}</span>
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className={`w-3 h-3 ${j < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
              ))}
            </div>
            <p className="text-sm text-foreground/80">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtistReviews;
