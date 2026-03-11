import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Clock, DollarSign } from "lucide-react";
import type { Artist } from "@/data/artists";
import type { BookingData } from "./BookingFlow";

interface Props {
  data: BookingData;
  updateData: (d: Partial<BookingData>) => void;
  artist: Artist;
  onNext: () => void;
  onBack: () => void;
}

const BookingStep2Quote = ({ data, updateData, artist, onNext, onBack }: Props) => {
  // Simulate quote generation based on size
  useEffect(() => {
    const area = data.sizeWidth * data.sizeHeight;
    const basePrice = artist.priceRange.min;
    const pricePerCm2 = (artist.priceRange.max - artist.priceRange.min) / 500;
    const quote = Math.round(basePrice + area * pricePerCm2);
    const deposit = Math.round(quote * 0.3);
    const hours = Math.max(1, Math.round(area / 30));

    updateData({
      quoteAmount: quote,
      depositAmount: deposit,
      estimatedHours: hours,
      quoteNotes: `Tatuaje estilo ${data.style}, ${data.sizeWidth}×${data.sizeHeight}cm. Incluye diseño personalizado.`,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-5">
      <div className="text-center py-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <FileText className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Cotización Generada</h3>
        <p className="text-sm text-muted-foreground mt-1">
          El tatuador ha revisado tu solicitud
        </p>
      </div>

      <div className="rounded-xl bg-secondary/50 border border-border p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Estilo</span>
          <span className="text-sm font-semibold text-foreground">{data.style}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Tamaño</span>
          <span className="text-sm font-semibold text-foreground">{data.sizeWidth}×{data.sizeHeight} cm</span>
        </div>
        <div className="h-px bg-border" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Tiempo estimado</span>
          </div>
          <span className="text-sm font-semibold text-foreground">~{data.estimatedHours}h</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Costo total</span>
          </div>
          <span className="text-xl font-extrabold text-foreground">
            ${data.quoteAmount.toLocaleString()} {artist.priceRange.currency}
          </span>
        </div>

        <div className="h-px bg-border" />

        <div className="flex items-center justify-between">
          <span className="text-sm text-primary font-semibold">Depósito requerido (30%)</span>
          <span className="text-lg font-bold text-primary">
            ${data.depositAmount.toLocaleString()} {artist.priceRange.currency}
          </span>
        </div>
      </div>

      {data.quoteNotes && (
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground font-semibold mb-1">Notas del tatuador:</p>
          <p className="text-sm text-foreground">{data.quoteNotes}</p>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">Atrás</Button>
        <Button onClick={onNext} className="flex-1">Aceptar y Pagar Depósito</Button>
      </div>
    </div>
  );
};

export default BookingStep2Quote;
