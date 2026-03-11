import { Button } from "@/components/ui/button";
import { CheckCircle, Bell, Calendar, Mail } from "lucide-react";
import type { Artist } from "@/data/artists";
import type { BookingData } from "./BookingFlow";

interface Props {
  data: BookingData;
  artist: Artist;
  onClose: () => void;
}

const BookingStep6Confirmation = ({ data, artist, onClose }: Props) => {
  const dateStr = data.selectedDate
    ? data.selectedDate.toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="space-y-6 text-center">
      <div className="py-4">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-9 h-9 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-foreground">¡Cita Confirmada!</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Tu cita con {artist.name} ha sido agendada exitosamente
        </p>
      </div>

      <div className="rounded-xl bg-secondary/50 border border-border p-5 text-left space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Tatuador</span>
          <span className="text-sm font-semibold text-foreground">{artist.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Estilo</span>
          <span className="text-sm font-semibold text-foreground">{data.style}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Fecha</span>
          <span className="text-sm font-semibold text-foreground capitalize">{dateStr}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Hora</span>
          <span className="text-sm font-semibold text-foreground">{data.selectedTime} hrs</span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-sm font-bold text-foreground">
            ${data.quoteAmount.toLocaleString()} {artist.priceRange.currency}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-primary">Depósito pagado</span>
          <span className="text-sm font-bold text-primary">
            ${data.depositAmount.toLocaleString()} {artist.priceRange.currency}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Restante</span>
          <span className="text-sm font-semibold text-foreground">
            ${(data.quoteAmount - data.depositAmount).toLocaleString()} {artist.priceRange.currency}
          </span>
        </div>
      </div>

      {/* Notifications info */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground">Notificaciones activas:</p>
        <div className="flex flex-col gap-2">
          {[
            { icon: Mail, text: "Confirmación enviada a tu email" },
            { icon: Calendar, text: "Evento añadido a tu calendario" },
            { icon: Bell, text: "Recordatorios 24h y 2h antes de la cita" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon className="w-3.5 h-3.5 text-primary" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={onClose} className="w-full">
        Cerrar
      </Button>
    </div>
  );
};

export default BookingStep6Confirmation;
